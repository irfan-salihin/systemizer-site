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

**Status: Complete**

- [x] Home page (`src/pages/index.astro`; hero, vision, what-we-do, solutions teaser, success-stories grid from collection, clients teaser)
- [x] About Us page (`src/pages/about-us.astro`; company, mission, values cards, leadership team, careers — migrated from content-audit/about-us.md)
- [x] Solutions hub page (`src/pages/solutions/index.astro`; 4 solution cards from collection + 4 solution-category cards from live copy)
- [x] Solutions sub-page: ST-Infra (`src/pages/solutions/[slug].astro` template renders all 4 collection entries; verified 200)
- [x] Solutions sub-page: ST-Automation (same template; verified 200)
- [x] Solutions sub-page: ST-Cloud (same template; verified 200)
- [x] Solutions sub-page: ST-Services (same template; verified 200)
- [x] Helix by ST hub page (`src/pages/helix-by-st/index.astro`; 4 product cards from collection + live hub copy)
- [x] Product page: ST Overwatch (`src/pages/helix-by-st/[slug].astro` template renders all 4 collection entries; verified 200)
- [x] Product page: ST TrueState (same template; verified 200)
- [x] Product page: STackNode (same template; verified 200)
- [x] Product page: STackBot (same template; verified 200)
- [x] IT Consulting page (`src/pages/it-consulting.astro`; migrated from content-audit/it-consulting.md)
- [x] Success Stories hub page (`src/pages/success-stories/index.astro`; cards from collection)
- [x] Individual case study template (used for GVE Asia, Hess E&P Malaysia, AIA Berhad, and future entries) (`src/pages/success-stories/[slug].astro`; all 3 verified 200)
- [x] Clients page (logo wall) (`src/pages/clients.astro`; renders only `verified: true` entries — 64 shown, grouped by industry; 52 flagged entries excluded)
- [x] Partners page (logo wall) (`src/pages/partners.astro`; 11 partners from collection)
- [x] Contact page with a working form (markup only in this phase; backend wiring is Phase 7) (`src/pages/contact.astro`; name/email/subject/message fields, preventDefault stub; offices + phone/support numbers from audit)
- [x] Custom 404 page (`src/pages/404.astro`)
- [x] Privacy Policy page (PDPA-compliant, Malaysia) (`src/pages/privacy-policy.astro`)

---

## Phase 5 — SEO Implementation

**Status: Complete**

- [x] Build the reusable `<SEO>` component (title, description, canonical, OG, Twitter Card) and compose it into every page layout (`src/components/SEO.astro`; composed in `BaseLayout.astro`; canonical defaults to current path on production origin from `src/data/site.ts`; verified in built HTML on home/blog/product pages)
- [x] Emit `Organization` and `LocalBusiness` JSON-LD on site root/contact (`src/components/JsonLdOrganization.astro`; Organization on `/`, LocalBusiness with full address/phone/email on `/contact/` — verified in built HTML)
- [x] Emit `BreadcrumbList` JSON-LD on inner pages (`src/components/JsonLdBreadcrumb.astro`; rendered by `PageLayout` on every non-Home page — verified)
- [x] Emit `Article` JSON-LD on blog posts (`src/components/JsonLdArticle.astro` on `blog/[slug].astro` from collection fields; all required fields verified present — headline/description/datePublished/author/publisher/mainEntityOfPage)
- [x] Generate sitemap via `@astrojs/sitemap` (v3.7.3; `sitemap-index.xml` + `sitemap-0.xml` with 30 URLs on build; `/style-check` filtered out)
- [x] Generate `robots.txt` referencing the sitemap (`public/robots.txt`; disallows `/admin` (reserved for Decap CMS) and `/style-check`; references sitemap-index.xml)
- [x] Define OG image generation strategy (static branded template vs. per-page generated image) — decision: static default OG image now (placeholder: live-site logo SVG at `/og-default.svg`), per-page branded OG template deferred to Phase 10 when final brand assets exist

---

## Phase 6 — Performance Pass

**Status: Complete** (image optimization partially deferred to Phase 10 — see note)

