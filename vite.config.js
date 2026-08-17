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
    closeBundle() {
      generateSitemap("dist");
    },
  };
}

const FONT_AWESOME_SNIPPET = `
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />
    <link rel="preload" as="style" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin onload="this.onload=null;this.rel='stylesheet'" />
    <noscript><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" crossorigin /></noscript>`;

function fontAwesomePlugin() {
  return {
    name: "matembo-font-awesome",
    transformIndexHtml(html) {
      if (html.includes("font-awesome/6.5.1")) return html;
      return html.replace("<head>", `<head>${FONT_AWESOME_SNIPPET}`);
    },
  };
}

export default defineConfig({
  root: ".",
  server: {
    port: 5173,
    open: true,
  },
  plugins: [sitemapPlugin(), fontAwesomePlugin()],
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
        bcard: resolve("bcard.html"),
        ...getHtmlInputsFromDir("activities", "activity"),
        packageView: resolve("package-view.html"),
        uiDemo: resolve("ui-demo.html"),
        ...getHtmlInputsFromDir("destinations", "dest"),
        ...getHtmlInputsFromDir("experiences", "exp"),
        ...getHtmlInputsFromDir("circuits", "circuit"),
        ...getHtmlInputsFromDir("packages", "pkg"),
      },
      output: {
        manualChunks(id) {
          if (id.includes("safari-packages.js")) return "safari-packages";
          if (id.includes("all-destinations.js")) return "destinations-data";
          if (id.includes("game-drive-packages.js")) return "game-drive-packages";
          if (id.includes("activity-packages.js")) return "activity-packages";
        },
      },
    },
  },
});
