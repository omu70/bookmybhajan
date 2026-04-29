'use client';

import { Zap } from 'lucide-react';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import type { DevotionalEvent } from '@/types';

interface ScarcityBarProps {
  event: DevotionalEvent;
}

/**
 * Saffron full-width urgency strip — sits directly below the hero.
 * "⚡ Gold: 38 left · Silver: filling fast" + live event countdown.
 *
 * Per the spec — non-skippable. This is the single highest-impact urgency block.
 */
export function ScarcityBar({ event }: ScarcityBarProps) {
  const gold = event.tiers.find((t) => t.id === 'gold');
  const silver = event.tiers.find((t) => t.id === 'silver');

  return (
    <div
      className="relative w-full overflow-hidden border-y border-saffron-700/50 bg-saffron-grad text-white"
      role="region"
      aria-label="Scarcity and countdown"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row sm:px-6 lg:px-8">
        <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold">
          <Zap className="size-4 shrink-0" strokeWidth={2.5} />
          {gold && (
            <span>
              Gold tier: only <span className="font-extrabold">{gold.seatsRemaining}</span> seats remaining
            </span>
          )}
          {silver && (
            <span className="opacity-90">
              · Silver: filling fast
            </span>
          )}
        </p>
        <CountdownTimer
          target={event.date}
          compact
          label="Begins in"
          className="text-white"
        />
      </div>
    </div>
  );
}
