const LISTINGS = [
  "https://www.tanzaniatourism.com/activities/climbing-trekking",
  "https://www.tanzaniatourism.com/safaris/mountain-climbing",
];

function pageUrl(base, p) {
  if (p === 1) return base;
  return base.includes("?") ? `${base}&page=${p}` : `${base}/page/${p}`;
}

function extractListingCards(html) {
  const cards = [];
  const re =
    /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[\s\S]*?<img[^>]+src="([^"]+)"[\s\S]*?<h3[^>]*>([^<]+)<\/h3>[\s\S]*?(?:<div class="text-14[^"]*">([^<]*)<\/div>)?/gi;
  let m;
  while ((m = re.exec(html))) {
    cards.push({
      url: m[1],
      image: m[2],
      title: m[3].trim(),
      duration: (m[4] || "").trim(),
    });
  }
  return cards;
}

async function collectFromListing(base) {
  const all = [];
  const seen = new Set();
  for (let p = 1; p <= 10; p++) {
    const url = pageUrl(base, p);
    const r = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!r.ok) break;
    const h = await r.text();
    const cards = extractListingCards(h);
    if (!cards.length) break;
    let added = 0;
    for (const c of cards) {
      if (seen.has(c.url)) continue;
      seen.add(c.url);
      all.push(c);
      added++;
    }
    console.log(base, "page", p, "cards", cards.length, "new", added, "total", all.length);
    if (added === 0) break;
  }
  return all;
}

const combined = new Map();
for (const listing of LISTINGS) {
  const cards = await collectFromListing(listing);
  for (const c of cards) {
    if (!combined.has(c.url)) combined.set(c.url, c);
  }
}
console.log("\nTotal unique treks:", combined.size);
console.log([...combined.values()].slice(0, 5));
