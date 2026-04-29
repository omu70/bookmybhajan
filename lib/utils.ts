import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── INR formatter — devotional audience expects ₹ + Indian commas ─────
const inrFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
export const formatINR = (v: number) => inrFormatter.format(v);

// ─── Compact date (e.g., "14 Jun · Sat") ──────────────────────────────
export function formatEventDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    weekday: 'short',
  });
}

export function formatLongDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    weekday: 'long',
  });
}

// ─── Time-until in {d, h, m, s} for countdowns ────────────────────────
export function timeUntil(target: string | Date) {
  const t = typeof target === 'string' ? new Date(target).getTime() : target.getTime();
  const diff = Math.max(0, t - Date.now());
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);
  return { days, hours, minutes, seconds, totalMs: diff };
}

// ─── Scarcity color state ──────────────────────────────────────────────
export function scarcityState(remaining: number, total: number) {
  const pct = remaining / total;
  if (pct <= 0.15) return 'critical'; // <15% — red
  if (pct <= 0.35) return 'high'; // 15-35% — amber
  if (pct <= 0.6) return 'medium'; // 35-60% — saffron
  return 'low'; // >60% — neutral, hide badge
}

// ─── Pad number with zero ──────────────────────────────────────────────
export const pad = (n: number) => n.toString().padStart(2, '0');

// ─── Convenience fee — 2% rounded up to nearest ₹5 ────────────────────
export function calcConvenienceFee(subtotal: number) {
  const fee = Math.ceil((subtotal * 0.02) / 5) * 5;
  return Math.max(fee, 25); // min ₹25
}

// ─── Mobile/connection-aware feature gates ────────────────────────────
export function shouldUse3D() {
  if (typeof window === 'undefined') return false;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (isTouch) return false;
  // Connection API (NetworkInformation) — gate on 4g+
  // @ts-expect-error: experimental
  const conn = navigator.connection;
  if (conn && conn.effectiveType && /(2g|3g)/.test(conn.effectiveType)) return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  return true;
}
