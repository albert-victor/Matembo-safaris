/**
 * Import safari packages from tanzaniatourism.com sitemap
 * Run: npm run import:safaris
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/safari-packages.js");
const PAGES_DIR = join(ROOT, "packages");

const BASE = "https://www.tanzaniatourism.com";
const SITEMAP = `${BASE}/sitemap.xml`;
const MIN_PACKAGES = 50;
const CONCURRENCY = 8;
const MAX_GALLERY = 8;

function absUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}

function normalizeSafariUrl(url) {
  return url
    .replace("/index.php/safari/", "/safari/")
    .replace(/\/$/, "");
}

function slugFromUrl(url) {
  return normalizeSafariUrl(url).split("/safari/")[1];
}

function stripHtml(html = "") {
  return html
    .replace(/<br\s*\/?>/gi, " ")
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

function decodeEntities(text = "") {
  return stripHtml(text);
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

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

async function fetchSitemapSafariUrls() {
  const xml = await fetchHtml(SITEMAP);
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = [
    ...new Set(
      locs
        .filter((u) => u.includes("/safari/"))
        .map((u) => normalizeSafariUrl(u))
    ),
  ];
  return urls.sort();
}

function parseActivities(html) {
  const section = html.match(
    /<h3 class="text-22 fw-500 mt-30">\s*Activities\s*<\/h3>([\s\S]*?)<div class="border-top-light/m
  );
  if (!section) return [];
  return [
    ...new Set(
      [...section[1].matchAll(/<div class="text-15 ml-10">([^<]+)<\/div>/g)].map((m) =>
        decodeEntities(m[1])
      )
    ),
  ].filter(Boolean);
}

function parseDestinations(html) {
  const section = html.match(
    /Destination\/s Traveling[\s\S]*?<div class="swiper-wrapper">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/i
  );
  if (!section) return [];

  const destinations = [];
  const re =
    /<a href="([^"]+)" class="citiesCard[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<div class="text-14 text-light-1">([^<]*)<\/div>/gi;
  let match;
  while ((match = re.exec(section[1]))) {
    destinations.push({
      name: decodeEntities(match[2]),
      circuit: decodeEntities(match[3]),
      href: normalizeSafariUrl(absUrl(match[1])),
    });
  }
  return destinations;
}

function parseItinerary(html) {
  const section = html.match(/id="itinerary"[\s\S]*?<\/section>/i);
  if (!section) return [];

  const items = [];
  const dayRe =
    /<div class="text-14 fw-500">([^<]+)<\/div>[\s\S]*?<div class="text-18 lh-15 fw-500">([^<]+)<\/div>[\s\S]*?<div class="pt-15 ee-body">([\s\S]*?)<\/div>/gi;
  let match;
  while ((match = dayRe.exec(section[0]))) {
    items.push({
      day: decodeEntities(match[1]),
      title: decodeEntities(match[2]),
      summary: decodeEntities(match[3]),
    });
  }
  return items;
}

function parseOverview(html) {
  const match = html.match(
    /id="overview"[\s\S]*?<h3[^>]*>\s*Overview\s*<\/h3>[\s\S]*?<div class="text-17[^"]*">([\s\S]*?)<\/div>\s*<\/div>/i
  );
  return match ? decodeEntities(match[1]) : "";
}

function isTtbImage(url) {
  return typeof url === "string" && url.startsWith(`${BASE}/images/`);
}

/** Strip only EE crop/resize suffixes – keep original filename IDs like _7765 */
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

function extractRawImageUrls(html) {
  const uploads = [
    ...html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi),
  ].map((m) => m[0]);
  const made = [...html.matchAll(/\/images\/made\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) =>
    absUrl(m[0])
  );
  const relative = [...html.matchAll(/src="(\/images\/[^"]+\.(?:jpg|jpeg|webp|png)[^"]*)"/gi)].map((m) =>
    absUrl(m[1])
  );
  const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";

  return [...new Set([og, ...uploads, ...made, ...relative].filter(isTtbImage))];
}

function parseImages(html) {
  return extractRawImageUrls(html);
}

