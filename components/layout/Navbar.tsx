'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Lock, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Sticky nav.
 *   • Always visible.
 *   • On scroll: shrinks 64 → 48px, glass blur intensifies.
 *   • Trust signal "🔒 Secure Razorpay Payments" — quiet, persistent.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const padY = useTransform(scrollY, [0, 80], [16, 8]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      style={{ paddingTop: padY, paddingBottom: padY }}
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'bg-ink-900/60 backdrop-blur-glass border-b border-white/5'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <DiyaMark />
          <span className="font-display text-xl font-bold tracking-tight text-text-primary">
            Darshan
          </span>
        </Link>

        {/* Center — desktop trust */}
        <div className="hidden items-center gap-6 md:flex">
          <Link href="/events" className="text-sm font-medium text-text-muted hover:text-text-primary">
            All Events
          </Link>
          <Link href="/events?city=Delhi" className="text-sm font-medium text-text-muted hover:text-text-primary">
            Delhi
          </Link>
          <Link href="/events?city=Mumbai" className="text-sm font-medium text-text-muted hover:text-text-primary">
            Mumbai
          </Link>
          <Link href="/events?city=Bangalore" className="text-sm font-medium text-text-muted hover:text-text-primary">
            Bangalore
          </Link>
        </div>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-text-muted hover:text-text-primary md:inline-flex"
          >
            <MapPin className="size-3.5" />
            Delhi
          </button>
          <span className="hidden items-center gap-1.5 text-[11px] text-text-muted lg:inline-flex">
            <Lock className="size-3" />
            Secure Razorpay Payments
          </span>
          <Link
            href="/events"
            className="hidden rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-sm font-semibold text-gold hover:bg-gold/20 sm:inline-block"
          >
            Book Now
          </Link>
          <button
            type="button"
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mx-4 mt-2 rounded-2xl border border-glass-border bg-ink-800/85 backdrop-blur-glass p-4"
        >
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/events" onClick={() => setOpen(false)}>All events</Link>
            <Link href="/events?city=Delhi" onClick={() => setOpen(false)}>Delhi</Link>
            <Link href="/events?city=Mumbai" onClick={() => setOpen(false)}>Mumbai</Link>
            <Link href="/events?city=Bangalore" onClick={() => setOpen(false)}>Bangalore</Link>
            <Link href="/events?city=Chennai" onClick={() => setOpen(false)}>Chennai</Link>
            <Link href="/events?city=Goa" onClick={() => setOpen(false)}>Goa</Link>
            <span className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-text-muted">
              <Lock className="size-3" /> Secure Razorpay Payments
            </span>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}

function DiyaMark() {
  return (
    <span className="relative inline-flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-saffron-500 via-gold to-saffron-700 shadow-gold-glow-lg">
      <span className="absolute -top-1 left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-saffron-200 animate-flame-flicker" />
      <span className="block size-2 rounded-full bg-ink-900" />
    </span>
  );
}
