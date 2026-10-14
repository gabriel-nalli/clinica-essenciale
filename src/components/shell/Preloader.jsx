"use client";
import { useEffect, useRef } from "react";
import { Mark } from "@/components/ui/Icon";

// Só na 1ª visita (o script inline do <head> decide: data-intro="run").
// Sobreposição sai em ~1,75s; há pulo por qualquer input e um fail-safe em CSS.
export default function Preloader() {
  const root = useRef(null);

  useEffect(() => {
    const html = document.documentElement;
    const finish = () => {
      html.classList.add("intro-done");
      try { localStorage.setItem("ess:intro", "1"); } catch {}
      if (root.current) root.current.hidden = true;
    };
    if (html.dataset.intro !== "run") {
      html.classList.add("intro-done");
      if (root.current) root.current.hidden = true;
      return;
    }
    let tl;
    let killed = false;
    const skip = () => {
      if (tl) tl.progress(1);
      else finish();
    };
    const events = ["wheel", "touchstart", "keydown", "pointerdown"];
    events.forEach((ev) => window.addEventListener(ev, skip, { once: true, passive: true }));

    (async () => {
      const { gsap, DrawSVGPlugin } = await import("@/lib/gsap");
      if (killed || !root.current) return;
      const el = root.current;
      const q = (s) => el.querySelectorAll(s);
      const arcs = q(".mark-arc");
      const strokes = q(".mark-stroke");
      gsap.set(q(".pre-word span"), { yPercent: (i) => (i === 0 ? 105 : -105) });
      gsap.set(arcs, { drawSVG: "0%" });
      gsap.set(strokes, { opacity: 0 });
      gsap.set(q(".pre-line"), { scaleX: 0 });
      tl = gsap.timeline({ delay: 0.05, onComplete: finish });
      tl.to(q(".pre-line"), { scaleX: 1, duration: 0.45, ease: "ess.draw" }, 0.1)
        .to(arcs[0], { drawSVG: "100%", duration: 0.7, ease: "ess.draw" }, 0.15)
        .to(arcs[1], { drawSVG: "100%", duration: 0.7, ease: "ess.draw" }, 0.25)
        .to(strokes, { opacity: 1, duration: 0.3, stagger: 0.08, ease: "ess.draw" }, 0.45)
        .to(q(".pre-word span"), { yPercent: 0, duration: 0.65, ease: "ess.out", stagger: 0.1 }, 0.3)
        .to(q(".pre-word span"), { yPercent: (i) => (i === 0 ? -105 : 105), duration: 0.35, ease: "ess.in", stagger: 0.04 }, 1.1)
        .to(q(".pre-line"), { scaleX: 0, duration: 0.35, ease: "ess.in" }, 1.1)
        .add(() => html.classList.add("intro-done"), 1.2)
        .to(el, { opacity: 0, duration: 0.5, ease: "ess.inOut" }, 1.2);
    })();

    return () => {
      killed = true;
      events.forEach((ev) => window.removeEventListener(ev, skip));
      if (tl) tl.kill();
    };
  }, []);

  return (
    <div ref={root} className="preloader" role="status" aria-label="Carregando Clínica Essenciale">
      <div className="preloader__lockup" aria-hidden="true">
        <span className="pre-word pre-word--sans"><span>Essenciale</span></span>
        <span className="pre-line" />
        <Mark size={64} className="preloader__mark" />
        <span className="pre-line" />
        <span className="pre-word pre-word--serif serif"><span>Cuidado</span></span>
      </div>
    </div>
  );
}
