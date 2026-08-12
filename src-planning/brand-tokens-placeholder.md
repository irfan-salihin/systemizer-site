# PLACEHOLDER Brand Tokens — Systemizer Technic

> **STATUS: PLACEHOLDER — pending replacement in Phase 10.**
> These tokens were derived from the _current live WordPress site's_ existing look
> (logo SVG + theme CSS custom properties in the Elementor kit), **not** from official
> brand guidelines. They exist so Phases 1–9 have something real to build against.
> In Phase 10 they must be replaced with final approved brand colors, fonts, and logo files.

**Derived on:** 2026-08-12
**Derived from:**

- Logo SVG: `https://systemizerinc.com/wp-content/uploads/2023/01/Systemizer-logo-small.svg` (all paths fill `#0075c9`)
- Theme CSS: Elementor kit custom properties (`--e-global-color-*`, `--e-global-typography-*`) on systemizerinc.com

---

## Color tokens (PLACEHOLDER)

| Token                | Value     | Source / usage on live site                                                  |
| -------------------- | --------- | ---------------------------------------------------------------------------- |
| `brand-primary`      | `#0075C9` | Logo SVG fill; Elementor `--e-global-color-primary`; links, primary accents  |
| `brand-accent`       | `#0077C8` | Elementor `--e-global-color-accent`; buttons/highlights                      |
| `brand-primary-dark` | `#0066AB` | Elementor `--e-global-color-b810e1f`; hover/darker primary states            |
| `brand-secondary`    | `#142149` | Elementor `--e-global-color-secondary`; dark navy sections, headings on dark |
| `brand-dark`         | `#131022` | Elementor `--e-global-color-dark`; footer/darkest surfaces                   |
| `brand-light`        | `#FFFFFF` | Elementor `--e-global-color-light`; light surfaces                           |
| `brand-surface`      | `#F3F6FF` | Elementor `--e-global-color-f4878ae`; pale blue-tinted section backgrounds   |
| `brand-text`         | `#666666` | Elementor `--e-global-color-text`; body text                                 |
| `brand-warning`      | `#FF8C00` | Elementor `--e-global-color-warning`; highlights/badges (sparing use)        |

## Typography tokens (PLACEHOLDER)

The live site uses system Arial for headings and Roboto (served by Google Fonts) for
body text. Per `tech-stack.md`, the rebuild self-hosts fonts via Fontsource — the
placeholder heading face is therefore kept as system Arial (no webfont needed) and
Roboto will be self-hosted, until Phase 10 swaps in the final brand fonts.

| Token          | Value                                            | Source                                                                                            |
| -------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| `font-heading` | `Arial, "Helvetica Neue", Helvetica, sans-serif` | Elementor `--e-global-typography-primary/secondary-font-family: "Arial"`                          |
| `font-body`    | `Roboto, Arial, Helvetica, sans-serif`           | Elementor `--e-global-typography-text-font-family: "Roboto"` (self-host via `@fontsource/roboto`) |

## Type scale (PLACEHOLDER, from live Elementor kit, desktop values)

| Token               | Size / weight / line-height | Live usage                          |
| ------------------- | --------------------------- | ----------------------------------- |
| `display` (h1/hero) | `60px` / 300 / `70px`       | `--e-global-typography-secondary-*` |
| `h1`                | `45px` / 300 / `55px`       | `--e-global-typography-primary-*`   |
| `h2`                | `35px` / 300 / `45px`       | `--e-global-typography-a1b81de-*`   |
| `h3`                | `26px` / 300 / `36px`       | `--e-global-typography-930086a-*`   |
| `h4`                | `22px` / 300 / `35px`       | `--e-global-typography-e92f322-*`   |
| `h5`                | `18px` / 300 / `32px`       | `--e-global-typography-9cefd3b-*`   |
| `body`              | `16px` / 300 / `29px`       | `--e-global-typography-text-*`      |
| `small`             | `14px` / 300 / `25px`       | `--e-global-typography-9593018-*`   |

## Logo (PLACEHOLDER)

- **Primary logo:** `Systemizer-logo-small.svg` — monochrome mark, all fills `#0075c9`, viewBox `139.55 × 55.17`.
- **Reverse/white variant** used on dark header: `Systemizer-Technic-Logo_Reverse.png` (300×127).
- **Site icon/favicon:** `cropped-site-icon-2-*.png` (32/180/192/270).
- Final logo files in all required formats/sizes (favicon, OG image, header, footer) are swapped in during Phase 10.
