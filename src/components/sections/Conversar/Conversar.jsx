import Picture from "@/components/ui/Picture";
import WaButton from "@/components/ui/WaButton";
import ConversarMotion from "./ConversarMotion";
import "./Conversar.css";

// Arcos da marca em volta da elipse inicial da abertura (D3 §13): viewBox na proporção do painel (0.93),
// elipse centrada, rx = 30% + 26 u, ry = 34% + 26 u. Café 180°→340° (por cima), caramelo 0°→160° (por baixo).
const ARC_COFFEE = "M160 500A305 366 0 0 1 751.6 374.8";
const ARC_CARAMEL = "M770 500A305 366 0 0 1 178.4 625.2";

// Fechamento: a abertura (oval) se abre com o scroll. Noite; cantos superiores 24px junto ao FAQ.
export default function Conversar() {
  return (
    <ConversarMotion
      id="conversar"
      data-surface="dark"
      aria-labelledby="conversar-title"
      className="conversar surface-night"
    >
      <div className="wrap">
        <div className="conversar__grid grid">
          <h2 id="conversar-title" className="serif conversar__title" data-reveal="line">
            Vamos conversar?
          </h2>

          <div className="conversar__panel" data-panel>
            <div className="conversar__aperture" data-aperture>
              <Picture
                name="conv-final"
                widths={[600, 866]}
                sizes="(min-width: 1600px) 750px, (min-width: 1024px) 50vw, calc(100vw - 40px)"
                width={600}
                height={644}
                alt="Consulta entre paciente e profissional de saúde em ambiente acolhedor"
                className="conversar__img"
              />
            </div>
            <svg className="conversar__arcs" viewBox="0 0 930 1000" aria-hidden="true" focusable="false" data-arcs>
              <path className="conversar__arc conversar__arc--coffee" d={ARC_COFFEE} data-arc />
              <path className="conversar__arc conversar__arc--caramel" d={ARC_CARAMEL} data-arc />
            </svg>
          </div>

          <div className="conversar__text">
            <h3 className="conversar__lead" data-reveal="fade">Seu cuidado começa com uma avaliação</h3>
            <p className="conversar__p" data-reveal="fade" style={{ "--i": 1 }}>
              Converse com a equipe da Essenciale e consulte horários, procedimentos e formas de pagamento.
            </p>
            <div data-reveal="fade" style={{ "--i": 2 }}>
              <WaButton className="conversar__btn">Falar pelo WhatsApp</WaButton>
            </div>
          </div>
        </div>
      </div>
    </ConversarMotion>
  );
}
