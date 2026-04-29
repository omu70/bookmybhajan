'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { REVIEWS } from '@/lib/reviews';

/**
 * DevoteeVoices — reviews / feedback section.
 *
 *   Pulls from `lib/reviews.ts`. Anonymous first-name-only by default.
 *   Layout: 2-up on mobile (2×3 grid), 3-up on desktop.
 *   Plain card design — no glow, no avatars, no fake star ratings beyond
 *   the ones in the data file.
 */
export function DevoteeVoices() {
  return (
    <section className="relative isolate bg-cream-100 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">From past nights</p>
          <p className="mt-4 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
            श्रोताओं की आवाज़
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What people say{' '}
            <span className="italic text-saffron-grad">on the way home.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-base">
            Notes received over WhatsApp from past Bhajan Clubbing nights.
            Every show, the same kinds of messages.
          </p>
        </motion.div>

        {/* Reviews grid — 2-up mobile, 3-up desktop */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.article
              key={`${r.name}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              className="flex h-full flex-col rounded-2xl border border-maroon-900/12 bg-cream-50 p-5 sm:p-6"
            >
              <Quote className="size-5 text-saffron-500" strokeWidth={1.8} aria-hidden />

              {/* Stars */}
              <div className="mt-3 flex gap-0.5" aria-label={`Rated ${r.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={
                      s < r.rating
                        ? 'size-4 fill-saffron-500 text-saffron-500'
                        : 'size-4 text-saffron-200'
                    }
                  />
                ))}
              </div>

              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-text-strong sm:text-base">
                “{r.quote}”
              </p>

              <p className="mt-5 border-t border-maroon-900/10 pt-4 text-xs font-semibold uppercase tracking-widest text-text-muted">
                {r.name} · {r.city}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
