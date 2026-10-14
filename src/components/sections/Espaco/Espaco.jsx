import Picture from "@/components/ui/Picture";
import WaButton from "@/components/ui/WaButton";
import { ArrowDown } from "@/components/ui/Icon";
import FitText from "@/components/motion/FitText";
import EspacoMotion from "./EspacoMotion";
import "./Espaco.css";

// Jornada: recepção → consulta odontológica → cuidado estético → exame cardiológico.
// width/height = tamanho intrínseco da MENOR largura listada (só a proporção importa).
const JOURNEY = [
  { name: "esp-recepcao", widths: [420, 630], width: 420, height: 560, alt: "Imagem conceitual de recepção de clínica em tons claros" },
  { name: "esp-odontologia", widths: [458, 687], width: 458, height: 611, alt: "Consulta odontológica em ambiente acolhedor" },
  { name: "esp-cuidado", widths: [480, 670], width: 480, height: 640, alt: "Paciente recebendo cuidado estético facial em ambiente clínico" },
  { name: "esp-exame", widths: [480, 560], width: 480, height: 640, alt: "Paciente realizando exame cardiológico com acompanhamento profissional" },
];

const PANO_ALT = "Imagem conceitual de uma clínica multidisciplinar acolhedora";

// Espaço: interlúdio noturno (gallery-callout + cta-window-essenciale).
// Movimento A: faixa da jornada. Movimento B: "Essenciale" sobre o horizonte + panorama.
export default function Espaco() {
  return (
    <EspacoMotion
      id="espaco"
      data-surface="dark"
      aria-labelledby="gallery-clinic-title"
      className="espaco surface-night chapter--tight-bottom"
    >
      <div className="wrap">
        {/* Movimento A */}
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__label">Multi</span>
          <span className="espaco__sub">Especialidades conectadas</span>
        </div>

        <div className="espaco__intro grid">
          <h2 id="gallery-clinic-title" className="espaco__statement" data-reveal="line">
            Diferentes especialidades conectadas em uma jornada de cuidado mais simples, da recepção ao acompanhamento.
          </h2>
          <div className="espaco__aside">
            <p className="espaco__note" data-reveal="fade">Imagens conceituais de ambientação e atendimentos.</p>
            <div data-reveal="fade" style={{ "--i": 1 }}>
              <a className="link espaco__link" href="#contato">
                <span>Conhecer a localização</span>
                <ArrowDown />
              </a>
            </div>
          </div>
        </div>

        <ol className="espaco__strip grid">
          {JOURNEY.map((img, i) => (
            <li className="espaco__item" key={img.name} data-journey>
              <figure className="espaco__fig">
                <div className="espaco__frame" data-frame>
                  <Picture
                    name={img.name}
                    widths={img.widths}
                    sizes="(min-width: 1600px) 366px, (min-width: 768px) 25vw, 50vw"
                    width={img.width}
                    height={img.height}
                    alt={img.alt}
                    className="espaco__img"
                  />
                </div>
                {/* legenda visível repete o alt; aria-hidden para leitores de tela ouvirem só uma vez */}
                <figcaption className="espaco__figcap" aria-hidden="true">
                  <span className="espaco__rule" data-rule />
                  <span className="espaco__meta" data-meta>
                    <span className="espaco__idx tnum">{String(i + 1).padStart(2, "0")}</span>
                    <span className="espaco__cap">{img.alt}</span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        {/* Movimento B */}
        <div className="espaco__horizon" data-horizon>
          <div className="espaco__fit">
            <FitText as="h2" className="serif espaco__word" data-word>Essenciale</FitText>
          </div>
        </div>

        <div className="espaco__pano" data-pano>
          <div className="espaco__pano-m">
            <Picture
              name="esp-panorama-m"
              widths={[560, 753]}
              sizes="calc(100vw - 40px)"
              width={560}
              height={700}
              alt={PANO_ALT}
              className="espaco__img"
            />
          </div>
          <div className="espaco__pano-d">
            <Picture
              name="esp-panorama"
              widths={[1000, 1672]}
              sizes="(min-width: 1600px) 1506px, calc(100vw - 60px)"
              width={1000}
              height={429}
              alt={PANO_ALT}
              className="espaco__img"
            />
          </div>
        </div>

        <div className="espaco__caption grid">
          <h3 className="espaco__cap-title" data-reveal="fade">Saúde e estética em um só lugar</h3>
          <p className="espaco__label" data-reveal="fade" style={{ "--i": 1 }}>Imagem conceitual de ambientação</p>
          <p className="espaco__desc" data-reveal="fade" style={{ "--i": 2 }}>
            Odontologia, estética, exames, consultas e suporte multidisciplinar com atendimento próximo em Morada Nova.
          </p>
          <div className="espaco__cta" data-reveal="fade" style={{ "--i": 3 }}>
            <WaButton>Agendar pelo WhatsApp</WaButton>
          </div>
        </div>
      </div>
    </EspacoMotion>
  );
}
