'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Flame } from 'lucide-react';
import { BhajanAmbience } from './BhajanAmbience';

/**
 * Hero — minimal, Gen-Z punchy. One screen, one bold statement.
 *   • Bold tagline sticker
 *   • Big italic display title
 *   • Punchy sub
 *   • Two CTAs (primary dark + ghost)
 *   • Petals + diya garland over a saffron backdrop
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-5 pt-24 text-center sm:px-6 sm:pt-28">
      <div className="absolute inset-0 -z-20 bg-hero-grad" />
      <BhajanAmbience petalCount={16} garland />

      {/* Sticker tagline */}
      <motion.span
        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
        className="relative z-10 inline-flex items-center gap-1.5 rounded-full bg-text-primary px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-widest text-saffron-200"
      >
        <Flame className="size-3 text-saffron-400" strokeWidth={2.6} />
        bhakti, on the beat
      </motion.span>

      {/* H1 */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.05 }}
        className="relative z-10 mt-5 max-w-4xl font-display font-medium leading-[0.95] tracking-tight text-text-primary text-[44px] sm:text-h1 lg:text-[104px]"
      >
        Bhajan{' '}
        <span className="italic text-saffron-grad">Clubbing.</span>
      </motion.h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="relative z-10 mt-4 font-display text-xl text-maroon-700 sm:text-2xl"
      >
        ft. <span className="font-semibold italic">Fusion Albela Band</span>
      </motion.p>

      {/* Tag */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
        className="relative z-10 mt-5 max-w-md text-[15px] leading-relaxed text-text-strong sm:max-w-lg sm:text-base"
      >
        5 cities. 5 Saturdays. The biggest devotional concert of the year.
      </motion.p>

      {/* CTA pair */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.36 }}
        className="relative z-10 mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
      >
        <a
          href="#shows"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-7 py-3.5 text-sm font-bold tracking-wide text-cream-50 transition-all hover:-translate-y-0.5 hover:bg-maroon-800 sm:text-base"
        >
          Book my Saturday <ArrowDown className="size-4" />
        </a>
        <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-maroon-900/20 bg-cream-50/70 px-4 py-2 text-[11px] font-extrabold uppercase tracking-widest text-text-strong backdrop-blur-glassLo">
          Tickets from Rs. 799
        </span>
      </motion.div>

      {/* Tiny trust line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-7 text-[11px] text-text-muted"
      >
        Razorpay-secure · WhatsApp ticket · 7-day refunds
      </motion.p>
    </section>
  );
}
