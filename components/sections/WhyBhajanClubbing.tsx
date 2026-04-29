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
  hindi?: string;
  headline: string;
  body: string;
}

const REASONS: Reason[] = [
  {
    Icon: Sparkles,
    hindi: 'याद रहने वाली शाम',
    headline: 'A Saturday that doesn’t blur.',
    body:
      'Most weekends disappear into screens, traffic, and queues. This one stays — three hours of music you’ll still hear in your head on Wednesday.',
  },
  {
    Icon: Users,
    hindi: 'हर पीढ़ी एक साथ',
    headline: 'One room, every generation.',
    body:
      'Bring your dadi. Bring your hostel mates. Bhajan Clubbing is one of the few rooms where both feel completely at home — and both know the chorus.',
  },
  {
    Icon: Music,
    hindi: 'सुनो नहीं, महसूस करो',
    headline: 'Live music you feel, not stream.',
    body:
      'No earbuds. No lossy stream. A dhol hit you feel in your sternum, a drop on Achyutam Keshavam that lifts the whole room three feet off the floor.',
  },
  {
    Icon: Heart,
    hindi: 'भक्ति, बिना शर्तों के',
    headline: 'Bhakti without the rulebook.',
    body:
      'Sit, stand, dance, cry, just close your eyes. Every response is right. There is no correct way to be inside a Bhajan Clubbing room.',
  },
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
          <p className="eyebrow">Why your Saturday belongs here</p>
          <p className="mt-4 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
            शनिवार को और क्या करोगे?
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Your Saturday,{' '}
            <span className="text-saffron-grad italic">designed.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-base">
            You can spend the next Saturday the same way as the last fifty.
            Or — for less than a movie and dinner — you can spend it inside a
            room that resets your week before it starts.
          </p>
        </motion.div>

        {/* 2 × 2 mobile / 4-up desktop */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:mt-14 sm:gap-5 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <ReasonCard key={i} reason={r} index={i} />
          ))}
        </div>

        {/* Soft secondary CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center sm:mt-14"
        >
          <a
            href="#shows"
            className="inline-flex items-center gap-2 rounded-full bg-text-primary px-6 py-3 text-sm font-semibold text-cream-50 hover:bg-maroon-800"
          >
            Find your night ↓
          </a>
          <p className="mt-3 text-xs text-text-muted">
            Tickets from Rs. 799 · seating first-come-first-served · refundable
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function ReasonCard({ reason, index }: { reason: Reason; index: number }) {
  const { Icon, hindi, headline, body } = reason;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
      className="group flex h-full flex-col rounded-2xl border border-maroon-900/12 bg-cream-50 p-5 transition-all hover:-translate-y-1 hover:border-saffron-500/40 hover:shadow-card-hover sm:p-6"
    >
      {/* Saffron icon tile */}
      <span className="mb-4 grid size-11 place-items-center rounded-xl bg-saffron-grad text-cream-50 sm:size-12">
        <Icon className="size-5 sm:size-[22px]" strokeWidth={2.2} />
      </span>

      {hindi && (
        <p className="font-deva text-sm font-semibold text-maroon-700">
          {hindi}
        </p>
      )}

      <h3 className="mt-1 font-display text-lg font-semibold leading-[1.2] text-text-primary sm:text-xl">
        {headline}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-text-muted sm:text-sm">
        {body}
      </p>
    </motion.div>
  );
}
