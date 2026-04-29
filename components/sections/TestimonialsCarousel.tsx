'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Testimonial } from '@/types';
import { cn } from '@/lib/utils';

interface TestimonialsCarouselProps {
  testimonials: Testimonial[];
  attendedCount?: number;
}

/**
 * TestimonialsCarousel — emotion-led, 5 quotes max.
 * Mobile: swipeable single card. Desktop: 3 visible.
 */
export function TestimonialsCarousel({
  testimonials,
  attendedCount,
}: TestimonialsCarouselProps) {
  const [idx, setIdx] = useState(0);
  const visible = testimonials.slice(idx, idx + 1);

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">What devotees say</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {attendedCount ? (
              <>
                {attendedCount.toLocaleString('en-IN')}+ devotees attended.{' '}
                <span className="text-saffron-grad">This is what they remember.</span>
              </>
            ) : (
              'What devotees remember'
            )}
          </h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length)}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-glass-surface hover:border-gold/40"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setIdx((i) => (i + 1) % testimonials.length)}
            className="flex size-10 items-center justify-center rounded-full border border-white/15 bg-glass-surface hover:border-gold/40"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Mobile single, desktop 3-up */}
      <div className="md:hidden">
        <AnimatePresence mode="wait">
          {visible.map((t, i) => (
            <motion.div
              key={`${idx}-${i}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              <TestimonialCard t={t} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="hidden gap-5 md:grid md:grid-cols-3">
        {testimonials.slice(0, 3).map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <TestimonialCard t={t} />
          </motion.div>
        ))}
      </div>

      {/* "As seen in" */}
      <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 opacity-70">
        <p className="text-xs uppercase tracking-widest text-text-muted">As featured in</p>
        <span className="font-display text-lg text-text-muted">Amar Ujala</span>
        <span className="font-display text-lg text-text-muted">Navbharat Times</span>
        <span className="font-display text-lg text-text-muted">The Hindu</span>
        <span className="font-display text-lg text-text-muted">Hindustan Times</span>
      </div>
    </section>
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <GlassCard className="h-full !p-6">
      <Quote className="size-6 text-gold/60" strokeWidth={1.5} />
      <p className="mt-4 text-base leading-relaxed text-text-primary">
        “{t.quote}”
      </p>
      <div className="mt-5 flex items-center gap-3">
        {t.avatarUrl ? (
          <Image
            src={t.avatarUrl}
            alt={t.name}
            width={40}
            height={40}
            className="size-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-10 items-center justify-center rounded-full bg-gold/20 font-bold text-gold">
            {t.name[0]}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold text-text-primary">{t.name}</p>
          <p className="text-xs text-text-muted">
            {t.city} · {t.tier[0].toUpperCase() + t.tier.slice(1)} tier
          </p>
        </div>
        <div className="ml-auto flex gap-0.5">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="size-3.5 fill-gold text-gold" />
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
