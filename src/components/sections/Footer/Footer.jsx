import "./Footer.css";
import { clinic } from "@/data/clinicData";
import FitText from "@/components/motion/FitText";
import { InstagramIcon, WhatsAppIcon, PinIcon } from "@/components/ui/Icon";
import Year from "./Year";

// Navegação do rodapé na ordem da página (textos do copyMap, hrefs das seções).
const NAV = [
  { href: "#inicio", label: "Início" },
  { href: "#clinica", label: "A clínica" },
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#resultados", label: "Resultados" },
  { href: "#especialistas", label: "Especialistas" },
  { href: "#contato", label: "Contato" },
];

// aria-labels do copyMap
const SOCIAL = [
  { label: "Instagram da Essenciale", href: clinic.instagram, Icon: InstagramIcon },
  { label: "WhatsApp da Essenciale", href: clinic.whatsapp, Icon: WhatsAppIcon },
  { label: "Localização da Essenciale", href: clinic.mapUrl, Icon: PinIcon },
];

// §9.14 — o cartão-índice: <footer> real fora de <main>, superfície night.
export default function Footer() {
  const { address } = clinic;
  return (
    <footer id="rodape" className="footer surface-night" data-surface="dark">
      <div className="wrap">
        <div className="footer__brand" data-reveal="fade">
          <img src="/images/essenciale/generated/essenciale-mark.svg" alt="" aria-hidden="true" width="36" height="36" decoding="async" />
          <p className="footer__name">Clínica Essenciale</p>
        </div>

        <div className="grid footer__top">
          <p className="footer__slogan" data-reveal="fade" style={{ "--i": 1 }}>
            Saúde, estética e confiança em cada detalhe.
          </p>
          <nav className="footer__nav" aria-label="Navegação do rodapé">
            <ul className="footer__navlist">
              {NAV.map((item, i) => (
                <li key={item.href} data-reveal="hairline" style={{ "--i": i }}>
                  <a className="footer__navlink" href={item.href}>{item.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid footer__mid">
          <address className="footer__address" data-reveal="fade">
            <span>{address.landmark}</span>
            <span>{address.street}</span>
            <span className="tnum">{address.city} • {address.zip}</span>
            <a className="footer__tel tnum" href={clinic.phoneHref}>{clinic.phone}</a>
          </address>
          <ul className="footer__social">
            {SOCIAL.map(({ label, href, Icon }, i) => (
              <li key={label} data-reveal="fade" style={{ "--i": i }}>
                <a className="footer__icon" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  <Icon size={20} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__word" data-reveal="hairline" aria-hidden="true">
          <FitText as="span" className="footer__word-text">essenciale</FitText>
        </div>

        <div className="footer__legal">
          <p>{clinic.name}</p>
          <p className="tnum">CRO-CE 15272 • EPAO 2503</p>
          <p className="tnum">
            Todos os direitos reservados © <Year initial={new Date().getFullYear()} />
          </p>
        </div>
      </div>
    </footer>
  );
}
