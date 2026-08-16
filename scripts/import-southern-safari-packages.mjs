/**
 * Import southern & eastern safari packages (Matembo catalogue).
 * Run: npm run import:southern-safaris
 */
import {
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
  unlinkSync,
  copyFileSync,
} from "node:fs";
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
const OUT = join(ROOT, "src/data/southern-safari-packages.js");
const PAGES_DIR = join(ROOT, "packages");
const IMG_DIR = join(ROOT, "assets/photos/safaris");
const LEGACY_IMG_DIR = join(ROOT, "assets/photos/kihindo");

const BASE = "https://kihindosafaris.com";
const LISTING = `${BASE}/safari-package/`;
const USD_TO_EUR = 0.92;
const CONCURRENCY = 4;
const BRAND = "Matembo Safari & Tours";

const DEFAULT_HIGHLIGHTS = [
  "Private local guiding – Travel with a professional Matembo guide and the freedom to pause at meaningful sightings.",
  "Thoughtful logistics – Transport, park movements and accommodation are coordinated as one seamless itinerary.",
  "Authentic Tanzania – Experience wildlife, landscapes and local character beyond a standard game-drive schedule.",
  "Made around you – Adjust the route, comfort, pace and extensions with our Iringa planning team.",
];

function sanitizeCopy(text = "") {
  if (!text) return "";
  return String(text)
    .replace(/Kihindo Safaris/gi, BRAND)
    .replace(/Kihindo Tours?(?: & Safaris)?/gi, BRAND)
    .replace(/professional Kihindo guide/gi, "professional Matembo guide")
    .replace(/Meet your Kihindo guide/gi, "Meet your Matembo guide")
    .replace(/Your Kihindo team/gi, "Your Matembo team")
    .replace(/\bKihindo\b/gi, "Matembo")
    .replace(/kihindosafaris\.com/gi, "")
    .replace(/Dar es Salaam planning team/gi, "Iringa planning team")
    .replace(/\s+/g, " ")
    .trim();
}

