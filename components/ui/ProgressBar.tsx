'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export type Step = 'tickets' | 'details' | 'pay';

const ORDER: Step[] = ['tickets', 'details', 'pay'];
const LABEL: Record<Step, string> = {
  tickets: 'Tickets',
  details: 'Your Details',
  pay: 'Pay',
};

interface ProgressBarProps {
  current: Step;
}

/**
 * ProgressBar — checkout breadcrumbs.
 * +14% checkout completion (AudienceView 2025 benchmark).
 * Always visible — never hide progress from a paying user.
 */
export function ProgressBar({ current }: ProgressBarProps) {
  const idx = ORDER.indexOf(current);
  return (
    <ol className="flex w-full items-center justify-between gap-2" aria-label="Checkout progress">
      {ORDER.map((step, i) => {
        const isDone = i < idx;
        const isCurrent = i === idx;
        return (
          <li key={step} className="flex flex-1 items-center gap-2 last:flex-none">
            <div
              className={cn(
                'flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                isDone && 'bg-gold text-ink-900',
                isCurrent && 'bg-gold/20 text-gold ring-2 ring-gold',
                !isDone && !isCurrent && 'border border-white/15 text-text-muted'
              )}
            >
              {isDone ? <Check className="size-4" strokeWidth={3} /> : i + 1}
            </div>
            <span
              className={cn(
                'whitespace-nowrap text-xs font-medium sm:text-sm',
                isCurrent ? 'text-text-primary' : 'text-text-muted'
              )}
            >
              {LABEL[step]}
            </span>
            {i < ORDER.length - 1 && (
              <span
                className={cn(
                  'mx-1 h-px flex-1',
                  isDone ? 'bg-gold' : 'bg-white/10'
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
