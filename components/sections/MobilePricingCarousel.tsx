'use client';

import { Star, Check, Flame, ArrowRight } from 'lucide-react';
import { cn, formatINR, scarcityState } from '@/lib/utils';
import type { TicketTier, Tier } from '@/types';

interface MobilePricingCarouselProps {
  tiers: TicketTier[];
  active: Tier;
  onSelect: (id: Tier) => void;
  /** When the user taps a card's Reserve button — straight to checkout */
  onReserve: (id: Tier) => void;
}

/**
 * MobilePricingCarousel — horizontal scroll-snap, 2.5 cards visible.
 *
 *   • CSS scroll-snap (mandatory) — each card snaps into place
 *   • Width math: cards + gaps fit ~2.5 inside the viewport
 *   • Each card is its own tap target → select tier
 *   • A small "Reserve" arrow on each card → straight to /checkout
 *
 * Aggressive CRO triggers on each card:
 *   • Big tier name + price
 *   • Scarcity progress bar (filled in saffron, the more sold the redder)
 *   • "X seats left" — bold, with flame icon when critical
 *   • "POPULAR" badge on Gold
 *   • Active card gets saffron border + scale-up
 */
export function MobilePricingCarousel({
  tiers,
  active,
  onSelect,
  onReserve,
}: MobilePricingCarouselProps) {
  return (
    <div
      className="relative -mx-5 sm:hidden"
      role="tablist"
      aria-label="Pricing tiers"
    >
      {/* Edge fade so the last visible card hints at being scrollable */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-cream-50 to-transparent" />

      <div
        className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 pt-1"
        style={{ scrollPaddingInlineStart: '1.25rem' }}
      >
        {tiers.map((t) => (
          <PricingCard
            key={t.id}
            tier={t}
            isActive={active === t.id}
            onSelect={() => onSelect(t.id as Tier)}
            onReserve={() => onReserve(t.id as Tier)}
          />
        ))}

        {/* Trailing spacer so last card snaps cleanly */}
        <div className="shrink-0 basis-1" aria-hidden />
      </div>
    </div>
  );
}

function PricingCard({
  tier,
  isActive,
  onSelect,
  onReserve,
}: {
  tier: TicketTier;
  isActive: boolean;
  onSelect: () => void;
  onReserve: () => void;
}) {
  const sold = tier.totalSeats - tier.seatsRemaining;
  const pctSold = Math.min(100, Math.round((sold / tier.totalSeats) * 100));
  const state = scarcityState(tier.seatsRemaining, tier.totalSeats);
  const isCritical = state === 'critical';

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={onSelect}
      className={cn(
        // 2.5 cards visible: each card ~38vw, with gap-3 spacing.
        'relative flex shrink-0 snap-start basis-[38vw] flex-col rounded-2xl border bg-cream-50 p-3 text-left transition-all',
        'min-w-[140px] max-w-[170px]',
        isActive
          ? 'border-saffron-500/70 bg-saffron-50 scale-[1.02]'
          : 'border-maroon-900/12 hover:border-saffron-500/40'
      )}
    >
      {tier.popular && (
        <span className="absolute -top-2 left-3 inline-flex items-center gap-1 rounded-full bg-gold-grad px-2 py-[3px] text-[9px] font-bold tracking-wider text-text-primary">
          <Star className="size-2.5 fill-text-primary" /> POPULAR
        </span>
      )}

      {/* Tier label + check */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {tier.name}
        </p>
        <span
          className={cn(
            'grid size-5 place-items-center rounded-full transition-all',
            isActive
              ? 'bg-saffron-500 text-white'
              : 'border border-maroon-900/20 text-transparent'
          )}
          aria-hidden
        >
          <Check className="size-3" strokeWidth={3} />
        </span>
      </div>

      {/* Price */}
      <p className="mt-1 font-display text-2xl font-medium leading-none text-text-primary tabular">
        {formatINR(tier.price)}
      </p>

      {/* Scarcity progress */}
      <div className="mt-3">
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-maroon-900/10"
          aria-label={`${pctSold}% sold`}
        >
          <div
            className={cn(
              'h-full rounded-full transition-all',
              isCritical ? 'bg-rose-500' : 'bg-saffron-grad'
            )}
            style={{ width: `${pctSold}%` }}
          />
        </div>
        <p
          className={cn(
            'mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold tracking-wide tabular',
            isCritical ? 'text-rose-700' : 'text-text-strong'
          )}
        >
          {isCritical && <Flame className="size-3" strokeWidth={2.6} />}
          {tier.seatsRemaining} left
        </p>
      </div>

      {/* Reserve mini CTA */}
      <span
        onClick={(e) => {
          e.stopPropagation();
          onReserve();
        }}
        role="button"
        className={cn(
          'mt-3 inline-flex items-center justify-between gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold transition-all',
          isActive
            ? 'bg-text-primary text-cream-50'
            : 'border border-maroon-900/15 bg-cream-50 text-text-primary hover:bg-text-primary hover:text-cream-50'
        )}
      >
        Reserve
        <ArrowRight className="size-3" strokeWidth={2.6} />
      </span>
    </button>
  );
}
