const BASE = "https://www.tanzaniatourism.com";

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.text();
}

function extractSafariLinks(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"/gi)].map(
        (m) => m[1]
      )
    ),
  ];
}

function extractCategoryLinks(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/safaris\/category\/[^"]+)"/gi)].map(
        (m) => m[1]
      )
    ),
  ];
}

function extractCardTitles(html) {
  const cards = [];
  const re = /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[^>]*class="[^"]*hotelsCard[^"]*"[\s\S]*?<\/a>/gi;
  let m;
  while ((m = re.exec(html))) {
    const block = m[0];
    const url = m[1];
    const title = block.match(/<h4[^>]*>([^<]+)<\/h4>/)?.[1]?.trim();
    const img = block.match(/<img[^>]+src="([^"]+)"/)?.[1];
    const meta = block.match(/class="text-14 text-light-1[^"]*">([^<]+)</)?.[1]?.trim();
    if (title) cards.push({ url, title, img, meta });
  }
  return cards;
}

// Categories from safaris page
const safarisHtml = await fetchHtml(`${BASE}/safaris`);
const cats = extractCategoryLinks(safarisHtml);
console.log("Categories:", cats.length);
cats.forEach((c) => console.log(c));

const allLinks = new Set();
const allCards = [];

for (const cat of cats) {
  let page = 1;
  while (page <= 20) {
    const url = page === 1 ? cat : `${cat}/page/${page}`;
    const html = await fetchHtml(url);
    const links = extractSafariLinks(html);
    const cards = extractCardTitles(html);
    const before = allLinks.size;
    links.forEach((l) => allLinks.add(l));
    allCards.push(...cards);
    const added = allLinks.size - before;
    console.log(url, "links", links.length, "new", added, "cards", cards.length);
    if (!links.length || added === 0) break;
    page++;
  }
}

console.log("\nTotal from categories:", allLinks.size);

// Try sitemap
for (const sm of ["/sitemap.xml", "/sitemap_index.xml", "/robots.txt"]) {
  try {
    const r = await fetch(BASE + sm);
    const t = await r.text();
    const safariCount = (t.match(/\/safari\//g) || []).length;
    console.log(sm, "status", r.status, "safari refs", safariCount);
    if (safariCount) {
      const samples = [...t.matchAll(/https:\/\/www\.tanzaniatourism\.com\/safari\/[^\s<"']+/g)].slice(0, 5);
      samples.forEach((m) => console.log(" ", m[0]));
    }
  } catch (e) {
    console.log(sm, "error", e.message);
  }
}

// Homepage safaris section
const home = await fetchHtml(BASE);
const homeLinks = extractSafariLinks(home);
console.log("\nHomepage safari links:", homeLinks.length);
homeLinks.forEach((l) => allLinks.add(l));

// Search with empty filters / ajax
const searchUrls = [
  `${BASE}/safaris/search`,
  `${BASE}/api/safaris`,
  `${BASE}/safaris?show_all=1`,
];
for (const u of searchUrls) {
  try {
    const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
    console.log(u, r.status, (await r.text()).slice(0, 200));
  } catch (e) {}
}

console.log("\nGrand total links:", allLinks.size);
