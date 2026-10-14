const DIR = "/images/essenciale/derived";

// <picture> com AVIF + WebP dos derivados de scripts/derive-images.mjs.
// widths = larguras de saída existentes para esse `name` (ver CROPS no script).
export default function Picture({ name, widths, sizes, alt = "", width, height, priority = false, className, style, ...rest }) {
  const srcset = (ext) => widths.map((w) => `${DIR}/${name}-${w}.${ext} ${w}w`).join(", ");
  const mid = widths[Math.min(1, widths.length - 1)];
  return (
    <picture>
      <source type="image/avif" srcSet={srcset("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={srcset("webp")} sizes={sizes} />
      <img
        src={`${DIR}/${name}-${mid}.webp`}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : undefined}
        className={className}
        style={style}
        {...rest}
      />
    </picture>
  );
}
