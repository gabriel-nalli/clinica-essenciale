"use client";

import { useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import { clinic, results } from "@/data/clinicData";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import Copy from "@/components/Copy/Copy";
import "./ResultsShowcase.css";

export default function ResultsShowcase() {
  const [position, setPosition] = useState(50);
  const trackRef = useRef(null);

  const moveTrack = (direction) => {
    trackRef.current?.scrollBy({
      left: direction * trackRef.current.clientWidth * 0.82,
      behavior: "smooth",
    });
  };

  return (
    <section className="results-showcase" id="resultados">
      <div className="container results-heading">
        <div>
          <Copy delay={0.1}>
            <p className="mono">Resultados reais</p>
          </Copy>
          <Copy delay={0.15}>
            <h2>Resultados que falam por si.</h2>
          </Copy>
        </div>
        <Copy delay={0.2}>
          <p className="results-intro">
            Arraste o controle para comparar. As imagens foram preservadas sem
            alteração do resultado apresentado.
          </p>
        </Copy>
      </div>

      <div className="results-track" ref={trackRef}>
        <article className="result-slide comparison-slide">
          <div
            className="before-after"
            style={{ "--comparison-position": `${position}%` }}
          >
            <picture className="comparison-layer comparison-after">
              <source
                srcSet={results[0].after}
                type="image/webp"
              />
              <img
                src="/images/essenciale/originals/resultado-labial-depois.png"
                alt="Depois do procedimento labial realizado na Clínica Essenciale"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <picture className="comparison-layer comparison-before">
              <source
                srcSet={results[0].before}
                type="image/webp"
              />
              <img
                src="/images/essenciale/originals/resultado-labial-antes.png"
                alt="Antes do procedimento labial realizado na Clínica Essenciale"
                loading="lazy"
                decoding="async"
              />
            </picture>
            <span className="comparison-label label-before">Antes</span>
            <span className="comparison-label label-after">Depois</span>
            <div className="comparison-divider" aria-hidden="true">
              <span>↔</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={position}
              onChange={(event) => setPosition(Number(event.target.value))}
              aria-label="Comparar imagem antes e depois"
            />
          </div>
          <div className="result-caption">
            <h3>{results[0].title}</h3>
            <span>01 / 02</span>
          </div>
        </article>

        <article className="result-slide result-photo-slide">
          <picture>
            <source srcSet={results[1].image} type="image/webp" />
            <img
              src="/images/essenciale/originals/resultado-labial-01.png"
              alt="Registro real de antes e depois de procedimento labial"
              loading="lazy"
              decoding="async"
            />
          </picture>
          <div className="result-caption">
            <h3>{results[1].title}</h3>
            <span>02 / 02</span>
          </div>
        </article>
      </div>

      <div className="container results-footer">
        <p>
          Resultados individuais podem variar. A indicação de cada procedimento
          depende de avaliação profissional.
        </p>
        <div className="results-controls" role="group" aria-label="Controles da galeria">
          <button type="button" onClick={() => moveTrack(-1)} aria-label="Resultado anterior">
            <IoIosArrowBack />
          </button>
          <button type="button" onClick={() => moveTrack(1)} aria-label="Próximo resultado">
            <IoIosArrowForward />
          </button>
        </div>
        <AnimatedButton
          label="Agendar avaliação"
          route={clinic.whatsapp}
          animateOnScroll
        />
      </div>
    </section>
  );
}
