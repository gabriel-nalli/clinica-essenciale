"use client";
import { useEffect, useState } from "react";
import { useShell } from "./ShellContext";
import { clinic } from "@/data/clinicData";
import { WhatsAppIcon } from "@/components/ui/Icon";
import MenuToggleIcon from "./MenuToggleIcon";

// Mobile (<1024): barra inferior com Menu + WhatsApp. Só aparece quando o CTA do hero sai da tela.
export default function Dock() {
  const { menuOpen, toggleMenu } = useShell();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const cta = document.getElementById("hero-cta");
    if (!cta) { setVisible(true); return; }
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting), { threshold: 0 });
    io.observe(cta);
    return () => io.disconnect();
  }, []);

  const show = visible || menuOpen;
  return (
    <aside className={`dock${show ? " is-visible" : ""}`} aria-label="Atendimento pelo WhatsApp">
      <button type="button" className="dock__menu" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="menu-overlay" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} tabIndex={show ? 0 : -1}>
        <MenuToggleIcon open={menuOpen} />
        <span>{menuOpen ? "Fechar menu" : "Menu"}</span>
      </button>
      <a className="dock__wa" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Clínica Essenciale pelo WhatsApp" tabIndex={show ? 0 : -1}>
        <WhatsAppIcon />
        <span>WhatsApp</span>
      </a>
    </aside>
  );
}
