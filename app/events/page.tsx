'use client';

import { Suspense, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { EventCard } from '@/components/sections/EventCard';
import { EVENTS } from '@/lib/events';
import { ChevronDown, Loader2, MapPin, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const CITIES = ['All', 'Mumbai', 'Pune', 'Ahmedabad', 'Surat', 'Bangalore'] as const;
const SORTS = [
  { id: 'soon', label: 'Happening soon' },
  { id: 'price-asc', label: 'Price: Low → High' },
] as const;

type SortId = (typeof SORTS)[number]['id'];

export default function EventListingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center pt-28">
          <Loader2 className="size-6 animate-spin text-gold" />
        </div>
      }
    >
      <EventListingInner />
    </Suspense>
  );
}

function EventListingInner() {
  const params = useSearchParams();
  const initialCity = (params.get('city') as (typeof CITIES)[number] | null) ?? 'All';

  const [city, setCity] = useState<(typeof CITIES)[number]>(initialCity);
  const [sort, setSort] = useState<SortId>('soon');
  const [maxPrice, setMaxPrice] = useState<number>(3500);

  const filtered = useMemo(() => {
    let list = [...EVENTS];
    if (city !== 'All') list = list.filter((e) => e.city === city);
    list = list.filter((e) => Math.min(...e.tiers.map((t) => t.price)) <= maxPrice);
    if (sort === 'soon') list.sort((a, b) => +new Date(a.date) - +new Date(b.date));
    if (sort === 'price-asc')
      list.sort(
        (a, b) =>
          Math.min(...a.tiers.map((t) => t.price)) -
          Math.min(...b.tiers.map((t) => t.price))
      );
    return list;
  }, [city, sort, maxPrice]);

  return (
    <div className="pt-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <p className="eyebrow">All shows</p>
          <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
            Find your night.
          </h1>
          <p className="mt-3 max-w-2xl text-text-muted">
            5 cities. The Fusion Albela Band live. Pick yours.
          </p>
        </header>
      </div>

      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-20 border-y border-maroon-900/10 bg-cream-50/82 backdrop-blur-glass shadow-glass">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
          {/* City chips */}
          <div className="no-scrollbar -mx-1 flex flex-1 items-center gap-2 overflow-x-auto px-1">
            {CITIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCity(c)}
                className={cn(
                  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-all',
                  city === c
                    ? 'border-gold bg-gold/15 text-gold'
                    : 'border-white/15 bg-glass-surface text-text-muted hover:border-white/30'
                )}
              >
                <MapPin className="size-3.5" />
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortId)}
                className="appearance-none rounded-full border border-white/15 bg-glass-surface py-1.5 pl-3 pr-8 text-xs font-semibold text-text-primary"
                aria-label="Sort events"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-cream-50 text-text-primary">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-3.5 -translate-y-1/2 text-text-muted" />
            </div>

            {/* Price slider */}
            <div className="hidden items-center gap-2 rounded-full border border-white/15 bg-glass-surface px-3 py-1.5 text-xs sm:flex">
              <span className="text-text-muted">Up to ₹{maxPrice}</span>
              <input
                type="range"
                min="349"
                max="3500"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                className="w-24 accent-gold"
                aria-label="Maximum price"
              />
            </div>
          </div>

          {/* Live count */}
          <div className="basis-full text-xs text-text-muted sm:basis-auto">
            <AnimatePresence mode="wait">
              <motion.span
                key={`${filtered.length}-${city}-${sort}`}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold text-text-primary">{filtered.length}</span> events found
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-glass-border bg-glass-surface p-10 text-center">
            <p className="text-lg font-semibold">No events match your filters</p>
            <p className="mt-1 text-text-muted">Try a different city or raise your price ceiling.</p>
            <button
              type="button"
              onClick={() => {
                setCity('All');
                setMaxPrice(3500);
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink-900"
            >
              <X className="size-3.5" /> Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((e, i) => (
              <EventCard key={e.slug} event={e} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
