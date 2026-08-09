/**
 * "What we do best" – contextual wildlife imagery from TTB / experiences data.
 */
import { experiences } from "./experiences-data.js";

const TTB = "https://www.tanzaniatourism.com/images/uploads";

function expImage(id, fallback) {
  const exp = experiences.find((e) => e.id === id);
  return exp?.images?.[0]?.src || fallback;
}

export const servicesShowcaseIntro = {
  label: "What We Do Best",
  title: "Safari Experiences, Crafted in the Field",
  desc: "From Ruaha river drives to Serengeti migration days – browse the journeys Matembo plans every week across Tanzania.",
};

export const servicesShowcase = [
  {
    id: "game-drives",
    title: "Game Drives",
    icon: "fa-binoculars",
    description: "Private 4×4 days across Tanzania's great parks – dawn starts, patient guides, and time at every sighting.",
    highlights: ["Serengeti & Ngorongoro", "Ruaha river bends", "Mikumi plains"],
    image: expImage("game-drives", `${TTB}/Serengeti_National_Park_Leopard_24.jpg`),
    imageAlt: "Leopard on a Serengeti game drive",
    href: "/game-drives.html",
  },
  {
    id: "walking-safaris",
    title: "Walking Safaris",
    icon: "fa-person-hiking",
    description: "Guided bush walks and forest trails – read tracks, birds and smaller life up close with licensed walking guides.",
    highlights: ["Udzungwa forest", "Crater rim hikes", "Bush foot safaris"],
    image: expImage("hiking", `${TTB}/Arusha_National_Park_01.jpg`),
    imageAlt: "Walking safari in Tanzania highlands",
    href: "/walking-safaris.html",
  },
  {
    id: "cultural",
    title: "Cultural Experiences",
    icon: "fa-people-group",
    description: "Immerse in Tanzanian traditions – Maasai villages, handicrafts, local markets and authentic community visits.",
    highlights: ["Maasai villages", "Handicrafts", "Traditional ceremonies"],
    image: "/assets/about/cultural visits.jpg",
    imageAlt: "Cultural visit with local community in Tanzania",
    href: "/experiences/cultural-visits.html",
  },
  {
    id: "migration",
    title: "Great Migration",
    icon: "fa-route",
    description: "Follow wildebeest herds and river crossings on the Serengeti corridor – timed to the season you travel.",
    highlights: ["River crossings", "Calving season", "Private positioning"],
    image: expImage("great-migration", `${TTB}/Serengeti_Wildebeests_03.jpg`),
    imageAlt: "Wildebeest migration on the Serengeti plains",
    href: "/experiences/great-migration.html",
  },
  {
    id: "trekking",
    title: "Mountain Climbing",
    icon: "fa-mountain",
    description: "Kilimanjaro summit routes, Mount Meru and highland treks – porters, camps and guides who know every ridge.",
    highlights: ["Kilimanjaro routes", "Mount Meru", "Highland hikes"],
    image: `${TTB}/Kilimanjaro_Machame_Route_01.jpg`,
    imageAlt: "Kilimanjaro mountain trekking",
    href: "/trekkings.html",
  },
  {
    id: "beach",
    title: "Beach & Coast",
    icon: "fa-umbrella-beach",
    description: "Stone Town escapes, spice tours and Indian Ocean relaxation – the perfect bush-and-beach finish.",
    highlights: ["Zanzibar beaches", "Spice tours", "Island day trips"],
    image: `${TTB}/Zanzibar_Beach_01.jpg`,
    imageAlt: "Zanzibar Indian Ocean coast",
    href: "/beach-holiday.html",
  },
  {
    id: "day-trips",
    title: "Day Trips",
    icon: "fa-sun",
    description: "Crater descents, lake circuits and town excursions – compact days when your calendar is tight.",
    highlights: ["Ngorongoro Crater", "Lake Manyara", "Isimila pillars"],
    image: "/assets/about/ngorongoro.jpg",
    imageAlt: "Ngorongoro Crater day trip",
    href: "/game-drives.html",
  },
  {
    id: "multi-day",
    title: "Multi-Day Safaris",
    icon: "fa-calendar-days",
    description: "Week-long routes across north and south – lodges matched to your budget, pace shaped around your group.",
    highlights: ["Northern circuit", "Southern icons", "Bush & beach combos"],
    image: `${TTB}/Ruaha_National_Park_Elephants_01.jpg`,
    imageAlt: "Elephants on a multi-day Ruaha safari",
    href: "/safaris.html",
  },
  {
    id: "birding",
    title: "Bird Watching",
    icon: "fa-feather",
    description: "Specialist birding days with guides who know every call – from flamingo lakes to forest endemics.",
    highlights: ["Lake Manyara", "Ruaha raptors", "Forest species"],
    image: expImage("bird-watching", `${TTB}/Arusha_National_Park_Momella_Lake_Flamingos_66.jpg`),
    imageAlt: "Flamingos at Momella Lake, Arusha National Park",
    href: "/experiences/bird-watching.html",
  },
];