function parseDetail(html, sourceUrl) {
  const title = decodeEntities(
    html.match(/<h1 class="text-30[^"]*">([^<]+)<\/h1>/)?.[1] || ""
  );
  const duration = decodeEntities(
    html.match(/Duration:\s*<br>\s*([^<]+)/i)?.[1] || "On request"
  );
  const safariType = decodeEntities(
    html.match(/Safari Type\s*<br>\s*([^<]+)/i)?.[1] || ""
  );
  const tailorMade = decodeEntities(
    html.match(/Can be Tailor-made:\s*<br>\s*([^<]+)/i)?.[1] || ""
  );

  const circuit =
    decodeEntities(
      html.match(
        /icon-location-2[\s\S]*?safaris\/category\/[^"]+">([^<]+)<\/a>/i
      )?.[1] || ""
    ) ||
    parseDestinations(html)[0]?.circuit ||
    "Tanzania";

  const reviewCount = Number(
    html.match(/text-light-1 ml-10">\s*\((\d+)\)/)?.[1] ||
      html.match(/\((\d+)\)<\/span>\s*<\/div>\s*<\/div>\s*<div class="row x-gap-20 y-gap-20/)?.[1] ||
      0
  );

  const overview = parseOverview(html);
  const activities = parseActivities(html);
  const destinations = parseDestinations(html);
  const itinerary = parseItinerary(html);
  const imageUrls = parseImages(html);
  const badge = reviewCount >= 200 ? "Popular" : null;

  return {
    id: slugFromUrl(sourceUrl),
    slug: slugFromUrl(sourceUrl),
    circuit,
    badge,
    duration,
    title,
    safariType,
    tailorMade,
    reviewCount,
    activities,
    destinations: destinations.map((d) => d.name),
    highlights: buildHighlights(activities, destinations, itinerary, overview),
    imageUrls,
    alt: title,
    objectPosition: "center center",
    sourceUrl,
    overview,
    quickFacts: buildQuickFacts({ duration, circuit, safariType, tailorMade, activities, destinations }),
    itinerary,
    inclusions: defaultInclusions(safariType),
    exclusions: defaultExclusions(),
  };
}

async function finalizePackage(parsed, imageCache) {
  const verified = await buildVerifiedGallery(parsed.imageUrls, imageCache, MAX_GALLERY);
  const gallery = verified.map((src, i) => ({
    src,
    alt: `${parsed.title}${i ? ` – photo ${i + 1}` : ""}`,
  }));

  const { imageUrls, ...rest } = parsed;
  return {
    ...rest,
    image: gallery[0]?.src || "",
    alt: gallery[0]?.alt || parsed.title,
    gallery,
  };
}

function buildHighlights(activities, destinations, itinerary, overview) {
  const items = [];

  for (const dest of destinations.slice(0, 2)) {
    items.push(dest.name);
  }
  for (const act of activities.slice(0, 2)) {
    if (!items.includes(act)) items.push(act);
  }
  for (const day of itinerary.slice(0, 2)) {
    const line = day.title.replace(/\s+/g, " ").trim();
    if (line && !items.includes(line)) items.push(line);
  }

  if (items.length < 3 && overview) {
    const snippet = overview.length > 90 ? `${overview.slice(0, 87).trim()}…` : overview;
    items.push(snippet);
  }

  return items.filter(Boolean).slice(0, 5);
}

function buildQuickFacts({ duration, circuit, safariType, tailorMade, activities, destinations }) {
  const facts = [
    { label: "Duration", value: duration },
    { label: "Circuit", value: circuit },
  ];
  if (safariType) facts.push({ label: "Safari Type", value: safariType });
  if (destinations.length) {
    facts.push({
      label: "Destinations",
      value: destinations
        .slice(0, 3)
        .map((d) => d.name)
        .join(" · "),
    });
  }
  if (activities.length) {
    facts.push({ label: "Activities", value: activities.slice(0, 4).join(" · ") });
  }
  if (tailorMade) facts.push({ label: "Tailor-made", value: tailorMade });
  return facts;
}

function defaultInclusions(safariType) {
  const base = [
    "Professional guide services as per itinerary",
    "Park fees and conservation levies where applicable",
    "Accommodation and meals as outlined in the programme",
    "Safari vehicle and transport between destinations",
  ];
  if (/climb|trek|mountain/i.test(safariType)) {
    base.push("Mountain crew and camping equipment where applicable");
  }
  if (/beach|zanzibar|island/i.test(safariType)) {
    base.push("Coastal transfers and island excursions as listed");
  }
  return base;
}

function defaultExclusions() {
  return [
    "International flights and visa fees",
    "Travel insurance and personal expenses",
    "Optional activities not mentioned in the itinerary",
    "Gratuities for guides, drivers, and lodge staff",
  ];
}

function escapeHtmlAttr(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generatePackagePageHtml(pkg) {
  const desc = escapeHtmlAttr((pkg.overview || pkg.title).slice(0, 155));
  const hero = pkg.gallery?.[0]?.src || pkg.image;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${escapeHtmlAttr(pkg.title)} | Matembo Safari & Tours" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${escapeHtmlAttr(hero)}" />
    <title>${escapeHtmlAttr(pkg.title)} | Matembo Safari & Tours</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/styles/tokens.css" />
    <link rel="stylesheet" href="/src/styles/buttons.css" />
    <link rel="stylesheet" href="/src/styles/cards.css" />
    <link rel="stylesheet" href="/src/styles/site.css" />
    <link rel="stylesheet" href="/src/styles/footer.css" />
    <link rel="stylesheet" href="/src/styles/nav.css" />
    <link rel="stylesheet" href="/src/styles/package-page.css" />
  </head>
  <body data-package-id="${escapeHtmlAttr(pkg.id)}">
    <div id="site-nav-root"></div>
    <main id="package-view-root"></main>
    <div id="site-footer"></div>
    <script type="module" src="/src/js/package-page-main.js"></script>
  </body>
</html>
`;
}

async function mapPool(items, limit, fn) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function main() {
  console.log("Fetching sitemap…");
  const urls = await fetchSitemapSafariUrls();
  console.log(`Found ${urls.length} safari URLs in sitemap`);

  if (urls.length < MIN_PACKAGES) {
    throw new Error(`Expected at least ${MIN_PACKAGES} packages, found ${urls.length}`);
  }

  const packages = [];
  let failed = 0;
  const imageCache = new Map();

  await mapPool(urls, CONCURRENCY, async (url, i) => {
    try {
      const html = await fetchHtml(url);
      const parsed = parseDetail(html, url);
      const pkg = await finalizePackage(parsed, imageCache);
      if (!pkg.title || !pkg.image) {
        console.warn(`⚠ Skipped ${url} – missing title or image`);
        failed++;
        return;
      }
      packages[i] = pkg;
      console.log(`  ✓ [${i + 1}/${urls.length}] ${pkg.title}`);
    } catch (err) {
      failed++;
      console.warn(`⚠ Failed ${url}: ${err.message}`);
    }
  });

  const valid = packages.filter(Boolean).sort((a, b) => b.reviewCount - a.reviewCount);
  console.log(`\nImported ${valid.length} packages (${failed} failed/skipped)`);

  const safariCircuitOrder = [
    "Northern Circuit",
    "Southern Circuit",
    "Eastern Circuit",
    "Western Circuit",
    "Zanzibar Island",
    "Mafia Island",
    "Central Circuit",
    "Ocean Islands",
  ].filter((label) => valid.some((pkg) => pkg.circuit === label));

  const popularIds = valid
    .filter((p) => p.reviewCount >= 190)
    .slice(0, 6)
    .map((p) => p.id);

  const file = `/** Auto-generated from tanzaniatourism.com – run: npm run import:safaris */
export const TTB_COM_ORIGIN = ${JSON.stringify(BASE)};
export const TTB_SAFARIS_URL = ${JSON.stringify(`${BASE}/safaris`)};

export const safariPackagesMeta = {
  count: ${valid.length},
  sourceUrl: ${JSON.stringify(`${BASE}/safaris`)},
  importedFrom: "sitemap",
  popularIds: ${JSON.stringify(popularIds)},
};

export const safariPackages = ${serialize(valid, 1)};

export const safariCircuitOrder = ${JSON.stringify(safariCircuitOrder)};

/** @param {string} id */
export function getSafariPackageById(id) {
  return safariPackages.find((pkg) => pkg.id === id) ?? null;
}

/** Card-ready list (same objects, stable export for renderers) */
export const safariPackageCards = safariPackages;
`;

  writeFileSync(OUT, file, "utf8");
  console.log(`Exported → ${OUT}`);
  console.log(`Popular IDs: ${popularIds.join(", ")}`);

  mkdirSync(PAGES_DIR, { recursive: true });
  for (const pkg of valid) {
    writeFileSync(
      join(PAGES_DIR, `${pkg.id}.html`),
      generatePackagePageHtml(pkg),
      "utf8"
    );
  }
  console.log(`Generated ${valid.length} package pages → ${PAGES_DIR}/`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
