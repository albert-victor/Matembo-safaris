/**
 * Fix broken /assets/photos/ references in src/data and HTML templates.
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PHOTOS_DIR = join(ROOT, "assets", "photos");

const MANUAL_MAP = {
  "/assets/photos/North_Pare_Mountains_Kindoroko_Forest.jpg": "/assets/photos/Northern_Pare.jpg",
  "/assets/photos/Lake_Manyara_Flamingos_01.jpg": "/assets/photos/Lake_Manyara_National_Park_Flamingos_26.jpg",
  "/assets/photos/Udzungwa_Mountains_National_Park_01.jpg": "/assets/photos/Udzungwa_National_Park_Sanje_Waterfalls_21.jpg",
  "/assets/photos/Mbudya_Island_Snorkeling_01.jpg": "/assets/photos/Mbudya_Island_Dar-es-Salaam_05.jpg",
  "/assets/photos/Pugu_Hill_Canoeing_in_Lake_Minaki_286_300shar-50brig-20_c1.jpg":
    "/assets/photos/Pugu_Hill_Nature_Forest_with_Lake_Minaki.jpg",
  "/assets/photos/Zanzibar_Hermit_Crab_on_the_Beach.jpg": "/assets/photos/Zanzibar_Coconut_Crab_03.jpg",
  "/assets/photos/Snorkling_in_Pangani_Beach_2.jpg": "/assets/photos/Pangani/Snorkling_in_Pangani_Beach_1.jpg",
  "/assets/photos/Lake_Tanganyika_sunset_12.jpg": "/assets/photos/Lake_Tanganyika_Sunset_10.jpg",
  "/assets/photos/Kilimanjaro_Climb_3a.jpg": "/assets/photos/Kilimanjaro_Climb_4a.jpg",
};

function listPhotoFiles() {
  const files = [];
  function walk(dir, prefix = "") {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p, prefix ? `${prefix}/${name}` : name);
      else files.push(prefix ? `${prefix}/${name}` : name);
    }
  }
  walk(PHOTOS_DIR);
  const byLower = new Map(files.map((file) => [file.toLowerCase(), file]));
  return { files, byLower };
}

function baseStem(name) {
  return name
    .replace(/\.(jpg|jpeg|png|webp)$/i, "")
    .replace(/_\d+_\d+shar-50brig-20_c1$/i, "")
    .replace(/_\d+$/i, "");
}

function photoExists(webPath) {
  return existsSync(join(ROOT, webPath.slice(1)));
}

function resolvePhoto(ref, { byLower, files }) {
  if (MANUAL_MAP[ref]) return MANUAL_MAP[ref];

  const filename = ref.replace(/^\/assets\/photos\//, "");
  if (photoExists(`/assets/photos/${filename}`)) return `/assets/photos/${filename}`;

  const exactCase = byLower.get(filename.toLowerCase());
  if (exactCase) return `/assets/photos/${exactCase}`;

  const stem = baseStem(filename).toLowerCase();
  const stemMatches = files
    .filter((f) => baseStem(f).toLowerCase() === stem)
    .filter((f) => !/_\d+_\d+shar-50brig-20_c1/i.test(f))
    .sort((a, b) => a.length - b.length);
  if (stemMatches.length) return `/assets/photos/${stemMatches[0]}`;

  const prefix = stem.split("_").slice(0, Math.min(4, stem.split("_").length)).join("_");
  const prefixMatches = files
    .filter((f) => baseStem(f).toLowerCase().startsWith(prefix))
    .filter((f) => !/_\d+_\d+shar-50brig-20_c1/i.test(f))
    .sort((a, b) => {
      const aDist = Math.abs(baseStem(a).length - stem.length);
      const bDist = Math.abs(baseStem(b).length - stem.length);
      return aDist - bDist || a.localeCompare(b);
    });

  if (prefixMatches.length) return `/assets/photos/${prefixMatches[0]}`;
  return null;
}

function collectFiles(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) collectFiles(p, out);
    else if (/\.(js|html)$/.test(entry.name) && !entry.name.includes("local-image-manifest")) {
      out.push(p);
    }
  }
  return out;
}

function main() {
  const { files, byLower } = listPhotoFiles();
  const lookup = { resolve: (ref) => resolvePhoto(ref, { byLower, files }) };

  const targets = [
    ...collectFiles(join(ROOT, "src")),
    ...readdirSync(ROOT)
      .filter((n) => n.endsWith(".html"))
      .map((n) => join(ROOT, n)),
    ...["activities", "destinations", "experiences", "circuits", "packages"].flatMap((dir) => {
      const full = join(ROOT, dir);
      if (!existsSync(full)) return [];
      return readdirSync(full)
        .filter((n) => n.endsWith(".html"))
        .map((n) => join(full, n));
    }),
  ];

  let totalChanges = 0;
  let filesChanged = 0;
  const stillBroken = new Set();

  for (const file of targets) {
    const before = readFileSync(file, "utf8");
    let content = before;
    let changed = 0;

    content = content.replace(/\/assets\/photos\/[^"'`\s)]+/g, (match) => {
      if (photoExists(match)) return match;
      const resolved = lookup.resolve(match);
      if (resolved && resolved !== match) {
        changed += 1;
        return resolved;
      }
      stillBroken.add(match);
      return match;
    });

    if (content !== before) {
      writeFileSync(file, content, "utf8");
      filesChanged += 1;
      totalChanges += changed;
      console.log(`Fixed ${changed} in ${file.replace(/\\/g, "/").slice(ROOT.length + 1)}`);
    }
  }

  console.log(`\nDone: ${totalChanges} replacements in ${filesChanged} files.`);
  console.log(`Still broken: ${stillBroken.size}`);
  if (stillBroken.size) {
    [...stillBroken].forEach((url) => console.log(`  ${url}`));
  }
}

main();
