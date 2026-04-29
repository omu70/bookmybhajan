'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';
import type { DevotionalEvent } from '@/types';

interface EventCardProps {
  event: DevotionalEvent;
  index?: number;
}

/**
 * EventCard — minimal, poster-led. Mirrors live bookmybhajan.com.
 *   • Square poster — clickable, opens event detail
 *   • Title in display serif underneath
 *   • Bottom row: "From Rs. X" + a "Book →" pill that goes straight to /checkout
 *     (single-click booking — no detail page detour required)
 */
export function EventCard({ event, index = 0 }: EventCardProps) {
  const minPrice = Math.min(...event.tiers.map((t) => t.price));
  // Default to popular tier (Gold) for the single-click flow
  const defaultTier = event.tiers.find((t) => t.popular)?.id ?? 'gold';
  const checkoutHref = `/checkout?event=${event.slug}&tier=${defaultTier}&qty=1`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {/* Poster — clickable to detail page */}
      <Link
        href={`/events/${event.slug}`}
        className="group block focus:outline-none"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-cream-200">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>

        {/* Title */}
        <h3 className="mt-5 max-w-[28ch] font-display text-[19px] font-medium leading-[1.35] text-text-primary group-hover:text-saffron-700 sm:text-xl">
          {event.title}
        </h3>
      </Link>

      {/* Price + single-click Book button */}
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-display text-lg font-medium text-text-primary tabular sm:text-xl">
          From {formatINR(minPrice).replace('₹', 'Rs. ')}
        </p>

        <Link
          href={checkoutHref}
          aria-label={`Book ${event.title} now`}
          className="inline-flex items-center gap-1.5 rounded-full bg-text-primary px-4 py-2 text-xs font-bold text-cream-50 transition-all hover:bg-saffron-grad hover:text-text-primary hover:shadow-saffron-glow"
        >
          Book
          <ArrowRight className="size-3.5" strokeWidth={2.6} />
        </Link>
      </div>
    </motion.div>
  );
}
