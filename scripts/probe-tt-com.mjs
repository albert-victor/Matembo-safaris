const url = "https://www.tanzaniatourism.com/destinations/northern-circuit";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const html = await res.text();
console.log("length", html.length);

const links = [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/destinations\/[^"#]+)"/g)].map((m) => m[1]);
const unique = [...new Set(links)];
console.log("dest links", unique.length);
unique.slice(0, 40).forEach((u) => console.log(u));

const imgs = [...html.matchAll(/src="(https:\/\/www\.tanzaniatourism\.com[^"]+\.(?:jpg|jpeg|webp|png))"/gi)].map((m) => m[1]);
console.log("imgs", [...new Set(imgs)].length);
[...new Set(imgs)].slice(0, 25).forEach((u) => console.log(u));

const cards = [...html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?<h4[^>]*>([^<]+)<\/h4>/gi)];
console.log("card matches", cards.length);
cards.slice(0, 20).forEach((m) => console.log(m[2], "->", m[1]));
