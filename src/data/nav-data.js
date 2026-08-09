/**
 * Lightweight nav + mega menu data – no full package dataset imports.
 */
import { getDestinationsByCircuit } from "./all-destinations.js";
import { DESTINATION_CIRCUITS, circuitPageHref } from "./circuit-nav.js";
import { packagePageUrl } from "../js/paths.js";
import { experiences, experiencePageUrl } from "./experiences-data.js";
import { NAV_IMAGES } from "./nav-images.js";

export const brandEmblemPath = "/assets/about/descriptions.jpg";
export const logoPath = "/assets/about/Matembo logo.jpg";

export const siteMeta = {
  name: "Matembo Safari & Tours",
  tagline: "Safari & Tours",
  location: "Gangilonga, Iringa, Tanzania",
  phone: "+255 679 529 700",
  email: "info@matembosafaris.com",
  website: "https://www.matembosafaris.com",
};

function circuitCoverImage(circuitId, fallback = "/assets/about/main3.jpg") {
  const dest = getDestinationsByCircuit(circuitId)[0];
  return dest?.images?.[0]?.src || fallback;
}

function navItem(name, script, href, image) {
  return { name, script, href, image };
}

function experienceNavItem(id, nameOverride) {
  const exp = experiences.find((entry) => entry.id === id);
  if (!exp) return null;
  return navItem(
    nameOverride || exp.name,
    exp.scriptLabel || exp.tagline?.slice(0, 48) || exp.category,
    experiencePageUrl(exp),
    exp.images?.[0]?.src || exp.gallery?.[0]?.src
  );
}

const IMG = {
  ...NAV_IMAGES,
  zanzibar: circuitCoverImage("zanzibar", "/assets/about/main 8.jpg"),
};

export const navCircuitDestinations = DESTINATION_CIRCUITS.map((circuit) => ({
  name: circuit.label,
  script: circuit.script,
  href: circuitPageHref(circuit.id),
  image: circuitCoverImage(circuit.id),
}));

/** Verified /assets/about/main* photography for About mega menu. */
export const ABOUT_MAIN_IMAGES = {
  hero: "/assets/about/main.jpg",
  story: "/assets/about/main 11.jpg",
  gallery: "/assets/about/main 5.jpg",
  moments: "/assets/about/main 7.jpg",
  coast: "/assets/about/main 8.jpg",
  team: "/assets/about/descriptions.jpg",
  plains: "/assets/about/main 1.jpg",
};

export const navAboutLinks = [
  {
    name: "Our Story",
    href: "/about.html",
    desc: "George & the field team in Iringa",
    image: ABOUT_MAIN_IMAGES.story,
  },
  {
    name: "Gallery & Moments",
    href: "/about.html#about-gallery",
    desc: "Ruaha, Serengeti & coast scenes",
    image: ABOUT_MAIN_IMAGES.gallery,
  },
  {
    name: "Guest Reviews",
    href: "/#testimonials",
    desc: "TripAdvisor verified feedback",
    image: ABOUT_MAIN_IMAGES.moments,
  },
  {
    name: "Plan Your Safari",
    href: "/contact.html",
    desc: "Share dates & parks in mind",
    image: ABOUT_MAIN_IMAGES.coast,
  },
];

/** Safari types – site pages only, with real photography. */
export const navSafariTypes = [
  navItem("Tanzania Safaris", "All circuits & packages", "/safaris.html", IMG.serengeti5d),
  navItem("Adventure Safaris", "Wildlife game drives", "/game-drives.html", IMG.serengeti3d),
  navItem("Mountain Climbing", "Kilimanjaro & highlands", "/trekkings.html", IMG.lemosho7d),
  navItem("Beach Holiday", "Zanzibar & coast", "/beach-holiday.html", IMG.zanzibar),
  navItem("Walking Safaris", "Guided bush walks", "/walking-safaris.html", IMG.shiraDay),
  navItem("Tourist Attractions", "Museums & heritage", "/tourist-attractions.html", IMG.olduvai),
];

/** Things to Do – existing experiences & listings only (3 columns). */
export const navThingsToDoColumns = [
  [
    navItem("Game Drives", "46 private 4×4 routes", "/game-drives.html", IMG.serengeti3d),
    experienceNavItem("great-migration", "Great Migration"),
    experienceNavItem("bird-watching", "Bird Watching"),
    experienceNavItem("hiking", "Walking / Hiking"),
  ].filter(Boolean),
  [
    experienceNavItem("cultural-visits", "Cultural Visits"),
    experienceNavItem("waterfalls", "Waterfalls"),
    experienceNavItem("rock-climbing", "Rock Climbing"),
    navItem("Climbing / Trekking", "Kilimanjaro routes", "/trekkings.html", IMG.machame8d),
  ].filter(Boolean),
  [
    experienceNavItem("museums", "Museums & Heritage"),
    experienceNavItem("game-drives", "Safari Drives Guide"),
    navItem("All Activities", "Browse the index", "/experiences.html", IMG.olduvai),
  ].filter(Boolean),
];

