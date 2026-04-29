'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { pad } from '@/lib/utils';

interface SeatHoldTimerProps {
  /** Seconds the hold is valid for. Default 9 minutes. */
  seconds?: number;
  onExpire?: () => void;
}

/**
 * SeatHoldTimer — "Your seats are held for 08:47".
 * +11% checkout completion (prevents tab-switching to compare).
 * Resets on user activity in the parent (extend logic upstream).
 */
export function SeatHoldTimer({ seconds = 9 * 60, onExpire }: SeatHoldTimerProps) {
  const [s, setS] = useState(seconds);

  useEffect(() => {
    if (s <= 0) {
      onExpire?.();
      return;
    }
    const id = setInterval(() => setS((x) => x - 1), 1000);
    return () => clearInterval(id);
  }, [s, onExpire]);

  const m = Math.floor(s / 60);
  const sec = s % 60;
  const critical = s <= 60;

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm tabular ${
        critical
          ? 'border-rose-500/40 bg-rose-500/10 text-rose-200'
          : 'border-glass-border bg-glass-surface text-text-muted'
      }`}
      role="timer"
      aria-live="polite"
    >
      <Clock className="size-4" />
      <span>
        Seats held for{' '}
        <span className="font-bold text-text-primary">
          {pad(m)}:{pad(sec)}
        </span>
      </span>
    </div>
  );
}
