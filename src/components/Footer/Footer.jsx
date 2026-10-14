"use client";

import "./Footer.css";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RiInstagramLine, RiMapPinLine, RiWhatsappLine } from "react-icons/ri";

import { clinic } from "@/data/clinicData";
import Copy from "../Copy/Copy";

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  ["Início", "#inicio"],
  ["Tratamentos", "#tratamentos"],
  ["Resultados", "#resultados"],
  ["Especialistas", "#especialistas"],
  ["A clínica", "#clinica"],
  ["Contato", "#contato"],
];

export default function Footer() {
  const socialIconsRef = useRef(null);

  useGSAP(
    () => {
      if (!socialIconsRef.current) return;
      const icons = socialIconsRef.current.querySelectorAll(".icon");
      gsap.set(icons, { opacity: 0, x: -40 });
      ScrollTrigger.create({
        trigger: socialIconsRef.current,
        start: "top 90%",
        once: true,
        animation: gsap.to(icons, {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: -0.1,
          ease: "power3.out",
        }),
      });
    },
    { scope: socialIconsRef }
  );

  const scrollTo = (event, target) => {
    event.preventDefault();
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-meta">
        <div className="container footer-meta-header">
          <div className="footer-meta-col">
            <div className="footer-meta-block">
              <div className="footer-meta-logo">
                <img src="/images/essenciale/generated/essenciale-mark.svg" alt="" />
                <Copy delay={0.1}><h3 className="lg">Clínica Essenciale</h3></Copy>
              </div>
              <Copy delay={0.2}>
                <h2>Saúde, estética e confiança em cada detalhe.</h2>
              </Copy>
            </div>
          </div>
          <div className="footer-meta-col">
            <nav className="footer-nav-links" aria-label="Navegação do rodapé">
              {footerLinks.map(([label, target]) => (
                <a href={target} onClick={(event) => scrollTo(event, target)} key={target}>
                  <h3>{label}</h3>
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="container footer-socials">
          <div className="footer-meta-col">
            <div className="footer-socials-wrapper" ref={socialIconsRef}>
              <a className="icon" href={clinic.instagram} target="_blank" rel="noreferrer" aria-label="Instagram da Essenciale">
                <RiInstagramLine />
              </a>
              <a className="icon" href={clinic.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp da Essenciale">
                <RiWhatsappLine />
              </a>
              <a className="icon" href={clinic.mapUrl} target="_blank" rel="noreferrer" aria-label="Localização da Essenciale">
                <RiMapPinLine />
              </a>
            </div>
          </div>
          <div className="footer-meta-col footer-address">
            <p>{clinic.address.landmark}</p>
            <p>{clinic.address.street}</p>
            <p>{clinic.address.city} • {clinic.address.zip}</p>
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </div>
        </div>
      </div>

      <div className="footer-outro">
        <div className="container">
          <div className="footer-header">
            essenciale
          </div>
          <div className="footer-copyright">
            <p>Clínica Essenciale Saúde e Estética</p>
            <p>CRO-CE 15272 • EPAO 2503</p>
            <p>Todos os direitos reservados &copy; {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
