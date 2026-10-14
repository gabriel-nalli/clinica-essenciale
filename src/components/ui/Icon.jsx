// Ícones SVG inline (sem emoji, sem icon font). Sempre decorativos: aria-hidden.
const base = { "aria-hidden": true, focusable: "false", fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" };

export function WhatsAppIcon({ size = 20, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 24 24" stroke="none" fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.95L2 22l5.2-1.36A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.13 15.07l-.3-.18-3.08.8.82-3-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.1c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.75 2.8 4.3 3.82 2.12.84 2.55.67 3.01.63.46-.04 1.48-.6 1.69-1.19.21-.58.21-1.08.15-1.19-.06-.1-.23-.17-.48-.29-.25-.13-1.48-.73-1.7-.82-.23-.08-.4-.12-.56.13-.17.25-.65.82-.8.98-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.12-.56-1.37-.77-1.87-.2-.48-.4-.42-.56-.42h-.47Z" />
    </svg>
  );
}
export function InstagramIcon({ size = 20, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}
export function PinIcon({ size = 20, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.4" />
    </svg>
  );
}
export function ArrowUpRight({ size = 16, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 16 16">
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}
export function ArrowDown({ size = 16, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 16 16">
      <path d="M8 3v10M3.5 8.5 8 13l4.5-4.5" />
    </svg>
  );
}
export function ArrowDownRight({ size = 16, className }) {
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 16 16">
      <path d="M4.5 4.5 11.5 11.5M11.5 5.5v6h-6" />
    </svg>
  );
}
export function Chevron({ size = 16, dir = "right", className }) {
  const rot = { right: 0, left: 180, down: 90, up: -90 }[dir];
  return (
    <svg {...base} className={className} width={size} height={size} viewBox="0 0 16 16" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}
// A marca: dois arcos abertos + as três linhas (o "E"). Usada no preloader, header, pin do mapa.
export function Mark({ size = 36, className, title }) {
  return (
    <svg className={className} width={size} height={size * 1.38} viewBox="0 0 72 100" role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} fill="none" strokeLinecap="round">
      <path className="mark-arc mark-arc--a" d="M10 38a26 36 0 0 1 52-6" stroke="var(--coffee)" strokeWidth="2.2" />
      <path className="mark-arc mark-arc--b" d="M62 62a26 36 0 0 1-52 6" stroke="var(--caramel)" strokeWidth="2.2" />
      <path className="mark-stroke" d="M24 41h25M25.5 50h21M24 59h25" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}