- [x] Image optimization audit — audited: the only two `<img>` usages in `src/` are the client/partner logo walls, both rendering remote hotlinked WordPress placeholders that cannot be optimized yet; both are flagged in-code with `PERF: raw <img>, revisit in Phase 10`. No other raw `<img>` to full-resolution assets exist. Routing logo images through `astro:assets`/Sharp with WebP/AVIF + responsive srcset is **deferred to Phase 10** (blocked on final logo files — the hotlinks are placeholders). No `<Image>` component usage yet because there are no local image assets to process.
- [x] Font loading audit — confirm all fonts are self-hosted via Fontsource and no Google Fonts CDN request is made (verified: `@fontsource/roboto` 300/400/500 imported in BaseLayout; 24 woff2 files emitted into `dist/_astro/`; zero `fonts.googleapis.com`/`fonts.gstatic.com` references in source or built HTML)
- [x] Bundle/island hydration audit — confirm each Preact island uses the cheapest correct directive (`client:visible` / `client:idle`) and no unnecessary `client:load` (verified: exactly one directive in the codebase — `client:idle` on `MobileMenu.tsx` in `Header.astro`; zero `client:load`; island JS total ~32KB incl. Preact runtime)
- [x] Integrate Lighthouse CI into the GitHub Actions workflow with a 95+ threshold on all four categories as a required check (`.github/workflows/lighthouse.yml` + `.lighthouserc.json`; 95 threshold kept as-is. Local Lighthouse (Chromium headless): home/clients/blog post all 100/100/100/100, st-cloud 99/100/100/100 — currently ABOVE threshold; if hotlinked external logos ever drag scores below 95 in CI, treat as a known temporary gap until Phase 10 asset swap — do not weaken the threshold)

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

---

## Demo Prep (ad hoc)

**Status: Complete**

> Visual polish pass for a demo. This does **not** fulfill Phase 10's real-asset-swap
> tasks — the logo/icon/photo work here uses the live site's current public assets and
> placeholders, pending final approved brand assets in Phase 10.

