import "./Equipe.css";
import { team } from "@/data/clinicData";
import Picture from "@/components/ui/Picture";

// §9.9 — As fichas profissionais: três cartões iguais, credenciais como linhas de dado.
// Server component, sem ilhas client: toda a animação vem de data-reveal (RevealController).
// Retratos T0 (reais): nenhum filtro, máscara decorativa ou grão.

// Derivados de retrato (3:4). width/height = menor largura listada.
const PORTRAITS = {
  "lara-rabelo": { name: "team-lara", widths: [330, 495], width: 330, height: 440 },
  "daynara-elen": { name: "team-daynara", widths: [258, 387], width: 258, height: 344 },
  "aline-borges": { name: "team-aline", widths: [400, 520, 780], width: 400, height: 533 },
};

const SIZES = "(min-width: 1024px) 31vw, (min-width: 768px) 220px, 148px";
const pad = (n) => String(n).padStart(2, "0");

export default function Equipe() {
  const total = pad(team.length);

  return (
    <section
      id="especialistas"
      data-surface="light"
      className="eq surface-paper chapter chapter--tight-bottom"
      aria-labelledby="especialistas-title"
    >
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">05</span>
          <span className="head-bar__label">Equipe Essenciale</span>
        </div>

        <div className="eq__head grid">
          <h2 id="especialistas-title" className="eq__title" data-reveal="line">
            Cuidado conduzido por quem entende de você.
          </h2>
          <p className="eq__intro" data-reveal="fade">
            Três profissionais, diferentes olhares e uma mesma forma de cuidar: com escuta, técnica e atenção ao que faz sentido para cada pessoa.
          </p>
        </div>

        <div className="eq__cards grid">
          {team.map((person, i) => {
            const img = PORTRAITS[person.id];
            const credentials = person.specialties.split(" • ");
            return (
              <article className="eq-card" key={person.id}>
                <figure className="eq-card__portrait">
                  <div className="eq-card__frame" data-reveal="frame" style={{ "--i": i }}>
                    <Picture
                      name={img.name}
                      widths={img.widths}
                      sizes={SIZES}
                      alt={person.alt}
                      width={img.width}
                      height={img.height}
                      className="eq-card__img"
                    />
                  </div>
                  <svg
                    className="arcs eq-card__arc eq-card__arc--tl"
                    data-reveal="arcs"
                    style={{ "--i": i }}
                    viewBox="0 0 28 28"
                    width="28"
                    height="28"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path className="arc-coffee" pathLength="1" d="M0 28A28 28 0 0 1 28 0" />
                  </svg>
                  <svg
                    className="arcs eq-card__arc eq-card__arc--br"
                    data-reveal="arcs"
                    style={{ "--i": i }}
                    viewBox="0 0 28 28"
                    width="28"
                    height="28"
                    aria-hidden="true"
                    focusable="false"
                  >
                    <path className="arc-caramel" pathLength="1" d="M28 0A28 28 0 0 1 0 28" />
                  </svg>
                  <figcaption className="eq-card__tab">
                    <span className="eq-card__tab-label">Equipe Essenciale</span>
                    <span className="eq-card__tab-name">{person.name}</span>
                  </figcaption>
                </figure>

                <div className="eq-card__id">
                  <div className="eq-card__meta">
                    <span className="eq-card__count tnum" aria-hidden="true">
                      {pad(i + 1)} / {total}
                    </span>
                    {i === 0 && <span className="eq-card__tag">{"CEO & fundadora"}</span>}
                  </div>
                  <h3 className="eq-card__name" data-reveal="line">{person.name}</h3>
                  <p className="eq-card__role">{person.role}</p>
                </div>

                <p className="eq-card__desc" data-reveal="fade">{person.description}</p>

                <ul className="eq-card__cred" aria-label={`Informações de ${person.name}`}>
                  {credentials.map((c, j) => (
                    <li key={c} data-reveal="fade" style={{ "--i": j }}>{c}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
