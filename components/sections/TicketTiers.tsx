'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, Star } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';
import { MobilePricingCarousel } from './MobilePricingCarousel';
import { cn, formatINR } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { DevotionalEvent, Tier } from '@/types';

interface TicketTiersProps {
  event: DevotionalEvent;
  onProceed: (tier: Tier, quantity: number) => void;
  onTierChange?: (tier: Tier) => void;
  value?: Tier;
}

/**
 * TicketTiers — minimal three-tier picker.
 *
 * Just the facts: tier name, price, seats remaining. No invented perks.
 * Gold pre-selected (popular). Click any tier card to switch.
 *
 * Layout:
 *   • Mobile: vertical stack (each tier full-width row, name+price+select)
 *   • sm+: 3 equal columns
 *
 * Quantity stepper + reserve CTA pinned at the bottom.
 */
export function TicketTiers({ event, onProceed, onTierChange, value }: TicketTiersProps) {
  const initial: Tier = (event.tiers.find((t) => t.popular)?.id ?? 'gold') as Tier;
  const [internal, setInternal] = useState<Tier>(initial);
  const selected = value ?? internal;
  const [qty, setQty] = useState(1);

  const tier = event.tiers.find((t) => t.id === selected)!;
  const total = tier.price * qty;

  const select = (id: Tier) => {
    if (id === selected) return;
    setInternal(id);
    onTierChange?.(id);
    trackEvent('select_tier', { tier: id, slug: event.slug });
  };

  return (
    <div>
      <div className="mb-7 max-w-md">
        <p className="eyebrow">Pick your area</p>
        <h2 className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl">
          Choose a tier.
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-text-muted">
          Seating is first-come-first-served inside each area. Earlier you walk in, better the view.
        </p>
      </div>

      {/* MOBILE: 2.5-card horizontal carousel */}
      <MobilePricingCarousel
        tiers={event.tiers}
        active={selected}
        onSelect={(t) => select(t)}
        onReserve={(t) => {
          trackEvent('click_book_now', { slug: event.slug, tier: t, qty, source: 'carousel' });
          onProceed(t, qty);
        }}
      />

      {/* DESKTOP: 3-up grid (hidden on mobile, the carousel above replaces this) */}
      <div className="hidden gap-3 sm:grid sm:grid-cols-3 sm:gap-4">
        {event.tiers.map((t, i) => {
          const isSelected = selected === t.id;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.06 }}
              type="button"
              onClick={() => select(t.id)}
              aria-pressed={isSelected}
              className={cn(
                'relative w-full rounded-2xl border p-4 text-left transition-all sm:p-5',
                isSelected
                  ? 'border-saffron-500/70 bg-saffron-50'
                  : 'border-maroon-900/12 bg-cream-50 hover:border-saffron-500/40'
              )}
            >
              {t.popular && (
                <span className="absolute -top-2.5 left-4 inline-flex items-center gap-1 rounded-full bg-gold-grad px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-text-primary">
                  <Star className="size-2.5 fill-text-primary" /> POPULAR
                </span>
              )}

              <div className="flex items-center justify-between gap-3 sm:block">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
                    {t.name}
                  </p>
                  <p className="mt-1 font-display text-2xl font-medium text-text-primary tabular sm:mt-2 sm:text-3xl">
                    {formatINR(t.price)}
                  </p>
                </div>
                <span
                  className={cn(
                    'grid size-7 shrink-0 place-items-center rounded-full transition-all sm:mt-3',
                    isSelected
                      ? 'bg-saffron-500 text-white'
                      : 'border border-maroon-900/20 text-transparent'
                  )}
                  aria-hidden
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
              </div>

              <div className="mt-3 sm:mt-4">
                <ScarcityBadge
                  remaining={t.seatsRemaining}
                  total={t.totalSeats}
                  hideIfLow={false}
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Quantity + total + reserve */}
      <div className="mt-6 rounded-2xl border border-maroon-900/12 bg-cream-50 p-4 sm:p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Quantity
            </p>
            <div className="mt-2 inline-flex items-center gap-3 rounded-full border border-maroon-900/15 bg-cream-100 px-2 py-1.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="grid size-8 place-items-center rounded-full hover:bg-maroon-900/8"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center font-bold tabular">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(6, q + 1))}
                className="grid size-8 place-items-center rounded-full hover:bg-maroon-900/8"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
              Total
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-text-primary tabular sm:text-3xl">
              {formatINR(total)}
            </p>
          </div>
        </div>

        <GoldButton
          fullWidth
          size="lg"
          className="mt-4"
          onClick={() => {
            trackEvent('click_book_now', { slug: event.slug, tier: selected, qty, total });
            onProceed(selected, qty);
          }}
        >
          Reserve {tier.name} · {qty} {qty === 1 ? 'seat' : 'seats'}
        </GoldButton>
      </div>
    </div>
  );
}
