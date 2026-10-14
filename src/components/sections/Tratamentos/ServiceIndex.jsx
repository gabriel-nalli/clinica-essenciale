"use client";
// "Índice" — acordeão de quatro linhas (uma aberta por vez) + prévia sticky no desktop.
// Ilha cliente pequena: o servidor entrega o cabeçalho, o h2 e a linha de ajuda; aqui só o que é interativo.
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import Picture from "@/components/ui/Picture";
import { gsap, useGSAP } from "@/lib/gsap";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const FULL = "inset(0% 0% 0% 0%)";
const HIDDEN = "inset(100% 0% 0% 0%)";
const pad2 = (n) => String(n).padStart(2, "0");
const rowFromHash = (hash) => {
  const m = /^#idx-row-([1-9]\d*)$/.exec(hash || "");
  return m ? Number(m[1]) - 1 : null;
};
const prefersReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ServiceIndex({ services }) {
  const count = services.length;
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const frameRef = useRef(null);
  const slideRefs = useRef([]);
  const innerRefs = useRef([]);
  const numRefs = useRef([]);
  const nameRefs = useRef([]);
  const visibleRef = useRef(0); // slide em repouso, por cima
  const settleRef = useRef(null); // finaliza a transição em andamento
  const pendingScroll = useRef(null);
  const instantTimer = useRef(0);
  const anchorTimer = useRef(0);

  // open: linha aberta (ou null); base: linha que a prévia mostra quando ninguém está "espiando".
  const [sel, setSel] = useState({ open: 0, base: 0 });
  const [peek, setPeek] = useState(null); // hover / foco numa linha (só muda a prévia)
  const shown = peek ?? sel.base;

  // A rolagem destas mudanças de altura é decidida aqui; a ancoragem automática do navegador
  // (overflow-anchor) deslocaria scrollY por conta própria e desalinharia o destino do Lenis.
  const holdAnchoring = (ms = 800) => {
    const el = document.documentElement;
    el.style.setProperty("overflow-anchor", "none");
    window.clearTimeout(anchorTimer.current);
    anchorTimer.current = window.setTimeout(() => el.style.removeProperty("overflow-anchor"), ms);
  };

  useEffect(
    () => () => {
      window.clearTimeout(anchorTimer.current);
      document.documentElement.style.removeProperty("overflow-anchor");
    },
    []
  );

  /* ---- hash: #idx-row-N abre a linha (carga inicial e hashchange) ---- */
  useIsoLayoutEffect(() => {
    const apply = (e) => {
      const idx = rowFromHash(window.location.hash);
      if (idx == null || idx >= count) return;
      const root = rootRef.current;
      if (root) {
        // abertura imediata (sem transição) para a rolagem já calcular o destino final
        root.dataset.instant = "1";
        window.clearTimeout(instantTimer.current);
        instantTimer.current = window.setTimeout(() => {
          if (root) delete root.dataset.instant;
        }, 120);
      }
      holdAnchoring();
      const set = () => setSel({ open: idx, base: idx });
      if (e && e.isTrusted === false) {
        // vindo de scrollToHash(): quem chamou rola logo em seguida, então o DOM precisa estar final agora
        flushSync(set);
      } else {
        pendingScroll.current = idx; // navegação nativa: corrige a posição depois do commit
        set();
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => {
      window.removeEventListener("hashchange", apply);
      window.clearTimeout(instantTimer.current);
    };
  }, [count]);

  useIsoLayoutEffect(() => {
    const idx = pendingScroll.current;
    if (idx == null) return;
    pendingScroll.current = null;
    const el = document.getElementById(`idx-row-${idx + 1}`);
    if (el) el.scrollIntoView({ block: "start" });
  }, [sel]);

  /* ---- prévia: wipe direcional do clip-path + contador que rola ---- */
  useGSAP(
    () => {
      const slides = slideRefs.current;
      const inners = innerRefs.current;
      const nums = numRefs.current;
      const names = nameRefs.current;
      if (!slides.length || slides.some((s) => !s)) return undefined;

      const settle = (idx) => {
        visibleRef.current = idx;
        slides.forEach((s, i) => gsap.set(s, { clipPath: i === idx ? FULL : HIDDEN, zIndex: i === idx ? 2 : 1 }));
        inners.forEach((el) => gsap.set(el, { scale: 1 }));
        nums.forEach((el, i) => gsap.set(el, { y: 0, yPercent: i === idx ? 0 : 100 }));
        names.forEach((el, i) => gsap.set(el, { y: 0, yPercent: i === idx ? 0 : 100 }));
      };

      // conclui qualquer transição pendente para partir de um estado conhecido
      if (settleRef.current) settleRef.current();

      const from = visibleRef.current;
      const to = shown;
      if (from === to) {
        settle(to);
        return undefined;
      }

      const frame = frameRef.current;
      const onScreen = !!frame && frame.getClientRects().length > 0;
      const root = rootRef.current;
      if (prefersReduced() || !onScreen || (root && root.dataset.instant)) {
        settle(to);
        return undefined;
      }

      const dir = to > from ? 1 : -1; // descendo a lista: entra de baixo; subindo: entra de cima
      gsap.set(slides, { zIndex: 1 });
      gsap.set(slides[from], { zIndex: 2 });
      gsap.set(slides[to], { zIndex: 3, clipPath: dir > 0 ? HIDDEN : "inset(0% 0% 100% 0%)" });
      gsap.set(inners[to], { scale: 1.06 });
      gsap.set(nums[to], { y: 0, yPercent: dir * 100 });
      gsap.set(names[to], { y: 0, yPercent: dir * 100 });

      const tl = gsap.timeline({
        onComplete: () => {
          settleRef.current = null;
          settle(to);
        },
      });
      tl.to(slides[to], { clipPath: FULL, duration: 0.55, ease: "ess.inOut" }, 0)
        .to(inners[to], { scale: 1, duration: 0.9, ease: "ess.out" }, 0)
        .to(nums[to], { yPercent: 0, duration: 0.3, ease: "ess.out" }, 0)
        .to(nums[from], { yPercent: -dir * 100, duration: 0.3, ease: "ess.out" }, 0)
        .to(names[to], { yPercent: 0, duration: 0.3, ease: "ess.out" }, 0)
        .to(names[from], { yPercent: -dir * 100, duration: 0.3, ease: "ess.out" }, 0);
      settleRef.current = () => {
        tl.kill();
        settleRef.current = null;
        settle(to);
      };

      return () => {
        // desmontagem / ciclo do Strict Mode: o contexto reverte os estilos inline
        settleRef.current = null;
        visibleRef.current = 0;
      };
    },
    { scope: rootRef, dependencies: [shown] }
  );

  /* ---- interação ---- */
  const toggle = (i, btn) => {
    const opening = sel.open !== i;
    holdAnchoring();
    if (opening) {
      // se o cabeçalho da linha ficar acima da dobra depois que a linha anterior fechar, leva-o ao topo
      const li = btn.closest("li");
      const header = document.querySelector(".site-header");
      const desktop = window.innerWidth >= 1024;
      const topOffset = (desktop && header ? header.offsetHeight : 0) + 16;
      let top = li.getBoundingClientRect().top;
      if (sel.open != null && sel.open < i) {
        const prev = document.getElementById(`idx-panel-${sel.open + 1}`);
        if (prev) top -= prev.getBoundingClientRect().height;
      }
      const delta = top - topOffset;
      if (delta < -1) {
        const lenis = window.__essLenis;
        if (prefersReduced()) window.scrollBy({ top: delta, behavior: "auto" });
        else if (lenis) lenis.scrollTo(window.scrollY + delta, { duration: 0.6 });
        else window.scrollBy({ top: delta, behavior: "smooth" });
      }
    }
    setSel(opening ? { open: i, base: i } : { open: null, base: i });
  };

  const focusedIdx = () => {
    const a = document.activeElement;
    const li = a && listRef.current && listRef.current.contains(a) ? a.closest("li[data-idx]") : null;
    return li ? Number(li.dataset.idx) : null;
  };

  const onKeyDown = (e) => {
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    const btns = Array.from(listRef.current.querySelectorAll("button[data-idx]"));
    const cur = btns.indexOf(document.activeElement);
    if (cur < 0) return;
    e.preventDefault();
    let next = cur;
    if (e.key === "Home") next = 0;
    else if (e.key === "End") next = btns.length - 1;
    else next = (cur + (e.key === "ArrowDown" ? 1 : -1) + btns.length) % btns.length;
    btns[next].focus();
  };

  return (
    <div className="tratamentos__index grid" ref={rootRef}>
      <ol
        className="tratamentos__rows"
        role="list"
        ref={listRef}
        onKeyDown={onKeyDown}
        onFocus={(e) => {
          const li = e.target.closest && e.target.closest("li[data-idx]");
          if (li) setPeek(Number(li.dataset.idx));
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setPeek(null);
        }}
        onPointerLeave={() => setPeek(focusedIdx())}
      >
        {services.map((s, i) => {
          const n = i + 1;
          const isOpen = sel.open === i;
          return (
            <li
              key={s.id}
              id={`idx-row-${n}`}
              className="tratamentos__row"
              data-idx={i}
              data-open={isOpen ? "true" : "false"}
              data-reveal="hairline"
              style={{ "--i": i }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "touch") setPeek(i);
              }}
            >
              <h3 className="tratamentos__h">
                <button
                  type="button"
                  id={`idx-btn-${n}`}
                  data-idx={i}
                  className="tratamentos__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`idx-panel-${n}`}
                  onClick={(e) => toggle(i, e.currentTarget)}
                >
                  <span className="tratamentos__num tnum" aria-hidden="true">{pad2(n)}</span>
                  <span className="tratamentos__name" id={`idx-name-${n}`}>{s.title}</span>
                  <span className="tratamentos__eyebrow">{s.eyebrow}</span>
                  <span className="tratamentos__toggle" aria-hidden="true" />
                </button>
              </h3>
              <div
                id={`idx-panel-${n}`}
                role={isOpen ? "region" : undefined}
                aria-labelledby={isOpen ? `idx-name-${n}` : undefined}
                className="tratamentos__panel"
              >
                <div className="tratamentos__panel-inner">
                  <div className="tratamentos__panel-body">
                    <div className="tratamentos__figure">
                      <Picture
                        name={s.image.name}
                        widths={s.image.widths}
                        sizes="(min-width: 768px) 340px, calc(100vw - 40px)"
                        alt={s.alt}
                        width={s.image.width}
                        height={s.image.height}
                      />
                    </div>
                    <p className="tratamentos__desc">{s.description}</p>
                    <ul className="tratamentos__list" role="list" aria-label={`Serviços de ${s.title}`}>
                      {s.items.map((it) => (
                        <li key={it}>{it}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="tratamentos__preview">
        <div className="tratamentos__frame" ref={frameRef} data-reveal="frame">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="tratamentos__slide"
              aria-hidden={i === sel.base ? undefined : "true"}
              ref={(el) => (slideRefs.current[i] = el)}
            >
              <div className="tratamentos__slide-inner" ref={(el) => (innerRefs.current[i] = el)}>
                <Picture
                  name={s.image.name}
                  widths={s.image.widths}
                  sizes="(min-width: 1440px) 563px, 42vw"
                  alt={s.alt}
                  width={s.image.width}
                  height={s.image.height}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="tratamentos__caption tnum" aria-hidden="true">
          <span className="tratamentos__count">
            <span className="tratamentos__roll tratamentos__roll--num">
              {services.map((s, i) => (
                <span key={s.id} ref={(el) => (numRefs.current[i] = el)}>{pad2(i + 1)}</span>
              ))}
            </span>
            <span>/ {pad2(count)}</span>
          </span>
          <span className="tratamentos__roll tratamentos__roll--name">
            {services.map((s, i) => (
              <span key={s.id} ref={(el) => (nameRefs.current[i] = el)}>{s.title}</span>
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
