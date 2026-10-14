import "./Duvidas.css";
import { clinic, faq } from "@/data/clinicData";
import FaqHash from "./FaqHash";

// Envolve a primeira ocorrência de `phrase` em um link, sem alterar o texto.
function withLink(text, phrase, href) {
  const at = text.indexOf(phrase);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <a className="duvidas__link" href={href} target="_blank" rel="noopener noreferrer">{phrase}</a>
      {text.slice(at + phrase.length)}
    </>
  );
}

// Respostas 01 ("WhatsApp") e 04 ("R. Raul Nogueira, 63, Centro") têm palavras linkadas; o texto não muda.
const LINKS = {
  0: { phrase: "WhatsApp", href: clinic.whatsapp },
  3: { phrase: "R. Raul Nogueira, 63, Centro", href: clinic.mapUrl },
};

// §9.12 — cinco perguntas numeradas: <details name> exclusivos, ids faq-1..faq-5.
export default function Duvidas() {
  return (
    <section
      id="duvidas"
      className="duvidas surface-paper chapter"
      data-surface="light"
      aria-labelledby="duvidas-titulo"
    >
      <div className="wrap">
        <div className="head-bar" data-reveal="hairline">
          <span className="head-bar__num" aria-hidden="true">07</span>
          <span className="head-bar__label">Perguntas frequentes</span>
        </div>

        <div className="grid duvidas__grid">
          <h2 id="duvidas-titulo" className="duvidas__title" data-reveal="line">
            Informação também é cuidado.
          </h2>

          <div className="duvidas__list">
            {faq.map((item, i) => {
              const link = LINKS[i];
              return (
                <details
                  key={item.question}
                  id={`faq-${i + 1}`}
                  name="essenciale-faq"
                  className="duvidas__item"
                  data-reveal="hairline"
                  style={{ "--i": i }}
                >
                  <summary className="duvidas__summary">
                    <span className="duvidas__idx" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                    <span className="duvidas__q">{item.question}</span>
                    <span className="duvidas__plus" aria-hidden="true">+</span>
                  </summary>
                  <div className="duvidas__a">
                    <p>{link ? withLink(item.answer, link.phrase, link.href) : item.answer}</p>
                  </div>
                </details>
              );
            })}
          </div>
        </div>
      </div>
      <FaqHash />
    </section>
  );
}
