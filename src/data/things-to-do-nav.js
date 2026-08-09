/**
 * TTB-style Things to Do mega menu – three columns of activity links.
 * hrefs prefer editorial experience pages, then dedicated listings, then activity package grids.
 */

function activityHref(slug) {
  return `/activities/${slug}.html`;
}

/** @type {{ name: string, href: string }[][]} */
export const thingsToDoColumns = [
  [
    { name: "Game Drives", href: "/game-drives.html" },
    { name: "Climbing / Trekking", href: "/trekkings.html" },
    { name: "Great Migration", href: "/experiences/great-migration.html" },
    { name: "Bird Watching", href: "/experiences/bird-watching.html" },
    { name: "Walking / Hiking", href: "/experiences/hiking.html" },
    { name: "Cultural Visits", href: "/experiences/cultural-visits.html" },
    { name: "Beach Relaxation", href: activityHref("beach-relaxation") },
    { name: "Snorkeling / Swimming", href: activityHref("snorkeling-swimming") },
    { name: "Canoeing / Kayaking", href: activityHref("canoeing-kayaking") },
    { name: "Balloon Safari", href: activityHref("balloon-safari") },
  ],
  [
    { name: "Rock Climbing", href: "/experiences/rock-climbing.html" },
    { name: "Caving / Caves", href: activityHref("caving-caves") },
    { name: "Rock Art / Cave Painting", href: activityHref("rock-art-cave-painting") },
    { name: "Whale Watching", href: activityHref("whale-watching") },
    { name: "Turtle Hatching", href: activityHref("turtle-hatching") },
    { name: "Dolphin Watching", href: activityHref("dolphin-watching") },
    { name: "Giant Tortoise Watching", href: activityHref("giant-tortoise-watching") },
    { name: "Chimpanzee Watching", href: activityHref("chimpanzee-watching") },
    { name: "Scuba Diving", href: activityHref("scuba-diving") },
    { name: "Canopy Walkway", href: activityHref("canopy-walkway") },
  ],
  [
    { name: "Fishing / Sport Fishing", href: activityHref("fishing-sport-fishing") },
    { name: "Camel / Horse Riding", href: activityHref("camel-horse-riding") },
    { name: "Museum / Monument", href: "/experiences/museums.html" },
    { name: "Forest Walk", href: activityHref("forest-walk") },
    { name: "Worship Site", href: activityHref("worship-site") },
  ],
];

/** Flat list for activity page generation and package filtering. */
export const ACTIVITY_DEFINITIONS = [
  { slug: "beach-relaxation", label: "Beach Relaxation" },
  { slug: "snorkeling-swimming", label: "Snorkeling / Swimming" },
  { slug: "canoeing-kayaking", label: "Canoeing / Kayaking" },
  { slug: "balloon-safari", label: "Balloon Safari" },
  { slug: "caving-caves", label: "Caving / Caves" },
  { slug: "rock-art-cave-painting", label: "Rock Art / Cave Painting" },
  { slug: "whale-watching", label: "Whale Watching" },
  { slug: "turtle-hatching", label: "Turtle Hatching" },
  { slug: "dolphin-watching", label: "Dolphin Watching" },
  { slug: "giant-tortoise-watching", label: "Giant Tortoise Watching" },
  { slug: "chimpanzee-watching", label: "Chimpanzee Watching" },
  { slug: "scuba-diving", label: "Scuba Diving" },
  { slug: "canopy-walkway", label: "Canopy Walkway" },
  { slug: "fishing-sport-fishing", label: "Fishing / Sport Fishing" },
  { slug: "camel-horse-riding", label: "Camel / Horse Riding" },
  { slug: "forest-walk", label: "Forest Walk" },
  { slug: "worship-site", label: "Worship Site" },
];

export function activityBySlug(slug) {
  return ACTIVITY_DEFINITIONS.find((entry) => entry.slug === slug) || null;
}
