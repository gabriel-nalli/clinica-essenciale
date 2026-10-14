"use client";
import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

// Ilha de movimento do hero (a "Abertura" em si é CSS: ver Hero.css).
// 1) 1ª visita (data-intro="run"): H1 sobe linha a linha quando o preloader termina (html.intro-done).
//    Em visitas repetidas o H1 nunca é escondido. Sem JS/reduced-motion: texto estático.
// 2) Desktop com ponteiro fino: a imagem da abertura acompanha o ponteiro em ±6px (profundidade).
export default function HeroMotion({ children, className }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (html.dataset.intro !== "run") return;
        const h1 = root.current && root.current.querySelector("h1");
        if (!h1) return;

        let started = false;
        let current = null;
        let timer = 0;
        let mo = null;

        const split = SplitText.create(h1, {
          type: "lines",
          mask: "lines",
          linesClass: "hero-line",
          autoSplit: true,
          onSplit(self) {
            // devolver a animação deixa o SplitText re-criá-la num re-split (fonte/resize)
            current = gsap.from(self.lines, {
              yPercent: 105,
              duration: 0.9,
              delay: 0.05,
              stagger: 0.07,
              ease: "ess.out",
              paused: !started,
            });
            return current;
          },
        });

        const start = () => {
          if (started) return;
          started = true;
          if (mo) mo.disconnect();
          window.clearTimeout(timer);
          if (current) current.play();
        };

        if (html.classList.contains("intro-done")) {
          start();
        } else {
          mo = new MutationObserver(() => {
            if (html.classList.contains("intro-done")) start();
          });
          mo.observe(html, { attributes: true, attributeFilter: ["class"] });
          // fail-safe: o overlay do preloader some por CSS em 2,6s mesmo se o JS travar
          timer = window.setTimeout(start, 2700);
        }

        return () => {
          if (mo) mo.disconnect();
          window.clearTimeout(timer);
          split.revert();
        };
      });

      mm.add("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
        const host = root.current;
        const layer = host && host.querySelector("[data-depth]");
        if (!layer) return;
        const xTo = gsap.quickTo(layer, "x", { duration: 0.8, ease: "ess.out" });
        const yTo = gsap.quickTo(layer, "y", { duration: 0.8, ease: "ess.out" });
        const onMove = (e) => {
          if (e.pointerType && e.pointerType !== "mouse") return;
          const r = host.getBoundingClientRect();
          if (!r.width || !r.height) return;
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          xTo(Math.max(-6, Math.min(6, nx * 12)));
          yTo(Math.max(-6, Math.min(6, ny * 12)));
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };
        host.addEventListener("pointermove", onMove, { passive: true });
        host.addEventListener("pointerleave", onLeave);
        return () => {
          host.removeEventListener("pointermove", onMove);
          host.removeEventListener("pointerleave", onLeave);
          gsap.set(layer, { clearProps: "transform" });
        };
      });

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
