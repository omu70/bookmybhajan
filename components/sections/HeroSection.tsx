'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GoldButton } from '@/components/ui/GoldButton';
import { LiveBookingTicker } from '@/components/ui/LiveBookingTicker';
import { Play } from 'lucide-react';
import { shouldUse3D } from '@/lib/utils';
import type { DevotionalEvent } from '@/types';
import { formatLongDate, formatINR } from '@/lib/utils';

// 3D scene — lazy, no SSR. Loads only after window.onload + 500ms gate below.
const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });

interface HeroSectionProps {
  /** Featured event surfaced above the fold */
  event: DevotionalEvent;
}

export function HeroSection({ event }: HeroSectionProps) {
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    if (!shouldUse3D()) return;
    // Defer until after first paint + 500ms — never block LCP.
    const onReady = () => setTimeout(() => setShowScene(true), 500);
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady, { once: true });
    return () => window.removeEventListener('load', onReady);
  }, []);

  const minPrice = Math.min(...event.tiers.map((t) => t.price));

  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-24 pb-12 sm:pt-28">
      {/* BG layer 1 — designed gradient. Glass needs this. */}
      <div className="absolute inset-0 -z-20 bg-hero-grad" />

      {/* BG layer 2 — 3D scene (desktop) OR static webp (mobile). */}
      <div className="absolute inset-0 -z-10">
        {showScene ? (
          <HeroScene />
        ) : (
          <div className="absolute inset-0">
            <Image
              src={event.heroImage}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-40"
            />
            {/* CSS parallax dim layer */}
            <div className="absolute inset-0 bg-gradient-to-b from-ink-900/40 via-ink-900/60 to-ink-900" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mx-auto flex min-h-[calc(100svh-180px)] max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
          className="eyebrow"
        >
          Sacred Experience · {event.city} · {formatLongDate(event.date)}
        </motion.p>

        {event.titleHindi && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.75 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-3 font-deva text-lg text-saffron-200 sm:text-xl"
          >
            {event.titleHindi}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1], delay: 0.05 }}
          className="font-display text-h1-mobile font-bold leading-tight tracking-tight text-text-primary sm:text-h1 lg:text-h1-xl max-w-3xl"
        >
          {event.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-5 max-w-xl text-base text-text-muted sm:text-lg"
        >
          Join{' '}
          <span className="font-semibold text-text-primary">
            {event.attendedCount.toLocaleString('en-IN')}+ devotees
          </span>{' '}
          who&apos;ve attended past events. {event.storyShort}
        </motion.p>

        {/* CTA cluster */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link href={`/events/${event.slug}`} className="w-full sm:w-auto">
            <GoldButton size="xl" pulse fullWidth className="sm:w-auto">
              Book Your Seat — {formatINR(minPrice)} onwards
            </GoldButton>
          </Link>
          <button
            type="button"
            className="btn-ghost"
            onClick={() => document.getElementById('past-events')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <Play className="size-4" /> Watch Highlights
          </button>
        </motion.div>

        {/* Inline trust micro-line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-4 text-xs text-text-muted"
        >
          🔒 Secure Razorpay · 📱 Instant WhatsApp ticket · 🔄 Easy cancellation
        </motion.p>
      </div>

      {/* Live ticker pinned to hero footer */}
      <div className="absolute inset-x-0 bottom-0">
        <LiveBookingTicker />
      </div>
    </section>
  );
}
