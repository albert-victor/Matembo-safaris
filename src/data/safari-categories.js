/**
 * TTB-style safari categories for nav dropdown and listing pages.
 * matchType: null = all packages (Tanzania Safaris hub).
 */

export const SAFARI_CATEGORIES = [
  {
    id: "tanzania-safaris",
    label: "Tanzania Safaris",
    matchType: null,
    href: "/safaris.html",
    heroLabel: "Tanzania Safaris",
    heroTitle: "Every Circuit",
    heroScript: "141 Real Itineraries",
    heroLead:
      "Browse wildlife, coast, mountains and culture across Tanzania – grouped by circuit and ready to tailor from Iringa.",
  },
  {
    id: "adventure-safaris",
    label: "Adventure Safaris",
    matchType: "Adventure Safaris",
    href: "/adventure-safaris.html",
    heroLabel: "Adventure Safaris",
    heroTitle: "Wildlife Routes",
    heroScript: "Plains to Delta",
    heroLead:
      "Multi-day game drives, migration focus routes and classic northern and southern circuits.",
  },
  {
    id: "mountain-climbing",
    label: "Mountain Climbing",
    matchType: "Mountain Climbing",
    href: "/trekkings.html",
    heroLabel: "Mountain Climbing",
    heroTitle: "Climbing & Trekking",
    heroScript: "Kilimanjaro & Beyond",
    heroLead:
      "Kilimanjaro summit routes, Mount Meru, Ol Doinyo Lengai and highland hikes.",
  },
  {
    id: "beach-holiday",
    label: "Beach Holiday",
    matchType: "Beach Holiday",
    href: "/beach-holiday.html",
    heroLabel: "Beach Holiday",
    heroTitle: "Coast & Islands",
    heroScript: "Zanzibar · Mafia · Saadani",
    heroLead:
      "Stone Town escapes, island day trips, snorkelling and Indian Ocean relaxation.",
  },
  {
    id: "walking-safaris",
    label: "Walking Safaris",
    matchType: "Walking Safaris",
    href: "/walking-safaris.html",
    heroLabel: "Walking Safaris",
    heroTitle: "On Foot in the Bush",
    heroScript: "Guided Bush Walks",
    heroLead:
      "Forest trails, crater rim hikes and guided walking routes paired with wildlife days.",
  },
  {
    id: "tourist-attractions",
    label: "Tourist Attractions",
    matchType: "Tourist Attractions",
    href: "/tourist-attractions.html",
    heroLabel: "Tourist Attractions",
    heroTitle: "Heritage & Highlights",
    heroScript: "Museums · Towns · Sites",
    heroLead:
      "Museums, historic towns, rock art and day trips beyond the classic game drive.",
  },
];

export const navSafariCategories = SAFARI_CATEGORIES.map(({ label, href }) => ({
  name: label,
  href,
}));
