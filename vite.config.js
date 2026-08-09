import { defineConfig } from "vite";
import { existsSync, readdirSync } from "node:fs";
import { resolve } from "node:path";

function getHtmlInputsFromDir(dir, prefix) {
  if (!existsSync(dir)) return {};
  return Object.fromEntries(
    readdirSync(dir)
      .filter((name) => name.endsWith(".html"))
      .map((name) => [`${prefix}-${name.replace(".html", "")}`, resolve(dir, name)])
  );
}

export default defineConfig({
  root: ".",
  server: {
    port: 5173,
    open: true,
  },
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
        ruahaSafaris: resolve("ruaha-safaris.html"),
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
