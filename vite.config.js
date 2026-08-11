import { defineConfig } from "vite";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { generateSitemap } from "./scripts/generate-sitemap.mjs";

function getHtmlInputsFromDir(dir, prefix) {
  if (!existsSync(dir)) return {};
  return Object.fromEntries(
    readdirSync(dir)
      .filter((name) => name.endsWith(".html"))
      .map((name) => [`${prefix}-${name.replace(".html", "")}`, resolve(dir, name)])
  );
}

function sitemapPlugin() {
  return {
    name: "matembo-sitemap",
    buildStart() {
      generateSitemap("public");
    },
    closeBundle() {
      generateSitemap("dist");
    },
  };
}

export default defineConfig({
  root: ".",
  server: {
    port: 5173,
    open: true,
  },
  plugins: [sitemapPlugin()],
  build: {
    rollupOptions: {
      input: {
        main: resolve("index.html"),
        about: resolve("about.html"),
        contact: resolve("contact.html"),
        circuits: resolve("circuits.html"),
        destinations: resolve("destinations.html"),
        experiences: resolve("experiences.html"),
        safaris: resolve("safaris.html"),
        trekkings: resolve("trekkings.html"),
        gameDrives: resolve("game-drives.html"),
        birdWatching: resolve("bird-watching.html"),
        nightGameDrives: resolve("night-game-drives.html"),
        culturalVisits: resolve("cultural-visits.html"),
        beachHoliday: resolve("beach-holiday.html"),
        walkingSafaris: resolve("walking-safaris.html"),
        touristAttractions: resolve("tourist-attractions.html"),
        adventureSafaris: resolve("adventure-safaris.html"),
        ruahaSafaris: resolve("ruaha-safaris.html"),
        ...getHtmlInputsFromDir("activities", "activity"),
        packageView: resolve("package-view.html"),
        uiDemo: resolve("ui-demo.html"),
        ...getHtmlInputsFromDir("destinations", "dest"),
        ...getHtmlInputsFromDir("experiences", "exp"),
        ...getHtmlInputsFromDir("circuits", "circuit"),
        ...getHtmlInputsFromDir("packages", "pkg"),
      },
    },
  },
});
