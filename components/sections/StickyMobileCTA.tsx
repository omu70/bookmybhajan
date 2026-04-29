'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

interface StickyMobileCTAProps {
  href: string;
  /** Lowest visible price for the active context (event/page) */
  fromPrice: number;
  /** Override the leading copy if needed (e.g., "Continue to seats") */
  label?: string;
}

/**
 * StickyMobileCTA — always-visible thumb-zone bar on mobile only.
 *   • 56px height
 *   • Disappears on /checkout
 *   • Keyboard accessible
 */
export function StickyMobileCTA({ href, fromPrice, label }: StickyMobileCTAProps) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[env(safe-area-inset-bottom,0)] pt-2 md:hidden"
      aria-label="Sticky booking CTA"
    >
      {/* Soft top fade so the bar reads on busy backgrounds */}
      <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-ink-900 to-transparent" />

      <Link
        href={href}
        className="relative flex h-[56px] w-full items-center justify-between gap-2 rounded-2xl bg-gold-grad px-5 font-bold text-ink-900 active:scale-[0.99]"
      >
        <span className="flex flex-col text-left leading-tight">
          <span className="text-base">{label ?? 'Book Now'}</span>
          <span className="text-xs font-medium opacity-80">From {formatINR(fromPrice)}</span>
        </span>
        <ArrowRight className="size-5" strokeWidth={2.6} />
      </Link>
    </div>
  );
}
