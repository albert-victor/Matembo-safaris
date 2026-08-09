const url = "https://www.tanzaniatourism.com/safari/2-days-to-tarangire-national-park-ngorongoro-crater";
const html = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());

for (const term of ["inclusion", "exclusion", "Destination", "Relates", "Accommodation"]) {
  const idx = html.toLowerCase().indexOf(term.toLowerCase());
  if (idx >= 0) console.log("\n===", term, "===\n", html.slice(idx, idx + 1200));
}

// activities parse
const actSection = html.match(/<h3 class="text-22 fw-500 mt-30"> Activities <\/h3>([\s\S]*?)<div class="border-top-light/m);
if (actSection) {
  const acts = [...actSection[1].matchAll(/<div class="text-15 ml-10">([^<]+)<\/div>/g)].map((m) => m[1].trim());
  console.log("\nActivities:", acts);
}

// destinations
const destSection = html.match(/Destination\/s Traveling[\s\S]{0,2500}/i);
console.log("\nDestinations section:", destSection?.[0]?.slice(0, 1500));

// tourCard on search page
const search = await fetch("https://www.tanzaniatourism.com/safaris/search", {
  headers: { "User-Agent": "Mozilla/5.0" },
}).then((r) => r.text());
const cards = [...search.matchAll(/class="tourCard[\s\S]*?<\/a>/gi)];
console.log("\nSearch tourCards:", cards.length);
if (cards[0]) console.log(cards[0][0].slice(0, 1500));
