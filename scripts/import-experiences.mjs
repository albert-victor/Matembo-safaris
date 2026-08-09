/**
 * Import Where-to-Go experiences from tanzaniatourism.com
 * Run: npm run import:experiences
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/experiences-data.js");
const PAGES_DIR = join(ROOT, "experiences");

const BASE = "https://www.tanzaniatourism.com";
const MAX_GALLERY = 10;
const MIN_GALLERY = 4;
const CARD_IMAGES = 3;

const EXPERIENCE_SEEDS = [
  {
    id: "museums",
    name: "Museums",
    fullName: "Museums & Heritage",
    scriptLabel: "Stories in Stone",
    region: "Northern & Southern Tanzania",
    category: "Museum / Monument",
    bestSeason: "Year-round",
    desc: "Fossils, tribal history, and UNESCO-listed sites from Olduvai Gorge to Iringa's Kalenga Museum.",
    sourceUrls: [
      `${BASE}/destination/olduvai-gorge`,
      `${BASE}/safari/day-trip-to-isimila-stone-age-and-igeleke-rock-art-sites`,
    ],
  },
  {
    id: "game-drives",
    name: "Game Drives",
    fullName: "Game Drives",
    scriptLabel: "Wildlife on the Track",
    region: "All safari circuits",
    category: "Game Drives",
    bestSeason: "Jun – Oct · Jan – Mar",
    desc: "Private 4×4 drives across Serengeti, Ngorongoro, Ruaha, Nyerere and Tanzania's great parks.",
    sourceUrls: [
      `${BASE}/safari/5-days-serengeti-and-ngorongoro-crater-safari`,
      `${BASE}/destination/serengeti-national-park`,
    ],
  },
  {
    id: "cultural-visits",
    name: "Cultural Visits",
    fullName: "Cultural Visits",
    scriptLabel: "Meet the People",
    region: "Iringa · Maasai · Coast",
    category: "Cultural Visits",
    bestSeason: "Year-round",
    desc: "Respectful community days — Hehe history near Iringa, Chagga coffee villages, Maasai and Hadzabe encounters.",
    sourceUrls: [
      `${BASE}/safari/day-trip-to-isimila-stone-age-and-igeleke-rock-art-sites`,
      `${BASE}/safari/day-trip-to-materuni-waterfalls-and-coffee-tour`,
    ],
  },
  {
    id: "great-migration",
    name: "Great Migration",
    fullName: "Great Migration",
    scriptLabel: "River Crossings & Plains",
    region: "Serengeti · Mara",
    category: "Great Migration",
    bestSeason: "Jul – Oct · Dec – Mar",
    desc: "Follow wildebeest herds, river crossings, and predator action on the Serengeti–Mara corridor.",
    sourceUrls: [
      `${BASE}/safari/5-days-serengeti-and-ngorongoro-crater-safari`,
      `${BASE}/destination/serengeti-national-park`,
    ],
  },
  {
    id: "hiking",
    name: "Hiking",
    fullName: "Hiking & Walking Safaris",
    scriptLabel: "On Foot in the Bush",
    region: "Northern · Eastern · Southern",
    category: "Walking / Hiking",
    bestSeason: "Jun – Oct",
    desc: "Arusha National Park walks, Kilimanjaro day hikes, Udzungwa forest trails, and highland crater rim treks.",
    sourceUrls: [
      `${BASE}/safari/day-trip-to-arusha-national-park`,
      `${BASE}/safari/day-trip-to-mount-meru-waterfalls-hike`,
    ],
  },
  {
    id: "bird-watching",
    name: "Bird Watching",
    fullName: "Bird Watching",
    scriptLabel: "Wings Over Tanzania",
    region: "Lakes · Forest · Coast",
    category: "Bird Watching",
    bestSeason: "Nov – Apr · Jun – Oct",
    desc: "Flamingos on soda lakes, forest endemics in Udzungwa, raptors over the Rift Valley, and coastal waders.",
    sourceUrls: [
      `${BASE}/safari/day-trip-to-arusha-national-park`,
      `${BASE}/destination/lake-manyara-national-park`,
    ],
  },
  {
    id: "waterfalls",
    name: "Waterfalls",
    fullName: "Waterfalls",
    scriptLabel: "Forest & Cascade",
    region: "Kilimanjaro · Udzungwa · Highlands",
    category: "Waterfalls",
    bestSeason: "Year-round · best after rains",
    desc: "Materuni's 150 m cascade, Sanje Falls in Udzungwa, Meru waterfall hikes, and Engero Sero at Lake Natron.",
    sourceUrls: [
      `${BASE}/safari/day-trip-to-materuni-waterfalls-and-coffee-tour`,
      `${BASE}/destination/materuni-waterfalls`,
    ],
  },
  {
    id: "rock-climbing",
    name: "Rock Climbing",
    fullName: "Rock Climbing & Ascents",
    scriptLabel: "Vertical Tanzania",
    region: "Meru · Lengai · Highlands",
    category: "Climbing / Trekking",
    bestSeason: "Jun – Oct · Dec – Feb",
    desc: "Mount Meru ascents, Ol Doinyo Lengai volcano climbs, and guided rock routes in the northern highlands.",
    sourceUrls: [
      `${BASE}/safari/day-trip-to-mount-meru-waterfalls-hike`,
      `${BASE}/safari/2-days-ol-doinyo-lengai-mountain-climbing`,
    ],
  },
];

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
    .replace(/&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

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
      candidates.push(`${BASE}/images/uploads/${cleanUploadFilename(match[1])}`);
      candidates.push(absUrl(url));
    }
  }
  return [...new Set(candidates.filter(Boolean))];
}

async function resolveWorkingUrl(rawUrl, cache) {
  for (const candidate of uploadsCandidates(rawUrl)) {
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
      cache.set(candidate, res.ok);
      if (res.ok) return candidate;
    } catch {
      cache.set(candidate, false);
    }
  }
  return null;
}

function extractRawImageUrls(html) {
  const uploads = [
    ...html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi),
  ].map((m) => m[0]);
  const made = [...html.matchAll(/\/images\/made\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) =>
    absUrl(m[0])
  );
  const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
  return [...new Set([og, ...uploads, ...made].filter(isTtbImage))];
}

function extractParagraphs(html) {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter(
      (p) =>
        p.length > 55 &&
        !/Subscribe|Sign up|cookie|Full Name|Your Email|Book Now|Not sure\?|Additional Information|Adults|Child\.|Filter|Safari Type|Experience Game|Accomodation|Duration Day Trip|Relates Tours|Destination\/s Traveling|Tour snapshot|Can be Tailor-made|Free Cancellation|Send Message|Enquire:/i.test(
          p
        )
    );
}

function highlightsFromText(text, category) {
  const bits = [];
  if (/migration|wildebeest|river cross/i.test(text)) bits.push("Migration herds");
  if (/museum|fossil|archaeolog|heritage|history/i.test(text)) bits.push("Heritage & history");
  if (/bird|flamingo|kingfisher|raptor/i.test(text)) bits.push("Rich birdlife");
  if (/waterfall|cascade|swim/i.test(text)) bits.push("Waterfall pools");
  if (/climb|summit|ascent|mount|volcano/i.test(text)) bits.push("Mountain routes");
  if (/walk|hik|foot/i.test(text)) bits.push("Guided walks");
  if (/cultural|tribe|village|coffee|maasai|hadzabe|hehe/i.test(text)) bits.push("Community culture");
  if (/game drive|wildlife|lion|elephant|safari vehicle/i.test(text)) bits.push("Wildlife drives");
  if (/rock|cliff|gorge|canyon/i.test(text)) bits.push("Rock landscapes");
  if (category) bits.push(category.split("·")[0].trim());
  return [...new Set(bits)].slice(0, 3);
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed ${url} (${res.status})`);
  return res.text();
}

function scoreImageUrl(url) {
  let score = 0;
  if (url.includes("/images/uploads/")) score += 10;
  if (!/_550_|shar-|brig-|_c1\./i.test(url)) score += 5;
  if (/thumb|icon|logo|banner|map/i.test(url)) score -= 20;
  return score;
}

async function buildVerifiedGallery(rawUrls, cache, limit = MAX_GALLERY) {
  const verified = [];
  const seenKeys = new Set();
  const sorted = [...rawUrls].sort((a, b) => scoreImageUrl(b) - scoreImageUrl(a));

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

function generateExperiencePage(exp) {
  const hero = exp.gallery[0]?.src || exp.images[0]?.src;
  const desc = escapeHtmlAttr(exp.description.slice(0, 155));

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${escapeHtmlAttr(exp.fullName)} | Matembo Safari & Tours" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${escapeHtmlAttr(hero)}" />
    <title>${escapeHtmlAttr(exp.fullName)} | Matembo Safari & Tours</title>
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
  <body data-experience-id="${escapeHtmlAttr(exp.id)}">
    <div id="site-nav-root"></div>
    <main id="experience-view-root"></main>
    <div id="site-footer"></div>
    <script type="module" src="/src/js/experience-view-main.js"></script>
  </body>
</html>
`;
}

console.log("Importing experiences from tanzaniatourism.com…\n");

const urlCache = new Map();
const experiences = [];

for (const seed of EXPERIENCE_SEEDS) {
  console.log(`→ ${seed.fullName}`);
  const allParagraphs = [];
  const allRawImages = [];

  for (const url of seed.sourceUrls) {
    try {
      const html = await fetchHtml(url);
      allParagraphs.push(...extractParagraphs(html));
      allRawImages.push(...extractRawImageUrls(html));
    } catch (err) {
      console.warn(`  ⚠ ${url}: ${err.message}`);
    }
  }

  const uniqueParagraphs = [...new Set(allParagraphs)].slice(0, 8);
  const verifiedUrls = await buildVerifiedGallery(allRawImages, urlCache, MAX_GALLERY);

  if (verifiedUrls.length < MIN_GALLERY) {
    console.warn(`  ⚠ Only ${verifiedUrls.length} images — using fallback set`);
  }

  const galleryEntries = verifiedUrls.map((src, i) => ({
    src,
    alt: `${seed.fullName}${i ? ` — view ${i + 1}` : ""}`,
  }));

  const description = uniqueParagraphs[0] || seed.desc;
  const cardImages = pickCardImages(galleryEntries);

  experiences.push({
    id: seed.id,
    name: seed.name,
    fullName: seed.fullName,
    scriptLabel: seed.scriptLabel,
    region: seed.region,
    category: seed.category,
    circuitLabel: "Experiences",
    bestSeason: seed.bestSeason,
    tagline: seed.desc,
    description,
    descriptions: uniqueParagraphs.length ? uniqueParagraphs : [seed.desc],
    highlights: highlightsFromText(description, seed.category),
    sourceUrls: seed.sourceUrls,
    images: cardImages.length ? cardImages : galleryEntries.slice(0, CARD_IMAGES),
    gallery: galleryEntries,
  });

  console.log(`  ✓ ${galleryEntries.length} photos · ${uniqueParagraphs.length} paragraphs`);
}

const file = `/** Auto-generated from tanzaniatourism.com — run: npm run import:experiences */
export const TTB_COM_ORIGIN = ${JSON.stringify(BASE)};

export const experiencesMeta = {
  title: "Where to Go",
  label: "Experiences",
  description: "Museums, game drives, migration, hiking, bird watching, waterfalls, rock climbing and cultural visits across Tanzania.",
  sourceUrl: ${JSON.stringify(`${BASE}/activities`)},
};

export const experiences = ${serialize(experiences, 1)};

export function getExperienceById(id) {
  return experiences.find((exp) => exp.id === id) || null;
}

export function experiencePageUrl(exp) {
  return \`/experiences/\${encodeURIComponent(exp.id)}.html\`;
}
`;

writeFileSync(OUT, file, "utf8");
console.log(`\nExported ${experiences.length} experiences → ${OUT}`);

mkdirSync(PAGES_DIR, { recursive: true });
for (const exp of experiences) {
  writeFileSync(join(PAGES_DIR, `${exp.id}.html`), generateExperiencePage(exp), "utf8");
}
console.log(`Generated ${experiences.length} experience pages → ${PAGES_DIR}/`);
