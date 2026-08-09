const html = await fetch("https://www.tanzaniatourism.com/safaris", {
  headers: { "User-Agent": "Mozilla/5.0" },
}).then((r) => r.text());

// Find card-like structures
const patterns = [
  /class="([^"]*card[^"]*)"/gi,
  /class="([^"]*tour[^"]*)"/gi,
  /class="([^"]*safari[^"]*)"/gi,
  /class="([^"]*hotels[^"]*)"/gi,
];

for (const re of patterns) {
  const classes = [...new Set([...html.matchAll(re)].map((m) => m[1]))];
  console.log(re.source, classes.slice(0, 15));
}

// Find safari link blocks with context
const linkBlocks = [...html.matchAll(/<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"([\s\S]{0,1500}?)<\/a>/gi)];
console.log("\nLink blocks:", linkBlocks.length);
if (linkBlocks[0]) {
  console.log(linkBlocks[0][0].slice(0, 2000));
}

// duration pattern near titles
const titleBlocks = [...html.matchAll(/<h4[^>]*>([^<]+)<\/h4>/gi)];
console.log("\nAll h4:", titleBlocks.map((m) => m[1].trim()));