function matemboOverviewSuffix() {
  return "Your Matembo team coordinates the route, guiding, park arrangements and selected accommodation from Iringa. The journey remains private, allowing wildlife sightings and your interests to shape the pace.";
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

function decodeHtml(text = "") {
  return text
    .replace(/\\n/g, "\n")
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function slugFromPath(path) {
  return path.replace(/^\/safaris\//, "").replace(/\/$/, "");
}

function toId(slug) {
  return slug.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function usdToEur(usd) {
  return Math.round(usd * USD_TO_EUR);
}

function formatEur(amount) {
  return `€${amount.toLocaleString("en-GB")}`;
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
  if (dayOnly) {
    return dayOnly[1] === "1" ? "1 Day" : `${dayOnly[1]} Days`;
  }
  return text.trim() || "Flexible";
}

function localPhotoFallback(title, overview = "") {
  const t = `${title} ${overview}`.toLowerCase();
  const rules = [
    [/nyerere|selous/, "Nyerere_National_Park_Crocodiles_101.jpg"],
    [/mikumi/, "Mikumi_National_Park_Elephants_101.jpg"],
    [/ruaha/, "Ruaha_National_Park_Hippos_47.jpg"],
    [/udzungwa/, "Udzungwa_National_Park_Sanje_Waterfalls_21.jpg"],
    [/serengeti/, "Serengeti_Gnus_7765.jpg"],
    [/ngorongoro/, "Ngorongoro_Crater_View_NCA.jpg"],
    [/tarangire/, "Tarangire_National_Park_Elephants_in_Trangire_River_35.jpg"],
    [/manyara/, "Lake_Manyara_National_Park_Flamingos_26.jpg"],
    [/kilwa|songomnara/, "Kilwa_Kisiwani_Ruins_01.jpg"],
    [/zanzibar/, "Zanzibar_Stone_Town_01.jpg"],
    [/dar es salaam|city tour/, "Dar_es_Salaam_Skyline_01.jpg"],
    [/uluguru/, "Uluguru_Mountains_from_Morogoro_01.jpg"],
  ];
  for (const [re, file] of rules) {
    if (re.test(t) && existsSync(join(ROOT, "assets/photos", file))) {
      return `/assets/photos/${file}`;
    }
  }
  return "/assets/photos/Mikumi_National_Park_Elephants_101.jpg";
}

async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    redirect: "follow",
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function parseListingCards(html) {
  const cards = [];
  const re =
    /<article class="tourcard">[\s\S]*?href="(\/safaris\/[^"]+)"[\s\S]*?<span>([^<]*)<\/span><b class="tourprice">([^<]*)<\/b>[\s\S]*?<h3><a href="[^"]+">([^<]*)<\/a><\/h3><p>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = re.exec(html))) {
    const [, path, durationRaw, priceRaw, title, teaser] = match;
    cards.push({
      path,
      url: `${BASE}${path}`,
      slug: slugFromPath(path),
      durationRaw: decodeHtml(durationRaw),
      priceRaw: decodeHtml(priceRaw),
      title: decodeHtml(title),
      teaser: decodeHtml(teaser),
    });
  }
  return cards;
}

function parsePriceUsd(priceRaw) {
  if (!priceRaw || /price on request/i.test(priceRaw)) return null;
  const m = priceRaw.replace(/,/g, "").match(/\$?\s*(\d+(?:\.\d+)?)/);
  return m ? Number(m[1]) : null;
}

function parseDetailPage(html, listing) {
  const title =
    decodeHtml(html.match(/<h1>([^<]+)<\/h1>/i)?.[1] || listing.title);
  const duration =
    decodeHtml(
      html.match(/<small>DURATION<\/small>([^<]+)</i)?.[1] || listing.durationRaw
    ) || listing.durationRaw;

  const heroPrice =
    html.match(/<small>STARTING FROM<\/small>([^<]+)</i)?.[1] ||
    html.match(/<strong>\$(\d[\d,]*)<\/strong>/i)?.[0] ||
    listing.priceRaw;

  const overviewLead = decodeHtml(
    html.match(/<section id="overview"[\s\S]*?<p class="lead">([\s\S]*?)<\/p>/i)?.[1] || listing.teaser
  );
  const overviewExtra = decodeHtml(
    html.match(/<section id="overview"[\s\S]*?<p class="lead">[\s\S]*?<\/p>\s*<p>([\s\S]*?)<\/p>/i)?.[1] || ""
  );
  const overview = [overviewLead, overviewExtra].filter(Boolean).join("\n\n");

  const gallery = [];
  for (const m of html.matchAll(/<figure class="package-hero-slide[^"]*"[\s\S]*?<img src="([^"]+)" alt="([^"]*)"/gi)) {
    gallery.push({ src: m[1], alt: decodeHtml(m[2]) || title });
  }
  if (!gallery.length) {
    const bg = html.match(/style="background-image:url\('([^']+)'\)"/i)?.[1];
    if (bg) gallery.push({ src: bg, alt: title });
  }

  const highlights = [];
  const highlightBlock = html.match(/<section id="highlights"[\s\S]*?<\/section>/i)?.[0] || "";
  for (const m of highlightBlock.matchAll(
    /<div><b>\d+<\/b><h3>([^<]+)<\/h3><p>([\s\S]*?)<\/p><\/div>/gi
  )) {
    highlights.push(`${decodeHtml(m[1])} – ${decodeHtml(m[2])}`);
  }

  const itinerary = [];
  const itineraryBlock = html.match(/<section id="itinerary"[\s\S]*?<\/section>/i)?.[0] || "";
  for (const m of itineraryBlock.matchAll(
    /<details[^>]*><summary><b>(Day \d+)<\/b><span>([^<]*)<\/span>[\s\S]*?<p>([\s\S]*?)<\/p><\/details>/gi
  )) {
    itinerary.push({
      day: decodeHtml(m[1]),
      title: decodeHtml(m[2]),
      summary: decodeHtml(m[3]),
    });
  }

  const inclusions = [];
  const exclusions = [];
  const inclBlock = html.match(/<section id="included"[\s\S]*?<\/section>/i)?.[0] || "";
  for (const m of inclBlock.matchAll(/<h3>Included<\/h3><ul>([\s\S]*?)<\/ul>/gi)) {
    for (const li of m[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)) inclusions.push(decodeHtml(li[1]));
  }
  for (const m of inclBlock.matchAll(/<h3>Not included<\/h3><ul>([\s\S]*?)<\/ul>/gi)) {
    for (const li of m[1].matchAll(/<li>([\s\S]*?)<\/li>/gi)) exclusions.push(decodeHtml(li[1]));
  }

  return {
    title: sanitizeCopy(title),
    duration: parseDuration(duration),
    heroPrice,
    overview: sanitizeCopy(overview),
    gallery,
    highlights: highlights.map(sanitizeCopy).filter(Boolean),
    itinerary: itinerary.map((item) => ({
      day: sanitizeCopy(item.day),
      title: sanitizeCopy(item.title),
      summary: sanitizeCopy(item.summary),
    })),
    inclusions: inclusions.map(sanitizeCopy).filter(Boolean),
    exclusions: exclusions.map(sanitizeCopy).filter(Boolean),
  };
}

async function downloadImage(relativePath, slug, index = 0) {
  if (!relativePath) return null;
  const url = relativePath.startsWith("http") ? relativePath : `${BASE}${relativePath}`;
  const ext = extname(relativePath.split("?")[0]) || ".jpg";
  const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext.toLowerCase()) ? ext : ".jpg";
  const filename = index === 0 ? `${slug}${safeExt}` : `${slug}-${index}${safeExt}`;
  const dest = join(IMG_DIR, filename);
  if (existsSync(dest)) return `/assets/photos/safaris/${filename}`;

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    });
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    writeFileSync(dest, buf);
    return `/assets/photos/safaris/${filename}`;
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

