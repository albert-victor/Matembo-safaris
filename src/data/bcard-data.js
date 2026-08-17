/** Lightweight business card data — no heavy destination/package imports. */
import { bcardSlideshow } from "./bcard-slideshow-images.js";

export { bcardSlideshow };
export const BCARD_PATH = "/bcard.html";
export const BCARD_URL = "https://matembosafaris.com/bcard.html";

export const tripAdvisorUrl =
  "https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html";
export const whatsAppUrl = "https://wa.me/255679529700";
export const whatsAppNumber = "+255 679 529 700";

export const bcardSocialLinks = [
  {
    label: "TripAdvisor reviews",
    href: tripAdvisorUrl,
    icon: "fa-brands fa-tripadvisor",
    variant: "tripadvisor",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1EZKbSs1Dr/",
    icon: "fab fa-facebook-f",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/matembosafarisandtours",
    icon: "fab fa-instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@matembosafarisandtours",
    icon: "fab fa-tiktok",
  },
  {
    label: "WhatsApp",
    href: whatsAppUrl,
    icon: "fab fa-whatsapp",
  },
];

export const bcardActions = [
  {
    id: "save",
    label: "Save Contact",
    hint: "Works on iPhone & Android",
    icon: "fas fa-address-card",
    primary: true,
    action: "save-contact",
  },
  {
    id: "safaris",
    label: "Browse Safari Packages",
    hint: "Private journeys across Tanzania",
    icon: "fas fa-compass",
    href: "/safaris.html",
  },
  {
    id: "whatsapp",
    label: "WhatsApp Enquiry",
    hint: "Chat with us instantly",
    icon: "fab fa-whatsapp",
    href: whatsAppUrl,
    external: true,
    accent: "whatsapp",
  },
  {
    id: "tripadvisor",
    label: "TripAdvisor Reviews",
    hint: "See what travellers say",
    icon: "fa-brands fa-tripadvisor",
    href: tripAdvisorUrl,
    external: true,
  },
  {
    id: "contact",
    label: "Plan Your Safari",
    hint: "Start your enquiry",
    icon: "fas fa-calendar-check",
    href: "/contact.html",
    accent: "gold",
  },
  {
    id: "website",
    label: "Open Full Website",
    hint: "Explore destinations & tours",
    icon: "fas fa-globe-africa",
    href: "/",
  },
];

export const bcardData = {
  pageUrl: BCARD_URL,
  heroImage: bcardSlideshow[0].src,
  heroAlt: "Elephants on the Ruaha savanna, Tanzania",
  slideshow: bcardSlideshow,
  emblem: "/assets/about/Matembo logo.jpg",
  name: "Matembo Safari & Tours",
  scriptLabel: "Guided from Iringa",
  tagline: "Crafting private wildlife journeys across Tanzania",
  location: "Gangilonga, Iringa, Tanzania",
  phone: "+255 679 529 700",
  phoneTel: "+255679529700",
  email: "info@matembosafaris.com",
  website: "https://matembosafaris.com",
  whatsAppUrl,
  whatsAppNumber,
  tripAdvisorUrl,
  socialLinks: bcardSocialLinks,
  actions: bcardActions,
  vcardFilename: "Matembo-Safaris.vcf",
};

export function buildVCard(data = bcardData) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Matembo Safari & Tours;;;",
    "FN:Matembo Safari & Tours",
    "ORG:Matembo Safari & Tours",
    "TITLE:Tanzania Safari & Tours Operator",
    `TEL;TYPE=CELL,VOICE:${data.phoneTel}`,
    `EMAIL;TYPE=INTERNET,WORK:${data.email}`,
    `URL:${data.website}`,
    `URL;TYPE=WORK:${data.pageUrl}`,
    "ADR;TYPE=WORK:;;Gangilonga;Iringa;;Tanzania",
    "NOTE:Northern & Southern circuit safaris. TripAdvisor verified operator.",
    ...data.socialLinks.map(
      (link) => `X-SOCIALPROFILE;TYPE=${link.label.toLowerCase().replace(/\s+/g, "-")}:${link.href}`
    ),
    "END:VCARD",
  ];
  return `${lines.join("\r\n")}\r\n`;
}
