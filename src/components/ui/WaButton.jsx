import { clinic } from "@/data/clinicData";
import { WhatsAppIcon, ArrowUpRight } from "./Icon";

// Todas as ações de WhatsApp usam o mesmo botão (verde, glifo + ↗) e o mesmo link.
export default function WaButton({ children, id, compact = false, block = false, className = "", ariaLabel, ...rest }) {
  const cls = ["btn", "btn--wa", compact && "btn--compact", block && "btn--block", className].filter(Boolean).join(" ");
  return (
    <a id={id} className={cls} href={clinic.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel} {...rest}>
      <WhatsAppIcon />
      <span>{children}</span>
      <ArrowUpRight className="btn__ext" />
    </a>
  );
}
