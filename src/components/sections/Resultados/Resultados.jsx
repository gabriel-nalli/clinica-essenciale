import "./Resultados.css";
import { results } from "@/data/clinicData";
import Picture from "@/components/ui/Picture";
import WaButton from "@/components/ui/WaButton";
import CompareInstrument from "./CompareInstrument";
import TrackControls from "./TrackControls";

// §9.8 — "O instrumento": comparador antes/depois como ferramenta de medição.
// Server component; ilhas client: <CompareInstrument/> (slider) e <TrackControls/> (prev/next).
const TRACK_ID = "resultados-trilho";

export default function Resultados() {
  const [compare, second] = results;

  return (
    <section
      id="resultados"
      data-surface="light"
      className="res surface-blush chapter"
      aria-labelledby="resultados-title"
    >
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">04</span>
          <span className="head-bar__label">Resultados reais</span>
        </div>

        <div className="res__head grid">
          <h2 id="resultados-title" className="res__title" data-reveal="line">
            Resultados que falam por si.
          </h2>
          <p className="res__intro" data-reveal="fade">
            Arraste o controle para comparar. As imagens foram preservadas sem alteração do resultado apresentado.
          </p>
        </div>

        <div className="res__media">
          <div id={TRACK_ID} className="res__track">
            <div className="res__slide res__slide--cmp">
              <CompareInstrument title={compare.title} />
            </div>

            <figure className="res__slide res__slide--single">
              <div className="res__frame-wrap">
                <div className="res__frame" data-reveal="frame" style={{ "--i": 1 }}>
                  <Picture
                    name="res-02"
                    widths={[582, 874]}
                    sizes="(min-width: 1024px) 32vw, (min-width: 768px) 460px, 84vw"
                    alt="Registro real de antes e depois de procedimento labial"
                    width={582}
                    height={730}
                    className="res__img"
                    draggable={false}
                  />
                </div>
                <svg
                  className="arcs res__arc res__arc--tl"
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
                  className="arcs res__arc res__arc--br"
                  data-reveal="arcs"
                  viewBox="0 0 28 28"
                  width="28"
                  height="28"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path className="arc-caramel" pathLength="1" d="M28 0A28 28 0 0 1 0 28" />
                </svg>
              </div>
              <figcaption className="res__cap" data-reveal="fade">
                <span className="res__cap-title">{second.title}</span>
                <span className="res__count tnum" aria-hidden="true">02 / 02</span>
              </figcaption>
            </figure>
          </div>

          <div className="res__aside">
            <TrackControls trackId={TRACK_ID} />
            <p className="res__disc" data-reveal="fade">
              Resultados individuais podem variar. A indicação de cada procedimento depende de avaliação profissional.
            </p>
            <div className="res__cta">
              <WaButton>Agendar avaliação</WaButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
