'use client';

import { EventCard } from './EventCard';
import type { DevotionalEvent } from '@/types';

interface EventGridProps {
  events: DevotionalEvent[];
  heading?: string;
  eyebrow?: string;
  description?: string;
}

export function EventGrid({ events, heading, eyebrow, description }: EventGridProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {(heading || eyebrow) && (
        <div className="mb-10 max-w-2xl">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          {heading && (
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {heading}
            </h2>
          )}
          {description && (
            <p className="mt-3 text-base text-text-muted">{description}</p>
          )}
        </div>
      )}

      {events.length === 0 ? (
        <div className="rounded-2xl border border-glass-border bg-glass-surface p-10 text-center">
          <p className="text-lg font-semibold">No events yet in this city.</p>
          <p className="mt-1 text-text-muted">Browse all events to find one near you →</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <EventCard key={e.slug} event={e} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
