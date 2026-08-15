/**
 * Replace TTB CDN URLs in src/ with local /assets/photos/ paths.
 * Run after mirror-ttb-images.mjs: node scripts/replace-ttb-urls.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const MANIFEST_PATH = join(ROOT, "src", "data", "local-image-manifest.json");
const TTB_ORIGIN = "https://www.tanzaniatourism.com";

function uploadUrlFromAny(url) {
  const clean = url.replace(/[,;)]+$/, "").split("?")[0];
  if (clean.includes("/images/uploads/")) return clean;
  const m = clean.match(/\/images\/made\/images\/uploads\/([^_]+)_\d+_\d+shar/i);
  if (m) return `${TTB_ORIGIN}/images/uploads/${m[1]}.jpg`;
  return null;
}

function localPathFromUpload(uploadUrl) {
  const m = uploadUrl.match(/\/images\/uploads\/(.+)$/i);
  if (!m) return null;
  return `/assets/photos/${m[1]}`;
}

function buildLookup(manifest) {
  const lookup = new Map(Object.entries(manifest));

  // Any TTB image URL → local path via upload normalization
  return {
    resolve(url) {
      const clean = url.replace(/[,;)]+$/, "").split("?")[0];
      if (lookup.has(clean)) return lookup.get(clean);
      const upload = uploadUrlFromAny(clean);
      if (upload && lookup.has(upload)) return lookup.get(upload);
      if (upload) return localPathFromUpload(upload);
      return null;
    },
  };
}

function replaceInText(text, lookup) {
  return text.replace(/https?:\/\/www\.tanzaniatourism\.com[^\s"'<>\\)]+/g, (match) => {
    const local = lookup.resolve(match);
    return local || match;
  });
}

function scanAndReplace(dir, lookup) {
  let filesChanged = 0;
  let replacements = 0;

  function walk(d) {
    for (const name of readdirSync(d)) {
      const p = join(d, name);
      const st = statSync(p);
      if (st.isDirectory()) walk(p);
      else if (/\.(js|mjs|html|json)$/.test(name)) {
        if (name === "local-image-manifest.json") continue;
        const before = readFileSync(p, "utf8");
        const after = replaceInText(before, lookup);
        if (after !== before) {
          const count = (before.match(/tanzaniatourism\.com/g) || []).length;
          writeFileSync(p, after, "utf8");
          filesChanged += 1;
          replacements += count;
          console.log(`  Updated ${p.replace(ROOT + "\\", "").replace(ROOT + "/", "")} (${count} URLs)`);
        }
      }
    }
  }

  walk(dir);
  return { filesChanged, replacements };
}

function main() {
  if (!existsSync(MANIFEST_PATH)) {
    console.error("Manifest not found. Run: node scripts/mirror-ttb-images.mjs");
    process.exit(1);
  }

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf8"));
  const lookup = buildLookup(manifest);

  console.log("Replacing TTB URLs in src/...");
  const srcResult = scanAndReplace(join(ROOT, "src"), lookup);
  console.log(`src/: ${srcResult.filesChanged} files, ~${srcResult.replacements} replacements`);

  const htmlDirs = ["destinations", "packages", "activities", "circuits", "experiences"];
  let htmlChanged = 0;
  for (const dir of htmlDirs) {
    const full = join(ROOT, dir);
    if (!existsSync(full)) continue;
    const result = scanAndReplace(full, lookup);
    htmlChanged += result.filesChanged;
    if (result.filesChanged) console.log(`${dir}/: ${result.filesChanged} files updated`);
  }

  // Also update root HTML templates that preconnect to TTB
  for (const file of ["index.html", "about.html", "safaris.html", "destinations.html"]) {
    const p = join(ROOT, file);
    if (!existsSync(p)) continue;
    let text = readFileSync(p, "utf8");
    const before = text;
    text = text.replace(
      /\s*<link rel="preconnect" href="https:\/\/www\.tanzaniatourism\.com"[^>]*>\s*/g,
      "\n"
    );
    text = replaceInText(text, lookup);
    if (text !== before) {
      writeFileSync(p, text, "utf8");
      console.log(`  Updated ${file}`);
    }
  }

  console.log("Done. Run npm run build to regenerate dist/.");
}

main();
