import { getDestinationsByCircuit } from "./all-destinations.js";
import {
  DESTINATION_CIRCUITS,
  SAFARI_CIRCUIT_LABELS,
  circuitPageHref,
  safarisCircuitHref,
} from "./circuit-nav.js";
import { experiences as tanzaniaExperiences, experiencePageUrl } from "./experiences-data.js";

export { packagePageUrl } from "../js/paths.js";
export { siteMeta, logoPath, brandEmblemPath } from "./nav-data.js";
export const tripAdvisorUrl =
  "https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html";
export const socialLinks = [
  {
    label: "TripAdvisor reviews",
    href: tripAdvisorUrl,
    icon: "fab fa-tripadvisor",
    variant: "tripadvisor",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/MatemboSafarisAndTours",
    icon: "fab fa-facebook-f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/matembosafaris",
    icon: "fab fa-instagram",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/255679529700",
    icon: "fab fa-whatsapp",
  },
];

export const aboutIntro = {
  scriptLabel: "Guided from Iringa",
  title: "Safari people who know the road",
  image: "/assets/about/main 11.jpg",
  imageAlt: "Elephants crossing golden savanna in Tanzania",
  paragraphs: [
    "Matembo Safari & Tours is a Tanzanian operator built around field knowledge, not brochure promises. We plan wildlife routes across the north and south, match lodges to your budget without cutting corners on guides or vehicles, and stay on call from your first WhatsApp to your last flight home.",
    "George and the Matembo team work with private 4×4 fleets, licensed park access, and seasons in mind. Whether you want a week on the Serengeti plains or a shorter crater and lake circuit, the itinerary is drawn around how you travel, not a fixed template.",
  ],
  stats: [
    { value: "Northern & Southern", label: "Circuits covered" },
    { value: "Private 4×4", label: "Safari fleet" },
    { value: "TripAdvisor", label: "Verified listing" },
  ],
};

function circuitCoverImage(circuitId, fallback = "/assets/about/main3.jpg") {
  const dest = getDestinationsByCircuit(circuitId)[0];
  return dest?.images?.[0]?.src || fallback;
}

const SAFARI_TO_DEST_CIRCUIT = {
  "Northern Circuit": "northern",
  "Southern Circuit": "southern",
  "Eastern Circuit": "eastern",
  "Western Circuit": "western",
  "Zanzibar Island": "zanzibar",
  "Mafia Island": "mafia",
  "Central Circuit": "southern",
  "Ocean Islands": "oceanic",
};

export const navCircuitDestinations = DESTINATION_CIRCUITS.map((circuit) => ({
  name: circuit.label,
  script: circuit.script,
  href: circuitPageHref(circuit.id),
  image: circuitCoverImage(circuit.id),
}));

export const navCircuitSafaris = SAFARI_CIRCUIT_LABELS.map((label) => {
  const circuitId = SAFARI_TO_DEST_CIRCUIT[label] || "northern";
  const circuit = DESTINATION_CIRCUITS.find((item) => item.id === circuitId);
  return {
    name: label,
    script: circuit?.script || "Tailored routes",
    href: safarisCircuitHref(label),
    image: circuitCoverImage(circuitId),
  };
});

export const navAboutLinks = [
  { name: "Our Story", href: "/about.html", desc: "Who we are in the field" },
  { name: "Gallery & Moments", href: "/about.html#about-gallery", desc: "Photos from the bush" },
  { name: "Guest Reviews", href: "#testimonials", desc: "TripAdvisor feedback" },
  { name: "Plan Your Safari", href: "/contact.html", desc: "Enquire by email or phone" },
];

export const whereToGo = [
  "museums",
  "game-drives",
  "great-migration",
  "cultural-visits",
  "bird-watching",
  "hiking",
  "waterfalls",
]
  .map((id) => tanzaniaExperiences.find((exp) => exp.id === id))
  .filter(Boolean)
  .map((exp) => ({
    name: exp.name,
    href: experiencePageUrl(exp),
    image: exp.images[0]?.src || exp.gallery[0]?.src,
    alt: exp.images[0]?.alt || exp.fullName,
    desc: exp.tagline,
  }));

