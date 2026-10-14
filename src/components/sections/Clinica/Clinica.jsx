import "./Clinica.css";
import { ArrowDownRight } from "@/components/ui/Icon";

// Cópia verbatim de copyMap.json → "clinica".
const COPY = {
  label: "Por que Essenciale",
  manifesto:
    "A Essenciale reúne diferentes especialidades para tornar o cuidado mais próximo, coordenado e tranquilo",
  clause: "— da saúde ao bem-estar.",
  why: "Escuta, avaliação e orientação clara em cada etapa. Você encontra diferentes possibilidades de atendimento sem abrir mão de uma experiência humana e individual.",
};

// As 7 tags viram links reais. Destinos (D3 §9.5): linhas do índice (#idx-row-N) e pergunta 03 do FAQ (#faq-3).
// Sem JS ainda caem na seção certa: os ids pertencem a #tratamentos e #duvidas.
const SCOPE = [
  { label: "Odontologia", href: "#idx-row-1" },
  { label: "Estética avançada", href: "#idx-row-2" },
  { label: "Consultas médicas", href: "#idx-row-4" },
  { label: "Exames", href: "#idx-row-4" },
  { label: "Home care", href: "#idx-row-4" },
  { label: "Cartões-presente", href: "#idx-row-4" },
  { label: "Até 10x", href: "#faq-3" },
];

export default function Clinica() {
  return (
    <section id="clinica" className="clinica chapter surface-paper" data-surface="light" aria-labelledby="clinica-title">
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">02</span>
          <span className="head-bar__label">{COPY.label}</span>
        </div>

        <div className="grid clinica__grid">
          <h2 id="clinica-title" className="clinica__title" data-reveal="line">
            {COPY.manifesto} <span className="serif">{COPY.clause}</span>
          </h2>

          <p className="clinica__why" data-reveal="fade">{COPY.why}</p>

          <ul className="clinica__scope">
            {SCOPE.map((t, i) => (
              <li key={t.label} data-reveal="fade" style={{ "--i": i }}>
                <a className="clinica__link" href={t.href}>
                  <span className="clinica__label">{t.label}</span>
                  <ArrowDownRight className="clinica__cue" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
