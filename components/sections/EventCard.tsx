'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';
import { formatEventDate, formatINR, cn } from '@/lib/utils';
import type { DevotionalEvent } from '@/types';

interface EventCardProps {
  event: DevotionalEvent;
  /** Animation index for stagger */
  index?: number;
}

const BADGE_COPY: Record<NonNullable<DevotionalEvent['badge']>, { label: string; cls: string }> = {
  trending: { label: '🔥 Trending', cls: 'bg-rose-500/20 text-rose-200 border-rose-500/40' },
  'almost-full': { label: '⚡ Almost Full', cls: 'bg-amber-500/20 text-amber-200 border-amber-500/40' },
  limited: { label: '✅ Limited Seats', cls: 'bg-saffron-500/20 text-saffron-200 border-saffron-500/40' },
  new: { label: '✨ New', cls: 'bg-violet-500/20 text-violet-200 border-violet-500/40' },
};

export function EventCard({ event, index = 0 }: EventCardProps) {
  const minPrice = Math.min(...event.tiers.map((t) => t.price));
  const maxPrice = Math.max(...event.tiers.map((t) => t.price));
  const gold = event.tiers.find((t) => t.id === 'gold')!;
  const badge = event.badge ? BADGE_COPY[event.badge] : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link href={`/events/${event.slug}`} className="group block focus:outline-none">
        <GlassCard tilt className="!p-0 overflow-hidden">
          {/* Image */}
          <div className="relative aspect-[16/10] w-full overflow-hidden">
            <Image
              src={event.heroImage}
              alt={event.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
              placeholder="empty"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/75 via-maroon-900/15 to-transparent" />

            {/* Badges row */}
            <div className="absolute left-3 top-3 flex flex-wrap gap-2">
              {badge && (
                <span className={cn('rounded-full border px-2.5 py-1 text-[11px] font-bold backdrop-blur-glassLo', badge.cls)}>
                  {badge.label}
                </span>
              )}
            </div>

            {/* Hindi title — small, lower-right, decorative */}
            {event.titleHindi && (
              <span className="absolute bottom-3 right-3 font-deva text-sm text-cream-50">
                {event.titleHindi}
              </span>
            )}
          </div>

          {/* Body */}
          <div className="space-y-3 p-5">
            <h3 className="font-display text-2xl font-bold leading-tight text-text-primary">
              {event.title}
            </h3>
            <p className="line-clamp-2 text-sm text-text-muted">
              {event.storyShort}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5" />
                {event.city}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-3.5" />
                {formatEventDate(event.date)}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-maroon-900/8 pt-3">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted">From</p>
                <p className="text-lg font-bold text-text-primary">
                  {formatINR(minPrice)}{' '}
                  <span className="text-sm font-normal text-text-muted">– {formatINR(maxPrice)}</span>
                </p>
              </div>
              <ScarcityBadge remaining={gold.seatsRemaining} total={gold.totalSeats} />
            </div>

            {/* Mobile-visible CTA — never hide behind hover */}
            <div className="rounded-xl bg-saffron-50 px-4 py-2.5 text-center text-sm font-bold text-saffron-700 transition-all group-hover:bg-gold-grad group-hover:text-text-primary group-hover:shadow-gold-glow-lg">
              Book Now →
            </div>
          </div>
        </GlassCard>
      </Link>
    </motion.div>
  );
}
