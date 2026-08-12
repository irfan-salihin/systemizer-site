# Roadmap — Systemizer Technic Sdn Bhd Website Rebuild

This roadmap tracks progress across all phases of the systemizerinc.com rebuild. It is written as verifiable checkboxes so that an AI coding agent can resume work in a new session and determine exactly what is and isn't done without hallucinating state.

**Rules for updating this file:**

- Only mark a task `[x]` when it is actually complete and verifiable (file exists, command passes, page renders, test green).
- Update the `Status:` tag at the top of each phase before starting it (`In Progress`) and after finishing it (`Complete`).
- Do not mark tasks complete speculatively. If a task is blocked, leave it `[ ]` and add a `BLOCKED:` note.
- This initial version is created before any implementation work begins — every task is `[ ]` and every phase is `Not Started`.

---

## Phase 0 — Discovery & Content Audit

**Status: Complete**

- [x] Inventory all existing pages and copy from systemizerinc.com (capture current URL, page title, and body copy for every page listed in the IA: Home, Company > About Us, Blog, Helix by ST > ST Overwatch / ST TrueState / STackNode / STackBot, Solutions > IT Solutions / ST-Infra / ST-Automation / ST-Cloud / ST-Services, IT Consulting, Success Stories incl. GVE Asia, Hess E&P Malaysia, AIA Berhad, Clients, Partners, Contact Us; plus footer newsletter/contact/hours/social)
- [x] Define placeholder brand tokens (colors, type scale) based on the current live site's existing look, to be used until final assets are swapped in.
- [x] Define final sitemap and URL structure (a single document listing every route, its slug, its source content collection, and its canonical URL)

---

## Phase 1 — Project Scaffolding

**Status: Complete**

- [x] Initialize Astro 5 project with TypeScript strict mode enabled (astro 5.18.2, typescript 5.9.3, `extends: astro/tsconfigs/strict`)
- [x] Use pnpm as the package manager; commit `pnpm-lock.yaml` (pnpm 10.14.0, lockfile committed)
- [x] Install and configure Tailwind CSS 4 via the Vite plugin (tailwindcss 4.3.3 + @tailwindcss/vite 4.3.3 in `astro.config.mjs`; placeholder brand tokens wired into `@theme` in `src/styles/global.css`)
- [x] Create folder structure: `src/components`, `src/layouts`, `src/content`, `src/pages`
- [x] Configure ESLint with Astro plugin (`eslint.config.js`: eslint-plugin-astro recommended + typescript-eslint; `pnpm lint` passes)
- [x] Configure Prettier with Astro plugin (`.prettierrc.json` with prettier-plugin-astro; `pnpm format:check` passes)
- [x] Configure `astro check` (typecheck) and confirm it runs clean on a scaffolded page (0 errors, 0 warnings, 0 hints; `pnpm build` succeeds)
- [x] Create the GitHub repo and push the initial commit (github.com/irfan-salihin/systemizer-site, commit `c51f038` on `main`)

---

## Phase 2 — Design System

**Status: Complete**

- [x] Define design tokens (brand colors, type scale, spacing) in a config file aligned with `tech-stack.md`, mapped into Tailwind's theme (`@theme` block in `src/styles/global.css`; placeholder values from `src-planning/brand-tokens-placeholder.md`)
- [x] Build base `Button` component with variants (`src/components/Button.astro`: primary/secondary/ghost)
- [x] Build base `Card` component (`src/components/Card.astro`)
- [x] Build base `Section` component (`src/components/Section.astro`: light/surface/dark variants)
- [x] Build base `Container` component (`src/components/Container.astro`)
- [x] Build responsive `Header`/`Nav` with a mobile menu implemented as a Preact island (hydrated `client:visible` or `client:idle`) — `src/components/Header.astro` (static desktop nav, zero JS) + `src/components/MobileMenu.tsx` hydrated `client:idle` (button is always in view, so `client:visible` would hydrate immediately anyway; `client:idle` defers to browser idle time instead). Nav structure in `src/data/nav.ts`. Verified: island SSR'd with serialized props + `client:idle` in built HTML.
- [x] Build `Footer` including newsletter signup, contact email/phone, business hours, and social links (Facebook, LinkedIn, YouTube) — `src/components/Footer.astro` (newsletter backend wiring is Phase 7)

---

## Phase 3 — Content Collections & Schemas

**Status: Complete**

- [x] Define Zod schema for `blog` collection (title, description, pubDate, updatedDate, author, tags, heroImage, ogImage, draft) — `src/content.config.ts`; 8 posts migrated from live site
- [x] Define Zod schema for `success-stories` collection (clientName, industry, challenge, solutionSummary, outcome, testimonialQuote, testimonialAuthor, logoRef, featured, slug) — 3 entries migrated (GVE Asia, Hess E&P Malaysia, AIA Berhad)
- [x] Define Zod schema for `solutions` collection (title, tagline, description, icon, order) — 4 entries migrated (ST-Infra, ST-Automation, ST-Cloud, ST-Services)
- [x] Define Zod schema for `products` collection (title, tagline, description, icon, order) — 4 entries migrated (ST Overwatch, ST TrueState, STackNode, STackBot)
- [x] Define Zod schema for `clients` collection (name, logo, url, industry) — 116 entries migrated from the live logo wall (64 named; 52 carry a MIGRATION FLAG comment: live site only exposed bare filenames, real names unrecoverable from audit)
- [x] Define Zod schema for `partners` collection (name, logo, url, description) — 11 entries migrated (VAST Data duplicate tile consolidated; names mapped from logo filenames)
- [x] Migrate/rewrite existing page copy from the Phase 0 inventory into MDX content files, one file per entry, validated against its schema — 146 entries total; `astro check` 0 errors (content sync validates every entry). Unmappable copy flagged in-file via MIGRATION FLAG comments (ST-MMS TablePress tier tables in st-services; duplicated Key-Features blocks on st-truestate/stacknode/stackbot; filename-only client logos). NOTE: client/partner `logo` fields currently hot-link the live WordPress uploads as placeholders — asset download/optimization happens in Phase 6 (image optimization) and final logos swap in Phase 10.

