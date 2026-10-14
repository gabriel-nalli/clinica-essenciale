"use client";
// §9.8 — O instrumento: comparador antes/depois baseado em <input type="range"> + @property --pos.
// A posição vive só em CSS (--pos no <figure>), nunca em estado do React: arrastar não re-renderiza.
import { useCallback, useRef } from "react";
import Picture from "@/components/ui/Picture";
import { gsap, useGSAP } from "@/lib/gsap";

const TICKS = Array.from({ length: 11 }, (_, i) => i * 10); // 0–100 de 10 em 10
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const SIZES = "(min-width: 1024px) 40vw, (min-width: 768px) 460px, 84vw";

export default function CompareInstrument({ title }) {
  const rootRef = useRef(null);
  const figRef = useRef(null);
  const stageRef = useRef(null);
  const inputRef = useRef(null);
  const nudgeRef = useRef(null); // timeline do nudge (ou null)
  const touchedRef = useRef(false); // qualquer input do usuário cancela o nudge
  const dragRef = useRef({ id: null, mode: null, sx: 0, sy: 0, off: 0, moved: false });

  // Escreve a posição (0–100) no <figure> e espelha no input (teclado/leitor de tela).
  const write = useCallback((v) => {
    const fig = figRef.current;
    const input = inputRef.current;
    if (!fig || !input) return;
    fig.style.setProperty("--pos", String(v));
    input.value = String(Math.round(v));
  }, []);

  const cancelNudge = useCallback(() => {
    touchedRef.current = true;
    if (nudgeRef.current) {
      nudgeRef.current.kill();
      nudgeRef.current = null;
    }
    figRef.current?.classList.remove("is-nudging");
  }, []);

  const currentPos = () => {
    const fig = figRef.current;
    const v = fig ? parseFloat(getComputedStyle(fig).getPropertyValue("--pos")) : 50;
    return Number.isFinite(v) ? v : 50;
  };

  const posFromX = (clientX, off = 0) => {
    const r = stageRef.current.getBoundingClientRect();
    return clamp(((clientX + off - r.left) / r.width) * 100, 0, 100);
  };

  // ---- ponteiro ----------------------------------------------------------
  // Mouse/caneta: arrasta em qualquer lugar do quadro.
  // Toque: só o botão (knob) arrasta; no resto do quadro um toque (<6px) define a posição,
  // e o gesto de rolagem continua livre (horizontal = trilho, vertical = página).
  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    cancelNudge();
    const d = dragRef.current;
    const knob = e.target.closest ? e.target.closest(".cmp__knob") : null;
    d.id = e.pointerId;
    d.sx = e.clientX;
    d.sy = e.clientY;
    d.moved = false;
    d.off = 0;

    if (e.pointerType === "touch" && !knob) {
      d.mode = "tap";
      return;
    }
    d.mode = "drag";
    if (knob) {
      // mantém o ponto de pegada: sem salto ao tocar fora do centro
      const r = stageRef.current.getBoundingClientRect();
      d.off = r.left + (currentPos() / 100) * r.width - e.clientX;
    } else {
      write(posFromX(e.clientX)); // salto animado pela transição de --pos
    }
    try {
      stageRef.current.setPointerCapture(e.pointerId);
    } catch {}
  };

  const onPointerMove = (e) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId || d.mode !== "drag") return;
    if (!d.moved) {
      if (Math.abs(e.clientX - d.sx) < 2) return;
      d.moved = true;
      figRef.current?.classList.add("is-dragging"); // sem transição enquanto arrasta
    }
    write(posFromX(e.clientX, d.off));
  };

  const endPointer = (e) => {
    const d = dragRef.current;
    if (d.id !== e.pointerId) return;
    if (
      d.mode === "tap" &&
      e.type === "pointerup" &&
      Math.abs(e.clientX - d.sx) < 6 &&
      Math.abs(e.clientY - d.sy) < 6
    ) {
      write(posFromX(e.clientX));
    }
    figRef.current?.classList.remove("is-dragging");
    // teclado continua de onde o ponteiro parou (o foco do mousedown já passou neste ponto)
    if (e.type === "pointerup" && e.pointerType !== "touch" && inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
    d.id = null;
    d.mode = null;
  };

  // "Antes" → 100 (tudo antes) · "Depois" → 0 (tudo depois)
  const stop = (v) => {
    cancelNudge();
    write(v);
  };

  // ---- nudge de ensino: uma vez, quando o instrumento está 60% visível ----
  useGSAP(
    () => {
      const fig = figRef.current;
      if (!fig) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let io = null;
        let wait = null;
        const play = () => {
          if (touchedRef.current) return;
          const o = { v: 50 };
          fig.classList.add("is-nudging");
          nudgeRef.current = gsap
            .timeline({
              defaults: { ease: "ess.inOut" },
              onUpdate: () => write(o.v),
              onComplete: () => {
                fig.classList.remove("is-nudging");
                nudgeRef.current = null;
              },
            })
            .to(o, { v: 32, duration: 0.4 })
            .to(o, { v: 68, duration: 0.8 })
            .to(o, { v: 50, duration: 0.4 }); // 1,6 s no total
        };
        io = new IntersectionObserver(
          (entries) => {
            if (entries.some((en) => en.isIntersecting && en.intersectionRatio >= 0.6)) {
              io.disconnect();
              wait = gsap.delayedCall(1.3, play); // depois das molduras, dos arcos e das réguas
            }
          },
          { threshold: [0.6] }
        );
        io.observe(fig);
        return () => {
          io && io.disconnect();
          wait && wait.kill();
          if (nudgeRef.current) {
            nudgeRef.current.kill();
            nudgeRef.current = null;
          }
          fig.classList.remove("is-nudging");
        };
      });
      return () => mm.revert();
    },
    { scope: rootRef }
  );

  return (
    <div className="cmp-root" ref={rootRef}>
      <figure
        className="cmp"
        ref={figRef}
        style={{ "--pos": 50 }}
        onKeyDown={cancelNudge}
      >
        <div className="cmp__stops">
          <button type="button" className="cmp__stop" onClick={() => stop(100)}>
            Antes
          </button>
          <button type="button" className="cmp__stop" onClick={() => stop(0)}>
            Depois
          </button>
        </div>

        <div
          className="cmp__stage"
          ref={stageRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endPointer}
          onPointerCancel={endPointer}
        >
          <div className="cmp__frame" data-reveal="frame">
            <Picture
              name="cmp-depois"
              widths={[480, 720]}
              sizes={SIZES}
              alt="Depois do procedimento labial realizado na Clínica Essenciale"
              width={480}
              height={600}
              className="cmp__img"
              draggable={false}
            />
            <div className="cmp__before">
              <Picture
                name="cmp-antes"
                widths={[480, 720]}
                sizes={SIZES}
                alt="Antes do procedimento labial realizado na Clínica Essenciale"
                width={480}
                height={600}
                className="cmp__img"
                draggable={false}
              />
            </div>
            <span className="cmp__divider" aria-hidden="true" />
          </div>

          <span className="cmp__knob" data-reveal="fade" style={{ "--i": 3 }} aria-hidden="true">
            <span className="cmp__ell">↔</span>
          </span>

          <svg
            className="arcs cmp__arc cmp__arc--tl"
            data-reveal="arcs"
            viewBox="0 0 28 28"
            width="28"
            height="28"
            aria-hidden="true"
            focusable="false"
          >
            <path className="arc-coffee" pathLength="1" d="M0 28A28 28 0 0 1 28 0" />
          </svg>
          <svg
            className="arcs cmp__arc cmp__arc--br"
            data-reveal="arcs"
            viewBox="0 0 28 28"
            width="28"
            height="28"
            aria-hidden="true"
            focusable="false"
          >
            <path className="arc-caramel" pathLength="1" d="M28 0A28 28 0 0 1 0 28" />
          </svg>

          <input
            ref={inputRef}
            className="sr-only cmp__range"
            type="range"
            min="0"
            max="100"
            step="1"
            defaultValue="50"
            aria-label="Comparar imagem antes e depois"
            onChange={(e) => {
              cancelNudge();
              write(Number(e.target.value));
            }}
          />
        </div>

        <div className="cmp__scale" aria-hidden="true">
          {TICKS.map((t, i) => (
            <i
              key={t}
              className={t % 50 === 0 ? "cmp__tick cmp__tick--major" : "cmp__tick"}
              style={{ left: `${t}%`, "--i": i }}
              data-reveal="fade"
            />
          ))}
          <i className="cmp__tri" />
        </div>

        <figcaption className="res__cap" data-reveal="fade">
          <span className="res__cap-title">{title}</span>
          <span className="res__count tnum" aria-hidden="true">01 / 02</span>
        </figcaption>
      </figure>
    </div>
  );
}
