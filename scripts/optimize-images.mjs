/**
 * Loss-aware image compression for deploy size.
 * Skips homepage hero / slideshow assets entirely.
 *
 * Run: npm run optimize:images
 * Dry run: npm run optimize:images -- --dry-run
 */

import { readFileSync, writeFileSync, readdirSync, statSync, renameSync, unlinkSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DRY_RUN = process.argv.includes("--dry-run");

const MIN_BYTES = 280 * 1024;
const MAX_WIDTH = 2400;
const RESIZE_THRESHOLD = 2600;
const JPEG_QUALITY = 88;
const WEBP_QUALITY = 86;
const PNG_COMPRESSION = 9;
const MIN_SAVINGS_RATIO = 0.06;

const SCAN_DIRS = [
  join(ROOT, "assets", "photos"),
  join(ROOT, "assets", "about"),
  join(ROOT, "assets", "credentials"),
];

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp"]);

/** Never modify – homepage hero slideshow + hero folder. */
function loadProtectedRelPaths() {
  const protectedPaths = new Set();

  protectedPaths.add("assets/hero");
  protectedPaths.add("public/assets/hero");

  const heroDataPath = join(ROOT, "src", "data", "hero-slides-data.js");
  const heroSource = readFileSync(heroDataPath, "utf8");
  for (const match of heroSource.matchAll(/image:\s*"([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith("/assets/")) {
      protectedPaths.add(url.slice(1).replace(/\//g, "\\").replace(/\\/g, "/"));
    }
  }

  // Index LCP bootstrap hero
  protectedPaths.add("assets/hero/new hero.jpg");

  return protectedPaths;
}

function normalizeRel(absPath) {
  return relative(ROOT, absPath).split("\\").join("/");
}

function isProtected(absPath, protectedSet) {
  const rel = normalizeRel(absPath);
  for (const prefix of protectedSet) {
    if (rel === prefix || rel.startsWith(`${prefix}/`)) return true;
  }
  return false;
}

function walkImages(dir, files = []) {
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) walkImages(abs, files);
    else if (IMAGE_EXT.has(extname(name).toLowerCase())) files.push(abs);
  }
  return files;
}

async function optimizeFile(absPath) {
  const before = statSync(absPath).size;
  if (before < MIN_BYTES) return null;

  const ext = extname(absPath).toLowerCase();
  const inputBuffer = readFileSync(absPath);
  const meta = await sharp(inputBuffer).metadata();
  let pipeline = sharp(inputBuffer).rotate();

  const needsResize = (meta.width || 0) > RESIZE_THRESHOLD;
  if (needsResize) {
    pipeline = pipeline.resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
      fit: "inside",
    });
  }

  let output;
  if (ext === ".png") {
    output = await pipeline
      .png({ compressionLevel: PNG_COMPRESSION, adaptiveFiltering: true })
      .toBuffer();
  } else if (ext === ".webp") {
    output = await pipeline.webp({ quality: WEBP_QUALITY, effort: 4 }).toBuffer();
  } else {
    output = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true, progressive: true })
      .toBuffer();
  }

  const after = output.length;
  const savings = (before - after) / before;
  if (after >= before || savings < MIN_SAVINGS_RATIO) return null;

  if (!DRY_RUN) {
    const tmp = `${absPath}.opt.tmp`;
    writeFileSync(tmp, output);
    try {
      renameSync(tmp, absPath);
    } catch (err) {
      try {
        unlinkSync(tmp);
      } catch {
        /* ignore */
      }
      throw err;
    }
  }
  return { before, after, savings, resized: needsResize };
}

const protectedSet = loadProtectedRelPaths();
const candidates = SCAN_DIRS.flatMap((dir) => walkImages(dir)).filter(
  (abs) => !isProtected(abs, protectedSet)
);

let optimized = 0;
let skippedProtected = 0;
let skippedSmall = 0;
let unchanged = 0;
let savedBytes = 0;

console.log(`Mode: ${DRY_RUN ? "DRY RUN" : "WRITE"}`);
console.log(`Candidates: ${candidates.length} (min ${Math.round(MIN_BYTES / 1024)} KB)`);
console.log(`Protected hero paths: ${protectedSet.size}\n`);

for (const abs of candidates) {
  if (isProtected(abs, protectedSet)) {
    skippedProtected += 1;
    continue;
  }
  if (statSync(abs).size < MIN_BYTES) {
    skippedSmall += 1;
    continue;
  }

  try {
    const result = await optimizeFile(abs);
    if (!result) {
      unchanged += 1;
      continue;
    }
    optimized += 1;
    savedBytes += result.before - result.after;
    const tag = result.resized ? "resize+" : "";
    console.log(
      `${tag}${normalizeRel(abs)}: ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB (-${(result.savings * 100).toFixed(0)}%)`
    );
  } catch (err) {
    console.warn(`Skip ${normalizeRel(abs)}: ${err.message}`);
  }
}

console.log(`\nDone.`);
console.log(`Optimized: ${optimized}`);
console.log(`Unchanged: ${unchanged}`);
console.log(`Skipped (small): ${skippedSmall}`);
console.log(`Saved: ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);
