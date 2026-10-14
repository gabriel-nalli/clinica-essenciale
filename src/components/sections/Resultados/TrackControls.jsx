"use client";
// Controles da galeria (mobile/tablet): rolam o trilho com scroll-snap. Somem em lg+ (dois slides visíveis).
// Estado desabilitado nas pontas via aria-disabled (continua focável).
import { useEffect, useRef, useState } from "react";
import { Chevron } from "@/components/ui/Icon";

export default function TrackControls({ trackId }) {
  const trackRef = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const track = document.getElementById(trackId);
    if (!track) return undefined;
    trackRef.current = track;
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = track.scrollWidth - track.clientWidth;
      const start = track.scrollLeft <= 2;
      const end = max <= 2 || track.scrollLeft >= max - 2;
      setEdge((p) => (p.start === start && p.end === end ? p : { start, end }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(onScroll);
    ro.observe(track);
    return () => {
      track.removeEventListener("scroll", onScroll);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackId]);

  const go = (dir) => {
    const track = trackRef.current;
    const first = track && track.children[0];
    if (!first) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = first.getBoundingClientRect().width + gap;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="res__ctrl" role="group" aria-label="Controles da galeria">
      <button
        type="button"
        className="res__nav"
        aria-label="Resultado anterior"
        aria-controls={trackId}
        aria-disabled={edge.start ? "true" : "false"}
        onClick={() => !edge.start && go(-1)}
      >
        <Chevron dir="left" size={18} />
      </button>
      <button
        type="button"
        className="res__nav"
        aria-label="Próximo resultado"
        aria-controls={trackId}
        aria-disabled={edge.end ? "true" : "false"}
        onClick={() => !edge.end && go(1)}
      >
        <Chevron dir="right" size={18} />
      </button>
    </div>
  );
}
