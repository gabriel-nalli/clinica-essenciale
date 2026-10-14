"use client";

import { useEffect, useRef, useState } from "react";
import { RiWhatsappLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { clinic } from "@/data/clinicData";
import "./WhatsAppExperience.css";

const POPUP_KEY = "essenciale-popup-shown-v1";

export default function WhatsAppExperience() {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef(null);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (window.sessionStorage.getItem(POPUP_KEY)) return undefined;

    let opened = false;
    const openOnce = () => {
      if (opened) return;
      opened = true;
      window.sessionStorage.setItem(POPUP_KEY, "true");
      setIsOpen(true);
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(timer);
    };

    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable > 0.28) openOnce();
    };

    const timer = window.setTimeout(openOnce, 9000);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <aside className="whatsapp-experience" aria-label="Atendimento pelo WhatsApp">
      <a
        className="whatsapp-float"
        href={clinic.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="Falar com a Clínica Essenciale pelo WhatsApp"
      >
        <RiWhatsappLine aria-hidden="true" />
        <span>WhatsApp</span>
      </a>

      {isOpen ? (
        <div
          className="whatsapp-popup-backdrop"
          role="presentation"
          onMouseDown={() => setIsOpen(false)}
        >
          <section
            ref={dialogRef}
            className="whatsapp-popup"
            role="dialog"
            aria-modal="true"
            aria-labelledby="whatsapp-popup-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              ref={closeButtonRef}
              className="whatsapp-popup-close"
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Fechar mensagem"
            >
              <IoMdClose />
            </button>
            <div className="popup-brand">
              <img src="/images/essenciale/generated/essenciale-mark.svg" alt="" />
              <span>Clínica Essenciale</span>
            </div>
            <p className="mono">Atendimento personalizado</p>
            <h2 id="whatsapp-popup-title">
              Quer descobrir o tratamento ideal para você?
            </h2>
            <p>
              Converse com a equipe da Essenciale e consulte horários,
              procedimentos e formas de pagamento.
            </p>
            <a
              className="popup-whatsapp-link"
              href={clinic.whatsapp}
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
            >
              <span>Falar pelo WhatsApp</span>
              <RiWhatsappLine aria-hidden="true" />
            </a>
          </section>
        </div>
      ) : null}
    </aside>
  );
}
