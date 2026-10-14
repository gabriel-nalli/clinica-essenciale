import { faq } from "@/data/clinicData";
import Copy from "@/components/Copy/Copy";
import "./FAQ.css";

export default function FAQ() {
  return (
    <section className="faq-section" id="duvidas">
      <div className="container faq-layout">
        <div className="faq-heading">
          <Copy delay={0.1}>
            <p className="mono">Perguntas frequentes</p>
          </Copy>
          <Copy delay={0.15}>
            <h2>Informação também é cuidado.</h2>
          </Copy>
        </div>
        <div className="faq-list">
          {faq.map((item, index) => (
            <details key={item.question} name="essenciale-faq">
              <summary>
                <span className="faq-index">0{index + 1}</span>
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden="true">+</span>
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