export const megaMenuPanels = {
  destinations: {
    featured: {
      name: "Northern Circuit",
      label: "Start here",
      desc: "Serengeti, Ngorongoro, Tarangire & the great northern parks.",
      href: circuitPageHref("northern"),
      image: circuitCoverImage("northern"),
      alt: "Northern Circuit Tanzania",
    },
    heading: { label: "Tanzania circuits", title: "Explore by region" },
    items: navCircuitDestinations,
    aside: {
      label: "Need a map?",
      title: "Every circuit, one index",
      tags: "North · South · Coast",
      quote: "Pick a circuit. We connect the nights and drives.",
      ctaText: "View all circuits",
      ctaHref: "/circuits.html",
      image: circuitCoverImage("northern", "/assets/about/main 11.jpg"),
    },
    footer: { text: "View all circuits →", href: "/circuits.html" },
  },
  safaris: {
    heading: { label: "Safari types", title: "Browse by experience" },
    items: navSafariTypes,
    footer: { text: "All safari packages →", href: "/safaris.html" },
  },
  thingsToDo: {
    featured: {
      name: "Great Migration",
      label: "Featured activity",
      desc: "Follow wildebeest herds and river crossings on the Serengeti corridor.",
      href: "/experiences/great-migration.html",
      image: IMG.migration,
      alt: "Great Migration Tanzania",
    },
    heading: { label: "Things to do", title: "Activities on your route" },
    columns: navThingsToDoColumns,
    aside: {
      label: "Matembo add-ons",
      title: "Pair with wildlife days",
      tags: "Culture · Hiking · Coast",
      quote: "Build migration focus, museum stops, or highland hikes into your safari.",
      ctaText: "View all activities",
      ctaHref: "/experiences.html",
      image: IMG.udzungwa,
    },
    footer: { text: "View all activities →", href: "/experiences.html" },
  },
  ruaha: {
    featured: {
      name: "3 Days Safari to Ruaha",
      label: "From Iringa",
      desc: "Sunrise drives along the Great Ruaha River – wild dogs, elephants and lion country.",
      href: packagePageUrl("3-days-safari-to-ruaha-national-park"),
      image: IMG.ruaha3d,
      alt: "Ruaha National Park safari",
    },
    heading: { label: "Southern Circuit", title: "Ruaha National Park" },
    items: [
      navItem("Ruaha Express", "2 Days / 1 Night", packagePageUrl("2-days-safari-to-ruaha-national-park"), IMG.ruaha2d),
      navItem("Ruaha Explorer", "3 Days / 2 Nights", packagePageUrl("3-days-safari-to-ruaha-national-park"), IMG.ruaha3d),
      navItem("Ruaha Immersion", "4 Days / 3 Nights", packagePageUrl("4-days-safari-in-ruaha-national-park"), IMG.ruaha4d),
      navItem("Southern Icons", "Mikumi + Ruaha", packagePageUrl("5-days-safari-to-mikumi-ruaha-national-parks"), IMG.ruaha5d),
      navItem("Southern Classic", "Ruaha + Udzungwa + Mikumi", packagePageUrl("7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks"), IMG.ruaha7d),
      navItem("Grand Southern", "Nyerere + Ruaha route", packagePageUrl("10-days-safari-to-nyerere-mikumi-udzungwa-ruaha-national-parks"), IMG.ruaha10d),
    ],
    aside: {
      label: "Matembo home park",
      title: "108 km from Iringa",
      tags: "Wild dogs · Elephants · River drives",
      quote: "Ruaha is our backyard – we know the river bends where predators hunt at dawn.",
      ctaText: "View Ruaha routes",
      ctaHref: "/ruaha-safaris.html",
      image: IMG.ruaha4d,
    },
    footer: { text: "View all Ruaha safaris →", href: "/ruaha-safaris.html" },
  },
  about: {
    featured: {
      name: "Safari people, not brochures",
      label: "About Matembo",
      desc: "Guides who live the seasons – based in Iringa, operating across every circuit.",
      href: "/about.html",
      image: ABOUT_MAIN_IMAGES.hero,
      alt: "Matembo Safari & Tours in Tanzania",
    },
    heading: { label: "Matembo Safari & Tours", title: "Who we are" },
    items: navAboutLinks,
    aside: {
      label: "Home base",
      title: "Gangilonga, Iringa",
      tags: "Ruaha · Southern · Northern circuits",
      quote: "Call or WhatsApp – we reply with a route outline tailored to your dates.",
      ctaText: "Plan your safari",
      ctaHref: "/contact.html",
      image: ABOUT_MAIN_IMAGES.team,
    },
    footer: { text: "Visit About page →", href: "/about.html" },
  },
};
