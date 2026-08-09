/**
 * Shared listing-card extraction for tanzaniatourism.com circuit pages.
 */

export function extractListingCards(html, { circuitLabel = null, decodeEntities, absUrl }) {
  const cards = [];
  const cardRe =
    /<a href="(https:\/\/www\.tanzaniatourism\.com\/destination\/[^"]+)" class="hotelsCard[^"]*" title="([^"]+)"([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = cardRe.exec(html))) {
    const href = match[1];
    const title = decodeEntities(match[2].trim());
    const block = match[3];
    const img = block.match(/<img src="([^"]+)"/)?.[1];
    const name = decodeEntities(block.match(/<span>([^<]+)<\/span>/)?.[1]?.trim() || title);
    const category = decodeEntities(
      block.match(/<p class="text-light-1[^"]*">([^<]+)<\/p>/)?.[1]?.replace(/\s+/g, " ").trim() || ""
    );

    if (circuitLabel && !category.toLowerCase().includes(circuitLabel.toLowerCase())) continue;

    const tourMatch =
      block.match(/>(\d+)\s*<\/div>\s*<div class="text-14 text-dark-1 fw-500 ml-10">Tours/i) ||
      block.match(/text-white">(\d+)\s*<\/div>/i);
    const reviewMatch = block.match(/\((\d+)\)/);

    cards.push({
      href,
      title,
      cardImage: absUrl(img),
      name,
      category,
      tourCount: tourMatch ? Number(tourMatch[1]) : 0,
      reviewCount: reviewMatch ? Number(reviewMatch[1]) : 0,
    });
  }

  return cards;
}
