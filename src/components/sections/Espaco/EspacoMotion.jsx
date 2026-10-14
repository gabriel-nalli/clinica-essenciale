"use client";
import { useRef } from "react";
import { gsap, ScrollTrigger, SplitText, useGSAP } from "@/lib/gsap";

// Ilha cliente do Espaço: é o próprio <section> (escopo do GSAP) e recebe o markup do servidor como children.
//  A: faixa da jornada — molduras reveladas da esquerda p/ a direita, fio que desenha, legendas em cascata.
//  B: "Essenciale" sobe de trás do horizonte (máscara = borda superior do panorama) e o panorama assenta.
// Estados iniciais ocultos vivem no CSS sob `html.js-motion`; com movimento reduzido nada é ocultado.
export default function EspacoMotion({ children, className = "", ...rest }) {
  const root = useRef(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();

      mm.add(
        {
          calm: "(prefers-reduced-motion: no-preference)",
          still: "(prefers-reduced-motion: reduce)",
          wide: "(min-width: 768px)",
        },
        (ctx) => {
          const { calm, wide } = ctx.conditions;
          if (!calm) {
            // Movimento reduzido: estado final, sem animação.
            el.classList.add("is-static");
            return () => el.classList.remove("is-static");
          }

          const items = gsap.utils.toArray("[data-journey]", el);
          const groups = wide ? [items] : [items.slice(0, 2), items.slice(2)];

          groups.forEach((group) => {
            if (!group.length) return;
            const frames = group.map((li) => li.querySelector("[data-frame]"));
            const rules = group.map((li) => li.querySelector("[data-rule]"));
            const metas = group.map((li) => li.querySelector("[data-meta]"));
            const tl = gsap.timeline({
              scrollTrigger: { trigger: group[0], start: "top 84%", once: true },
            });
            tl.fromTo(
              frames,
              { clipPath: "inset(0 100% 0 0 round 4px)" },
              { clipPath: "inset(0 0% 0 0 round 4px)", duration: 0.7, ease: "ess.inOut", stagger: 0.12 },
              0
            )
              .fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: "ess.draw", stagger: 0.12 }, 0)
              .fromTo(metas, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "ess.out", stagger: 0.12 }, 0.25);
          });

          // "Essenciale": caracteres sobem de trás do horizonte. O SplitText espera as fontes (sem aviso
          // "called before fonts loaded"); até lá a palavra fica oculta pelo CSS (.is-word).
          const word = el.querySelector("[data-word]");
          const horizon = el.querySelector("[data-horizon]");
          let started = false;
          let cancelled = false;
          let timer = 0;
          const startWord = () => {
            if (started || cancelled || !word || !horizon) return;
            started = true;
            ctx.add(() => {
              const split = SplitText.create(word, { type: "chars" });
              gsap.from(split.chars, {
                yPercent: 120, // 100% + folga: as hastes altas não podem espiar acima do horizonte
                duration: 1,
                ease: "ess.out",
                stagger: 0.035,
                scrollTrigger: { trigger: horizon, start: "top 88%", once: true },
              });
              el.classList.add("is-word");
            });
          };
          if (document.fonts && document.fonts.ready && document.fonts.status !== "loaded") {
            document.fonts.ready.then(startWord);
            timer = window.setTimeout(startWord, 1500);
          } else {
            startWord();
          }

          // Panorama: assenta uma vez (1.06 → 1), sem scrub.
          const pano = el.querySelector("[data-pano]");
          if (pano) {
            gsap.fromTo(
              pano.querySelectorAll("img"),
              { scale: 1.06 },
              {
                scale: 1,
                duration: 1.4,
                ease: "ess.out",
                scrollTrigger: { trigger: pano, start: "top 88%", once: true },
              }
            );
          }

          el.classList.add("is-ready");
          return () => {
            cancelled = true;
            window.clearTimeout(timer);
            el.classList.remove("is-ready", "is-word");
          };
        }
      );

      // A altura do bloco muda quando a fonte serifada carrega (FitText): recalcula os gatilhos abaixo.
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
