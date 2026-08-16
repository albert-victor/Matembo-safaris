/**
 * Import safari packages from tanzania-specialist.com
 * Run: npm run import:tanzania-specialist
 */
import { writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";
import {
  inferCircuit,
  inferSafariType,
  inferDestinations,
  inferActivities,
} from "./lib/package-categorization.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/tanzania-specialist-packages.js");
const PAGES_DIR = join(ROOT, "packages");
const IMG_DIR = join(ROOT, "assets/photos/tanzania-specialist");

const BASE = "https://tanzania-specialist.com";
const LISTING = `${BASE}/tanzania-safari/`;
const PACKAGE_LIMIT = 15;
const USD_TO_EUR = 0.92;
const CONCURRENCY = 3;

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

function decodeHtml(text = "") {
  return text
    .replace(/\\n/g, "\n")
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseDuration(text) {
  const t = text.toLowerCase();
  const dayNight = t.match(/(\d+)\s*days?\s*[/&]?\s*(\d+)?\s*nights?/i);
  if (dayNight) {
    const days = dayNight[1];
    const nights = dayNight[2];
    return nights ? `${days} Days / ${nights} Nights` : `${days} Day${days === "1" ? "" : "s"}`;
  }
  const daysOnly = t.match(/(\d+)\s*days?/i);
  if (daysOnly) {
    const d = daysOnly[1];
    return d === "1" ? "1 Day" : `${d} Days`;
  }
  const dayOnly = t.match(/(\d+)\s*day\b/i);
  if (dayOnly) return dayOnly[1] === "1" ? "1 Day" : `${dayOnly[1]} Days`;
  return text.trim() || "Flexible";
}

function slugFromUrl(url) {
  return url.replace(`${BASE}/itineraries/`, "").replace(/\/$/, "");
}

function toId(slug) {
  const base = slug.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return base.startsWith("ts-") ? base : `ts-${base}`;
}

function usdToEur(usd) {
  return Math.round(usd * USD_TO_EUR);
}

function formatEur(amount) {
  return `€${amount.toLocaleString("en-GB")}`;
}

function parsePriceUsd(text = "") {
  if (!text || /request|contact/i.test(text)) return null;
  const m = text.replace(/,/g, "").match(/\$\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

function titleCase(text = "") {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bNp\b/g, "NP")
    .replace(/\bUsd\b/g, "USD");
}

function localPhotoFallback(title, overview = "") {
  const t = `${title} ${overview}`.toLowerCase();
  const rules = [
    [/serengeti|migration|mara river/, "Serengeti_Gnus_7765.jpg"],
    [/ngorongoro/, "Ngorongoro_Crater_View_NCA.jpg"],
    [/tarangire/, "Tarangire_National_Park_Elephants_in_Trangire_River_35.jpg"],
    [/manyara/, "Lake_Manyara_National_Park_Flamingos_26.jpg"],
    [/zanzibar|honeymoon|beach/, "Zanzibar_Stone_Town_01.jpg"],
    [/kilimanjaro|arusha/, "Mount_Kilimanjaro_from_Amboseli.jpg"],
  ];
  for (const [re, file] of rules) {
    if (re.test(t) && existsSync(join(ROOT, "assets/photos", file))) {
      return `/assets/photos/${file}`;
    }
  }
  return "/assets/photos/Serengeti_Gnus_7765.jpg";
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function parseListingUrls(html) {
  const urls = [...html.matchAll(/href="(https:\/\/tanzania-specialist\.com\/itineraries\/[^"]+)"/gi)].map(
    (m) => m[1]
  );
  return [...new Set(urls)].slice(0, PACKAGE_LIMIT);
}

function parseHighlightItems(block = "") {
  return [...block.matchAll(/<li class="highlight-item">[\s\S]*?<\/div>\s*([^<]+)\s*<\/li>/gi)].map((m) =>
    decodeHtml(m[1])
  );
}

function parseDetailPage(html, url) {
  const titleRaw = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || "";
  const title = titleCase(decodeHtml(titleRaw));
  const metaLine = decodeHtml(html.match(/<h2[^>]*>([\s\S]*?)<\/h2>/i)?.[1] || "");
  const priceUsd = parsePriceUsd(metaLine);
  const durationRaw = metaLine.match(/(\d+\s*days?|\d+\s*day)/i)?.[1] || title;
  const duration = parseDuration(durationRaw);

  const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
  const metaDesc = decodeHtml(html.match(/name="description"\s+content="([^"]+)"/i)?.[1] || "");

  const overviewParas = [...html.matchAll(/<p>([\s\S]*?)<\/p>/gi)]
    .map((m) => decodeHtml(m[1]))
    .filter((p) => p.length > 80 && !/cookie|newsletter|javascript|tripadvisor/i.test(p));
  const overview = overviewParas.slice(0, 2).join("\n\n") || metaDesc || title;

  const includedBlock = html.match(/>\s*Included\s*<\/h3>([\s\S]*?)>\s*Excluded\s*<\/h3>/i)?.[1] || "";
  const excludedBlock = html.match(/>\s*Excluded\s*<\/h3>([\s\S]*?)(?:## Make your dream|<\/section>)/i)?.[1] || "";
  const inclusions = parseHighlightItems(includedBlock);
  const exclusions = parseHighlightItems(excludedBlock);

  const highlights = [];
  for (const m of html.matchAll(/<li>\s*<strong[^>]*>([^<]+)<\/strong>\s*<\/li>/gi)) {
    const item = decodeHtml(m[1]);
    if (item.length > 4 && item.length < 120) highlights.push(item);
  }

  const itinerary = [];
  for (const m of html.matchAll(
    /<h4[^>]*>\s*Day (\d+(?:\s*-\s*\d+)?)\s*[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>[\s\S]*?<p>([\s\S]*?)<\/p>/gi
  )) {
    itinerary.push({
      day: `Day ${decodeHtml(m[1])}`,
      title: decodeHtml(m[2]),
      summary: decodeHtml(m[3]).slice(0, 600),
    });
  }
  if (!itinerary.length) {
    for (const m of html.matchAll(/<strong[^>]*>\s*Day (\d+(?:\s*-\s*\d+)?):\s*<\/strong>\s*([^<]+)/gi)) {
      itinerary.push({
        day: `Day ${decodeHtml(m[1])}`,
        title: decodeHtml(m[2]),
        summary: "",
      });
    }
  }

  return {
    title,
    duration,
    priceUsd,
    overview: overview || metaDesc || title,
    ogImage,
    highlights: highlights.slice(0, 4),
    itinerary,
    inclusions,
    exclusions,
    url,
  };
}

async function downloadImage(imageUrl, slug) {
  if (!imageUrl) return null;
  const url = imageUrl.startsWith("http") ? imageUrl : `${BASE}${imageUrl}`;
  const ext = extname(url.split("?")[0]) || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".avif"].includes(ext.toLowerCase()) ? ext : ".jpg";
  const filename = `${slug}${safeExt}`;
  const dest = join(IMG_DIR, filename);
  if (existsSync(dest)) return `/assets/photos/tanzania-specialist/${filename}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    });
    if (!res.ok) return null;
    writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
    return `/assets/photos/tanzania-specialist/${filename}`;
  } catch {
    return null;
  }
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

function buildPackage(detail, slug, images) {
  const id = toId(slug);
  const context = [
    detail.title,
    detail.overview,
    ...(detail.itinerary || []).map((item) => `${item.day} ${item.title}`),
    ...(detail.inclusions || []),
  ].join(" ");
  const eur = detail.priceUsd != null ? usdToEur(detail.priceUsd) : null;
  const priceOnRequest = eur == null;
  const circuit = inferCircuit(context);
  const destinations = inferDestinations(context);
  const activities = inferActivities(context);
  const safariType = inferSafariType(context);
  const hero = images[0] || localPhotoFallback(detail.title, detail.overview);
  const gallery = images.length
    ? images.map((src, i) => ({ src, alt: `${detail.title} – photo ${i + 1}` }))
    : [{ src: hero, alt: detail.title }];

  const quickFacts = [
    { label: "Duration", value: detail.duration },
    { label: "Circuit", value: circuit },
    { label: "Safari Type", value: safariType },
    {
      label: "Price",
      value: priceOnRequest ? "On request" : `From ${formatEur(eur)} / person`,
    },
    { label: "Tailor-made", value: "Yes" },
  ];
  if (destinations.length) {
    quickFacts.splice(3, 0, {
      label: "Destinations",
      value: destinations.slice(0, 4).join(" · "),
    });
  }

  return {
    id,
    slug: id,
    circuit,
    badge: /group trip|small group/i.test(detail.title) ? "Group Safari" : "",
    duration: detail.duration,
    title: detail.title.replace(/\s+/g, " ").trim(),
    safariType,
    tailorMade: "Yes",
    reviewCount: 0,
    activities,
    destinations,
    highlights: detail.highlights.length
      ? detail.highlights
      : [
          destinations[0] || circuit,
          activities[0] || "Wildlife viewing",
          priceOnRequest ? "Private tailor-made safari" : `From ${formatEur(eur)} per person`,
        ],
    alt: detail.title,
    objectPosition: "center center",
    sourceUrl: detail.url,
    provider: "Tanzania Specialist",
    priceOnRequest,
    priceUsd: detail.priceUsd,
    priceEur: eur,
    priceCurrency: "EUR",
    priceLabel: priceOnRequest ? "Price on request" : `From ${formatEur(eur)} / person`,
    overview: detail.overview,
    quickFacts,
    itinerary: detail.itinerary,
    inclusions: detail.inclusions.length
      ? detail.inclusions
      : [
          "Private safari vehicle and professional guide",
          "Park fees and activities stated in your quotation",
          "Accommodation and meals stated in the itinerary",
          "Drinking water during safari drives",
        ],
    exclusions: detail.exclusions.length
      ? detail.exclusions
      : [
          "International flights and visas",
          "Travel insurance",
          "Personal purchases and optional activities",
          "Tips and gratuities",
        ],
    image: hero,
    gallery,
  };
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

async function main() {
  mkdirSync(IMG_DIR, { recursive: true });
  mkdirSync(PAGES_DIR, { recursive: true });

  console.log("Fetching Tanzania Specialist listing...");
  const listingHtml = await fetchHtml(LISTING);
  const urls = parseListingUrls(listingHtml);
  console.log(`Found ${urls.length} packages (limit ${PACKAGE_LIMIT}).`);

  const packages = await mapPool(urls, CONCURRENCY, async (url) => {
    const slug = slugFromUrl(url);
    try {
      const html = await fetchHtml(url);
      const detail = parseDetailPage(html, url);
      const images = [];
      const local = await downloadImage(detail.ogImage, slug);
      if (local) images.push(local);
      if (!images.length) images.push(localPhotoFallback(detail.title, detail.overview));
      const pkg = buildPackage(detail, slug, images);
      writeFileSync(join(PAGES_DIR, `${pkg.id}.html`), generatePackagePageHtml(pkg), "utf8");
      console.log(`  ✓ ${pkg.title.slice(0, 60)}… (${pkg.priceLabel}) [${pkg.circuit} / ${pkg.safariType}]`);
      return pkg;
    } catch (error) {
      console.warn(`  ✗ ${slug}: ${error.message}`);
      return null;
    }
  });

  const ok = packages.filter(Boolean);
  const file = `/** Auto-generated from tanzania-specialist.com – run: npm run import:tanzania-specialist */
export const tanzaniaSpecialistPackagesMeta = {
  count: ${ok.length},
  sourceUrl: "${LISTING}",
  currency: "EUR",
  usdToEurRate: ${USD_TO_EUR},
};

export const tanzaniaSpecialistPackages = ${serialize(ok, 0)};

export function getTanzaniaSpecialistPackageById(id) {
  return tanzaniaSpecialistPackages.find((pkg) => pkg.id === id) ?? null;
}
`;

  writeFileSync(OUT, file, "utf8");
  console.log(`\nWrote ${ok.length} packages → ${OUT}`);
  console.log(`Generated ${ok.length} detail pages → ${PAGES_DIR}/`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