export const navFeaturedWhereToGo = whereToGo.slice(0, 3);

export const safariTypes = [
  {
    name: "Northern Circuit",
    href: "/safaris.html#northern-circuit",
    image: circuitCoverImage("northern", "/assets/about/ngorongoro.jpg"),
    alt: "Northern Circuit safari",
    desc: "Serengeti · Ngorongoro · Tarangire",
  },
  {
    name: "Southern Circuit",
    href: "/safaris.html#southern-circuit",
    image: circuitCoverImage("southern", "/assets/about/main 5.jpg"),
    alt: "Southern Circuit safari",
    desc: "Ruaha · Nyerere · Katavi",
  },
  {
    name: "Zanzibar & Coast",
    href: "/safaris.html#zanzibar-island",
    image: circuitCoverImage("zanzibar", "/assets/about/main 8.jpg"),
    alt: "Zanzibar island packages",
    desc: "Stone Town · beaches · spice tours",
  },
  {
    name: "All Circuits",
    href: "/safaris.html",
    image: "/assets/about/main 7.jpg",
    alt: "Tanzania safari routes",
    desc: "Browse every circuit",
  },
];

export const navFeaturedSafaris = safariTypes.slice(0, 3);

export const experiences = [
  "game-drives",
  "great-migration",
  "cultural-visits",
  "hiking",
  "bird-watching",
  "waterfalls",
]
  .map((id) => {
    const exp = tanzaniaExperiences.find((item) => item.id === id);
    if (!exp) return null;
    return {
      title: exp.name,
      text: exp.tagline,
      icon: "◆",
      href: experiencePageUrl(exp),
    };
  })
  .filter(Boolean);

export const experiencesIntro =
  "Field days, crater descents, coast add-ons, and routes drawn for your calendar – not pulled from a shelf.";

export const credentials = [
  {
    label: "Based in",
    value: "Iringa, Tanzania",
  },
  {
    label: "TripAdvisor",
    value: "Verified listing",
    href: tripAdvisorUrl,
  },
  {
    label: "Contact",
    value: "+255 679 529 700",
    href: "tel:+255679529700",
  },
  {
    label: "Email",
    value: "info@matembosafaris.com",
    href: "mailto:info@matembosafaris.com",
  },
  {
    label: "Languages",
    value: "English & Swahili",
  },
  {
    label: "Focus",
    value: "Northern Circuit · Migration · Bush & Beach",
  },
];

export const testimonials = [
  {
    quote:
      "Our guide read every movement on the plain. We had close elephant time near Tarangire and never felt rushed between stops.",
    author: "Sarah M.",
    location: "United Kingdom",
    rating: 5,
    source: "TripAdvisor",
    sourceUrl: tripAdvisorUrl,
  },
  {
    quote:
      "Clear communication before we flew in, solid vehicle, and a crater day that matched what we were promised. Would book again.",
    author: "James K.",
    location: "Germany",
    rating: 5,
    source: "TripAdvisor",
    sourceUrl: tripAdvisorUrl,
  },
  {
    quote:
      "Matembo adjusted our route when rains shifted the migration. That flexibility made the trip feel personal.",
    author: "Anna L.",
    location: "Netherlands",
    rating: 5,
    source: "TripAdvisor",
    sourceUrl: tripAdvisorUrl,
  },
];

export const testimonialsIntro =
  "Short notes from guests who travelled with us. Full reviews live on our TripAdvisor page.";

export const contactCopy = {
  signature: "Write to us",
  title: "Plan your safari with Matembo",
  text: "Share your travel dates, group size, and parks you have in mind. We reply with a route outline and lodge options. Prices are quoted directly – not listed on this site.",
  ctaPrimary: { label: "Plan your safari", href: "/contact.html" },
  ctaSecondary: { label: "WhatsApp", href: "https://wa.me/255679529700" },
};

export const popularDestinationIds = ["serengeti", "ngorongoro", "kilimanjaro", "tarangire", "manyara", "arusha"];
