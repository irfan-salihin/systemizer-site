# Tech Stack — Systemizer Technic Sdn Bhd Website Rebuild

This document defines the approved technology stack for the full rebuild of systemizerinc.com. It is intended to give a developer picking this project up cold enough context to start contributing immediately. Do not substitute alternative frameworks or libraries without explicit approval.

---

## Framework

**Astro 5 with TypeScript strict mode.**

Astro 5 ships zero JavaScript by default and emits static HTML, which is ideal for a content-heavy corporate site where SEO and load speed matter more than client-side interactivity. TypeScript strict mode is enabled project-wide to catch type errors at build time and enforce safer contracts on content schemas, component props, and utility functions. Astro's island architecture lets us add interactivity only where needed without pulling in a full SPA framework.

---

## Styling

**Tailwind CSS 4 via the Vite plugin, plus a design-tokens file for brand colors and typography.**

Tailwind 4 is configured through its first-party Vite plugin (not the legacy PostCSS integration), which is the currently supported installation path and avoids PostCSS version conflicts. A dedicated design-tokens file (CSS variables mapped into Tailwind's theme) centralizes Systemizer's brand colors, type scale, and spacing so that brand changes propagate from a single source. Utility-first styling keeps component markup co-located with its styles and removes the overhead of maintaining a separate CSS architecture.

---

## Interactivity

**Preact islands only, hydrated selectively via `client:visible` / `client:idle`. No full SPA framework.**

Interactivity (mobile nav, mobile menu, form state, lightweight UI behaviors) is implemented as Preact islands embedded inside Astro components. Hydration directives are chosen per island — `client:visible` for below-the-fold widgets and `client:idle` for non-critical enhancements — so that no island blocks initial render. There is intentionally no React/Next/Vue app shell; the site remains a static multi-page document with surgically hydrated regions.

---

## Content

**Astro Content Collections (MDX) with Zod schemas.**

All editorial content — blog posts, success stories/case studies, solution pages, product pages under Helix by ST, client logos, and partner logos — is modeled as Astro Content Collections backed by Zod schemas. Each collection's schema validates frontmatter (title, description, dates, slug, related entities, OG image, etc.) at build time, so malformed content fails the build rather than shipping broken pages. Content is authored as MDX files in the repo, which allows embedding components inside prose where useful. Collections covered:

- `blog` — blog posts
- `success-stories` — case studies (e.g., GVE Asia, Hess E&P Malaysia, AIA Berhad)
- `solutions` — ST-Infra, ST-Automation, ST-Cloud, ST-Services
- `products` — Helix by ST suite: ST Overwatch, ST TrueState, STackNode, STackBot
- `clients` — client logo wall entries
- `partners` — partner logo entries

---

## SEO

**`@astrojs/sitemap`, a reusable SEO/meta component, JSON-LD structured data, Open Graph + Twitter Card meta, canonical URLs, and `robots.txt`.**

A single reusable `<SEO>` Astro component encapsulates `<title>`, meta description, canonical URL, Open Graph, and Twitter Card tags, and is composed into every page layout so metadata is never hand-written ad hoc. JSON-LD structured data is emitted per page type: `Organization` and `LocalBusiness` on the site root/contact, `BreadcrumbList` on inner pages, and `Article` schema on blog posts. `@astrojs/sitemap` generates the sitemap index at build time and `robots.txt` is generated statically with a reference to the sitemap URL. Once Decap CMS is mounted at `/admin` in a later phase, `robots.txt` will disallow `/admin` so the admin UI is not indexed. Canonical URLs are derived from a single configured production origin to prevent duplicate-content issues.

---

## Performance

**`astro:assets` + Sharp for image optimization, self-hosted fonts via Fontsource, Partytown for third-party scripts, `astro:transitions` for view transitions, target Lighthouse 95+ on all four categories.**

All images are routed through `astro:assets`, which uses Sharp under the hood to emit WebP/AVIF with responsive `srcset` variants — no raw `<img>` tags pointing at full-resolution uploads. Fonts are self-hosted via Fontsource rather than loaded from the Google Fonts CDN, eliminating a third-party request and the associated GDPR/consent surface. Any third-party scripts (analytics beacons, embeds) are routed through Partytown's web worker so they never block the main thread. Astro view transitions (`astro:transitions`) provide SPA-like navigation without a client router. The performance budget is a Lighthouse score of 95 or higher across Performance, Accessibility, Best Practices, and SEO on every page type.

---

## Forms & Backend

**Cloudflare Pages Functions as the backend, Cloudflare Turnstile for spam protection, no third-party form SaaS.**

The contact form and newsletter signup post to Cloudflare Pages Functions (edge functions colocated in the `functions/` directory), which validate input and forward submissions via email or to a storage target — no external form SaaS (Formspree, Typeform, etc.) is introduced. Email delivery is handled by Resend (resend.com), called from the Pages Function via Resend's HTTP API using an API key stored as a Cloudflare Pages environment variable/secret; MailChannels' free Cloudflare Workers integration was discontinued in August 2024, which is why Resend is used instead of the commonly-referenced MailChannels pattern. Cloudflare Turnstile is embedded on every form for bot protection in place of reCAPTCHA, avoiding Google's consent banner and cookie requirements. This keeps all form handling within the Cloudflare ecosystem that already hosts the site.

---

## Analytics

**Cloudflare Web Analytics (cookieless, no consent banner required).**

Cloudflare Web Analytics is a cookieless, server-side-aggregated analytics product that does not require a GDPR/ePrivacy consent banner, which keeps the site banner-free and reduces legal surface area. It is enabled via a single script tag (routed through Partytown) and surfaces traffic, top pages, and referrers from the Cloudflare dashboard. No GA4, no Hotjar, no third-party tracking pixels are introduced.

---

## Hosting & CI

**Hosting on Cloudflare Pages connected to a GitHub repo, with per-PR preview deployments. CI via GitHub Actions running `astro check`, ESLint, Prettier `--check`, and Lighthouse CI on every PR — blocking merge on regressions.**

Cloudflare Pages builds the static output directly from the GitHub repo and emits a preview deployment for every pull request, giving reviewers a live URL per change. A GitHub Actions workflow runs on every PR: `astro check` for type/diagnostic errors, ESLint for lint, Prettier `--check` for formatting, and Lighthouse CI for performance/accessibility/SEO regressions. The workflow is configured as a required status check so a PR cannot merge if Lighthouse scores regress below the defined threshold or any lint/type step fails. Production deploys happen automatically on merge to `main`.

---

## Testing

**Playwright for smoke tests on critical pages.**

A Playwright suite covers the highest-risk user paths: home page render, contact form submission (including the Turnstile + Pages Function path on preview), one product page, and one case study. Smoke tests run in CI on every PR against the Cloudflare preview deployment URL and are a required check. The suite is intentionally narrow (smoke, not full regression) to keep CI fast and maintainable for a corporate site.

---

## Tooling

**pnpm as the package manager.**

pnpm is used for all dependency management — it is disk-efficient via its content-addressed store, strictly resolves dependencies (no phantom deps), and is well-supported by Astro, Tailwind, and Cloudflare Pages builds. A `pnpm-lock.yaml` is committed and CI installs with `pnpm install --frozen-lockfile` to ensure reproducible builds. Node version is pinned via `.nvmrc`/`package.json` `engines` to align local dev, CI, and Cloudflare build environments.

---

## Why not X

**WordPress + Elementor (the current stack).**
The existing site is on WordPress with Elementor. While this made initial authoring easy, it carries a heavy runtime cost: PHP rendering, plugin sprawl, security surface, jQuery dependencies, and layout/CSS bloat that Lighthouse penalizes. A static Astro build eliminates the runtime server, the plugin ecosystem, and the database, which is the entire reason for the rebuild.

**Next.js.**
Next.js is a strong framework, but its value (SSR, ISR, API routes, React Server Components) is aimed at dynamic, authenticated, or highly interactive applications. This site is a static corporate marketing site with a handful of lightweight islands; adopting Next would pull in the React runtime on every page, add build complexity, and provide no benefit over Astro's zero-JS default. Astro also produces a smaller, faster static bundle than Next's static export.

**Full headless CMS (Contentful, Sanity, etc.).**
A full headless CMS adds a runtime dependency, vendor lock-in, per-request or per-content-tier pricing, and a data-fetching layer — all for a site whose content changes infrequently and is already comfortably authored as files. Astro Content Collections with MDX gives us typed, version-controlled content with build-time validation at zero operational cost. Decap CMS (git-based) remains available as an optional `/admin` UI in a later phase if the team decides file editing is insufficient, which covers the authoring-UX concern without the SaaS overhead.
