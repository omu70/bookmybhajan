'use client';

import { motion } from 'framer-motion';

/**
 * CityMarquee — ambient strip below the hero.
 * Auto-scrolling continuous marquee of the cities we serve, with venue auditoriums beneath.
 * Pure decoration that also functions as a credibility signal.
 */
const CITIES = [
  { name: 'Mumbai', venues: 'NSCI Dome · 23 May' },
  { name: 'Pune', venues: 'Balewadi Auditorium · 24 May' },
  { name: 'Ahmedabad', venues: 'Karnavati Club · 29 May' },
  { name: 'Surat', venues: 'Sanjeev Kumar · 31 May' },
  { name: 'Delhi', venues: 'IGI Stadium · 6 Jun' },
  { name: 'Bangalore', venues: 'Manpho Convention · 13 Jun' },
];

export function CityMarquee() {
  const items = [...CITIES, ...CITIES, ...CITIES]; // triple for seamless loop
  return (
    <div className="relative overflow-hidden border-y border-maroon-900/8 bg-cream-50/80 backdrop-blur-glassLo py-6">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-cream-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-cream-50 to-transparent" />

      <motion.div
        animate={{ x: ['0%', '-33.333%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
        className="flex w-max items-center gap-12 pr-12 sm:gap-20 sm:pr-20"
      >
        {items.map((c, i) => (
          <div key={i} className="flex shrink-0 items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
              {c.name}
            </span>
            <span className="text-xs text-text-muted">·</span>
            <span className="text-xs uppercase tracking-widest text-text-muted">
              {c.venues}
            </span>
            <span className="ml-8 inline-block size-1.5 rounded-full bg-saffron-500" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
