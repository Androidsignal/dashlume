// Static build used only for GitHub Pages deploys.
// GitHub Pages cannot run a server, so the build output is rendered once and the
// resulting HTML + assets are published as plain static files.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const base = process.env["PAGES_BASE"] ?? "/";

export default defineConfig({
  vite: {
    base,
    define: {
      __ASSET_BASE__: JSON.stringify(base.replace(/\/$/, "")),
    },
  },
});
