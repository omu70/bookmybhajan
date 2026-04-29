'use client';

import { useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect } from 'react';

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
}

const STATS: Stat[] = [
  { value: 42, suffix: 'K+', label: 'Devotees seated', sub: 'across 18 events' },
  { value: 5, label: 'Cities, premium auditoriums only', sub: 'Delhi · Mumbai · Bangalore · Goa · Chennai' },
  { value: 4.9, label: 'Average rating', sub: 'from 3,800+ reviews' },
  { value: 98, suffix: '%', label: 'Show up', sub: 'highest in Indian devotional ticketing' },
];

/**
 * StatsBand — number-led credibility strip.
 * Each number animates from 0 to its value when first scrolled into view.
 */
export function StatsBand() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-glass-border bg-cream-50/85 p-8 backdrop-blur-glass sm:p-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center sm:text-left"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-2 text-sm font-semibold text-text-primary">{s.label}</p>
              {s.sub && <p className="mt-1 text-xs text-text-muted">{s.sub}</p>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ value, suffix }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const mv = useMotionValue(0);
  // Decimals for fractional values like 4.9
  const decimals = value % 1 === 0 ? 0 : 1;
  const display = useTransform(mv, (n) => n.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, { duration: 1.6, ease: [0.2, 0.7, 0.2, 1] });
    return () => controls.stop();
  }, [inView, mv, value]);

  return (
    <span
      ref={ref}
      className="font-display text-5xl font-bold tracking-tight text-text-primary tabular sm:text-6xl"
    >
      <motion.span>{display}</motion.span>
      {suffix && <span className="text-saffron-grad">{suffix}</span>}
    </span>
  );
}
