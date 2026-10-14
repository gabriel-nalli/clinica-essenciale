"use client";
import { useEffect } from "react";

// Um único observer revela tudo que tem [data-reveal] (fade | hairline | frame | line).
// fade/hairline/frame são transições CSS (classe .is-in); "line" usa SplitText com máscara.
export default function RevealController() {
  useEffect(() => {
    document.documentElement.classList.add("reveal-ready");
    const els = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!els.length) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      els.forEach((el) => el.classList.add("is-in", "is-split"));
      return;
    }
    let cancelled = false;
    let gsapMod = null;
    const kills = [];

    const loadGsap = async () => {
      if (!gsapMod) gsapMod = await import("@/lib/gsap");
      return gsapMod;
    };

    const reveal = async (el) => {
      if (el.dataset.reveal === "line") {
        try {
          const { gsap, SplitText } = await loadGsap();
          if (cancelled) return;
          if (document.fonts && document.fonts.ready) await document.fonts.ready;
          const stagger = parseFloat(el.dataset.stagger || "0.07");
          SplitText.create(el, {
            type: "lines",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              el.classList.add("is-split");
              const tw = gsap.from(self.lines, { yPercent: 105, duration: 0.9, ease: "ess.out", stagger });
              kills.push(() => tw.kill());
              return tw;
            },
          });
        } catch {
          el.classList.add("is-split");
        }
      }
      el.classList.add("is-in");
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            io.unobserve(e.target);
            reveal(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => {
      cancelled = true;
      io.disconnect();
      kills.forEach((k) => k());
    };
  }, []);
  return null;
}
