# Content Audit — systemizerinc.com

Raw copy audit of the live WordPress site, captured 2026-08-12. Body copy was extracted
programmatically from live HTML (no paraphrasing). One file per page. The authoritative
URL list came from `https://systemizerinc.com/sitemap_index.xml` (All in One SEO v4.8.2)
→ `page-sitemap.xml` / `post-sitemap.xml`.

This table is also the Phase 0 **final sitemap and URL structure** document: every route,
its slug, its target Astro route, its source content collection, and its canonical URL.

## Navigation pages (in scope for rebuild)

| Live URL | Audit file | Target Astro route | Target content collection |
|---|---|---|---|
| https://systemizerinc.com/ | [home.md](home.md) | `/` | page (singleton) |
| https://systemizerinc.com/about-us/ | [about-us.md](about-us.md) | `/about-us/` | page (singleton) |
| https://systemizerinc.com/blog/ | [blog.md](blog.md) | `/blog/` | `blog` (index) |
| https://systemizerinc.com/helix-by-st/ | [helix-by-st.md](helix-by-st.md) | `/helix-by-st/` | `products` (hub) |
| https://systemizerinc.com/helix-by-st/st-overwatch/ | [helix-st-overwatch.md](helix-st-overwatch.md) | `/helix-by-st/st-overwatch/` | `products` |
| https://systemizerinc.com/helix-by-st/st-truestate/ | [helix-st-truestate.md](helix-st-truestate.md) | `/helix-by-st/st-truestate/` | `products` |
| https://systemizerinc.com/helix-by-st/stacknode/ | [helix-stacknode.md](helix-stacknode.md) | `/helix-by-st/stacknode/` | `products` |
| https://systemizerinc.com/helix-by-st/stackbot/ | [helix-stackbot.md](helix-stackbot.md) | `/helix-by-st/stackbot/` | `products` |
| https://systemizerinc.com/solutions/ | [solutions.md](solutions.md) | `/solutions/` | `solutions` (hub) |
| https://systemizerinc.com/solutions/st-infra/ | [solutions-st-infra.md](solutions-st-infra.md) | `/solutions/st-infra/` | `solutions` |
| https://systemizerinc.com/solutions/st-automation/ | [solutions-st-automation.md](solutions-st-automation.md) | `/solutions/st-automation/` | `solutions` |
| https://systemizerinc.com/solutions/st-cloud/ | [solutions-st-cloud.md](solutions-st-cloud.md) | `/solutions/st-cloud/` | `solutions` |
| https://systemizerinc.com/solutions/st-services/ | [solutions-st-services.md](solutions-st-services.md) | `/solutions/st-services/` | `solutions` |
| https://systemizerinc.com/it-consulting/ | [it-consulting.md](it-consulting.md) | `/it-consulting/` | page (singleton) |
| https://systemizerinc.com/success-stories/ | [success-stories.md](success-stories.md) | `/success-stories/` | `success-stories` (hub) |
| https://systemizerinc.com/success-stories/gve-asia-sdn-bhd/ | [success-story-gve-asia.md](success-story-gve-asia.md) | `/success-stories/gve-asia-sdn-bhd/` | `success-stories` |
| https://systemizerinc.com/success-stories/hess-exploration-and-production-malaysia/ | [success-story-hess.md](success-story-hess.md) | `/success-stories/hess-exploration-and-production-malaysia/` | `success-stories` |
| https://systemizerinc.com/success-stories/aia-berhad-life-insurance-securities/ | [success-story-aia-berhad.md](success-story-aia-berhad.md) | `/success-stories/aia-berhad-life-insurance-securities/` | `success-stories` |
| https://systemizerinc.com/clients/ | [clients.md](clients.md) | `/clients/` | `clients` |
| https://systemizerinc.com/partners/ | [partners.md](partners.md) | `/partners/` | `partners` |
| https://systemizerinc.com/contact/ | [contact-us.md](contact-us.md) | `/contact/` | page (singleton) |

Footer (newsletter signup, contact email `hello@systemizerinc.com`, phone `+603-5612 0032`,
business hours Mon–Fri 09:00–18:00, social: Facebook/LinkedIn/YouTube) is captured inside
every audit file above (the footer is rendered on every page).

## Additional live URLs found in sitemaps (not in main nav)

These exist in the sitemap and will need 301 redirects (Phase 9), but are not audited as
standalone pages here:

**Blog posts** (`post-sitemap.xml`) → target `blog` collection, route `/blog/<slug>/`:
- https://systemizerinc.com/hybrid-cloud-bursting-what-it-is/
- https://systemizerinc.com/it-trends-cios-should-watch-out-for-in-2024-and-why/
- https://systemizerinc.com/the-revolution-of-it-automation/
- https://systemizerinc.com/how-to-implement-an-it-disaster-recovery-plan/
- https://systemizerinc.com/three-it-technology-trends-expected-to-shape-2024/
- https://systemizerinc.com/embracing-the-future-hybrid-cloud-solutions/
- https://systemizerinc.com/the-top-8-reasons-to-outsource-your-it-management/
- https://systemizerinc.com/stay-protected-when-disaster-strikes/

**Legacy portfolio/gallery pages** (`page-sitemap.xml`, no nav presence) → candidates for
301 redirect to `/` or removal in Phase 9:
- https://systemizerinc.com/portfolio/
- https://systemizerinc.com/systemizer-technics-billboard-photoshoot-on-going/
- https://systemizerinc.com/ibm-partner-world-conference-2017/
- https://systemizerinc.com/atv-advent-company-quarterly-event-ure/
- https://systemizerinc.com/systemizer-technics-silicon-valley-usa-tour/
- https://systemizerinc.com/systemizer-technics-product-launching-in-conjuction-with-hitachi-asia-jp1-data-highway/
- https://systemizerinc.com/systemizer-technics-billboards-in-klang-valleys-major-highways/
- https://systemizerinc.com/overseas-partners-visit-to-systemizer-technic/
- https://systemizerinc.com/fire-prevention-seminar/
- https://systemizerinc.com/company-quarterly-event-white-water-rafting/
- https://systemizerinc.com/company-quarterly-event-explore-the-adventure/
- https://systemizerinc.com/2017-kick-off-meeting/
- https://systemizerinc.com/systemizer-technics-raya-open-house/

**Taxonomy archives** (`category-sitemap.xml`, `post_tag-sitemap.xml`) → map to blog
category/tag routes if implemented, else 301 to `/blog/`:
- Categories: disaster-recovery, backup, automation, it-outsourcing, managed-services, enterprise-it, hybrid-cloud
- Tags: it-automation, enterprise-it, efficiency, hybrid-cloud, managed-services

## Brand tokens

Placeholder brand tokens derived from the live site are in
[`../src-planning/brand-tokens-placeholder.md`](../src-planning/brand-tokens-placeholder.md)
(marked PLACEHOLDER, pending Phase 10 replacement with final brand assets).
