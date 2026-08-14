/**
 * Replace em dash (–) with en dash (–) in site copy (data + HTML prose).
 * Skips CSS and build output. Run: npm run normalize:dashes
 */

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

const EM = "\u2014";
const EN = "\u2013";

const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".cursor"]);
const ALLOW_EXT = new Set([".js", ".mjs", ".html", ".json"]);

function walk(dir, files = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const abs = join(dir, name);
    const st = statSync(abs);
    if (st.isDirectory()) {
      walk(abs, files);
    } else if (ALLOW_EXT.has(extname(name))) {
      files.push(abs);
    }
  }
  return files;
}

function normalizeContent(text) {
  if (!text.includes(EM)) return text;
  return text.replaceAll(EM, EN);
}

const targets = [
  join(ROOT, "src", "data"),
  join(ROOT, "src", "js"),
  ROOT,
  join(ROOT, "activities"),
  join(ROOT, "circuits"),
  join(ROOT, "destinations"),
  join(ROOT, "experiences"),
  join(ROOT, "packages"),
].flatMap((path) => {
  try {
    const st = statSync(path);
    if (st.isDirectory()) return walk(path);
    if (st.isFile() && ALLOW_EXT.has(extname(path))) return [path];
  } catch {
    /* missing optional dir */
  }
  return [];
});

const seen = new Set();
let changed = 0;
let replacements = 0;

for (const file of targets) {
  if (seen.has(file)) continue;
  seen.add(file);

  const before = readFileSync(file, "utf8");
  if (!before.includes(EM)) continue;

  const count = before.split(EM).length - 1;
  const after = normalizeContent(before);
  if (after === before) continue;

  writeFileSync(file, after, "utf8");
  changed += 1;
  replacements += count;
  console.log(`${relative(ROOT, file)} (${count})`);
}

console.log(`\nDone: ${replacements} em dash(es) → en dash in ${changed} file(s).`);
