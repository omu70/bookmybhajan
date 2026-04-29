'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GoldButton } from '@/components/ui/GoldButton';
import { LiveBookingTicker } from '@/components/ui/LiveBookingTicker';
import { Play, MapPin, Calendar, Music } from 'lucide-react';
import { shouldUse3D, formatLongDate, formatINR } from '@/lib/utils';
import type { DevotionalEvent } from '@/types';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false, loading: () => null });

interface HeroSectionProps {
  event: DevotionalEvent;
}

/**
 * HeroSection — Bhajan Clubbing energy, info-dense first frame.
 *
 * First-frame contract (375×667 mobile, 1440×900 desktop):
 *   ✓ Brand badge + announcement chip
 *   ✓ City · Date · Venue (one line)
 *   ✓ Hindi title + English title (h1)
 *   ✓ One-line subtext referencing the band
 *   ✓ Primary CTA with starting price
 *   ✓ Trust micro-line
 *   — Everything below fits inside 100svh on iPhone-class viewport.
 */
export function HeroSection({ event }: HeroSectionProps) {
  const [showScene, setShowScene] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const posterY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const posterScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  useEffect(() => {
    if (!shouldUse3D()) return;
    const onReady = () => setTimeout(() => setShowScene(true), 500);
    if (document.readyState === 'complete') onReady();
    else window.addEventListener('load', onReady, { once: true });
    return () => window.removeEventListener('load', onReady);
  }, []);

  const minPrice = Math.min(...event.tiers.map((t) => t.price));

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-20 sm:pt-24"
      style={{ minHeight: '100svh' }}
    >
      {/* BG layer — warm hero gradient */}
      <div className="absolute inset-0 -z-20 bg-hero-grad" />

      {/* Subtle 3D scene — desktop only, behind copy, low opacity */}
      {showScene && (
        <div className="absolute inset-x-0 bottom-0 -z-10 h-[55%] opacity-60 mix-blend-multiply">
          <HeroScene />
        </div>
      )}

      {/* Decorative kalash motif top-right */}
      <KalashOrnament className="pointer-events-none absolute right-6 top-24 hidden opacity-40 sm:block lg:right-12" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pb-20">
        {/* ─── LEFT — copy ───────────────────────────────── */}
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7">
          {/* Brand chip — bhajan clubbing energy */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-saffron-500/45 bg-saffron-50 px-3 py-1.5 text-xs font-bold text-saffron-700"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-saffron-500/70" />
              <span className="relative inline-flex size-2 rounded-full bg-saffron-500" />
            </span>
            <Music className="size-3.5" />
            Bhajan Clubbing · ft. Fusion Albela Band
          </motion.div>

          {/* City · Date · Venue — one compact line */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-bold uppercase tracking-[0.18em] text-maroon-700"
          >
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" /> {event.city}
            </span>
            <span className="opacity-50">·</span>
            <span className="inline-flex items-center gap-1">
              <Calendar className="size-3" />
              {formatLongDate(event.date).split(',')[0]}
            </span>
            <span className="opacity-50">·</span>
            <span>{event.venue.split(',')[0]}</span>
          </motion.p>

          {/* Hindi + English title — H1 */}
          {event.titleHindi && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-4 font-deva text-lg text-maroon-700 sm:text-xl"
            >
              {event.titleHindi}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1], delay: 0.12 }}
            className="mt-1 font-display font-bold leading-[1.0] tracking-tight text-text-primary text-h1-mobile sm:text-h1 lg:text-[80px]"
          >
            {event.title}
            <span className="block text-saffron-grad">Bhakti, on the beat.</span>
          </motion.h1>

          {/* One-line sub-promise — focus on the band + experience */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22 }}
            className="mt-4 max-w-xl text-base text-text-strong sm:text-lg"
          >
            Three hours of Govinda Bolo, dhol drops, and a dance floor of strangers turned sangha.
            Fusion Albela Band live.{' '}
            <span className="font-semibold text-text-primary">
              {event.attendedCount.toLocaleString('en-IN')}+ have already been.
            </span>
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href={`/events/${event.slug}#tickets`} className="w-full sm:w-auto">
              <GoldButton size="xl" pulse fullWidth className="sm:w-auto">
                Reserve from {formatINR(minPrice)}
              </GoldButton>
            </Link>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => document.getElementById('the-story')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Play className="size-4" /> Watch the night
            </button>
          </motion.div>

          {/* Trust micro-line */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-4 text-xs text-text-muted"
          >
            🔒 Razorpay · 📱 Instant WhatsApp ticket · 🔄 7-day refund
          </motion.p>
        </div>

        {/* ─── RIGHT — floating poster (desktop only) ── */}
        <motion.div
          style={{ y: posterY, scale: posterScale }}
          className="relative z-10 hidden lg:col-span-5 lg:block"
        >
          <div className="relative h-full">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -1 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-[28px] border border-glass-border shadow-card-hover"
            >
              <Image
                src={event.heroImage}
                alt={event.title}
                fill
                priority
                sizes="(max-width: 1024px) 0vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-transparent" />

              {/* Bottom poster info card */}
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/30 bg-white/85 p-4 backdrop-blur-glass">
                <p className="eyebrow text-[10px]">Headliner</p>
                <p className="mt-1 font-display text-xl font-bold leading-tight text-text-primary">
                  Fusion Albela Band
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  8 musicians · 3-hour set · {event.venue.split(',')[0]}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-saffron-700">
                    {event.tiers.find((t) => t.id === 'gold')?.seatsRemaining} Gold left
                  </span>
                  <span className="text-sm font-bold text-text-primary">
                    {formatINR(minPrice)}+
                  </span>
                </div>
              </div>

              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-saffron-grad px-2.5 py-1 text-[10px] font-bold text-white">
                <span className="size-1.5 rounded-full bg-white/90" />
                Booking live
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Cream fade out at bottom — into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-cream-100" />

      {/* Live booking ticker — floats above bottom edge */}
      <div className="absolute inset-x-0 bottom-0">
        <LiveBookingTicker />
      </div>
    </section>
  );
}

function KalashOrnament({ className }: { className?: string }) {
  return (
    <svg width="120" height="160" viewBox="0 0 120 160" className={className} aria-hidden>
      <defs>
        <linearGradient id="kal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4d069" />
          <stop offset="100%" stopColor="#a87810" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="100" rx="40" ry="38" fill="url(#kal)" opacity="0.35" />
      <ellipse cx="60" cy="80" rx="32" ry="6" fill="#c9921a" opacity="0.5" />
      <rect x="55" y="35" width="10" height="44" rx="2" fill="#c9921a" opacity="0.4" />
      <path d="M60 12 C 64 22, 70 28, 60 40 C 50 28, 56 22, 60 12 Z" fill="#ff7a1a" opacity="0.6" />
    </svg>
  );
}
