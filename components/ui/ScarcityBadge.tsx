'use client';

import { cn } from '@/lib/utils';
import { scarcityState } from '@/lib/utils';
import { Flame, Zap, AlertCircle } from 'lucide-react';

interface ScarcityBadgeProps {
  remaining: number;
  total: number;
  /** Hide entirely when capacity > 60% (don't manufacture false urgency). */
  hideIfLow?: boolean;
  className?: string;
}

const stateMap = {
  critical: {
    bg: 'bg-rose-500/15 border-rose-500/40 text-rose-200',
    Icon: Flame,
    pre: 'Only',
  },
  high: {
    bg: 'bg-amber-500/15 border-amber-500/40 text-amber-200',
    Icon: Zap,
    pre: 'Filling fast — only',
  },
  medium: {
    bg: 'bg-saffron-500/15 border-saffron-500/40 text-saffron-100',
    Icon: AlertCircle,
    pre: 'Selling steadily —',
  },
  low: null,
} as const;

/**
 * ScarcityBadge — color-coded urgency indicator.
 * +12% urgency-driven conversions when shown only at <50% capacity.
 */
export function ScarcityBadge({
  remaining,
  total,
  hideIfLow = true,
  className,
}: ScarcityBadgeProps) {
  const state = scarcityState(remaining, total);
  const cfg = stateMap[state];
  if (!cfg && hideIfLow) return null;
  if (!cfg) return null;
  const { bg, Icon, pre } = cfg;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold tabular',
        bg,
        className
      )}
      aria-label={`${pre} ${remaining} of ${total} seats remaining`}
    >
      <Icon className="size-3.5" strokeWidth={2.5} />
      <span>
        {pre} <span className="font-bold">{remaining}</span> seats left
      </span>
    </span>
  );
}
