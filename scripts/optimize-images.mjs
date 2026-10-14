/**
 * Image pipeline: reads originals from ./assets-src (downloaded from the old
 * WordPress uploads, see docs/content-and-assets.md) and writes optimised WebP
 * variants + a tiny JSON manifest into ./public/assets.
 *
 *   npm run images
 */
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "assets-src";
const OUT = "public/assets";

/** @type {Array<{src:string, out:string, widths:number[], aspect?:string, fit?:"cover"|"inside", position?:string, quality?:number}>} */
const jobs = [
  // brand
  { src: "logo.jpg", out: "brand/aura-logo", widths: [320, 640, 1200], fit: "inside", quality: 90, alpha: "white" },
  { src: "icon-cropped.png", out: "brand/aura-icon", widths: [64, 192, 512], fit: "inside", quality: 90 },
  { src: "nabh.png", out: "brand/nabh-patient-safety", widths: [200, 400], fit: "inside", quality: 85 },
  // hero
  { src: "hero-1.jpg", out: "hero/hero-skin-wellness", widths: [640, 1024, 1600, 2048], aspect: "3:2" },
  { src: "hero-2.jpg", out: "hero/hero-facial-treatment", widths: [640, 1024, 1600, 2048], aspect: "3:2" },
  // service categories
  { src: "svc-derm.jpg", out: "treatments/cosmetic-dermatology", widths: [480, 800, 1200], aspect: "4:3" },
  { src: "svc-hair.jpg", out: "treatments/hair-transplantation", widths: [480, 800, 1200], aspect: "4:3" },
  { src: "svc-gyn.jpg", out: "treatments/cosmetic-gynecology", widths: [480, 800, 1200], aspect: "4:3", position: "attention" },
  { src: "svc-dent.jpg", out: "treatments/cosmetic-dentistry", widths: [480, 800, 1200], aspect: "4:3" },
  { src: "svc-surgery.jpg", out: "treatments/aesthetic-surgery", widths: [480, 800, 1200], aspect: "4:3", position: "attention" },
  { src: "svc-hair-consult.jpg", out: "treatments/hair-prp-consult", widths: [480, 800, 1200], aspect: "4:3", position: "attention" },
  // service page imagery (portrait)
  { src: "derm-a3.jpg", out: "treatments/dermatology-laser", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "derm-a2.jpg", out: "treatments/dermatology-skin-care", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "derm-a1.jpg", out: "treatments/dermatology-hair", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "derm-natural-woman.jpg", out: "treatments/dermatology-natural-skin", widths: [480, 800, 1200], aspect: "4:3" },
  { src: "derm-face-cream.jpg", out: "treatments/dermatology-face-cream", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "hair-4.jpg", out: "treatments/hair-restoration", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "hair-5.jpg", out: "treatments/hair-prp", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "gyn-consult.jpg", out: "treatments/gynecology-consult", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "dent-a5.jpg", out: "treatments/dentistry-smile", widths: [480, 800, 1200], aspect: "4:5" },
  { src: "surg-breast.jpg", out: "treatments/surgery-breast", widths: [480, 550], fit: "inside" },
  { src: "surg-body.jpg", out: "treatments/surgery-body", widths: [480, 550], fit: "inside" },
  { src: "surg-men.jpg", out: "treatments/surgery-men", widths: [480, 550], fit: "inside" },
  // doctors (3:4 portraits)
  { src: "dr-priyadharshini.jpg", out: "doctors/dr-priyadharshini-k", widths: [320, 640, 960], aspect: "3:4", position: "top" },
  { src: "dr-kavitha.jpg", out: "doctors/dr-kavitha", widths: [320, 640, 960], aspect: "3:4", position: "top" },
  { src: "dr-senthil.jpg", out: "doctors/dr-senthil-kumaran-m", widths: [320, 640, 960], aspect: "3:4", position: "top" },
  { src: "dr-nagappan.jpg", out: "doctors/dr-nagappan-ar", widths: [320, 640, 960], aspect: "3:4", position: "top" },
  // clinic
  { src: "clinic-banner-1.jpg", out: "clinic/clinic-banner-1", widths: [640, 1024, 1600, 1920], aspect: "1920:750" },
  { src: "clinic-banner-2.jpg", out: "clinic/clinic-banner-2", widths: [640, 1024, 1600, 1920], aspect: "1920:750" },
  // blog
  { src: "blog-skin-lightening.jpg", out: "blog/skin-lightening-treatment", widths: [480, 800, 1200, 1600], aspect: "16:9" },
  { src: "blog-fine-lines.jpg", out: "blog/fine-lines-radiant-skin", widths: [480, 800, 1200, 1600], aspect: "16:9" },
  { src: "blog-prp.jpg", out: "blog/prp-treatment-techniques", widths: [480, 800, 1200, 1600], aspect: "16:9" },
  { src: "blog-laser-hair.jpg", out: "blog/laser-hair-reduction-guide", widths: [480, 800, 1200, 1600], aspect: "16:9" },
  { src: "blog-clinic-experience.jpg", out: "blog/skin-clinic-experience", widths: [480, 800, 1200, 1600], aspect: "16:9" },
  { src: "blog-5-treatments.jpg", out: "blog/five-skin-treatments", widths: [480, 800, 1200, 1600], aspect: "16:9" },
];

