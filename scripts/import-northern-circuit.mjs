/**
 * Import Northern Circuit destinations from tanzaniatourism.com
 * Run: npm run import:northern
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { extractListingCards as parseListingCards } from "./lib/ttb-listing.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/northern-circuit-destinations.js");
const PAGES_DIR = join(ROOT, "destinations");

const BASE = "https://www.tanzaniatourism.com";
const LISTING = `${BASE}/destinations/northern-circuit`;
const SOURCE_PAGE = LISTING;
const MAX_GALLERY = 12;
const MIN_GALLERY = 10;
const CARD_IMAGES = 3;

const SCRIPT_LABELS = {
  serengeti: "Endless Plains",
  kilimanjaro: "Roof of Africa",
  arusha: "Mount Meru Gateway",
  manyara: "Tree-Climbing Lions",
  ngorongoro: "Africa's Eden",
  tarangire: "Baobab Country",
  mkomazi: "Black Rhino Haven",
  lengai: "Mountain of God",
  natron: "Flamingo Lake",
  kondoa: "Ancient Rock Art",
  chala: "Crater Lake",
  jipe: "Border Waters",
  eyasi: "Hadzabe Lands",
  meru: "Skyline Trek",
};

function absUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}

function isTtbImage(url) {
  return typeof url === "string" && url.startsWith(`${BASE}/images/`);
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugToId(slug) {
  const map = {
    "mount-kilimanjaro-national-park": "kilimanjaro",
    "mount-meru": "meru",
    "mount-oldoinyo-lengai": "mount-oldoinyo-lengai",
    "ngorongoro-crater": "ngorongoro",
    "lake-manyara-national-park": "manyara",
    "lake-natron": "natron",
    "lake-chala": "chala",
    "lake-jipe": "jipe",
    "lake-eyasi": "eyasi",
    "arusha-national-park": "arusha",
    "tarangire-national-park": "tarangire",
    "serengeti-national-park": "serengeti",
    "mkomazi-national-park": "mkomazi",
    "kondoa-rock-art-sites": "kondoa",
  };
  return map[slug] || slug.replace(/-national-park$/, "");
}

function shortName(fullName) {
  return fullName
    .replace(/ National Park$/i, "")
    .replace(/^Mount /i, "")
    .replace(/^Lake /i, "Lake ");
}

function guessScriptLabel(id, name) {
  if (SCRIPT_LABELS[id]) return SCRIPT_LABELS[id];
  if (/lake/i.test(name)) return "Rift Valley Jewel";
  if (/mount/i.test(name)) return "Highland Ascent";
  return "Northern Discovery";
}

function decodeEntities(text = "") {
  return stripHtml(text);
}

/** Strip only EE crop/resize suffixes — keep original filename IDs like _7765 */
function cleanUploadFilename(filename) {
  return filename
    .replace(/_550_550[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i, "");
}

function imageKey(url) {
  const file = url.split("/").pop()?.split("?")[0] || url;
  return cleanUploadFilename(file).toLowerCase();
}

function uploadsCandidates(rawUrl) {
  const url = absUrl(rawUrl);
  if (!isTtbImage(url)) return [];

  const candidates = [];

  if (url.includes("/images/uploads/")) {
    const file = url.split("/images/uploads/")[1]?.split("?")[0];
    if (file) {
      candidates.push(`${BASE}/images/uploads/${file}`);
      const cleaned = cleanUploadFilename(file);
      if (cleaned !== file) candidates.push(`${BASE}/images/uploads/${cleaned}`);
    }
  }

  if (url.includes("/images/made/")) {
    const match = url.match(/\/images\/uploads\/([^/?"'\\s]+)/i);
    if (match) {
      const file = match[1];
      candidates.push(`${BASE}/images/uploads/${cleanUploadFilename(file)}`);
      candidates.push(absUrl(url));
    }
  }

  return [...new Set(candidates.filter(Boolean))];
}

async function resolveWorkingUrl(rawUrl, cache) {
  const candidates = uploadsCandidates(rawUrl);
  for (const candidate of candidates) {
    if (cache.has(candidate)) {
      if (cache.get(candidate)) return candidate;
      continue;
    }
    try {
      const res = await fetch(candidate, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      });
      const ok = res.ok;
      cache.set(candidate, ok);
      if (ok) return candidate;
    } catch {
      cache.set(candidate, false);
    }
  }
  return null;
}

function extractListingCards(html) {
  return parseListingCards(html, {
    circuitLabel: "Northern Circuit",
    decodeEntities,
    absUrl,
  });
}

function extractPaginationUrls(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/destinations\/northern-circuit\/P\d+)"/g)].map(
        (m) => m[1]
      )
    ),
  ];
}

