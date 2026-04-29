'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Minus, Plus, Star } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';
import { cn, formatINR } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { DevotionalEvent, Tier } from '@/types';

interface TicketTiersProps {
  event: DevotionalEvent;
  onProceed: (tier: Tier, quantity: number) => void;
}

/**
 * TicketTiers — anchoring on Gold lifts AOV by ~23%.
 * Default selection = Gold (the "popular" tier). Border glow + ⭐ badge.
 * Cards are equal-height; perks list always shows Silver < Gold < Diamond
 * with strict +2 perk progression — visual anchoring.
 */
export function TicketTiers({ event, onProceed }: TicketTiersProps) {
  const initial: Tier = (event.tiers.find((t) => t.popular)?.id ?? 'gold') as Tier;
  const [selected, setSelected] = useState<Tier>(initial);
  const [qty, setQty] = useState(1);

  const tier = event.tiers.find((t) => t.id === selected)!;
  const total = tier.price * qty;

  const select = (id: Tier) => {
    if (id === selected) return;
    setSelected(id);
    trackEvent('select_tier', { tier: id, slug: event.slug });
  };

  return (
    <section id="tickets" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Choose your tier</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Three ways to attend
        </h2>
        <p className="mt-3 text-text-muted">
          Most devotees choose <span className="font-semibold text-gold">Gold</span> —
          best center seats, priority entry, and a meet & greet token.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {event.tiers.map((t, i) => {
          const isSelected = selected === t.id;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              type="button"
              onClick={() => select(t.id)}
              aria-pressed={isSelected}
              className={cn(
                'relative text-left rounded-2xl p-6 transition-all duration-200',
                isSelected
                  ? 'glass-gold shadow-card-hover ring-2 ring-gold'
                  : 'glass hover:border-white/20'
              )}
            >
              {t.popular && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full bg-gold-grad px-3 py-1 text-[11px] font-bold text-ink-900 shadow-gold-glow-lg">
                  <Star className="size-3 fill-ink-900" /> Most popular
                </span>
              )}

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    {t.name}
                  </p>
                  <p className="mt-2 font-display text-4xl font-bold text-text-primary tabular">
                    {formatINR(t.price)}
                  </p>
                  <p className="text-xs text-text-muted">per seat</p>
                </div>
                <span
                  className={cn(
                    'flex size-7 items-center justify-center rounded-full transition-all',
                    isSelected
                      ? 'bg-gold text-ink-900'
                      : 'border border-white/20 text-transparent'
                  )}
                  aria-hidden
                >
                  <Check className="size-4" strokeWidth={3} />
                </span>
              </div>

              <ul className="mt-5 space-y-2.5 text-sm text-text-muted">
                {t.perks.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 size-4 shrink-0 text-gold" strokeWidth={2.5} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              {/* Per-tier scarcity */}
              <div className="mt-5 border-t border-white/5 pt-4">
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

      {/* Quantity + total */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-glass-border bg-glass-surface p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <p className="text-sm font-medium text-text-muted">Quantity</p>
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-2 py-1.5">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => {
                setQty((q) => Math.max(1, q - 1));
                trackEvent('change_quantity', { dir: 'down' });
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/10"
            >
              <Minus className="size-4" />
            </button>
            <span className="w-6 text-center font-bold tabular">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => {
                setQty((q) => Math.min(6, q + 1));
                trackEvent('change_quantity', { dir: 'up' });
              }}
              className="flex size-8 items-center justify-center rounded-full hover:bg-white/10"
            >
              <Plus className="size-4" />
            </button>
          </div>
          <p className="text-xs text-text-muted">Max 6 per booking</p>
        </div>

        <div className="flex items-center justify-between gap-4 sm:gap-6">
          <p className="text-sm tabular">
            <span className="text-text-muted">{qty} × {tier.name}</span>{' '}
            <span className="font-bold text-text-primary"> = {formatINR(total)}</span>
          </p>
          <GoldButton
            onClick={() => {
              trackEvent('click_book_now', { slug: event.slug, tier: selected, qty, total });
              onProceed(selected, qty);
            }}
          >
            Continue
          </GoldButton>
        </div>
      </div>
    </section>
  );
}
