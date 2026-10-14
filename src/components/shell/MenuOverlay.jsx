"use client";
import { useEffect, useRef } from "react";
import { useShell } from "./ShellContext";
import { NAV } from "./nav";
import { clinic } from "@/data/clinicData";
import { scrollToHash } from "@/lib/scroll";

export default function MenuOverlay() {
  const { menuOpen, closeMenu } = useShell();
  const ref = useRef(null);
  const lastFocus = useRef(null);

  // foco: entra no primeiro link; sai de volta ao botão que abriu. Esc fecha. Tab fica preso.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (menuOpen) {
      lastFocus.current = document.activeElement;
      const t = setTimeout(() => el.querySelector("a")?.focus({ preventScroll: true }), 80);
      const onKey = (e) => {
        if (e.key === "Escape") closeMenu();
        if (e.key === "Tab") {
          const f = Array.from(document.querySelectorAll("#menu-overlay a, .site-header button, .site-header a, .dock a, .dock button")).filter((n) => n.offsetParent !== null);
          if (!f.length) return;
          const first = f[0], last = f[f.length - 1];
          if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
          else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        }
      };
      document.addEventListener("keydown", onKey);
      return () => { clearTimeout(t); document.removeEventListener("keydown", onKey); };
    }
    if (lastFocus.current && lastFocus.current.focus) { lastFocus.current.focus({ preventScroll: true }); lastFocus.current = null; }
  }, [menuOpen, closeMenu]);

  const go = (e, href) => {
    e.preventDefault();
    closeMenu();
    setTimeout(() => scrollToHash(href), 420);
  };

  return (
    <div id="menu-overlay" ref={ref} className={`menu${menuOpen ? " is-open" : ""}`} aria-hidden={!menuOpen} inert={!menuOpen}>
      <div className="menu__panel">
        <nav className="menu__nav" aria-label="Navegação principal">
          <ol>
            {NAV.map((n, i) => (
              <li key={n.id} style={{ "--i": i }}>
                <a href={n.href} onClick={(e) => go(e, n.href)} data-no-scroll>
                  <span className="menu__num tnum" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <span className="menu__label">{n.label}</span>
                </a>
              </li>
            ))}
            <li style={{ "--i": NAV.length }} className="menu__extra">
              <a href="#duvidas" onClick={(e) => go(e, "#duvidas")} data-no-scroll>
                <span className="menu__num tnum" aria-hidden="true">07</span>
                <span className="menu__label">Perguntas frequentes</span>
              </a>
            </li>
          </ol>
        </nav>

        <div className="menu__meta">
          <div className="menu__block" style={{ "--i": 7 }}>
            <p className="menu__eyebrow">Agendamentos</p>
            <a className="menu__link" href={clinic.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a className="menu__link tnum" href={clinic.phoneHref}>{clinic.phone}</a>
          </div>
          <div className="menu__block" style={{ "--i": 8 }}>
            <p className="menu__eyebrow">Endereço</p>
            <address>
              <span>{clinic.address.street}</span>
              <span>{clinic.address.city}</span>
            </address>
          </div>
          <div className="menu__block" style={{ "--i": 9 }}>
            <p className="menu__eyebrow">Social</p>
            <a className="menu__link" href={clinic.instagram} target="_blank" rel="noopener noreferrer">Instagram <span className="arrow-glyph" aria-hidden="true">↗</span></a>
            <a className="menu__link" href={clinic.mapUrl} target="_blank" rel="noopener noreferrer">Como chegar <span className="arrow-glyph" aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </div>
  );
}
