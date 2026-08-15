import { readFileSync, writeFileSync } from "node:fs";

const SITE_URL = "https://www.matembosafaris.com";
const DEFAULT_OG = `${SITE_URL}/assets/hero/new%20hero.jpg`;

const ROOT_PAGES = [
  "index.html",
  "about.html",
  "contact.html",
  "circuits.html",
  "destinations.html",
  "experiences.html",
  "safaris.html",
  "trekkings.html",
  "game-drives.html",
  "bird-watching.html",
  "night-game-drives.html",
  "cultural-visits.html",
  "beach-holiday.html",
  "walking-safaris.html",
  "tourist-attractions.html",
  "adventure-safaris.html",
  "ruaha-safaris.html",
];

const CANONICAL_ALIASES = {
  "experiences/game-drives.html": "game-drives.html",
  "experiences/cultural-visits.html": "cultural-visits.html",
};

function pageUrl(path) {
  return path === "index.html" ? `${SITE_URL}/` : `${SITE_URL}/${path}`;
}

function escapeAttr(value) {
  return value.replace(/"/g, "&quot;");
}

function extractMeta(html, name) {
  const match = html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`, "i"));
  return match?.[1] || "";
}

function extractTitle(html) {
  return html.match(/<title>([^<]*)<\/title>/i)?.[1] || "Matembo Safari & Tours";
}

function injectSeo(file, canonicalPath) {
  let html = readFileSync(file, "utf8");
  const canonical = pageUrl(canonicalPath);
  const title = extractTitle(html);
  const description = extractMeta(html, "description");
  const snippet = `
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Matembo Safari & Tours" />
    <meta property="og:title" content="${escapeAttr(title)}" />
    <meta property="og:description" content="${escapeAttr(description)}" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${DEFAULT_OG}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeAttr(title)}" />
    <meta name="twitter:description" content="${escapeAttr(description)}" />
    <meta name="twitter:image" content="${DEFAULT_OG}" />`;

  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i, `<link rel="canonical" href="${canonical}" />`);
    if (!html.includes('property="og:title"')) {
      html = html.replace("</title>", `</title>${snippet}`);
    }
  } else {
    html = html.replace("</title>", `</title>${snippet}`);
  }

  writeFileSync(file, html, "utf8");
}

for (const page of ROOT_PAGES) {
  injectSeo(page, page);
}

for (const [alias, target] of Object.entries(CANONICAL_ALIASES)) {
  injectSeo(alias, target);
}

console.log(`Injected SEO meta for ${ROOT_PAGES.length + Object.keys(CANONICAL_ALIASES).length} pages.`);
