'use client';

import { motion } from 'framer-motion';
import {
  Sparkles,
  Users,
  Music,
  Heart,
} from 'lucide-react';

/**
 * WhyBhajanClubbing — emotional-trigger section.
 *
 * Lives between the video marquee and the event grid. Four sensory,
 * benefit-driven reasons someone would pick this Saturday over any other.
 *
 * Layout:
 *   • Mobile: 2 × 2 grid
 *   • Desktop ≥ md: 4 cards in a row
 *
 * Copy is intentionally short — emotional triggers, not feature lists.
 * No invented statistics, no fake quotes. Just the natural experience
 * of being inside a live bhajan night.
 */

interface Reason {
  Icon: any;
  hindi: string;
  headline: string;
}

const REASONS: Reason[] = [
  { Icon: Sparkles, hindi: 'याद रहने वाली शाम', headline: 'A Saturday that stays.' },
  { Icon: Users,    hindi: 'हर पीढ़ी एक साथ',  headline: 'Every age, one chorus.' },
  { Icon: Music,    hindi: 'महसूस करो',         headline: 'Live, not streamed.' },
  { Icon: Heart,    hindi: 'बिना शर्तों के',     headline: 'Bhakti, no rulebook.' },
];

export function WhyBhajanClubbing() {
  return (
    <section className="relative isolate overflow-hidden border-y border-maroon-900/10 bg-cream-100 py-16 sm:py-24">
      {/* Subtle saffron glow at top centre */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,rgba(255,122,26,0.18),transparent_70%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">Why this Saturday</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Four reasons.{' '}
            <span className="italic text-saffron-grad">No more, no fewer.</span>
          </h2>
        </motion.div>

        {/* 2 × 2 mobile / 4-up desktop */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <ReasonCard key={i} reason={r} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const { Icon, hindi, headline } = reason;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
      className="group flex h-full flex-col rounded-2xl border border-maroon-900/12 bg-cream-50 p-5 transition-all hover:-translate-y-1 hover:border-saffron-500/40 sm:p-6"
    >
      <span className="mb-5 grid size-11 place-items-center rounded-xl bg-saffron-grad text-cream-50 sm:size-12">
        <Icon className="size-5 sm:size-[22px]" strokeWidth={2.2} />
      </span>

      <p className="font-deva text-sm font-semibold text-maroon-700">{hindi}</p>
      <h3 className="mt-1 font-display text-lg font-semibold leading-[1.15] text-text-primary sm:text-xl">
        {headline}
      </h3>
    </motion.div>
  );
}
