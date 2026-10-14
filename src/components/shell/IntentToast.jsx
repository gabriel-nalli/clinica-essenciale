"use client";
import { useEffect, useRef, useState } from "react";
import { useShell } from "./ShellContext";
import { clinic } from "@/data/clinicData";
import { Mark } from "@/components/ui/Icon";
import { WhatsAppIcon } from "@/components/ui/Icon";

const KEY = "ess:toast:v2";
const store = {
  get() { try { return window.sessionStorage.getItem(KEY); } catch { return "x"; } }, // sem storage → nunca mostra
  set() { try { window.sessionStorage.setItem(KEY, "1"); } catch {} },
};

// Aviso discreto, não modal, uma vez por sessão, só com sinal de intenção (nunca só por tempo).
export default function IntentToast() {
  const { menuOpen } = useShell();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(menuOpen);
  menuRef.current = menuOpen;
  const done = useRef(false);

  useEffect(() => {
    if (store.get()) return;
    const t0 = Date.now();
    let rowsOpened = 0;
    let resultsSince = 0;
    let waClicked = false;
    let intent = false;

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest("a[href*='wa.me'], a[href*='whatsapp.com']");
      if (a) waClicked = true;
      const b = e.target.closest && e.target.closest("#tratamentos button[aria-controls]");
      if (b && ++rowsOpened >= 2) intent = true;
    };
    document.addEventListener("click", onClick);

    const res = document.getElementById("resultados");
    let inView = false;
    const io = res ? new IntersectionObserver(([en]) => { inView = en.isIntersecting; if (inView) resultsSince = Date.now(); }, { threshold: 0.3 }) : null;
    io && io.observe(res);

    const iv = setInterval(() => {
      if (done.current) return;
      const scrolled = window.scrollY / Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if (scrolled > 0.6) intent = true;
      if (inView && Date.now() - resultsSince >= 8000) intent = true;
      const longEnough = Date.now() - t0 >= 40000;
      const awayFromHero = window.scrollY > window.innerHeight * 0.5;
      if (intent && longEnough && awayFromHero && !menuRef.current && !waClicked && !store.get()) {
        done.current = true;
        store.set();
        setOpen(true);
      }
    }, 1000);

    return () => { document.removeEventListener("click", onClick); clearInterval(iv); io && io.disconnect(); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open || menuOpen) return null;
  return (
    <div className="toast" role="dialog" aria-modal="false" aria-labelledby="toast-title">
      <div className="toast__row">
        <span className="toast__brand"><Mark size={20} /> Clínica Essenciale</span>
        <button type="button" className="toast__close" aria-label="Fechar mensagem" onClick={() => setOpen(false)}>
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
        </button>
      </div>
      <p className="toast__label">Atendimento personalizado</p>
      <h2 id="toast-title" className="toast__title">Quer descobrir o tratamento ideal para você?</h2>
      <p className="toast__text">Converse com a equipe da Essenciale e consulte horários, procedimentos e formas de pagamento.</p>
      <a className="btn btn--wa btn--compact btn--block" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
        <WhatsAppIcon /> <span>Falar pelo WhatsApp</span>
      </a>
    </div>
  );
}
