// Converts every image under public/projects/_src/<slug>/ into an optimized webp
// at public/projects/<slug>/<name>.webp. Sources stay gitignored; outputs are committed.
import sharp from "sharp";
import { readdir, mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = path.resolve("public/projects/_src");
const OUT = path.resolve("public/projects");
const MAX_W = 1600;
const exts = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const slugs = (await readdir(SRC, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
let count = 0;
for (const slug of slugs) {
  const dir = path.join(SRC, slug);
  const outDir = path.join(OUT, slug);
  await mkdir(outDir, { recursive: true });
  for (const file of await readdir(dir)) {
    const ext = path.extname(file).toLowerCase();
    if (!exts.has(ext)) continue;
    const input = path.join(dir, file);
    const output = path.join(outDir, path.basename(file, ext) + ".webp");
    try {
      const [s, o] = await Promise.all([stat(input), stat(output).catch(() => null)]);
      if (o && o.mtimeMs >= s.mtimeMs) continue; // up to date
    } catch {}
    const img = sharp(input);
    const meta = await img.metadata();
    const pipeline = meta.width && meta.width > MAX_W ? img.resize({ width: MAX_W }) : img;
    await pipeline.webp({ quality: 82 }).toFile(output);
    count++;
    console.log(`${slug}/${path.basename(output)}  ${meta.width}x${meta.height}`);
  }
}
console.log(`done: ${count} image(s) written`);
