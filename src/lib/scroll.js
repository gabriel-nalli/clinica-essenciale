// Rolagem para âncoras: usa Lenis (se ativo, só desktop) ou scroll nativo com scroll-padding-top.
export function scrollToHash(hash, { updateHash = true } = {}) {
  if (typeof window === "undefined" || !hash || hash === "#") return false;
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const el = document.getElementById(id);
  if (!el) return false;
  if (updateHash && window.location.hash !== `#${id}`) {
    window.history.pushState(null, "", `#${id}`);
    // linhas do índice e perguntas do FAQ escutam hashchange para abrir antes de rolar
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const lenis = window.__essLenis;
  const header = document.querySelector(".site-header");
  const offset = -((header && window.innerWidth >= 1024 ? header.offsetHeight : 0) + 16);
  if (lenis && !reduce) lenis.scrollTo(el, { offset, duration: 1.1 });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  return true;
}