function extractRawImageUrls(html, fallbackImage) {
  const uploads = [
    ...html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi),
  ].map((m) => m[0]);
  const made = [...html.matchAll(/\/images\/made\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) =>
    absUrl(m[0])
  );
  const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";

  return [...new Set([og, fallbackImage, ...uploads, ...made].filter(isTtbImage))];
}

function extractParagraphs(html) {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter(
      (p) =>
        p.length > 60 &&
        !/Subscribe|Sign up|cookie|Safari destination including|Tours & Safaris|Read more|Share this/i.test(p)
    );
}

function highlightsFromText(description, category) {
  const bits = [];
  if (/migration/i.test(description)) bits.push("Great Migration");
  if (/big five|lion|elephant|rhino|leopard|buffalo/i.test(description)) bits.push("Wildlife viewing");
  if (/crater|caldera/i.test(description)) bits.push("Crater scenery");
  if (/mount|climb|summit|peak/i.test(description)) bits.push("Mountain routes");
  if (/lake|flamingo|canoe/i.test(description)) bits.push("Lakes & birdlife");
  if (/baobab|elephant herd/i.test(description)) bits.push("Elephant country");
  if (/cultural|rock art|hadzabe|maasai/i.test(description)) bits.push("Culture & heritage");
  if (category) bits.push(category.replace("Northern Circuit |", "").trim());
  return [...new Set(bits)].slice(0, 3);
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed ${url} (${res.status})`);
  return res.text();
}

async function loadAllListingCards() {
  const firstHtml = await fetchHtml(LISTING);
  const pages = [LISTING, ...extractPaginationUrls(firstHtml)];
  const map = new Map();

  for (const page of pages) {
    const html = page === LISTING ? firstHtml : await fetchHtml(page);
    extractListingCards(html).forEach((card) => map.set(card.href, card));
  }

  return [...map.values()];
}

function scoreImageUrl(url) {
  let score = 0;
  if (url.includes("/images/uploads/")) score += 10;
  if (!/_550_|shar-|brig-|_c1\./i.test(url)) score += 5;
  if (/\.jpg$/i.test(url)) score += 2;
  if (/thumb|icon|logo|banner|map/i.test(url)) score -= 20;
  return score;
}

function sortRawUrls(rawUrls) {
  return [...rawUrls].sort((a, b) => scoreImageUrl(b) - scoreImageUrl(a));
}

async function buildVerifiedGallery(rawUrls, cache, limit = MAX_GALLERY) {
  const verified = [];
  const seenKeys = new Set();
  const sorted = sortRawUrls(rawUrls);

  for (const raw of sorted) {
    if (verified.length >= limit) break;

    const resolved = await resolveWorkingUrl(raw, cache);
    if (!resolved) continue;

    const key = imageKey(resolved);
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    verified.push(resolved);
  }

  return verified;
}

function pickCardImages(imageEntries) {
  const picked = [];
  const keys = new Set();
  for (const entry of imageEntries) {
    const key = imageKey(entry.src);
    if (keys.has(key)) continue;
    keys.add(key);
    picked.push(entry);
    if (picked.length >= CARD_IMAGES) break;
  }
  return picked;
}

function serialize(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (obj === null) return "null";
  if (typeof obj === "string") return JSON.stringify(obj);
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) {
    if (!obj.length) return "[]";
    return `[\n${obj.map((v) => `${padIn}${serialize(v, indent + 1)}`).join(",\n")},\n${pad}]`;
  }
  const entries = Object.entries(obj)
    .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
    .join(",\n");
  return `{\n${entries},\n${pad}}`;
}

function escapeHtmlAttr(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateDestinationPage(dest) {
  const hero = dest.gallery[0]?.src || dest.images[0]?.src;
  const desc = escapeHtmlAttr(dest.description.slice(0, 155));

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${escapeHtmlAttr(dest.fullName)} | Matembo Safari & Tours" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${escapeHtmlAttr(hero)}" />
    <title>${escapeHtmlAttr(dest.fullName)} | Matembo Safari & Tours</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/styles/tokens.css" />
    <link rel="stylesheet" href="/src/styles/buttons.css" />
    <link rel="stylesheet" href="/src/styles/site.css" />
    <link rel="stylesheet" href="/src/styles/footer.css" />
    <link rel="stylesheet" href="/src/styles/nav.css" />
    <link rel="stylesheet" href="/src/styles/destination-view.css" />
  </head>
  <body data-destination-id="${escapeHtmlAttr(dest.id)}">
    <div id="site-nav-root"></div>
    <main id="destination-view-root"></main>
    <div id="site-footer"></div>
    <script type="module" src="/src/js/destination-view-main.js"></script>
  </body>
</html>
`;
}