function buildPackage(listing, detail, images) {
  const id = toId(listing.slug);
  const usd = parsePriceUsd(detail.heroPrice || listing.priceRaw);
  const eur = usd != null ? usdToEur(usd) : null;
  const priceOnRequest = eur == null;
  const context = [
    detail.title,
    detail.overview,
    listing.title,
    listing.teaser,
    ...(detail.itinerary || []).map((item) => `${item.day} ${item.title}`),
  ].join(" ");
  const circuit = inferCircuit(context);
  const destinations = inferDestinations(context);
  const activities = inferActivities(context);
  const safariType = inferSafariType(context);
  const hero = images[0] || localPhotoFallback(detail.title, detail.overview);
  const title = sanitizeCopy(detail.title.replace(/\s+/g, " ").trim());
  let overview = sanitizeCopy(detail.overview || listing.teaser || title);
  if (!overview || /^Your Matembo team coordinates/i.test(overview)) {
    overview = [sanitizeCopy(listing.teaser), matemboOverviewSuffix()].filter(Boolean).join("\n\n");
  } else if (!/Matembo team coordinates/i.test(overview)) {
    overview = `${overview}\n\n${matemboOverviewSuffix()}`;
  }

  const highlights = detail.highlights.length
    ? detail.highlights.map(sanitizeCopy).slice(0, 4)
    : DEFAULT_HIGHLIGHTS;

  const gallery = images.length
    ? images.map((src, i) => ({ src, alt: `${title} – photo ${i + 1}` }))
    : [{ src: hero, alt: title }];

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
    badge: "",
    duration: detail.duration,
    title,
    safariType,
    tailorMade: "Yes",
    reviewCount: 0,
    activities,
    destinations,
    highlights,
    alt: title,
    objectPosition: "center center",
    matemboPitch: "Tailor-made from Iringa with private guiding and seamless park logistics.",
    priceOnRequest,
    priceUsd: usd,
    priceEur: eur,
    priceCurrency: "EUR",
    priceLabel: priceOnRequest ? "Price on request" : `From ${formatEur(eur)} / person`,
    overview,
    quickFacts,
    itinerary: detail.itinerary.map((item) => ({
      day: sanitizeCopy(item.day),
      title: sanitizeCopy(item.title),
      summary: sanitizeCopy(item.summary) || "Private guided experience adapted to wildlife conditions and your interests.",
    })),
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

  if (existsSync(LEGACY_IMG_DIR)) {
    for (const file of readdirSync(LEGACY_IMG_DIR)) {
      const dest = join(IMG_DIR, file);
      if (!existsSync(dest)) copyFileSync(join(LEGACY_IMG_DIR, file), dest);
    }
  }

  for (const name of readdirSync(PAGES_DIR)) {
    if (name.startsWith("kihindo-") && name.endsWith(".html")) {
      unlinkSync(join(PAGES_DIR, name));
    }
  }

  console.log("Fetching southern safari listing...");
  const listingHtml = await fetchHtml(LISTING);
  const cards = parseListingCards(listingHtml);
  const unique = [...new Map(cards.map((c) => [c.slug, c])).values()];
  console.log(`Found ${unique.length} packages on listing page.`);

  const packages = await mapPool(unique, CONCURRENCY, async (listing) => {
    try {
      const html = await fetchHtml(listing.url);
      const detail = parseDetailPage(html, listing);
      const images = [];
      for (let i = 0; i < Math.min(detail.gallery.length, 4); i++) {
        const local = await downloadImage(detail.gallery[i].src, listing.slug, i);
        if (local) images.push(local);
      }
      if (!images.length) images.push(localPhotoFallback(detail.title, detail.overview));
      const pkg = buildPackage(listing, detail, images);
      writeFileSync(join(PAGES_DIR, `${pkg.id}.html`), generatePackagePageHtml(pkg), "utf8");
      console.log(`  ✓ ${pkg.title.slice(0, 60)}… (${pkg.priceLabel})`);
      return pkg;
    } catch (error) {
      console.warn(`  ✗ ${listing.slug}: ${error.message}`);
      return null;
    }
  });

  const ok = packages.filter(Boolean);
  const file = `/** Auto-generated southern & eastern safari catalogue – run: npm run import:southern-safaris */
export const southernSafariPackagesMeta = {
  count: ${ok.length},
  currency: "EUR",
  usdToEurRate: ${USD_TO_EUR},
};

export const southernSafariPackages = ${serialize(ok, 0)};

export function getSouthernSafariPackageById(id) {
  return southernSafariPackages.find((pkg) => pkg.id === id) ?? null;
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
