/**
 * Trim existing destination galleries to working photos only (max 12).
 * Run: npm run trim:galleries
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { northernCircuitDestinations } from "../src/data/northern-circuit-destinations.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "../src/data/northern-circuit-destinations.js");
const BASE = "https://www.tanzaniatourism.com";
const MAX_GALLERY = 12;
const MIN_GALLERY = 10;
const CARD_IMAGES = 3;

function cleanUploadFilename(filename) {
  return filename
    .replace(/_550_550[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i, "");
}

function imageKey(url) {
  const file = url.split("/").pop()?.split("?")[0] || url;
  return cleanUploadFilename(file).toLowerCase();
}

async function isWorking(url, cache) {
  if (cache.has(url)) return cache.get(url);
  try {
    const res = await fetch(url, {
      method: "HEAD",
      headers: { "User-Agent": "Mozilla/5.0" },
      redirect: "follow",
    });
    const ok = res.ok;
    cache.set(url, ok);
    return ok;
  } catch {
    cache.set(url, false);
    return false;
  }
}

function serialize(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (obj === null) return "null";
  if (typeof obj === "string") return JSON.stringify(obj);
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) {
    if (!obj.length) return "[]";
    return `[\n${obj.map((v) => `${padIn}${serialize(v, indent + 1)}`).join(",\n")},\n${pad}]`;
  }
  const entries = Object.entries(obj)
    .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
    .join(",\n");
  return `{\n${entries},\n${pad}}`;
}

const cache = new Map();
const trimmed = [];

console.log("Trimming galleries to max 12 working photos each…");

for (const dest of northernCircuitDestinations) {
  const pool = dest.gallery?.length ? dest.gallery : dest.images;
  const kept = [];
  const seen = new Set();

  for (const img of pool) {
    if (kept.length >= MAX_GALLERY) break;
    if (!img?.src?.startsWith(BASE)) continue;
    const key = imageKey(img.src);
    if (seen.has(key)) continue;
    if (!(await isWorking(img.src, cache))) continue;
    seen.add(key);
    kept.push({
      src: img.src,
      alt: img.alt?.replace(/\s*[—–-]\s*Tanzania Tourism.*$/i, "") || `${dest.fullName} — view ${kept.length + 1}`,
    });
  }

  if (kept.length < MIN_GALLERY) {
    console.warn(`⚠ ${dest.id}: only ${kept.length} working — kept as-is`);
  } else {
    console.log(`  ✓ ${dest.id}: ${pool.length} → ${kept.length} photos`);
  }

  trimmed.push({
    ...dest,
    images: kept.slice(0, CARD_IMAGES),
    gallery: kept.length >= MIN_GALLERY ? kept : pool.slice(0, MAX_GALLERY),
  });
}

const file = `/** Auto-generated from tanzaniatourism.com — run: npm run import:northern */
export const TTB_COM_ORIGIN = ${JSON.stringify(BASE)};
export const TTB_NORTHERN_CIRCUIT_URL = "https://www.tanzaniatourism.com/destinations/northern-circuit";

export const northernCircuitMeta = {
  id: "northern",
  name: "Northern Circuit",
  description: "Serengeti, Ngorongoro, Tarangire, Manyara, Kilimanjaro & the northern parks",
  sourceUrl: "https://www.tanzaniatourism.com/destinations/northern-circuit",
};

export const northernCircuitDestinations = ${serialize(trimmed, 1)};
`;

writeFileSync(OUT, file, "utf8");
console.log(`\nSaved trimmed data → ${OUT}`);
