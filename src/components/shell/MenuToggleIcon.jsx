// As três linhas do "E" da marca (25/21/25). Aberto: as externas giram ±45° e a do meio some.
export default function MenuToggleIcon({ open }) {
  return (
    <svg className={`mt-icon${open ? " is-open" : ""}`} width="22" height="16" viewBox="0 0 22 16" aria-hidden="true" focusable="false">
      <line className="mt-1" x1="0" y1="2" x2="22" y2="2" />
      <line className="mt-2" x1="0.9" y1="8" x2="19" y2="8" />
      <line className="mt-3" x1="0" y1="14" x2="22" y2="14" />
    </svg>
  );
}
