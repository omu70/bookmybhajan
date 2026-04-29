/**
 * Inventory — real-time seat counter.
 * In production: hits Redis or Postgres with row-level locks.
 * Here: returns the static counts plus a small stochastic decrement
 * to simulate live activity in the UI ticker.
 */

import { EVENTS } from './events';
import type { Tier } from '@/types';

export function getSeatsRemaining(slug: string, tier: Tier): number {
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return 0;
  const t = event.tiers.find((tt) => tt.id === tier);
  return t?.seatsRemaining ?? 0;
}

export function getTotalSeats(slug: string, tier: Tier): number {
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) return 0;
  const t = event.tiers.find((tt) => tt.id === tier);
  return t?.totalSeats ?? 0;
}

// Simulated jitter — so the homepage scarcity counter feels alive.
// Disable on prefers-reduced-motion via the consumer.
export function jitterRemaining(base: number, downBiasPct = 1) {
  const drift = Math.random() < downBiasPct / 100 ? -1 : 0;
  return Math.max(1, base + drift);
}
