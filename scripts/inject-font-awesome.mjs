import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import { FONT_AWESOME_HEAD_SNIPPET } from "../src/lib/font-awesome-snippet.js";

const ROOT = process.cwd();
const SKIP_DIRS = new Set(["dist", "node_modules", ".git"]);

function walkHtml(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      if (SKIP_DIRS.has(entry)) continue;
      walkHtml(full, files);
      continue;
    }
    if (entry.endsWith(".html")) files.push(full);
  }
  return files;
}

function injectFontAwesome(file) {
  let html = readFileSync(file, "utf8");
  if (!html.includes("<head>") || html.includes("font-awesome/6.5.1")) {
    return false;
  }

  html = html.replace(
    /<link rel="preload" as="style" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.1\/css\/all\.min\.css"[^>]*>\s*/g,
    ""
  );
  html = html.replace(
    /<noscript><link rel="stylesheet" href="https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome\/6\.5\.1\/css\/all\.min\.css"[^>]*><\/noscript>\s*/g,
    ""
  );

  html = html.replace("<head>", `<head>${FONT_AWESOME_HEAD_SNIPPET}`);
  writeFileSync(file, html, "utf8");
  return true;
}

let updated = 0;
for (const file of walkHtml(ROOT)) {
  if (injectFontAwesome(file)) updated += 1;
}

console.log(`Injected Font Awesome into ${updated} HTML files.`);
