'use client';

import { EventCard } from './EventCard';
import type { DevotionalEvent } from '@/types';

interface EventGridProps {
  events: DevotionalEvent[];
  heading?: string;
  eyebrow?: string;
  description?: string;
}

/**
 * EventGrid — minimal 4-up poster grid (2-up on mobile).
 * No description block by default — just heading + posters, like the live site.
 */
export function EventGrid({ events, heading, eyebrow, description }: EventGridProps) {
  return (
    <section id="shows" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
      {(heading || eyebrow) && (
        <div className="mb-10 sm:mb-14">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl lg:text-5xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      {events.length === 0 ? (
        <div className="rounded-2xl border border-maroon-900/10 bg-cream-50 p-10 text-center">
          <p className="text-lg font-semibold">No shows scheduled right now.</p>
          <p className="mt-1 text-text-muted">Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4">
          {events.map((e, i) => (
            <EventCard key={e.slug} event={e} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
