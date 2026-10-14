// Gera crops + tratamento por "tier" (T0 real, T1 atmosfera, T2 duotone) das imagens existentes.
// Originais nunca são alteradas. Saída: public/images/essenciale/derived/<nome>-<w>.{avif,webp}
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const IMG = path.join(ROOT, "public/images/essenciale");
const OUT = path.join(IMG, "derived");
await fs.mkdir(OUT, { recursive: true });

// [name, source (relative to IMG), [x,y,w,h], outputWidths, tier]
const CROPS = [
  ["hero-oval-d", "generated/hero-desktop.webp", [985, 0, 687, 941], [480, 687, 960], "T1"],
  ["hero-oval-m", "generated/hero-mobile-v2.webp", [150, 800, 640, 872], [480, 640, 900], "T1"],
  ["idx-odontologia", "generated/odontologia.webp", [46, 0, 1357, 1086], [560, 1120], "T1"],
  ["idx-estetica", "optimized/resultado-labial-depois.webp", [0, 330, 524, 419], [524, 786], "T0"],
  ["idx-cuidado", "generated/cuidado-estetico-v2.webp", [0, 140, 1122, 898], [560, 1120], "T1"],
  ["idx-saude", "generated/clinica-interior.webp", [248, 0, 1176, 941], [560, 1120], "T1"],
  ["cmp-depois", "optimized/resultado-labial-depois.webp", [22, 168, 480, 600], [480, 720], "T0"],
  ["cmp-antes", "optimized/resultado-labial-antes.webp", [117, 153, 400, 500], [480, 720], "T0"],
  ["res-02", "optimized/resultado-labial-01.webp", [2, 82, 582, 730], [582, 874], "T0"],
  ["team-lara", "optimized/lara-rabelo.webp", [120, 0, 330, 440], [330, 495], "T0"],
  ["team-daynara", "optimized/daynara-elen.webp", [97, 30, 258, 344], [258, 387], "T0"],
  ["team-daynara-v2", "generated/daynara-profissional-v2.webp", [261, 60, 600, 800], [400, 600], "T0"],
  ["team-aline", "optimized/aline-borges.webp", [190, 0, 520, 693], [400, 520, 780], "T0"],
  ["esp-recepcao", "generated/clinica-interior.webp", [0, 90, 420, 560], [420, 630], "T2"],
  ["esp-odontologia", "generated/odontologia.webp", [990, 250, 458, 611], [458, 687], "T2"],
  ["esp-cuidado", "generated/cuidado-estetico-v2.webp", [170, 0, 670, 893], [480, 670], "T2"],
  ["esp-exame", "generated/exame-cardiologico-v2.webp", [842, 375, 560, 747], [480, 560], "T2"],
  ["esp-panorama", "generated/clinica-interior.webp", [0, 94, 1672, 717], [1000, 1672], "T2"],
  ["esp-panorama-m", "generated/clinica-interior.webp", [560, 0, 753, 941], [560, 753], "T2"],
  ["conv-final", "generated/hero-mobile.webp", [37, 742, 866, 930], [600, 866], "T1"],
];

// Gradient map T2: 0 -> #22180F, 140 -> #A1805A, 255 -> #F6EAE2
const stops = [[0, [0x22, 0x18, 0x0f]], [140, [0xa1, 0x80, 0x5a]], [255, [0xf6, 0xea, 0xe2]]];
const lut = Array.from({ length: 256 }, (_, i) => {
  let a = stops[0], b = stops[1];
  if (i > stops[1][0]) { a = stops[1]; b = stops[2]; }
  const t = (i - a[0]) / (b[0] - a[0]);
  return a[1].map((v, k) => Math.round(v + (b[1][k] - v) * t));
});

async function duotone(buf) {
  const { data, info } = await sharp(buf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 3) {
    const g = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    const c = lut[g];
    out[i] = Math.round(c[0] * 0.88 + data[i] * 0.12);
    out[i + 1] = Math.round(c[1] * 0.88 + data[i + 1] * 0.12);
    out[i + 2] = Math.round(c[2] * 0.88 + data[i + 2] * 0.12);
  }
  return sharp(out, { raw: { width: info.width, height: info.height, channels: 3 } });
}

let n = 0;
const only = process.argv.slice(2);
for (const [name, src, [x, y, w, h], widths, tier] of CROPS) {
  if (only.length && !only.includes(name)) continue;
  const file = path.join(IMG, src);
  const meta = await sharp(file).metadata();
  const left = Math.max(0, Math.min(x, meta.width - 1));
  const top = Math.max(0, Math.min(y, meta.height - 1));
  const width = Math.min(w, meta.width - left);
  const height = Math.min(h, meta.height - top);
  if (width !== w || height !== h) console.warn(`  ! ${name}: crop clamped to ${width}x${height} (source ${meta.width}x${meta.height})`);
  const cropped = await sharp(file).extract({ left, top, width, height }).toBuffer();
  for (const ow of widths) {
    let img;
    if (tier === "T2") {
      const resized = await sharp(cropped).resize({ width: ow, kernel: "lanczos3", withoutEnlargement: false }).toBuffer();
      img = await duotone(resized);
    } else {
      img = sharp(cropped).resize({ width: ow, kernel: "lanczos3", withoutEnlargement: false });
      if (tier === "T1") img = img.modulate({ saturation: 0.88 }).linear([1.0, 0.99, 0.95], [4, 3, 2]).gamma(1.02);
      img = img.sharpen({ sigma: ow > width ? 0.5 : 0.4 });
    }
    const base = path.join(OUT, `${name}-${ow}`);
    const buf = tier === "T2" ? await img.png().toBuffer() : await img.png().toBuffer();
    await sharp(buf).avif({ quality: 55, effort: 4 }).toFile(base + ".avif");
    await sharp(buf).webp({ quality: 78 }).toFile(base + ".webp");
    n += 2;
  }
  const m = await sharp(path.join(OUT, `${name}-${widths[0]}.webp`)).metadata();
  console.log(`${name.padEnd(18)} ${tier} ${widths.join("/")} -> ${m.width}x${m.height}`);
}
console.log(`ok: ${n} arquivos em ${path.relative(ROOT, OUT)}`);
