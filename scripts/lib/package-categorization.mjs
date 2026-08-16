/** Shared circuit / safariType / activity inference for imported packages. */

export function inferCircuit(title, overview = "") {
  let t = `${title} ${overview}`.toLowerCase();
  t = t.replace(/kilimanjaro international airport/g, " ");

  if (
    /zanzibar|pemba|stone town|prison island|safari blue/.test(t) &&
    !/serengeti|ngorongoro|tarangire|manyara|mikumi|nyerere|ruaha|arusha national|northern circuit|southern circuit|selous|big five/.test(t)
  ) {
    return "Zanzibar Island";
  }
  if (/mafia island/.test(t)) return "Mafia Island";
  if (
    /serengeti|ngorongoro|tarangire|manyara|arusha national|northern circuit|big five|mara river|wildebeest migration|lake natron|lake eyasi|northern parks/.test(t)
  ) {
    return "Northern Circuit";
  }
  if (/ruaha|nyerere|selous|katavi|southern circuit/.test(t)) return "Southern Circuit";
  if (/mikumi|udzungwa|saadani|kilwa|uluguru|morogoro|eastern|dar es salaam|pangani/.test(t)) {
    return "Eastern Circuit";
  }
  if (/mahale|gombe|western|kigoma/.test(t)) return "Western Circuit";
  if (/chumbe|ocean islands/.test(t)) return "Ocean Islands";
  if (/central circuit|dodoma|singida/.test(t)) return "Central Circuit";

  if (/zanzibar/.test(t) && /serengeti|ngorongoro|tarangire|arusha/.test(t)) {
    return "Northern Circuit";
  }

  return "Southern Circuit";
}

export function inferSafariType(title, overview = "") {
  const titleT = title.toLowerCase().replace(/kilimanjaro international airport/g, " ");
  let t = `${title} ${overview}`.toLowerCase();
  t = t.replace(/kilimanjaro international airport/g, " ");
  const types = new Set();

  if (/city tour|historical|ruins|kilwa|songomnara|museum|heritage/.test(t)) {
    types.add("Tourist Attractions");
  }
  if (/kilimanjaro climb|climb kilimanjaro|mount meru|mountain climbing|trek kilimanjaro|summit kilimanjaro|hike kilimanjaro|mount kilimanjaro trek/.test(titleT)) {
    types.add("Mountain Climbing");
  }
  if (/walking safari|bush walk|hiking safari|forest walk/.test(t) || /uluguru|udzungwa mountains/.test(t)) {
    types.add("Walking Safaris");
  }
  if (/beach|honeymoon|zanzibar holiday|island relaxation|coast/.test(t)) {
    types.add("Beach Holiday");
  }
  if (
    /safari|game drive|national park|wildlife|serengeti|ngorongoro|mikumi|nyerere|ruaha|big five|migration|boat safari|fly.?in|luxury/.test(t)
  ) {
    types.add("Adventure Safaris");
  }
  if (/cultural|maasai|boma/.test(t) && !types.has("Adventure Safaris")) {
    types.add("Tourist Attractions");
  }
  if (!types.size) types.add("Adventure Safaris");
  return [...types].join(", ");
}

export function inferDestinations(title, overview = "") {
  const t = `${title} ${overview}`.toLowerCase();
  const parks = [
    ["Nyerere National Park", /nyerere|selous/],
    ["Mikumi National Park", /mikumi/],
    ["Ruaha National Park", /ruaha/],
    ["Udzungwa Mountains National Park", /udzungwa/],
    ["Serengeti National Park", /serengeti/],
    ["Ngorongoro Conservation Area", /ngorongoro/],
    ["Tarangire National Park", /tarangire/],
    ["Lake Manyara National Park", /manyara/],
    ["Arusha National Park", /arusha national/],
    ["Kilimanjaro", /mount kilimanjaro|kilimanjaro national|kilimanjaro climb|summit kilimanjaro|trek kilimanjaro/],
    ["Zanzibar Island", /zanzibar/],
    ["Kilwa Kisiwani", /kilwa/],
    ["Saadani National Park", /saadani/],
    ["Uluguru Mountains", /uluguru/],
    ["Dar es Salaam", /dar es salaam/],
    ["Lake Natron", /lake natron/],
    ["Lake Eyasi", /lake eyasi/],
  ];
  return parks.filter(([, re]) => re.test(t)).map(([name]) => name);
}

export function inferActivities(title, overview = "") {
  const t = `${title} ${overview}`.toLowerCase();
  const list = [];
  if (/game drive|safari|wildlife|big five|migration/.test(t)) list.push("Game Drives");
  if (/boat|fishing/.test(t)) list.push("Canoeing / Kayaking", "Fishing / Sport Fishing");
  if (/walking|bush walk|hike|hiking|trek/.test(t)) list.push("Walking / Hiking", "Forest Walk");
  if (/maasai|cultural|boma/.test(t)) list.push("Cultural Visits");
  if (/night game/.test(t)) list.push("Night Game Drives");
  if (/balloon|fly.?in/.test(t)) list.push("Balloon Safari");
  if (/historical|ruins|kilwa|songomnara/.test(t)) list.push("Historical Visits", "Rock Art / Cave Painting");
  if (/beach|snorkel|swim|zanzibar|honeymoon/.test(t)) list.push("Beach Relaxation", "Snorkeling / Swimming");
  if (/bird/.test(t)) list.push("Bird Watching");
  if (!list.length) list.push("Game Drives", "Wildlife Viewing");
  return [...new Set(list)].slice(0, 6);
}
