import { useState } from "preact/hooks";
import type { NavItem } from "../data/nav";

interface Props {
  items: NavItem[];
}

/**
 * Mobile navigation — Preact island.
 * Renders the hamburger toggle and the collapsible mobile menu panel.
 * Desktop navigation is plain static HTML in Header.astro and ships no JS.
 */
export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggleExpanded = (label: string) =>
    setExpanded((current) => (current === label ? null : label));

  return (
    <div class="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu-panel"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        class="inline-flex items-center justify-center rounded-md p-2 text-brand-secondary hover:bg-brand-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M6 6l12 12M18 6L6 18" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            class="h-6 w-6"
            aria-hidden="true"
          >
            <path stroke-linecap="round" d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        )}
      </button>

      {open && (
        <nav
          id="mobile-menu-panel"
          aria-label="Mobile navigation"
          class="absolute inset-x-0 top-full border-t border-brand-surface bg-brand-light shadow-lg"
        >
          <ul class="divide-y divide-brand-surface">
            {items.map((item) => (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <div class="flex items-center justify-between pr-4">
                      <a
                        href={item.href}
                        class="block flex-1 px-4 py-3 text-brand-secondary no-underline"
                      >
                        {item.label}
                      </a>
                      <button
                        type="button"
                        aria-expanded={expanded === item.label}
                        aria-label={`Toggle ${item.label} submenu`}
                        onClick={() => toggleExpanded(item.label)}
                        class="rounded-md p-2 text-brand-primary hover:bg-brand-surface"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          class={`h-4 w-4 transition-transform ${expanded === item.label ? "rotate-180" : ""}`}
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M6 9l6 6 6-6"
                          />
                        </svg>
                      </button>
                    </div>
                    {expanded === item.label && (
                      <ul class="bg-brand-surface/50 pb-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <a
                              href={child.href}
                              class="block px-8 py-2 text-brand-text no-underline hover:text-brand-primary"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    class="block px-4 py-3 text-brand-secondary no-underline"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
