import { useEffect, useRef, useState } from "preact/hooks";

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

interface Props {
  stats: Stat[];
  /** Animation duration in ms. */
  duration?: number;
}

/**
 * Animated stat counters. Hydrated client:visible; each counter animates from
 * 0 to its value ONCE when scrolled into view (IntersectionObserver — no scroll
 * listeners). With prefers-reduced-motion or no JS, the final values render
 * statically (SSR'd) and never animate.
 */
export default function StatCounter({ stats, duration = 1400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      class="grid grid-cols-2 gap-8 text-center md:grid-cols-4"
      role="group"
      aria-label="Company statistics"
    >
      {stats.map((stat) => (
        <Counter
          key={stat.label}
          stat={stat}
          run={started}
          skipAnimation={reducedMotion}
          duration={duration}
        />
      ))}
    </div>
  );
}

function Counter({
  stat,
  run,
  skipAnimation,
  duration,
}: {
  stat: Stat;
  run: boolean;
  skipAnimation: boolean;
  duration: number;
}) {
  const [display, setDisplay] = useState(stat.value);

  useEffect(() => {
    if (!run) return;
    if (skipAnimation) {
      setDisplay(stat.value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * stat.value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, skipAnimation, duration, stat.value]);

  return (
    <div>
      <p class="font-heading text-h1 text-brand-primary">
        {display}
        {stat.suffix}
      </p>
      <p class="mt-1 text-small">{stat.label}</p>
    </div>
  );
}
