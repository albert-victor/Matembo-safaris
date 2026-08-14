/** Lightweight nav constants – no destination/package datasets. */
export const brandEmblemPath = "/assets/about/descriptions.jpg";
export const logoPath = "/assets/about/Matembo logo.jpg";

export const siteMeta = {
  name: "Matembo Safari & Tours",
  tagline: "Safari & Tours",
};

/** Top-level nav items – href works without JS; mega menus hydrate later. */
export const navShellItems = [
  { label: "Home", href: "/", plain: true },
  { label: "Destinations", href: "/circuits.html", megaKey: "destinations" },
  { label: "Safaris", href: "/safaris.html", megaKey: "safaris" },
  { label: "Things to Do", href: "/experiences.html", megaKey: "thingsToDo" },
  { label: "Ruaha", href: "/ruaha-safaris.html", megaKey: "ruaha" },
  { label: "About Us", href: "/about.html", megaKey: "about" },
];
