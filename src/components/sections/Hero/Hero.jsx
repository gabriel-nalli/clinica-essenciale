import "./Hero.css";
import { highlights } from "@/data/clinicData";
import WaButton from "@/components/ui/WaButton";
import { ArrowDown } from "@/components/ui/Icon";
import HeroMotion from "./HeroMotion";

// Cópia verbatim de copyMap.json → "inicio".
const COPY = {
  alt: "Paciente em consulta acolhedora com profissional de saúde em clínica contemporânea",
  kicker: "Clínica de saúde & estética • Morada Nova",
  title: "Saúde, estética e confiança em cada detalhe.",
  tagline:
    "Cuidado completo em Morada Nova: odontologia, harmonização, estética, exames e atendimento multiespecialidades em um só lugar.",
  cta: "Agendar pelo WhatsApp",
  more: "Conhecer tratamentos",
  fichaTitle: "Diferenciais da clínica",
};

const DIR = "/images/essenciale/derived";
const srcSet = (name, widths, ext) => widths.map((w) => `${DIR}/${name}-${w}.${ext} ${w}w`).join(", ");
const OVAL_D = { name: "hero-oval-d", widths: [480, 687, 960] }; // lg+
const OVAL_M = { name: "hero-oval-m", widths: [480, 640, 900] }; // < lg
const SIZES_D = "(min-width: 1440px) 446px, 31vw";
const SIZES_M = "(min-width: 768px) 416px, calc(100vw - 2.5rem)";

// Arcos de registro da marca em torno da abertura (elipse quebrada: café por cima, caramelo por baixo).
// viewBox = caixa + 14 unidades por lado; caixa de 440 × 602,74 (razão 0,73). Raio = metade da viewBox.
// café: θ 180°→340°   caramelo: θ 0°→160° (lacunas no alto à direita e embaixo à esquerda, como na marca).
const ARC_COFFEE = "M0 315.37A234 315.37 0 0 1 453.88 207.5";
const ARC_CARAMEL = "M468 315.37A234 315.37 0 0 1 14.11 423.23";

export default function Hero() {
  return (
    <section id="inicio" className="hero surface-paper" data-surface="light" aria-labelledby="hero-title">
      <HeroMotion className="wrap hero__inner">
        <div className="hero__kicker hero__rule">
          <p className="hero__kicker-text hero__fx">{COPY.kicker}</p>
          <span className="hero__num hero__fx" aria-hidden="true">01</span>
        </div>

        <div className="hero__copy">
          <h1 id="hero-title" className="hero__title">{COPY.title}</h1>
          <p className="hero__tagline hero__fx">{COPY.tagline}</p>
          <div className="hero__actions hero__fx">
            <WaButton id="hero-cta">{COPY.cta}</WaButton>
            <a className="link hero__more" href="#tratamentos">
              <span>{COPY.more}</span>
              <ArrowDown />
            </a>
          </div>
        </div>

        <div className="hero__aperture">
          <div className="hero__oval">
            <div className="hero__depth" data-depth>
              <picture>
                <source media="(min-width: 1024px)" type="image/avif" srcSet={srcSet(OVAL_D.name, OVAL_D.widths, "avif")} sizes={SIZES_D} />
                <source media="(min-width: 1024px)" type="image/webp" srcSet={srcSet(OVAL_D.name, OVAL_D.widths, "webp")} sizes={SIZES_D} />
                <source type="image/avif" srcSet={srcSet(OVAL_M.name, OVAL_M.widths, "avif")} sizes={SIZES_M} />
                <source type="image/webp" srcSet={srcSet(OVAL_M.name, OVAL_M.widths, "webp")} sizes={SIZES_M} />
                <img
                  src={`${DIR}/${OVAL_M.name}-640.webp`}
                  alt={COPY.alt}
                  width={480}
                  height={654}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </picture>
            </div>
          </div>
          <svg className="arcs hero__arcs" viewBox="0 0 468 630.74" aria-hidden="true" focusable="false">
            <path className="arc-coffee" pathLength="1" d={ARC_COFFEE} />
            <path className="arc-caramel" pathLength="1" d={ARC_CARAMEL} />
          </svg>
        </div>

        <div className="hero__ficha">
          <p id="hero-ficha-title" className="hero__ficha-title hero__rule hero__fx">{COPY.fichaTitle}</p>
          <dl className="hero__ficha-list" aria-labelledby="hero-ficha-title">
            {highlights.map((h, i) => (
              <div className="hero__cell hero__rule" key={h.value} style={{ "--i": i }}>
                <dt className="hero__fx tnum">{h.value}</dt>
                <dd className="hero__fx">{h.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </HeroMotion>
    </section>
  );
}
