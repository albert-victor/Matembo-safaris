import { existsSync, mkdirSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const SITE_URL = "https://www.matembosafaris.com";

const EXCLUDE = new Set([
  "package-view.html",
  "ui-demo.html",
  "tmp-northern.html",
]);

const EXCLUDE_DIRS = new Set(["node_modules", "dist", "scripts", ".git"]);

function walkHtml(dir, urls = []) {
  if (!existsSync(dir)) return urls;

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;

    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walkHtml(full, urls);
      continue;
    }

    if (!entry.name.endsWith(".html") || EXCLUDE.has(entry.name)) continue;

    const rel = full.replace(/\\/g, "/").replace(/^\.\//, "");
    urls.push(`/${rel === "index.html" ? "" : rel}`);
  }

  return urls;
}

export function generateSitemap(outDir = "public") {
  const urls = walkHtml(".").sort();
  const unique = [...new Set(urls.map((u) => (u === "/index.html" ? "/" : u)))];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${unique
  .map((path) => {
    const loc = `${SITE_URL}${path === "/" ? "/" : path}`;
    const priority =
      path === "/"
        ? "1.0"
        : path.match(/^\/(about|contact|safaris|destinations|circuits|experiences)\.html$/)
          ? "0.9"
          : path.includes("/packages/")
            ? "0.7"
            : "0.8";
    return `  <url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;

  const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "sitemap.xml"), xml, "utf8");
  writeFileSync(join(outDir, "robots.txt"), robots, "utf8");

  return { urlCount: unique.length, outDir };
}

if (process.argv[1]?.includes("generate-sitemap")) {
  const outDir = process.argv[2] || "public";
  const result = generateSitemap(outDir);
  console.log(`Generated sitemap (${result.urlCount} URLs) and robots.txt → ${result.outDir}/`);
}
