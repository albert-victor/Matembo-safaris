/**
 * "What we do best" – contextual wildlife imagery from TTB / experiences data.
 */
import { experiences } from "./experiences-data.js";
import { NAV_IMAGES } from "./nav-images.js";
import { allDestinations } from "./all-destinations.js";

const LOCAL = "/assets/photos";

function expImage(id, fallback) {
  const exp = experiences.find((e) => e.id === id);
  return exp?.images?.[0]?.src || fallback;
}

function destImage(id, imageIndex = 0, fallback = "") {
  const dest = allDestinations.find((d) => d.id === id);
  return dest?.images?.[imageIndex]?.src || dest?.images?.[0]?.src || fallback;
}


export const servicesShowcaseIntro = {
  label: "What We Do Best",
  title: "Safari Experiences, Crafted in the Field",
  desc: "From Ruaha river drives to Serengeti migration days – browse the journeys Matembo plans every week across Tanzania.",
};

export const servicesShowcase = [
  {
    id: "walking-safaris",
    title: "Walking Safaris",
    icon: "fa-person-hiking",
    description: "Guided bush walks and forest trails – read tracks, birds and smaller life up close with licensed walking guides.",
    highlights: ["Udzungwa forest", "Crater rim hikes", "Bush foot safaris"],
    image: "/assets/about/walking safaris.jpg",
    imageAlt: "Walking safari in Tanzania highlands",
    href: "/walking-safaris.html",
  },
  {
    id: "game-drives",
    title: "Game Drives",
    icon: "fa-binoculars",
    description: "Private 4×4 days across Tanzania's great parks – dawn starts, patient guides, and time at every sighting.",
    highlights: ["Serengeti & Ngorongoro", "Ruaha river bends", "Mikumi plains"],
    image: expImage("game-drives", `${LOCAL}/Serengeti_National_Park_Leopard_24.jpg`),
    imageAlt: "Leopard on a Serengeti game drive",
    href: "/game-drives.html",
  },
  {
    id: "cultural",
    title: "Cultural Experiences",
    icon: "fa-people-group",
    description: "Immerse in Tanzanian traditions – Maasai villages, handicrafts, local markets and authentic community visits.",
    highlights: ["Maasai villages", "Handicrafts", "Traditional ceremonies"],
    image: "/assets/about/cultural visits.jpg",
    imageAlt: "Cultural visit with local community in Tanzania",
    href: "/cultural-visits.html",
  },
  {
    id: "migration",
    title: "Great Migration",
    icon: "fa-route",
    description: "Follow wildebeest herds and river crossings on the Serengeti corridor – timed to the season you travel.",
    highlights: ["River crossings", "Calving season", "Private positioning"],
    image: expImage("great-migration", NAV_IMAGES.migration),
    imageAlt: "Wildebeest migration on the Serengeti plains",
    href: "/experiences/great-migration.html",
  },
  {
    id: "trekking",
    title: "Mountain Climbing",
    icon: "fa-mountain",
    description: "Kilimanjaro summit routes, Mount Meru and highland treks – porters, camps and guides who know every ridge.",
    highlights: ["Kilimanjaro routes", "Mount Meru", "Highland hikes"],
    image: NAV_IMAGES.machame8d,
    imageAlt: "Kilimanjaro mountain trekking",
    href: "/trekkings.html",
  },
  {
    id: "beach",
    title: "Beach & Coast",
    icon: "fa-umbrella-beach",
    description: "Stone Town escapes, spice tours and Indian Ocean relaxation – the perfect bush-and-beach finish.",
    highlights: ["Zanzibar beaches", "Spice tours", "Island day trips"],
    image: destImage("zanzibar", 2, `${LOCAL}/Zanzibar_Prestine_Beach_04.jpg`),
    imageAlt: "Pristine beach on Zanzibar Island",
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
    image: NAV_IMAGES.ruaha3d,
    imageAlt: "Elephants on a multi-day Ruaha safari",
    href: "/safaris.html",
  },
  {
    id: "birding",
    title: "Bird Watching",
    icon: "fa-feather",
    description: "Specialist birding days with guides who know every call – from flamingo lakes to forest endemics.",
    highlights: ["Lake Manyara", "Ruaha raptors", "Forest species"],
    image: expImage("bird-watching", `${LOCAL}/Arusha_National_Park_Momella_Lake_Flamingos_65.jpg`),
    imageAlt: "Flamingos at Momella Lake, Arusha National Park",
    href: "/bird-watching.html",
  },
];