---

## Phase 4 — Core Pages

**Status: Not Started**

- [ ] Home page
- [ ] About Us page
- [ ] Solutions hub page
- [ ] Solutions sub-page: ST-Infra
- [ ] Solutions sub-page: ST-Automation
- [ ] Solutions sub-page: ST-Cloud
- [ ] Solutions sub-page: ST-Services
- [ ] Helix by ST hub page
- [ ] Product page: ST Overwatch
- [ ] Product page: ST TrueState
- [ ] Product page: STackNode
- [ ] Product page: STackBot
- [ ] IT Consulting page
- [ ] Success Stories hub page
- [ ] Individual case study template (used for GVE Asia, Hess E&P Malaysia, AIA Berhad, and future entries)
- [ ] Clients page (logo wall)
- [ ] Partners page (logo wall)
- [ ] Contact page with a working form (markup only in this phase; backend wiring is Phase 7)
- [ ] Custom 404 page
- [ ] Privacy Policy page (PDPA-compliant, Malaysia)

---

## Phase 5 — SEO Implementation

**Status: Not Started**

- [ ] Build the reusable `<SEO>` component (title, description, canonical, OG, Twitter Card) and compose it into every page layout
- [ ] Emit `Organization` and `LocalBusiness` JSON-LD on site root/contact
- [ ] Emit `BreadcrumbList` JSON-LD on inner pages
- [ ] Emit `Article` JSON-LD on blog posts
- [ ] Generate sitemap via `@astrojs/sitemap`
- [ ] Generate `robots.txt` referencing the sitemap
- [ ] Define OG image generation strategy (static branded template vs. per-page generated image)

---

## Phase 6 — Performance Pass

**Status: Not Started**

- [ ] Image optimization audit — confirm every image routes through `astro:assets`/Sharp and emits WebP/AVIF with responsive `srcset`; remove any raw `<img>` to full-resolution assets
- [ ] Font loading audit — confirm all fonts are self-hosted via Fontsource and no Google Fonts CDN request is made
- [ ] Bundle/island hydration audit — confirm each Preact island uses the cheapest correct directive (`client:visible` / `client:idle`) and no unnecessary `client:load`
- [ ] Integrate Lighthouse CI into the GitHub Actions workflow with a 95+ threshold on all four categories as a required check

---

## Phase 7 — Forms & Integrations

**Status: Not Started**

- [ ] Implement contact form backend via a Cloudflare Pages Function (`functions/` directory) — validate input and forward submissions
- [ ] Integrate Cloudflare Turnstile on the contact form (and any other form) for spam protection
- [ ] Implement newsletter signup via a Cloudflare Pages Function
- [ ] Provision Resend account, verify sending domain, store `RESEND_API_KEY` as a Cloudflare Pages environment variable (not committed to repo)
- [ ] Integrate Cloudflare Web Analytics (cookieless), with the script routed through Partytown
- [ ] Route any remaining third-party scripts through Partytown

---

## Phase 8 — QA & Testing

**Status: Not Started**

- [ ] Write Playwright smoke tests for: home page, contact form submission, one product page, one case study
- [ ] Run Playwright suite in CI against the Cloudflare preview deployment URL as a required check
- [ ] Cross-browser check (Chrome, Firefox, Safari) and responsive device check (mobile, tablet, desktop breakpoints)
- [ ] Accessibility audit — run axe and/or Lighthouse a11y and resolve all violations before launch

---

## Phase 9 — Launch

**Status: Not Started**

- [ ] Delete the throwaway `/style-check/` page (`src/pages/style-check.astro`) before launch
- [ ] Produce DNS cutover plan from WordPress hosting to Cloudflare Pages (record current DNS, nameserver change steps, rollback plan)
- [ ] Build the 301 redirect map from old WordPress URLs to new static URLs (one entry per existing indexed URL)
- [ ] Define post-launch monitoring checklist (Lighthouse re-run, Search Console submission, sitemap submission, form submission test, analytics verification)
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools

---

## Phase 10 — Brand & Content Touch-Up

**Status: Not Started**

- [ ] Replace placeholder color tokens with final approved brand colors
- [ ] Replace placeholder typography with final approved brand fonts
- [ ] Identify and verify the 52 flagged client logos, or remove permanently if unidentifiable
- [ ] Swap in final logo files (all required formats/sizes: favicon, OG image, header logo, footer logo)
- [ ] Review all Phase 3 content-collection copy against final brand voice/tone guidelines and revise as needed
- [ ] Re-run Lighthouse CI and visual QA after asset swap to confirm no regressions
