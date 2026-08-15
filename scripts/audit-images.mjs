/**
 * Audit all local image paths referenced in src/data and HTML.
 * Reports missing files and suggests case-insensitive fixes.
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const ASSET_DIRS = ["assets/photos", "assets/hero", "assets/about", "assets/credentials", "public/assets/photos"];

function walkFiles(dir, base = dir) {
  const files = [];
  if (!statSync(dir, { throwIfNoEntry: false })?.isDirectory()) return files;
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) files.push(...walkFiles(p, base));
    else files.push(p.replace(/\\/g, "/").slice(ROOT.length + 1).replace(/^public\//, ""));
  }
  return files;
}

function buildFileIndex() {
  const index = new Map();
  for (const dir of ASSET_DIRS) {
    const full = join(ROOT, dir);
    for (const rel of walkFiles(full)) {
      const webPath = rel.startsWith("assets/") ? `/${rel}` : `/assets/photos/${rel.replace(/^assets\/photos\//, "")}`;
      const normalized = webPath.toLowerCase();
      if (!index.has(normalized)) index.set(normalized, webPath);
    }
  }
  return index;
}

function collectSourceFiles(dir) {
  const files = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, name.name);
    if (name.isDirectory()) {
      if (["node_modules", "dist", ".git", "scripts"].includes(name.name)) continue;
      files.push(...collectSourceFiles(p));
    } else if (/\.(js|html|css|json)$/.test(name.name)) {
      files.push(p);
    }
  }
  return files;
}

const LOCAL_PATH_RE = /(["'`])(\/assets\/(?:photos|hero|about|credentials)\/[^"'`\s]+)\1/g;
const TTB_PATH_RE = /https:\/\/www\.tanzaniatourism\.com\/images\/(?:made\/)?images\/uploads\/([^"'`\s?#]+)/g;

const fileIndex = buildFileIndex();
const allFiles = new Set([...fileIndex.values()]);
const sourceFiles = collectSourceFiles(join(ROOT, "src")).concat(
  collectSourceFiles(ROOT).filter((f) => f.endsWith(".html") && !f.includes(`${ROOT}\\dist`))
);

const broken = [];
const fixable = [];

for (const file of sourceFiles) {
  const content = readFileSync(file, "utf8");
  const relFile = file.replace(/\\/g, "/").slice(ROOT.length + 1);

  let match;
  LOCAL_PATH_RE.lastIndex = 0;
  while ((match = LOCAL_PATH_RE.exec(content)) !== null) {
    const url = match[2];
    if (allFiles.has(url)) continue;

    const normalized = url.toLowerCase();
    const suggestion = fileIndex.get(normalized);

    const entry = { file: relFile, url, type: "local" };
    if (suggestion) {
      entry.suggestion = suggestion;
      fixable.push(entry);
    } else {
      // try basename-only match
      const base = url.split("/").pop().toLowerCase();
      const basenameMatch = [...fileIndex.entries()].find(([k]) => k.endsWith("/" + base));
      if (basenameMatch) {
        entry.suggestion = basenameMatch[1];
        fixable.push(entry);
      } else {
        // try partial stem match
        const stem = base.replace(/\.(jpg|jpeg|png|webp)$/i, "").replace(/_\d+$/, "");
        const partial = [...fileIndex.values()].find((p) => {
          const fn = p.split("/").pop().toLowerCase();
          return fn.includes(stem) || stem.includes(fn.replace(/\.(jpg|jpeg|png|webp)$/i, ""));
        });
        if (partial) {
          entry.suggestion = partial;
          entry.partial = true;
          fixable.push(entry);
        } else {
          broken.push(entry);
        }
      }
    }
  }

  TTB_PATH_RE.lastIndex = 0;
  while ((match = TTB_PATH_RE.exec(content)) !== null) {
    const filename = match[1];
    const local = `/assets/photos/${filename}`;
    if (allFiles.has(local)) continue;

    const normalized = local.toLowerCase();
    const suggestion = fileIndex.get(normalized);
    const entry = { file: relFile, url: match[0], filename, type: "ttb" };

    if (suggestion) {
      entry.suggestion = suggestion;
      fixable.push(entry);
    } else {
      const base = filename.toLowerCase();
      const basenameMatch = fileIndex.get(`/assets/photos/${base}`);
      if (basenameMatch) {
        entry.suggestion = basenameMatch;
        fixable.push(entry);
      } else {
        broken.push(entry);
      }
    }
  }
}

const uniqueFixable = [];
const seen = new Set();
for (const item of fixable) {
  const key = `${item.url}→${item.suggestion}`;
  if (seen.has(key)) continue;
  seen.add(key);
  uniqueFixable.push(item);
}

const uniqueBroken = [];
seen.clear();
for (const item of broken) {
  if (seen.has(item.url)) continue;
  seen.add(item.url);
  uniqueBroken.push(item);
}

const report = { fixable: uniqueFixable, broken: uniqueBroken };
writeFileSync(join(ROOT, "scripts", "image-audit-report.json"), JSON.stringify(report, null, 2));

console.log(`Fixable: ${uniqueFixable.length}`);
console.log(`Unfixable: ${uniqueBroken.length}`);
if (uniqueFixable.length) {
  console.log("\nSample fixable:");
  uniqueFixable.slice(0, 20).forEach((x) => console.log(`  ${x.url} → ${x.suggestion}`));
}
if (uniqueBroken.length) {
  console.log("\nBroken (no match):");
  uniqueBroken.slice(0, 30).forEach((x) => console.log(`  ${x.url} (${x.file})`));
}