const manifest = {};

for (const job of jobs) {
  const input = sharp(path.join(SRC, job.src), { failOn: "none" });
  const meta = await input.metadata();
  let base = input.clone().rotate();
  if (job.alpha === "white") {
    // Key out the flat white background of the JPEG wordmark so it sits on tinted backgrounds.
    const { data, info } = await base.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      const min = Math.min(data[i], data[i + 1], data[i + 2]);
      if (min > 235) data[i + 3] = Math.max(0, Math.round((255 - min) * 12));
    }
    base = sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } });
  }
  let w = meta.width, h = meta.height;
  if (job.aspect) {
    const [aw, ah] = job.aspect.split(":").map(Number);
    const r = aw / ah;
    if (w / h > r) w = Math.round(h * r); else h = Math.round(w / r);
  }
  const outDir = path.join(OUT, path.dirname(job.out));
  await mkdir(outDir, { recursive: true });
  const entry = { widths: [], aspect: null };
  for (const width of job.widths) {
    if (width > w) continue;
    const height = Math.round((width * h) / w);
    let img = base.clone();
    if (job.aspect) img = img.resize({ width, height, fit: "cover", position: job.position ?? "centre" });
    else img = img.resize({ width, fit: "inside", withoutEnlargement: true });
    const file = `${job.out}-${width}w.webp`;
    await img.webp({ quality: job.quality ?? 78, effort: 5 }).toFile(path.join(OUT, file));
    entry.widths.push(width);
    entry.aspect = `${w}:${h}`;
    if (job.alpha === "white" && width === Math.max(...job.widths.filter((x) => x <= w))) {
      await img.clone().png().toFile(path.join(OUT, `${job.out}.png`));
    }
  }
  entry.width = w; entry.height = h;
  manifest[job.out] = entry;
  console.log(`${job.src} → ${job.out} (${entry.widths.join("/")}w, ${w}x${h})`);
}
// favicons / touch icons from the brand icon
await mkdir(OUT, { recursive: true });
await sharp(path.join(SRC, "icon-cropped.png")).resize(180, 180).png().toFile("public/apple-touch-icon.png");
await sharp(path.join(SRC, "icon-cropped.png")).resize(32, 32).png().toFile("public/favicon-32.png");
await sharp(path.join(SRC, "icon-cropped.png")).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(path.join(SRC, "icon-cropped.png")).resize(512, 512).png().toFile("public/icon-512.png");
// Open Graph default: the wordmark centred on white, 1200x630
const logo = await sharp(path.join(SRC, "logo.jpg")).resize({ width: 900, fit: "inside" }).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#ffffff" } })
  .composite([{ input: logo, gravity: "centre" }]).jpeg({ quality: 85 }).toFile(path.join(OUT, "brand/og-default.jpg"));
await writeFile("src/data/image-manifest.json", JSON.stringify(manifest, null, 2));
console.log("done");
