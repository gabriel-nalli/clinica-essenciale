"use client";
import { useEffect, useRef, useState } from "react";
import { useShell } from "./ShellContext";
import { NAV } from "./nav";
import { Mark } from "@/components/ui/Icon";
import WaButton from "@/components/ui/WaButton";
import MenuToggleIcon from "./MenuToggleIcon";

// ≥1024: header fixo (links + Agendar + Menu). <1024: barra no fluxo (logo + Menu).
export default function SiteHeader() {
  const { menuOpen, toggleMenu } = useShell();
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [active, setActive] = useState("inicio");
  const [bar, setBar] = useState({ x: 0, w: 0, on: false });
  const linksRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
      const y = 32;
      const isDark = Array.from(document.querySelectorAll('[data-surface="dark"]')).some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setDark(isDark);
      let cur = "inicio";
      const probe = window.innerHeight * 0.4;
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= probe) cur = n.id;
      }
      setActive(cur);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const wrap = linksRef.current;
    if (!wrap) return;
    const a = wrap.querySelector(`a[data-id="${active}"]`);
    if (!a) return setBar((b) => ({ ...b, on: false }));
    const wr = wrap.getBoundingClientRect();
    const ar = a.getBoundingClientRect();
    setBar({ x: ar.left - wr.left, w: ar.width, on: true });
  }, [active]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${dark ? " is-dark" : ""}${menuOpen ? " is-menu-open" : ""}`} data-theme={dark ? "dark" : "light"}>
      <div className="site-header__inner">
        <a className="logo" href="#inicio" aria-label="Essenciale — início">
          <Mark size={30} className="logo__mark" />
          <span className="logo__text">
            <span className="logo__name">essenciale</span>
            <span className="logo__sub">saúde &amp; estética</span>
          </span>
        </a>

        <nav className="site-header__links" aria-label="Seções" ref={linksRef}>
          {NAV.slice(1).map((n) => (
            <a key={n.id} href={n.href} data-id={n.id} aria-current={active === n.id ? "true" : undefined}>{n.label}</a>
          ))}
          <span className="site-header__bar" aria-hidden="true" style={{ transform: `translateX(${bar.x}px)`, width: bar.w, opacity: bar.on ? 1 : 0 }} />
        </nav>

        <div className="site-header__actions">
          <WaButton compact className="site-header__cta">Agendar</WaButton>
          <button type="button" className="menu-toggle" onClick={toggleMenu} aria-expanded={menuOpen} aria-controls="menu-overlay" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            <MenuToggleIcon open={menuOpen} />
            <span>{menuOpen ? "Fechar menu" : "Menu"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
