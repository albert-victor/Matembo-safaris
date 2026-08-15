import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SKIP_DIRS = new Set(["node_modules", "dist", ".git", "scripts", ".cursor"]);
const SKIP_FILES = new Set(["package-view.html", "ui-demo.html", "tmp-northern.html", "mega-dropdown-mockups.html"]);

function walkHtml(dir, files = []) {
  if (!existsSync(dir)) return files;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full, files);
      continue;
    }
    if (entry.name.endsWith(".html") && !SKIP_FILES.has(entry.name)) {
      files.push(full);
    }
  }

  return files;
}

function minifyHtmlSource(content) {
  return content
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\n+(<\/?(?:html|head|body|main|section|article|header|footer|nav|div|ul|ol|li|p|h[1-6]|script|link|meta|title)[^>]*>)/gi, "\n$1")
    .replace(/(<[^>]+>)\n\n+/g, "$1\n")
    .trimEnd()
    .concat("\n");
}

const files = walkHtml(".");
let changed = 0;

for (const file of files) {
  const before = readFileSync(file, "utf8");
  const after = minifyHtmlSource(before);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    changed += 1;
  }
}

console.log(`Minified source HTML whitespace in ${changed}/${files.length} files.`);
