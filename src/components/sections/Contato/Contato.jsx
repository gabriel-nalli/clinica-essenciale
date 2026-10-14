import "./Contato.css";
import { clinic } from "@/data/clinicData";
import { ArrowUpRight } from "@/components/ui/Icon";
import MapEmbed from "./MapEmbed";

// §9.11 — cartão de endereço (sand): ponto de referência primeiro, endereço como dado,
// telefone grande, nota de horários, "Como chegar" e o mapa (fachada + iframe adiado).
export default function Contato() {
  const { address } = clinic;
  return (
    <section
      id="contato"
      className="contato surface-sand chapter--tight"
      data-surface="light"
      aria-labelledby="contato-titulo"
    >
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">06</span>
          <span className="head-bar__label">Morada Nova • Ceará</span>
        </div>

        <div className="grid contato__grid">
          <h2 id="contato-titulo" className="contato__title" data-reveal="line">
            Fácil de encontrar. Perto de você.
          </h2>

          <div className="contato__info">
            <p className="contato__landmark" data-reveal="fade" style={{ "--i": 0 }}>
              {address.landmark}
            </p>

            <address className="contato__address" data-reveal="fade" style={{ "--i": 1 }}>
              <span className="contato__row">{address.street}</span>
              <span className="contato__row">{address.city}</span>
              <span className="contato__row">{address.zip}</span>
              <a className="contato__tel" href={clinic.phoneHref}>{clinic.phone}</a>
            </address>

            <p className="contato__hours" data-reveal="fade" style={{ "--i": 2 }}>
              {clinic.hours}
            </p>

            <div className="contato__cta" data-reveal="fade" style={{ "--i": 3 }}>
              <a
                className="btn btn--ghost contato__btn"
                href={clinic.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Como chegar</span>
                <ArrowUpRight />
              </a>
            </div>
          </div>

          <MapEmbed src={clinic.mapEmbed} title="Mapa com a localização da Clínica Essenciale" />
        </div>
      </div>
    </section>
  );
}
