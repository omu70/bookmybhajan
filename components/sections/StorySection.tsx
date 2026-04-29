'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import type { DevotionalEvent } from '@/types';

interface StorySectionProps {
  event: DevotionalEvent;
}

/**
 * StorySection — devotional storytelling beats logistics every time.
 * 2-column on desktop. Stagger fade-up on scroll. Spiritual significance pull-quote.
 */
export function StorySection({ event }: StorySectionProps) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">What this evening means</p>
          {event.titleHindi && (
            <p className="mt-3 font-deva text-xl text-saffron-200">
              {event.titleHindi}
            </p>
          )}
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
            {event.spiritualSignificance}
          </h2>

          <div className="mt-6 space-y-4 text-text-muted">
            {event.storyLong.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * (i + 1) }}
                className="leading-relaxed"
              >
                {para}
              </motion.p>
            ))}
          </div>

          {/* Artists */}
          <div className="mt-8 space-y-4 border-t border-white/5 pt-6">
            <p className="eyebrow">Performing live</p>
            {event.artists.map((a) => (
              <div key={a.name} className="flex items-start gap-4">
                <div className="relative size-14 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/30">
                  <Image src={a.imageUrl} alt={a.name} fill sizes="56px" className="object-cover" loading="lazy" />
                </div>
                <div>
                  <p className="font-semibold text-text-primary">{a.name}</p>
                  <p className="text-sm text-text-muted">{a.bio}</p>
                  <p className="mt-1 text-xs text-gold">
                    {a.blessedCount.toLocaleString('en-IN')}+ devotees blessed
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-glass-border"
        >
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-transparent to-transparent" />

          {/* Floating venue card */}
          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-glass-border bg-ink-900/70 p-4 backdrop-blur-glass">
            <p className="eyebrow text-[10px]">Venue</p>
            <p className="mt-1 text-base font-semibold text-text-primary">{event.venue}</p>
            <p className="mt-0.5 text-xs text-text-muted">{event.venueAddress}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
