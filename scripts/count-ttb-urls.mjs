import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const uploads = new Set();
const made = new Set();
const all = new Set();

function normalizeUpload(url) {
  const m = url.match(/\/images\/uploads\/([^/?#]+)\.(jpg|jpeg|png|webp)$/i);
  if (m) return `${m[1]}.${m[2].toLowerCase()}`;
  const m2 = url.match(/\/images\/made\/images\/uploads\/([^_]+)_\d+_\d+shar/i);
  if (m2) return `${m2[1]}.jpg`;
  return null;
}

function scan(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) scan(p);
    else if (/\.(js|mjs|html|json)$/.test(name)) {
      const text = readFileSync(p, "utf8");
      for (const m of text.matchAll(/https?:\/\/www\.tanzaniatourism\.com[^\s"'<>\\)]+/g)) {
        const url = m[0].replace(/[,;)]+$/, "");
        all.add(url);
        if (url.includes("/images/uploads/")) uploads.add(url);
        if (url.includes("/images/made/")) made.add(url);
        const base = normalizeUpload(url);
        if (base) bases.add(base);
      }
    }
  }
}

const bases = new Set();
scan("src");
console.log({ all: all.size, uploads: uploads.size, made: made.size, uniqueBases: bases.size });
