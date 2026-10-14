"use client";
import { useEffect } from "react";

// Ilha mínima: abre a pergunta (#faq-N) que corresponde ao hash, ao carregar e em hashchange
// (o scroll de âncoras do shell dispara hashchange antes de rolar). Sem hash válido, não faz nada.
export default function FaqHash() {
  useEffect(() => {
    const openFromHash = () => {
      let id = "";
      try {
        id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
      } catch {
        return;
      }
      if (!id) return;
      const el = document.getElementById(id);
      if (el && el.tagName === "DETAILS" && el.closest("#duvidas") && !el.open) el.open = true;
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);
  return null;
}
