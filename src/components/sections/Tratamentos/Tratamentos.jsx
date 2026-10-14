// Chapter 03 — "Índice" (tratamentos + treatments-cta fundidos como a última linha, a de ajuda).
// Server Component: cabeçalho, h2 e linha de ajuda. O acordeão + prévia vive em ServiceIndex (ilha cliente).
import "./Tratamentos.css";
import { serviceCategories } from "@/data/clinicData";
import WaButton from "@/components/ui/WaButton";
import ServiceIndex from "./ServiceIndex";

// Derivados 5:4 (spec §9.6). Largura/altura = tamanho intrínseco da menor largura listada.
const IMAGES = {
  odontologia: { name: "idx-odontologia", widths: [560, 1120], width: 560, height: 448 },
  estetica: { name: "idx-estetica", widths: [524, 786], width: 524, height: 419 },
  "bem-estar": { name: "idx-cuidado", widths: [560, 1120], width: 560, height: 448 },
  "saude-integrada": { name: "idx-saude", widths: [560, 1120], width: 560, height: 448 },
};

export default function Tratamentos() {
  const services = serviceCategories.map((c) => ({
    id: c.id,
    eyebrow: c.eyebrow,
    title: c.title,
    description: c.description,
    items: c.items,
    alt: c.alt,
    image: IMAGES[c.id],
  }));

  return (
    <section
      id="tratamentos"
      className="tratamentos surface-paper chapter chapter--tight-bottom"
      data-surface="light"
      aria-labelledby="tratamentos-titulo"
    >
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">03</span>
          <span className="head-bar__label">Principais tratamentos</span>
          <span className="head-bar__aside" aria-hidden="true">({String(services.length).padStart(2, "0")})</span>
        </div>

        <div className="grid">
          <h2 id="tratamentos-titulo" className="tratamentos__title" data-reveal="line">
            Cuidado completo, organizado ao redor de você.
          </h2>
        </div>

        <ServiceIndex services={services} />

        <div className="tratamentos__help surface-ivory" data-reveal="fade">
          <h3 className="tratamentos__help-text">
            Não sabe por onde começar? A equipe ajuda você a entender as possibilidades.
          </h3>
          <WaButton className="tratamentos__help-btn">Conversar com a equipe</WaButton>
        </div>
      </div>
    </section>
  );
}
