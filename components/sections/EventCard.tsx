'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import { EventPoster } from './EventPoster';
import type { DevotionalEvent } from '@/types';

interface EventCardProps {
  event: DevotionalEvent;
  index?: number;
}

/**
 * EventCard — minimal poster + title + price + single-click book.
 * Poster is a generated SVG (EventPoster) so every card is on-brand.
 */
export function EventCard({ event, index = 0 }: EventCardProps) {
  const minPrice = Math.min(...event.tiers.map((t) => t.price));
  const defaultTier = event.tiers.find((t) => t.popular)?.id ?? 'gold';
  const checkoutHref = `/checkout?event=${event.slug}&tier=${defaultTier}&qty=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Poster — clickable, opens detail page */}
      <Link
        href={`/events/${event.slug}`}
        className="group block focus:outline-none"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-glass transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-card-hover">
          <EventPoster event={event} className="h-full w-full" />
        </div>

        <h3 className="mt-4 max-w-[28ch] font-display text-[17px] font-medium leading-[1.35] text-text-primary group-hover:text-saffron-700 sm:mt-5 sm:text-xl">
          {event.title}
        </h3>
      </Link>

      {/* Price + Book — single-click direct to checkout */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-display text-base font-medium text-text-primary tabular sm:text-lg">
          From {formatINR(minPrice).replace('₹', 'Rs. ')}
        </p>
        <Link
          href={checkoutHref}
          aria-label={`Book ${event.title} now`}
          className="inline-flex shrink-0 items-center gap-1 rounded-full bg-text-primary px-3.5 py-1.5 text-[11px] font-bold text-cream-50 transition-all hover:bg-saffron-grad hover:text-text-primary sm:px-4 sm:py-2 sm:text-xs"
        >
          Book
          <ArrowRight className="size-3 sm:size-3.5" strokeWidth={2.6} />
        </Link>
      </div>
    </motion.div>
  );
}
