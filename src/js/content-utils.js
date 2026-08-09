/** Shared content formatting – readable copy, unique photos */

export function imageKey(url = "") {
  const file = url.split("/").pop()?.split("?")[0] || url;
  return file
    .replace(/_\d+(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .toLowerCase();
}

export function dedupePhotos(photos, options = {}) {
  const { excludeSrc = "", max = 4 } = options;
  const seen = new Set();

  if (excludeSrc) {
    seen.add(excludeSrc);
    seen.add(imageKey(excludeSrc));
  }

  const unique = [];

  for (const photo of photos || []) {
    if (!photo?.src) continue;
    const key = imageKey(photo.src);
    if (seen.has(photo.src) || seen.has(key)) continue;
    seen.add(photo.src);
    seen.add(key);
    unique.push(photo);
    if (unique.length >= max) break;
  }

  return unique;
}

const EXPERIENCE_PHOTO_RULES = {
  "great-migration": {
    prefer: /wildebeest|migration|gnu|crossing|herd|mara|zebra/i,
    reject: /leopard|lion|cheetah|hyena|ostrich|waterbuck|vulture|valture/i,
  },
  "bird-watching": {
    prefer: /flamingo|bird|eagle|hornbill|kingfisher|stork|pelican|weaver|sunbird|turaco/i,
    reject: /colobus|monkey|giraffe|directions|fig_tree|ngurdoto(?!.*bird)/i,
  },
  museums: {
    prefer: /museum|olduvai|kalenga|isimila|heritage|gorge|entrance|building|monument|boma|fort|ruins/i,
    reject: /leopard|lion|wildebeest|elephant(?!.*museum)/i,
  },
  "game-drives": {
    prefer: /elephant|lion|leopard|buffalo|rhino|safari|vehicle|ngorongoro|serengeti|ruaha/i,
    reject: /museum|waterfall|building/i,
  },
  "cultural-visits": {
    prefer: /rock|museum|isimila|igeleke|kalenga|gangilonga|cultural|heritage|maasai|hadzabe|coffee/i,
    reject: /leopard|wildebeest|flamingo/i,
  },
  hiking: {
    prefer: /mount|kilimanjaro|meru|waterfall|udzungwa|hike|trail|peak|summit|forest/i,
    reject: /museum|building|leopard/i,
  },
  waterfalls: {
    prefer: /waterfall|falls|cascade|materuni|sanje|ndudum|chole|pool|stream/i,
    reject: /museum|leopard|building/i,
  },
};

function scorePhotoForExperience(expId, src) {
  const rules = EXPERIENCE_PHOTO_RULES[expId];
  if (!rules) return 0;
  let score = 0;
  if (rules.prefer?.test(src)) score += 10;
  if (rules.reject?.test(src)) score -= 20;
  return score;
}

export function photosForExperience(exp, max = 4) {
  const source = exp.gallery?.length ? exp.gallery : exp.images;
  const ranked = [...(source || [])].sort(
    (a, b) => scorePhotoForExperience(exp.id, b.src) - scorePhotoForExperience(exp.id, a.src)
  );
  return dedupePhotos(ranked, { max });
}

export function splitIntoParagraphs(text, maxChars = 280) {
  if (!text?.trim()) return [];

  const normalized = text.replace(/\s+/g, " ").trim();
  const markerSplit = normalized.split(/\b(?:Activities|Other Activities|Highlights)\b\s*/i);

  if (markerSplit.length > 1) {
    return markerSplit.map((chunk) => chunk.trim()).filter((chunk) => chunk.length > 40);
  }

  const sentences = normalized.match(/[^.!?]+[.!?]+(?:\s|$)|[^.!?]+$/g) || [normalized];
  const paragraphs = [];
  let current = "";

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    if (current && (current + " " + trimmed).length > maxChars) {
      paragraphs.push(current.trim());
      current = trimmed;
    } else {
      current = current ? `${current} ${trimmed}` : trimmed;
    }
  }

  if (current.trim()) paragraphs.push(current.trim());
  return paragraphs.slice(0, 6);
}

export function extractActivitySections(text, fallbackActivities = []) {
  if (fallbackActivities.length) {
    return fallbackActivities.map((name) => ({ title: name, body: "" }));
  }

  const normalized = text.replace(/\s+/g, " ").trim();
  const idx = normalized.search(/\bActivities\b/i);
  if (idx < 0) return [];

  const tail = normalized.slice(idx).replace(/^Activities\s*/i, "");
  const otherIdx = tail.search(/\bOther Activities\b/i);
  const main = otherIdx >= 0 ? tail.slice(0, otherIdx) : tail;
  const other = otherIdx >= 0 ? tail.slice(otherIdx).replace(/^Other Activities\s*/i, "") : "";

  const titles = [
    "Mountain Hiking",
    "Mountain Biking",
    "Swimming",
    "Waterfalls",
    "Forest Walk",
    "Spice Tour",
    "BBQ",
    "Fishing",
    "Bird Watching",
    "Picnic",
    "Board Game",
    "Factory Tour",
    "Bonfire",
    "Camping",
    "Meditation",
  ];

  const sections = [];

  for (const title of titles) {
    const re = new RegExp(`${title}\\s*([^.!?]+[.!?]?)`, "i");
    const match = main.match(re);
    if (match?.[1]?.trim()) {
      sections.push({ title, body: match[1].trim() });
    }
  }

  if (other) {
    other
      .split(/(?=[A-Z][a-z])/)
      .map((s) => s.trim())
      .filter((s) => s.length > 2 && s.length < 40)
      .forEach((item) => sections.push({ title: item, body: "" }));
  }

  return sections.slice(0, 8);
}

export function packagePhotos(pkg, maxExtra = 3) {
  const heroSrc = pkg.image || pkg.gallery?.[0]?.src || "";
  const hero = { src: heroSrc, alt: pkg.alt || pkg.title };
  const extras = dedupePhotos(pkg.gallery || [], {
    excludeSrc: heroSrc,
    max: maxExtra,
  });
  return { hero, extras };
}
