import {
  existsSync,
  mkdirSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { SITE_URL } from "./site-url.mjs";

const EXCLUDE = new Set([
  "package-view.html",
  "ui-demo.html",
  "tmp-northern.html",
  "mega-dropdown-mockups.html",
]);

const EXCLUDE_DIRS = new Set(["node_modules", "dist", "public", "scripts", ".git", ".cursor"]);

const EXCLUDE_PATHS = new Set([
  "/experiences/game-drives.html",
  "/experiences/cultural-visits.html",
]);

const SITEMAP_GROUPS = [
  { id: "pages", match: (path) => !path.slice(1).includes("/") },
  { id: "destinations", match: (path) => path.startsWith("/destinations/") },
  { id: "packages", match: (path) => path.startsWith("/packages/") },
  { id: "circuits", match: (path) => path.startsWith("/circuits/") },
  { id: "experiences", match: (path) => path.startsWith("/experiences/") },
  { id: "activities", match: (path) => path.startsWith("/activities/") },
];

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

function filePathFromUrl(path) {
  if (path === "/") return "index.html";
  return path.replace(/^\//, "");
}

function lastmod(path) {
  const file = filePathFromUrl(path);
  if (!existsSync(file)) return null;
  return new Date(statSync(file).mtime).toISOString().slice(0, 10);
}

function priorityFor(path) {
  if (path === "/") return "1.0";
  if (path.match(/^\/(about|contact|safaris|destinations|circuits|experiences)\.html$/)) {
    return "0.9";
  }
  if (path.includes("/packages/")) return "0.7";
  return "0.8";
}

function locFor(path) {
  return `${SITE_URL}${path === "/" ? "/" : path}`;
}

function renderUrlset(paths) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map((path) => {
    const modified = lastmod(path);
    const lastmodTag = modified ? `\n    <lastmod>${modified}</lastmod>` : "";
    return `  <url>
    <loc>${locFor(path)}</loc>${lastmodTag}
    <changefreq>monthly</changefreq>
    <priority>${priorityFor(path)}</priority>
  </url>`;
  })
  .join("\n")}
</urlset>
`;
}

function renderSitemapIndex(files) {
  const today = new Date().toISOString().slice(0, 10);
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${files
  .map(
    (file) => `  <sitemap>
    <loc>${SITE_URL}/${file}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>
`;
}

function groupPaths(unique) {
  const grouped = Object.fromEntries(SITEMAP_GROUPS.map(({ id }) => [id, []]));

  for (const path of unique) {
    const group = SITEMAP_GROUPS.find(({ match }) => match(path));
    grouped[group?.id || "pages"].push(path);
  }

  return grouped;
}

export function generateSitemap(outDir = "public") {
  const urls = walkHtml(".")
    .filter((path) => !EXCLUDE_PATHS.has(path === "/index.html" ? "/" : path))
    .sort();
  const unique = [...new Set(urls.map((u) => (u === "/index.html" ? "/" : u)))];

  mkdirSync(outDir, { recursive: true });

  const grouped = groupPaths(unique);
  const childSitemaps = [];

  for (const { id } of SITEMAP_GROUPS) {
    const paths = grouped[id];
    if (!paths.length) continue;

    const filename = `sitemap-${id}.xml`;
    writeFileSync(join(outDir, filename), renderUrlset(paths), "utf8");
    childSitemaps.push(filename);
  }

  writeFileSync(join(outDir, "sitemap.xml"), renderSitemapIndex(childSitemaps), "utf8");

  const robots = `# Matembo Safari & Tours — ${SITE_URL}
User-agent: *
Allow: /

Disallow: /package-view.html
Disallow: /ui-demo.html
Disallow: /mega-dropdown-mockups.html

Sitemap: ${SITE_URL}/sitemap.xml
`;

  writeFileSync(join(outDir, "robots.txt"), robots, "utf8");

  return { urlCount: unique.length, sitemapCount: childSitemaps.length, outDir };
}

if (process.argv[1]?.includes("generate-sitemap")) {
  const outDir = process.argv[2] || "public";
  const result = generateSitemap(outDir);
  console.log(
    `Generated sitemap index + ${result.sitemapCount} child sitemaps (${result.urlCount} URLs) and robots.txt → ${result.outDir}/`
  );
}
