"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

const CLOSED = "ellipse(30% 34% at 50% 50%)";
const OPEN = "ellipse(75% 75% at 50% 50%)"; // cobre os cantos do retângulo

// Dispositivo fraco / Save-Data: troca o scrub por um tween único.
function isLowEnd() {
  try {
    const c = navigator.connection;
    if (c && c.saveData) return true;
    if (navigator.deviceMemory && navigator.deviceMemory <= 4) return true;
    if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) return true;
  } catch {}
  return false;
}

// Ilha cliente: é o <section> (escopo). A elipse do painel abre com ScrollTrigger scrub 0.6 (sem pin);
// os arcos da marca desenham e somem nos primeiros 40% do progresso.
export default function ConversarMotion({ children, className = "", ...rest }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const panel = el.querySelector("[data-panel]");
      const aperture = el.querySelector("[data-aperture]");
      const arcsSvg = el.querySelector("[data-arcs]");
      const arcs = el.querySelectorAll("[data-arc]");
      if (!panel || !aperture) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          calm: "(prefers-reduced-motion: no-preference)",
          still: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          if (!ctx.conditions.calm) {
            // Movimento reduzido: abertura totalmente aberta, sem arcos animados.
            el.classList.add("is-static");
            return () => el.classList.remove("is-static");
          }

          const lowEnd = isLowEnd();
          const tl = gsap.timeline(
            lowEnd
              ? { paused: true }
              : { scrollTrigger: { trigger: panel, start: "top 80%", end: "center 55%", scrub: 0.6 } }
          );
          const span = lowEnd ? 0.9 : 1; // duração total (progresso 0→1 no scrub)

          tl.fromTo(aperture, { clipPath: CLOSED }, { clipPath: OPEN, duration: span, ease: lowEnd ? "ess.out" : "power2.inOut" }, 0);
          if (arcs.length) {
            tl.fromTo(
              arcs,
              { drawSVG: "0%" },
              { drawSVG: "100%", duration: span * 0.22, ease: "ess.draw", stagger: span * 0.05 },
              0
            );
            tl.to(arcsSvg, { opacity: 0, duration: span * 0.18, ease: "none" }, span * 0.22);
          }

          if (lowEnd) {
            ScrollTrigger.create({
              trigger: panel,
              start: "top 70%",
              once: true,
              onEnter: () => tl.play(),
            });
          }

          el.classList.add("is-ready");
          return () => el.classList.remove("is-ready");
        }
      );

      // FitText do Espaço (acima) muda a altura quando a fonte serifada chega: recalcula o gatilho.
      let alive = true;
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => alive && ScrollTrigger.refresh());
      }
      return () => {
        alive = false;
        mm.revert();
      };
    },
    { scope: root }
  );

  return (
    <section ref={root} className={className} {...rest}>
      {children}
    </section>
  );
}
