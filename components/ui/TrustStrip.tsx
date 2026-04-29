'use client';

import { Lock, MessageCircle, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TrustStripProps {
  /** "compact" packs into one row, "stacked" wraps to grid */
  variant?: 'compact' | 'stacked';
  className?: string;
}

const ITEMS = [
  { Icon: Lock, label: '100% Secure', sub: 'Razorpay · 256-bit SSL' },
  { Icon: MessageCircle, label: 'Instant WhatsApp Ticket', sub: 'Sent in 30 seconds' },
  { Icon: RotateCcw, label: 'Easy Cancellation', sub: '7 days before event' },
];

/**
 * TrustStrip — placed DIRECTLY above pay buttons.
 * +18% checkout completion (Baymard Institute benchmark).
 */
export function TrustStrip({ variant = 'compact', className }: TrustStripProps) {
  if (variant === 'compact') {
    return (
      <div
        className={cn(
          'flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted',
          className
        )}
      >
        {ITEMS.map(({ Icon, label }) => (
          <span key={label} className="inline-flex items-center gap-1.5">
            <Icon className="size-3.5 text-gold" strokeWidth={2.2} />
            <span>{label}</span>
          </span>
        ))}
      </div>
    );
  }
  return (
    <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-3', className)}>
      {ITEMS.map(({ Icon, label, sub }) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-xl border border-glass-border bg-glass-surface p-3"
        >
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
            <Icon className="size-4" strokeWidth={2.4} />
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">{label}</p>
            <p className="text-xs text-text-muted">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
