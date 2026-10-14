"use client";
import { useEffect, useRef, useState } from "react";

// Mapa com fachada: um placeholder sand + o pin (marca) aparecem de imediato; o src do iframe só é
// definido quando a seção está a até uma viewport de distância (economiza o JS do Maps para quem
// nunca chega aqui). O iframe fica filtrado (cinza/sépia) para combinar com a paleta.
const PIN = "/images/essenciale/generated/essenciale-mark.svg";

export default function MapEmbed({ src, title }) {
  const stageRef = useRef(null);
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }
    let io;
    try {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            setActive(true);
            io.disconnect();
          }
        },
        { rootMargin: "100% 0px 100% 0px" } // uma viewport acima/abaixo
      );
      io.observe(el);
    } catch {
      setActive(true);
    }
    return () => io && io.disconnect();
  }, []);

  return (
    <div className="contato__map" ref={stageRef}>
      {/* arcos de registro: café no canto superior esquerdo, caramelo no inferior direito */}
      <svg className="arcs contato__arc contato__arc--tl" data-reveal="hairline" aria-hidden="true" focusable="false" viewBox="0 0 28 28">
        <path className="arc-coffee" pathLength="1" d="M0 28A28 28 0 0 1 28 0" />
      </svg>
      <svg className="arcs contato__arc contato__arc--br" data-reveal="hairline" aria-hidden="true" focusable="false" viewBox="0 0 28 28">
        <path className="arc-caramel" pathLength="1" d="M28 0A28 28 0 0 1 0 28" />
      </svg>

      <div className="contato__frame" data-reveal="frame">
        <div className="contato__facade" aria-hidden="true" />
        <iframe
          className={`contato__iframe${loaded ? " is-loaded" : ""}`}
          title={title}
          src={active ? src : undefined}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => active && setLoaded(true)}
        />
        <noscript>
          <iframe className="contato__iframe is-loaded" title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </noscript>
      </div>

      <img className="contato__pin" src={PIN} alt="" aria-hidden="true" width="56" height="56" decoding="async" />
    </div>
  );
}
