'use client';

import { useEffect, useState } from 'react';
import { timeUntil, pad } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  /** ISO date string */
  target: string;
  /** Compact, single-line layout */
  compact?: boolean;
  className?: string;
  /** Label above the digits */
  label?: string;
}

/**
 * CountdownTimer — event-deadline urgency.
 * +8% CVR on near-deadline traffic.
 */
export function CountdownTimer({
  target,
  compact,
  className,
  label = 'Event begins in',
}: CountdownTimerProps) {
  const [{ days, hours, minutes, seconds }, setT] = useState(() => timeUntil(target));

  useEffect(() => {
    const id = setInterval(() => setT(timeUntil(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (compact) {
    return (
      <div
        className={cn('inline-flex items-center gap-2 tabular text-sm', className)}
        aria-label={`${label} ${days} days ${hours} hours ${minutes} minutes`}
      >
        <span className="text-text-muted">{label}</span>
        <span className="font-bold text-text-primary">
          {days}d {pad(hours)}h {pad(minutes)}m {pad(seconds)}s
        </span>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      {label && <p className="eyebrow text-[10px]">{label}</p>}
      <div className="flex items-center gap-2 tabular sm:gap-3">
        <Cell value={days} label="Days" />
        <Sep />
        <Cell value={hours} label="Hours" />
        <Sep />
        <Cell value={minutes} label="Min" />
        <Sep />
        <Cell value={seconds} label="Sec" />
      </div>
    </div>
  );
}

function Cell({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex w-14 flex-col items-center rounded-xl border border-glass-border bg-glass-surface px-2 py-1.5 backdrop-blur-glassLo sm:w-16">
      <span className="text-2xl font-bold leading-none text-text-primary sm:text-3xl">
        {pad(value)}
      </span>
      <span className="mt-1 text-[9px] uppercase tracking-widest text-text-muted">
        {label}
      </span>
    </div>
  );
}

function Sep() {
  return <span className="text-xl text-text-muted sm:text-2xl">:</span>;
}
