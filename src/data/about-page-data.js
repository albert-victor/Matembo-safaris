/** Gallery & moments images from /assets/about/ */
const GALLERY_UUIDS = [
  "003c5e51-b6e7-4f9c-ae6f-86c78febe640",
  "0c5353d6-d895-44ef-b140-7e32b050d827",
  "2d111bf3-7626-49ad-a7bc-e05fe3223485",
  "3dbfe127-834f-418e-9187-ea65f9ae89ac",
  "47371c2b-c109-4b7e-9f47-e92ab7d119b7",
  "513c5ad1-6cd4-4377-b83b-a885baaaa6d6",
  "6259d38a-5ad0-41cb-a1cb-e44b244bc63c",
  "710d9d18-1fc9-4ac7-b808-4817d4728b7c",
  "855b437f-4576-4d5b-b185-864c7c8aa101",
  "941777d5-8bf3-4ede-bc16-43e4df0f1e46",
  "a11d367e-8208-49d0-a5f0-4fb198ef63e7",
  "b7242c53-cf7e-4eca-b91c-0483fed99cc8",
  "69cc52ba-11cc-43a3-8f55-e33aa92025fa",
  "78bb030f-3792-48be-900d-8d001cfce5d4",
  "fe2887bc-6096-4984-98c9-09dc63991d84",
].filter(Boolean);

function galleryImage(uuid, alt) {
  return { src: `/assets/about/${uuid}.jpg`, alt };
}

export const aboutPageData = {
  hero: {
    signature: "Matembo Safari & Tours",
    title: "People who know the road",
    lead: "A Tanzanian operator built on field knowledge – from Gangilonga, Iringa, across every circuit you can name.",
    image: "/assets/about/about hero.jpg",
  },
  story: {
    label: "Our Story",
    title: "Safari people, not brochure promises",
    paragraphs: [
      "Matembo Safari & Tours was founded by George and a team of guides who live the seasons – not just the brochure. Based in Gangilonga, Iringa, we are minutes from Ruaha National Park and at the heart of Tanzania's southern circuit.",
      "We plan wildlife routes across the north and south, match lodges to your budget without cutting corners on guides or vehicles, and stay on call from your first WhatsApp to your last flight home.",
      "Whether you want a week on the Serengeti plains, a crater day from Arusha, or a southern loop through Mikumi and Ruaha, the itinerary is drawn around how you travel – not a fixed template pulled from a shelf.",
    ],
    stats: [
      { value: "Northern & Southern", label: "Circuits covered" },
      { value: "Private 4×4", label: "Safari fleet" },
      { value: "Ruaha · Iringa", label: "Home ground" },
    ],
    image: "/assets/about/main 11.jpg",
  },
  moments: {
    label: "Moments",
    title: "In the field with Matembo",
    desc: "Sunrise drives, river bends, crater rims and the quiet hours between sightings.",
    images: [
      galleryImage("003c5e51-b6e7-4f9c-ae6f-86c78febe640", "Safari moment in Tanzania"),
      galleryImage("47371c2b-c109-4b7e-9f47-e92ab7d119b7", "Wildlife on the plains"),
      galleryImage("6259d38a-5ad0-41cb-a1cb-e44b244bc63c", "Game drive at dawn"),
      galleryImage("855b437f-4576-4d5b-b185-864c7c8aa101", "Elephants in the bush"),
      galleryImage("941777d5-8bf3-4ede-bc16-43e4df0f1e46", "Safari landscape Tanzania"),
      galleryImage("a11d367e-8208-49d0-a5f0-4fb198ef63e7", "Guide and guests on safari"),
    ],
  },
  gallery: {
    label: "Gallery",
    title: "Through our lens",
    desc: "Scenes from routes we run every week – Ruaha, Serengeti, coast and highlands.",
    images: [
      { src: "/assets/about/main.jpg", alt: "Tanzania safari" },
      { src: "/assets/about/main 1.jpg", alt: "Wildlife safari Tanzania" },
      { src: "/assets/about/main 5.jpg", alt: "Highland landscape" },
      { src: "/assets/about/main 7.jpg", alt: "Plains wildlife" },
      { src: "/assets/about/main 8.jpg", alt: "Coast and islands" },
      { src: "/assets/about/ngorongoro.jpg", alt: "Ngorongoro Crater" },
      { src: "/assets/about/cultural visits.jpg", alt: "Cultural experience" },
      { src: "/assets/about/binoculars.jpg", alt: "Game viewing" },
      ...GALLERY_UUIDS.slice(0, 8).map((id, i) =>
        galleryImage(id, `Safari gallery ${i + 1}`)
      ),
    ],
  },
  team: {
    label: "Reach Us",
    title: "George & the Matembo team",
    text: "Call, email or WhatsApp – we reply with route ideas tailored to your dates, not templates. Based in Iringa, operating across Tanzania.",
    contact: {
      phone: "+255 679 529 700",
      email: "info@matembosafaris.com",
      location: "Gangilonga, Iringa, Tanzania",
    },
  },
};
