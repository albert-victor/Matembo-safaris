const BASE = "https://www.tanzaniatourism.com";
const CIRCUIT = `${BASE}/destinations/northern-circuit`;

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.ok ? res.text() : "";
}

function extractCards(html) {
  const cards = [];
  const re =
    /<a[^>]+href="(\/destinations\/[^"#]+|https:\/\/www\.tanzaniatourism\.com\/destinations\/[^"#]+)"[^>]*>[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?(?:Northern Circuit[^<]*)<\/span>[\s\S]*?(\d+)\s+Tours/gi;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (href.startsWith("/")) href = BASE + href;
    cards.push({ href, name: m[2].trim(), tours: Number(m[3]) });
  }
  return cards;
}

function extractImageUrls(html) {
  const urls = new Set();
  for (const m of html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)) {
    urls.add(m[0]);
  }
  return [...urls];
}

function extractDescription(html) {
  const ogDesc = html.match(/property="og:description"\s+content="([^"]+)"/i)?.[1];
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => m[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim())
    .filter((p) => p.length > 80 && !p.includes("Subscribe") && !p.includes("Sign up"));
  return paragraphs[0] || ogDesc || "";
}

function extractTitle(html) {
  return html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim() || "";
}

function extractOgImage(html) {
  return html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
}

function extractMetaLine(html) {
  return html.match(/National Parks[\s\S]{0,200}Northern Circuit[^<]*/i)?.[0]?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim() || "";
}

// try pagination patterns
const pages = [CIRCUIT];
for (const p of [2, 3, 4, 5, 16, 32, "P16", "P32"]) {
  pages.push(`${CIRCUIT}/${p}`);
  pages.push(`${CIRCUIT}?page=${p}`);
}

const allCards = new Map();
for (const url of pages) {
  const html = await fetchHtml(url);
  if (!html) continue;
  const cards = extractCards(html);
  console.log(url.replace(BASE, ""), "cards", cards.length);
  cards.forEach((c) => allCards.set(c.href, c));
}

console.log("\nTotal unique cards:", allCards.size);
[...allCards.values()].slice(0, 20).forEach((c) => console.log(c.tours, c.name, c.href.replace(BASE, "")));

// probe one detail page
const sample = [...allCards.values()][0] || { href: `${BASE}/destinations/serengeti-national-park` };
const detailHtml = await fetchHtml(sample.href);
console.log("\nSample:", sample.href);
console.log("title:", extractTitle(detailHtml));
console.log("og:", extractOgImage(detailHtml));
console.log("meta:", extractMetaLine(detailHtml));
console.log("desc:", extractDescription(detailHtml).slice(0, 200));
console.log("images:", extractImageUrls(detailHtml).slice(0, 6));
