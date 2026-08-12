// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import preact from "@astrojs/preact";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://systemizerinc.com",
  integrations: [
    preact(),
    mdx(),
    sitemap({
      // Throwaway design-system page (deleted in Phase 9) must not be indexed.
      filter: (page) => !page.includes("/style-check"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
