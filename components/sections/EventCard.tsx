'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { formatINR } from '@/lib/utils';
import type { DevotionalEvent } from '@/types';

interface EventCardProps {
  event: DevotionalEvent;
  index?: number;
}

/**
 * EventCard — minimal, poster-led. Mirrors the live bookmybhajan.com layout:
 *   • Square poster
 *   • Title in display serif underneath
 *   • "From Rs. X" beneath title
 *   • Whole card is a link
 *
 * No badges, no scarcity, no extra UI — the poster does the selling.
 */
export function EventCard({ event, index = 0 }: EventCardProps) {
  const minPrice = Math.min(...event.tiers.map((t) => t.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.2, 0.7, 0.2, 1] }}
    >
      <Link
        href={`/events/${event.slug}`}
        className="group block focus:outline-none"
      >
        {/* Square poster */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-cream-200">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            loading="lazy"
          />
        </div>

        {/* Title — display serif */}
        <h3 className="mt-5 max-w-[28ch] font-display text-[19px] font-medium leading-[1.35] text-text-primary group-hover:text-saffron-700 sm:text-xl">
          {event.title}
        </h3>

        {/* From Rs. — display serif, looser tracking */}
        <p className="mt-3 font-display text-lg font-medium text-text-primary tabular sm:text-xl">
          From {formatINR(minPrice).replace('₹', 'Rs. ')}
        </p>
      </Link>
    </motion.div>
  );
}
