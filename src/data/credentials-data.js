/**
 * Tourism & safari certification bodies – horizontal marquee on homepage.
 * Logos live in /assets/credentials/certifications/ (real brand assets).
 */
export const credentialsIntro = {
  label: "Trust & Credentials",
  title: "Licensed, Certified, Accountable",
  desc: "Affiliated with Tanzania's official tourism bodies and conservation authorities.",
};

/** @typedef {'default' | 'wide' | 'emblem' | 'compact'} LogoFit */

export const certificationBodies = [
  {
    id: "zct",
    abbr: "ZCT",
    name: "Zanzibar Commission for Tourism",
    href: "https://www.zct.go.tz",
    logo: "/assets/credentials/certifications/zct-logo.jpg",
    logoFit: "default",
  },
  {
    id: "unforgettable",
    abbr: "Unforgettable Tanzania",
    name: "Destination Tanzania",
    href: "https://www.tanzaniatourism.go.tz",
    logo: "/assets/credentials/certifications/unforgettable-tanzania.svg",
    logoFit: "wide",
  },
  {
    id: "ttb",
    abbr: "Tanzania Tourist Board",
    name: "Tanzania Tourist Board",
    href: "https://www.tanzaniatourism.com",
    logo: "/assets/credentials/certifications/ttb.png",
    logoFit: "default",
  },
  {
    id: "tanapa",
    abbr: "TANAPA",
    name: "Tanzania National Parks",
    href: "https://www.tanzaniaparks.go.tz",
    logo: "/assets/credentials/certifications/tanapa-mark.png",
    logoFit: "emblem",
  },
  {
    id: "ncaa",
    abbr: "NCAA",
    name: "Ngorongoro Conservation Area",
    href: "https://www.ncaa.go.tz",
    logo: "/assets/credentials/certifications/ncaa-mark.png",
    logoFit: "emblem",
  },
  {
    id: "atb",
    abbr: "African Tourism Board",
    name: "African Tourism Board",
    href: "https://africantourismboard.com",
    logo: "/assets/credentials/certifications/african-tourism-board.jpg",
    logoFit: "emblem-crop",
  },
  {
    id: "unwto",
    abbr: "UN Tourism",
    name: "UN World Tourism Organization",
    href: "https://www.unwto.org",
    logo: "/assets/credentials/certifications/unwto-mark.svg",
    logoFit: "compact",
  },
  {
    id: "unesco",
    abbr: "UNESCO",
    name: "World Heritage Sites",
    href: "https://whc.unesco.org/en/statesparties/tz",
    logo: "/assets/credentials/certifications/unesco-mark.png",
    logoFit: "compact",
  },
  {
    id: "tato",
    abbr: "TATO",
    name: "Tanzania Assoc. of Tour Operators",
    href: "https://www.tato.org",
    logo: "/assets/credentials/certifications/tato-icon.jpg",
    logoFit: "compact",
  },
  {
    id: "tripadvisor",
    abbr: "TripAdvisor",
    name: "TripAdvisor",
    href: "https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html",
    logo: "/assets/credentials/tripadvisor.svg",
    logoFit: "wide",
  },
];