- [x] Fetch real Systemizer Technic logo (blue SVG for header, white variant for dark footer) into `src/assets/` and wire into `Header.astro`/`Footer.astro` (white variant recolored from the official blue logo SVG; matches live site's placement)
- [x] Add Lucide icons via **lucide-astro** (chose it over `@astrojs/lucide` — that package is unmaintained at v1.x with no Astro 5 support — and over `astro-icon`, which pulls a runtime icon resolver unnecessary for a fixed set of 8 icons). Mapped via `src/components/CollectionIcon.astro` using the existing `icon` schema field: server→ST-Infra, workflow→ST-Automation, cloud→ST-Cloud, headphones→ST-Services, eye→ST Overwatch, scan-search→ST TrueState, boxes→STackNode, bot→STackBot. Rendered on hub cards and detail-page heroes.
- [x] Build abstract background components driven by brand tokens (no external images): `GradientMesh.astro`, `DotGrid.astro`, `DiagonalLines.astro`; applied to Home hero (mesh+dots), Solutions hub hero (mesh+lines), Helix hub hero (mesh+dots) via a `heroBackground` prop on PageLayout.
- [x] Build `PhotoPending.astro` (brand-token panel + Lucide image icon + caption) and place it where real photography will eventually go: About Us office/team band + 6 leadership portraits, and the 3 case-study hero slots. No stock photography sourced.
- [x] Verify: `astro check` 0 errors, `pnpm build` 32 pages OK, local Lighthouse homepage 99/100/100/100 (perf/a11y/bp/seo) — above the Phase 6 threshold of 95.

---

## Visual Richness (ad hoc)

**Status: Complete**

> Illustration + motion pass. All visuals are inline SVG/CSS in brand tokens — no stock
> photography, no external image hotlinks, no new hosted image files. All motion respects
> `prefers-reduced-motion`; scroll animation uses IntersectionObserver (no scroll listeners).

- [x] Build 3 abstract enterprise-IT SVG illustrations as reusable components in `src/components/illustrations/` (`NetworkMesh.astro` — connected nodes mesh; `ServerRack.astro` — rack with status lights + uplinks; `DataPipeline.astro` — cloud-to-cloud pipeline with packets), all styled via brand-token CSS variables.
- [x] Homepage hero: layered GradientMesh + DotGrid + NetworkMesh as hero-side visual; Vision section paired with DataPipeline; What We Do paired with ServerRack. Real copy from content-audit (no invented copy); Vision/What We Do sections already existed and were restructured into two-column illustration layouts.
- [x] Scroll-reveal entrance animation (fade + translateY 16px, 400ms ease-out) site-wide on all `Section` components (hero sections opted out via `reveal={false}`). NOTE: initially implemented with Motion One, but its bundle added ~63KB JS — **replaced with the Web Animations API** (`element.animate`, zero dependencies) to protect the performance budget. Triggered via IntersectionObserver, animates once, disabled under prefers-reduced-motion, content fully visible without JS.
- [x] Animated stat counter (`src/components/StatCounter.tsx`, Preact island, `client:visible`, IntersectionObserver, counts up once) on homepage. Real numbers only: 18+ years (founded 2008, about-us audit), 64+ verified clients (clients collection), 99% customer satisfaction (ST-Services copy), 3 office locations (contact audit). No invented figures.
- [x] Card hover polish in `Card.astro`: CSS-only lift (-4px) + brand-primary border glow; disabled under prefers-reduced-motion.
- [x] Verify: `astro check` 0 errors; `pnpm build` 32 pages OK; Lighthouse homepage 99/100/100/100 (solutions hub 99/100/100/100, about-us 99/100/100/100, product page 99/100/100/100). One a11y regression caught & fixed (PhotoPending caption opacity → full-strength text). Bundle: JS 25,860 B → 27,329 B (+1.5KB: StatCounter island + reveal script), CSS 61,928 B → 61,818 B, dist total 1.69MB → 1.72MB. No new runtime dependencies (motion was installed then removed in favor of WAAPI).

---

## Design Refresh

**Status: Complete** (merged to main; current state of the site)

> Full visual design upgrade pass. No copy changes; content collections and
> schemas untouched. Inline SVG/CSS only — no stock photos, no external image
> hotlinks, no new hosted binary assets. All motion respects prefers-reduced-motion.

- [x] Typography system: mega hero scale (`text-mega`, clamp 48–84px), `headline-xl` with accent-word treatment, `kicker` eyebrow (accent rule + tracked small caps), ghost outline `index-numeral`; palette extended with derived `brand-ink` / `brand-mist`
- [x] Header: brand gradient hairline, taller bar, animated active-link underline, elevated dropdowns with accent borders; nav breakpoint md→lg
- [x] Footer: brand-ink base + gradient hairline mirroring the header
- [x] Homepage: asymmetric 12-col hero on ink band (mega type, dual CTA, NetworkMesh right); Vision/What We Do as mirrored editorial offsets with illustrations; numbered success-story cards; ink clients band
- [x] Solutions hub: numbered cards with icon chips + tagline subheads; categories as hairline-joined panels
- [x] Helix hub: same numbered treatment with dark icon chips; ink CTA band with split layout
- [x] Success Stories: full-width dark featured lead card + numbered grid
- [x] Clients: industry groups with ghost numerals + headline-xl + counts; hairline-grid logo cells with grayscale→color hover — **REVISED below**
- [x] Clients/Partners revision (post-feedback): industry bands replaced by `ClientWall.tsx` Preact island (`client:visible`) with pill-tab sector filter (All + 9 industries + counts); wall SSRs fully so no-JS users see all logos. Logos full color (grayscale treatment removed per Irfan's feedback); hover is subtle lift + scale(1.02) + brand glow, reduced-motion safe. Partners page redesigned to the same rounded-tile treatment (simpler — no tabs for 11 entries). Both pages remain fully collection-driven; `verified: true` filter kept (64 shown, 52 hidden). Lighthouse: Clients 100/100/100/100, Partners 99/100/100/100. Bundle: JS +1.4KB (island), CSS ~flat.
- [x] PageLayout hero: ink band, kicker eyebrow, icon chip, display-size title

**Verification (this branch):**

- `astro check` 0 errors; `pnpm build` 32 pages; ESLint/Prettier clean
- SEO intact in built HTML on all sampled pages: title/canonical/OG on all; JSON-LD Organization (home), LocalBusiness (contact), BreadcrumbList (inner), Article (blog); sitemap + robots.txt generated
- Lighthouse (local Chromium headless): home 99/100/100/100, solutions 99/100/100/100, helix 99/100/100/100, about 99/100/100/100, clients 100/100/100/100, success-stories 96/100/100/100, st-cloud 99/100/100/100
- Two a11y issues caught by Lighthouse during the pass and fixed (featured-card accent contrast; h3→h2 heading order on hub cards)
- Bundle vs main: JS 27,329 B → 27,329 B (0 change — all CSS/HTML/SVG); CSS 62,085 B → 70,634 B (+8.5KB design utilities); dist 1.73MB → 1.83MB
