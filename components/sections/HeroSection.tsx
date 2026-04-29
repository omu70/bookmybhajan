'use client';

import { motion } from 'framer-motion';
import { BhajanAmbience } from './BhajanAmbience';

/**
 * Hero — minimal, devotional. One screen, one statement.
 * Falling marigold petals + hanging diya garland (BhajanAmbience) over the
 * cream-saffron backdrop give the visual atmosphere of a real bhajan night.
 */
export function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[92svh] flex-col items-center justify-center overflow-hidden px-5 pt-24 text-center sm:px-6 sm:pt-28">
      {/* Atmospheric backdrop layer */}
      <div className="absolute inset-0 -z-20 bg-hero-grad" />

      {/* Falling petals + diya garland */}
      <BhajanAmbience petalCount={18} garland />

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="eyebrow relative z-10"
      >
        Bookmybhajan presents
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.06 }}
        className="relative z-10 mt-6 max-w-4xl font-display font-medium leading-[0.98] tracking-tight text-text-primary text-h1-mobile sm:text-h1 lg:text-h1-xl"
      >
        Bhajan Clubbing
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="relative z-10 mt-5 font-display text-2xl italic text-saffron-grad sm:text-3xl"
      >
        ft. Fusion Albela Band
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.28 }}
        className="relative z-10 mt-6 max-w-md text-[15px] leading-relaxed text-text-strong sm:max-w-lg sm:text-base"
      >
        Five cities. Five Saturdays. Bhajans live on stage with Fusion Albela Band.
      </motion.p>

      <motion.a
        href="#shows"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="relative z-10 mt-10 inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-maroon-800"
      >
        View all shows ↓
      </motion.a>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="relative z-10 mt-6 text-[11px] text-text-muted"
      >
        Razorpay-secure · WhatsApp e-ticket · Tickets from Rs. 799
      </motion.p>
    </section>
  );
}
