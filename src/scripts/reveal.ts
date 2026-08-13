/**
 * Site-wide scroll-reveal entrance animation (fade + slight translate-Y, 400ms).
 *
 * Implemented with the Web Animations API (element.animate) — zero dependencies.
 * An earlier iteration used Motion One (`motion` package), but its bundle added
 * ~63KB of JS for what is a 6-line WAAPI call; removed to protect the
 * performance budget (Phase 6 threshold).
 *
 * - Marks sections [data-reveal] hidden ONLY after JS runs (no-JS users see
 *   content immediately, fully rendered).
 * - Uses IntersectionObserver (no scroll listeners) — sections animate once
 *   when scrolled into view; below-the-fold sections never animate early.
 * - prefers-reduced-motion: reduce → no animation, everything simply visible.
 */
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        (entry.target as HTMLElement).animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 400, easing: "ease-out", fill: "both" },
        );
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
  );

  for (const target of targets) {
    target.style.opacity = "0";
    observer.observe(target);
  }
}
