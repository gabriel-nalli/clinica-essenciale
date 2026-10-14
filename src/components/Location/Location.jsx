import { clinic } from "@/data/clinicData";
import AnimatedButton from "@/components/AnimatedButton/AnimatedButton";
import Copy from "@/components/Copy/Copy";
import "./Location.css";

export default function Location() {
  return (
    <section className="location-section" id="contato">
      <div className="container location-grid">
        <div className="location-card">
          <Copy delay={0.1}>
            <p className="mono">Morada Nova • Ceará</p>
          </Copy>
          <Copy delay={0.15}>
            <h2>Fácil de encontrar. Perto de você.</h2>
          </Copy>
          <p className="location-landmark">{clinic.address.landmark}</p>
          <address>
            {clinic.address.street}<br />
            {clinic.address.city}<br />
            {clinic.address.zip}
          </address>
          <div className="location-meta">
            <a href={clinic.phoneHref}>{clinic.phone}</a>
            <p>{clinic.hours}</p>
          </div>
          <AnimatedButton label="Como chegar" route={clinic.mapUrl} />
        </div>
        <div className="location-map">
          <iframe
            src={clinic.mapEmbed}
            title="Mapa com a localização da Clínica Essenciale"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="location-pin" aria-hidden="true">
            <img src="/images/essenciale/generated/essenciale-mark.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}
