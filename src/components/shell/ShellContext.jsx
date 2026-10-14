"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ShellCtx = createContext({ menuOpen: false, openMenu() {}, closeMenu() {}, toggleMenu() {} });
export const useShell = () => useContext(ShellCtx);

export function ShellProvider({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);

  // Com o menu aberto: conteúdo inerte (substitui o antigo body.menu-open *{pointer-events:none}).
  useEffect(() => {
    const targets = ["conteudo", "rodape"].map((id) => document.getElementById(id)).filter(Boolean);
    targets.forEach((el) => (menuOpen ? el.setAttribute("inert", "") : el.removeAttribute("inert")));
    document.documentElement.classList.toggle("menu-open", menuOpen);
    return () => document.documentElement.classList.remove("menu-open");
  }, [menuOpen]);

  const value = useMemo(() => ({ menuOpen, openMenu, closeMenu, toggleMenu }), [menuOpen, openMenu, closeMenu, toggleMenu]);
  return <ShellCtx.Provider value={value}>{children}</ShellCtx.Provider>;
}
