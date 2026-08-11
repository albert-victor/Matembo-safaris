/**
 * Rebuild local-image-manifest.json from assets/photos/ on disk.
 */
import { readdirSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PHOTOS_DIR = join(ROOT, "assets", "photos");
const MANIFEST_PATH = join(ROOT, "src", "data", "local-image-manifest.json");
const TTB_ORIGIN = "https://www.tanzaniatourism.com";

function walkFiles(dir, base = dir) {
  const files = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walkFiles(p, base));
    else files.push(relative(base, p).replace(/\\/g, "/"));
  }
  return files;
}

function madeVariants(baseName) {
  const stem = baseName.replace(/\.(jpg|jpeg|png|webp)$/i, "");
  return ["286_300", "750_550", "1600_900"].map(
    (dim) => `${TTB_ORIGIN}/images/made/images/uploads/${stem}_${dim}shar-50brig-20_c1.jpg`
  );
}

const manifest = {};
for (const rel of walkFiles(PHOTOS_DIR)) {
  const localPath = `/assets/photos/${rel}`;
  const uploadUrl = `${TTB_ORIGIN}/images/uploads/${rel}`;
  manifest[uploadUrl] = localPath;
  for (const made of madeVariants(rel)) manifest[made] = localPath;
}

writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
console.log(`Manifest rebuilt: ${Object.keys(manifest).length} entries from ${walkFiles(PHOTOS_DIR).length} files.`);
