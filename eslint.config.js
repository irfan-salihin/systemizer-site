import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  // Ignore build output and dependencies
  {
    ignores: ["dist/", "node_modules/", ".astro/"],
  },
  // TypeScript support (required for TS inside .astro frontmatter)
  ...tseslint.configs.recommended,
  // Astro recommended config (includes parser + a11y rules for .astro files)
  ...eslintPluginAstro.configs.recommended,
];