console.log("Importing Northern Circuit from tanzaniatourism.com…");
const listing = await loadAllListingCards();
console.log(`Found ${listing.length} destinations on listing pages.`);

const urlCache = new Map();
const destinations = [];
let totalVerified = 0;
let totalRejected = 0;

for (const card of listing) {
  const slug = card.href.split("/destination/")[1].replace(/\/$/, "");
  const id = slugToId(slug);
  const detailHtml = await fetchHtml(card.href);
  const rawUrls = extractRawImageUrls(detailHtml, card.cardImage);
  const paragraphs = extractParagraphs(detailHtml);

  const verifiedUrls = await buildVerifiedGallery(rawUrls, urlCache, MAX_GALLERY);
  totalVerified += verifiedUrls.length;

  if (verifiedUrls.length < MIN_GALLERY) {
    console.warn(`⚠ ${card.name}: only ${verifiedUrls.length} working images (need ${MIN_GALLERY}) — skipped`);
    continue;
  }

  const imageEntries = verifiedUrls.map((src, i) => ({
    src,
    alt: `${card.name}${i ? ` — view ${i + 1}` : ""}`,
  }));

  const uniqueForCards = pickCardImages(imageEntries);

  const tagline =
    paragraphs[0]?.length > 160
      ? `${paragraphs[0].slice(0, 157).trim()}…`
      : paragraphs[0] || "";

  destinations.push({
    id,
    slug,
    circuit: "northern",
    circuitLabel: "Northern Circuit",
    name: shortName(card.name),
    fullName: card.name,
    scriptLabel: guessScriptLabel(id, card.name),
    region: "Northern Tanzania",
    category: card.category,
    bestSeason: "Jun – Oct",
    journeys: `${card.tourCount} tours · ${card.reviewCount} reviews`,
    tagline,
    description: paragraphs[0] || "",
    descriptions: paragraphs.slice(0, 8),
    highlights: highlightsFromText(paragraphs[0] || "", card.category),
    sourceUrl: card.href,
    images: uniqueForCards,
    gallery: imageEntries,
  });

  console.log(`  ✓ ${card.name} — ${imageEntries.length} photos kept`);
}

console.log(`\nVerified ${totalVerified} URLs (${totalRejected} broken/rejected)`);

const file = `/** Auto-generated from tanzaniatourism.com — run: npm run import:northern */
export const TTB_COM_ORIGIN = ${JSON.stringify(BASE)};
export const TTB_NORTHERN_CIRCUIT_URL = ${JSON.stringify(SOURCE_PAGE)};

export const northernCircuitMeta = {
  id: "northern",
  name: "Northern Circuit",
  description: "Serengeti, Ngorongoro, Tarangire, Manyara, Kilimanjaro & the northern parks",
  sourceUrl: ${JSON.stringify(SOURCE_PAGE)},
};

export const northernCircuitDestinations = ${serialize(destinations, 1)};
`;

writeFileSync(OUT, file, "utf8");
console.log(`Exported ${destinations.length} destinations → ${OUT}`);

mkdirSync(PAGES_DIR, { recursive: true });
for (const dest of destinations) {
  writeFileSync(join(PAGES_DIR, `${dest.id}.html`), generateDestinationPage(dest), "utf8");
}
console.log(`Generated ${destinations.length} destination pages → ${PAGES_DIR}/`);
