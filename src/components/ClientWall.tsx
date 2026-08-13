import { useState } from "preact/hooks";

export interface ClientEntry {
  name: string;
  logo: string;
  industry: string;
}

interface Props {
  clients: ClientEntry[];
  /** Ordered unique industry list, e.g. ["FSI", "GLC & Govt", ...] */
  industries: string[];
}

/**
 * Clients logo wall with pill-tab industry filter.
 * Hydrated client:visible. With no JS (or before hydration) the full wall is
 * SSR'd visible, so the page is never empty; tabs simply don't filter.
 */
export default function ClientWall({ clients, industries }: Props) {
  const [active, setActive] = useState<string>("All");

  const visible =
    active === "All" ? clients : clients.filter((c) => c.industry === active);

  return (
    <div>
      {/* Pill tabs */}
      <div
        class="flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter clients by industry"
      >
        {["All", ...industries].map((industry) => {
          const isActive = industry === active;
          const count =
            industry === "All"
              ? clients.length
              : clients.filter((c) => c.industry === industry).length;
          return (
            <button
              key={industry}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(industry)}
              class={`rounded-full border px-4 py-1.5 text-small transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary ${
                isActive
                  ? "border-brand-primary bg-brand-primary text-brand-light"
                  : "border-brand-surface bg-brand-light text-brand-secondary hover:border-brand-primary hover:text-brand-primary-dark"
              }`}
            >
              {industry}
              <span
                class={`ml-1.5 ${isActive ? "text-brand-light/80" : "text-brand-text/60"}`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Logo wall */}
      <ul class="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {visible.map((client) => (
          <li
            key={client.name}
            class="client-tile flex flex-col items-center justify-center gap-3 rounded-xl border border-brand-surface bg-brand-light p-7 shadow-sm"
          >
            {/* PERF: raw <img>, revisit in Phase 10 — remote hotlinked
                WordPress placeholder; cannot route through astro:assets until
                the logo files are downloaded/finalized (deferred asset work). */}
            <img
              src={client.logo}
              alt={`${client.name} logo`}
              width="120"
              height="120"
              loading="lazy"
              class="h-16 w-auto object-contain"
            />
            <span class="text-center text-small">{client.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
