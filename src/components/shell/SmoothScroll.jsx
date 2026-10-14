"use client";
import { useEffect } from "react";
import { useShell } from "./ShellContext";
import { scrollToHash } from "@/lib/scroll";

// Lenis só em desktop com ponteiro fino e sem movimento reduzido; toque usa rolagem nativa.
// Também intercepta cliques em âncoras internas (#id) para rolar com offset do header.
export default function SmoothScroll() {
  const { menuOpen } = useShell();

  useEffect(() => {
    let lenis = null;
    let tick = null;
    let alive = true;
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px) and (prefers-reduced-motion: no-preference)");

    const start = async () => {
      if (!mq.matches || lenis) return;
      const [{ default: Lenis }, { gsap, ScrollTrigger }] = await Promise.all([import("lenis"), import("@/lib/gsap")]);
      await import("lenis/dist/lenis.css");
      if (!alive || lenis) return;
      lenis = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false, autoRaf: false });
      window.__essLenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      if (document.documentElement.dataset.intro === "run" && !document.documentElement.classList.contains("intro-done")) lenis.stop();
    };
    start();

    const onIntroDone = () => lenis && lenis.start();
    const mo = new MutationObserver(() => {
      if (document.documentElement.classList.contains("intro-done")) onIntroDone();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest && e.target.closest('a[href^="#"]');
      if (!a || a.hasAttribute("data-no-scroll")) return;
      const hash = a.getAttribute("href");
      if (hash.length < 2) return;
      if (scrollToHash(hash)) e.preventDefault();
    };
    document.addEventListener("click", onClick);
    mq.addEventListener?.("change", start);

    return () => {
      alive = false;
      document.removeEventListener("click", onClick);
      mq.removeEventListener?.("change", start);
      mo.disconnect();
      if (lenis) {
        import("@/lib/gsap").then(({ gsap }) => tick && gsap.ticker.remove(tick));
        lenis.destroy();
        window.__essLenis = null;
      }
    };
  }, []);

  useEffect(() => {
    const l = window.__essLenis;
    if (!l) return;
    if (menuOpen) l.stop();
    else if (document.documentElement.dataset.intro !== "run" || document.documentElement.classList.contains("intro-done")) l.start();
  }, [menuOpen]);

  return null;
}
