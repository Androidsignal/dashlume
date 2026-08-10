// Static build used only for GitHub Pages deploys (see .github/workflows/deploy-pages.yml).
// GitHub Pages cannot run a server, so the workflow builds this Node output,
// renders the page once and publishes the resulting HTML + assets.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { preset: "node-server" },
  vite: {
    base: process.env["PAGES_BASE"] ?? "/",
  },
});
