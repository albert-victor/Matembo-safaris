import { packagePageUrl } from "../js/paths.js";

let cachedIndex = null;

export async function loadSearchIndex() {
  if (cachedIndex) return cachedIndex;

  const [
    { allDestinations },
    { experiences, experiencePageUrl },
    { safariPackages },
    { DESTINATION_CIRCUITS, circuitPageHref },
    { getAllCircuitsPageData },
  ] = await Promise.all([
    import("./all-destinations.js"),
    import("./experiences-data.js"),
    import("./safari-packages.js"),
    import("./circuit-nav.js"),
    import("./circuits-page-data.js"),
  ]);

  const entries = [];

  for (const circuit of DESTINATION_CIRCUITS) {
    entries.push({
      title: circuit.label,
      subtitle: "Circuit",
      href: circuitPageHref(circuit.id),
      type: "circuit",
      keywords: `${circuit.label} ${circuit.script || ""} circuit safari`,
    });
  }

  for (const dest of allDestinations) {
    entries.push({
      title: dest.name || dest.fullName,
      subtitle: dest.circuitLabel || "Destination",
      href: `/destinations/${encodeURIComponent(dest.id)}.html`,
      image: dest.images?.[0]?.src || dest.gallery?.[0]?.src,
      type: "destination",
      keywords: `${dest.name} ${dest.fullName} ${dest.region} ${dest.circuitLabel} destination park`,
    });
  }

  for (const exp of experiences) {
    entries.push({
      title: exp.name,
      subtitle: exp.category || "Activity",
      href: experiencePageUrl(exp),
      image: exp.images?.[0]?.src,
      type: "experience",
      keywords: `${exp.name} ${exp.fullName} ${exp.category} activity things to do`,
    });
  }

  for (const pkg of safariPackages) {
    entries.push({
      title: pkg.title,
      subtitle: pkg.safariType || pkg.circuit || "Safari package",
      href: packagePageUrl(pkg),
      image: pkg.image || pkg.gallery?.[0]?.src,
      type: "safari",
      keywords: `${pkg.title} ${pkg.circuit} ${pkg.safariType} ${(pkg.destinations || []).join(" ")} ${(pkg.activities || []).join(" ")} safari package`,
    });
  }

  const staticPages = [
    { title: "Safari Packages", href: "/safaris.html", type: "page", keywords: "safaris packages itineraries tanzania" },
    { title: "Game Drive Safaris", href: "/game-drives.html", type: "page", keywords: "game drives wildlife 4x4" },
    { title: "Ruaha Safaris", href: "/ruaha-safaris.html", type: "page", keywords: "ruaha national park southern iringa" },
    { title: "Climbing & Trekking", href: "/trekkings.html", type: "page", keywords: "kilimanjaro trekking climbing mountain" },
    { title: "Things to Do", href: "/experiences.html", type: "page", keywords: "activities experiences things to do" },
    { title: "All Circuits", href: "/circuits.html", type: "page", keywords: "circuits regions destinations" },
    { title: "Destinations", href: "/destinations.html", type: "page", keywords: "destinations parks places" },
  ];

  for (const page of staticPages) {
    entries.push({ ...page, subtitle: "Page" });
  }

  for (const circuit of getAllCircuitsPageData()) {
    if (!circuit?.id) continue;
    entries.push({
      title: circuit.title || circuit.name,
      subtitle: "Circuit guide",
      href: `/circuits/${circuit.id}.html`,
      image: circuit.hero?.src || circuit.heroImage?.src,
      type: "circuit",
      keywords: `${circuit.title} ${circuit.label} circuit safari`,
    });
  }

  cachedIndex = entries;
  return entries;
}

export function searchSiteIndex(entries, query, limit = 12) {
  const q = query.trim().toLowerCase();
  if (!q || q.length < 2) return [];

  const terms = q.split(/\s+/).filter(Boolean);

  return entries
    .map((entry) => {
      const haystack = `${entry.title} ${entry.subtitle} ${entry.keywords}`.toLowerCase();
      let score = 0;
      if (haystack.includes(q)) score += 12;
      for (const term of terms) {
        if (entry.title.toLowerCase().includes(term)) score += 8;
        if (haystack.includes(term)) score += 3;
      }
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ entry }) => entry);
}
