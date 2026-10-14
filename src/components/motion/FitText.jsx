"use client";
import { useEffect, useRef } from "react";

// Ajusta o tamanho da fonte para o texto ocupar exatamente a largura do contêiner.
// CSS clamp() é o fallback antes da hidratação.
export default function FitText({ as: Tag = "span", children, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el && el.parentElement;
    if (!el || !parent) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.scrollWidth || el.getBoundingClientRect().width;
      const cw = parent.clientWidth;
      if (w > 0 && cw > 0) el.style.fontSize = `${(100 * cw) / w}px`;
    };
    let alive = true;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => alive && fit());
    const ro = new ResizeObserver(fit);
    ro.observe(parent);
    return () => { alive = false; ro.disconnect(); };
  }, []);
  return (
    <Tag ref={ref} className={className} style={{ display: "block", width: "max-content", whiteSpace: "nowrap" }} {...rest}>
      {children}
    </Tag>
  );
}
