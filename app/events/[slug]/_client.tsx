'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  ArrowLeft,
  Lock,
  MessageCircle,
  RotateCcw,
  Flame,
} from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { TicketTiers } from '@/components/sections/TicketTiers';
import { AuditoriumZones } from '@/components/sections/AuditoriumZones';
import { BhajanAmbience } from '@/components/sections/BhajanAmbience';
import { EventPoster } from '@/components/sections/EventPoster';
import { BookingUrgencyPanel } from '@/components/sections/BookingUrgencyPanel';
import { trackEvent } from '@/lib/analytics';
import { formatINR, formatLongDate } from '@/lib/utils';
import type { DevotionalEvent, Tier } from '@/types';

interface EventDetailClientProps {
  event: DevotionalEvent;
}

/**
 * EventDetail — mobile-first, Gen-Z punchy.
 *
 *   Mobile order:
 *     poster → "selling fast" sticker → Hindi → English title → facts
 *     → big CTA → urgency panel → tiers → zones → trust → sticky book bar
 *
 *   No invented content — only the brand's facts. But layout, weight and
 *   copy lean confident, contemporary.
 */
export function EventDetailClient({ event }: EventDetailClientProps) {
  const router = useRouter();
  const initialTier: Tier = (event.tiers.find((t) => t.popular)?.id ?? 'gold') as Tier;
  const [activeTier, setActiveTier] = useState<Tier>(initialTier);

  const minPrice = Math.min(...event.tiers.map((t) => t.price));
  const goldTier = event.tiers.find((t) => t.id === 'gold')!;
  const totalRemaining = event.tiers.reduce((s, t) => s + t.seatsRemaining, 0);
  const totalSeats = event.tiers.reduce((s, t) => s + t.totalSeats, 0);
  const pctSold = Math.round(((totalSeats - totalRemaining) / totalSeats) * 100);

  useEffect(() => {
    trackEvent('view_event_detail', { slug: event.slug });
  }, [event.slug]);

  const proceed = (tier: Tier, qty: number) => {
    trackEvent('start_checkout', { slug: event.slug, tier, qty });
    router.push(`/checkout?event=${event.slug}&tier=${tier}&qty=${qty}`);
  };

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-20 bg-hero-grad" />
        <BhajanAmbience petalCount={14} garland />

        <div className="mx-auto max-w-7xl px-4 pb-10 pt-20 sm:px-6 sm:pb-16 sm:pt-28 lg:px-8 lg:pb-24 lg:pt-32">
          {/* Back link */}
          <Link
            href="/#shows"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-text-muted hover:text-saffron-700"
          >
            <ArrowLeft className="size-3.5" /> All shows
          </Link>

          <div className="mt-5 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:gap-10">
            {/* POSTER */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:col-span-5"
            >
              <div className="relative mx-auto aspect-square w-full max-w-[420px] overflow-hidden rounded-[28px] border border-maroon-900/15 bg-cream-200 shadow-card-hover">
                <EventPoster event={event} className="h-full w-full" />

                {/* "Selling fast" sticker — Gen-Z energy */}
                <span className="absolute right-4 top-4 inline-flex -rotate-3 items-center gap-1.5 rounded-full bg-rose-500 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-widest text-cream-50">
                  <Flame className="size-3" strokeWidth={2.6} />
                  {pctSold}% sold
                </span>
              </div>
            </motion.div>

            {/* COPY + FACTS */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:col-span-7"
            >
              {/* Hindi */}
              {event.titleHindi && (
                <p className="font-deva text-lg font-semibold text-maroon-700 sm:text-2xl">
                  {event.titleHindi}
                </p>
              )}

              {/* H1 — bigger on mobile than before */}
              <h1 className="mt-1 max-w-2xl font-display font-medium leading-[1.02] tracking-tight text-text-primary text-[34px] sm:text-h1 lg:text-h1-xl">
                {event.title}
              </h1>

              {/* Inline tagline sticker */}
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-text-primary px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-saffron-200">
                Bhakti, on the beat ⚡
              </p>

              {/* FACTS — 3 cols mobile */}
              <div className="mt-7 grid grid-cols-3 gap-3 border-t border-maroon-900/12 pt-6 sm:gap-5">
                <Fact Icon={Calendar} label="Date" value={shortDate(event.date)} />
                <Fact Icon={Clock}    label="Doors" value={event.doorsOpen} sub={`Show ${event.startTime}`} />
                <Fact Icon={MapPin}   label="City" value={event.city} sub={event.venue.split(',')[0]} />
              </div>

              {/* CTA + price badge */}
              <div className="mt-7 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <GoldButton
                  size="xl"
                  fullWidth
                  onClick={() => {
                    trackEvent('click_book_now', { slug: event.slug, source: 'detail-hero' });
                    document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="sm:w-auto"
                >
                  Grab my seat — from {formatINR(minPrice)}
                </GoldButton>

                <span className="inline-flex items-center justify-center gap-1.5 rounded-full border border-rose-500/40 bg-rose-50 px-3 py-2 text-[11px] font-extrabold uppercase tracking-widest text-rose-700">
                  <Flame className="size-3" strokeWidth={2.6} /> Selling fast
                </span>
              </div>

              <p className="mt-3 text-[11px] text-text-muted sm:text-xs">
                FCFS seating inside each tier · Razorpay · WhatsApp ticket in 30 sec
              </p>

              {/* URGENCY PANEL */}
              <div className="mt-6 sm:mt-8">
                <BookingUrgencyPanel event={event} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ TIER PICKER + AUDITORIUM ═══════════════════════ */}
      <section
        id="tickets"
        className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-8"
      >
        <div className="lg:col-span-7">
          <TicketTiers
            event={event}
            value={activeTier}
            onTierChange={setActiveTier}
            onProceed={proceed}
          />
        </div>
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <AuditoriumZones
              tiers={event.tiers}
              active={activeTier}
              onZoneClick={(t) => setActiveTier(t)}
            />
          </div>
        </aside>
      </section>

      {/* ═══ TRUST STRIP ════════════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-4 pb-28 sm:px-6 sm:pb-20">
        <div className="grid grid-cols-1 gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 p-4 sm:grid-cols-3 sm:p-5">
          <Trust Icon={Lock}          title="Secure"          sub="Razorpay · 256-bit SSL" />
          <Trust Icon={MessageCircle} title="WhatsApp ticket" sub="Sent in 30 seconds" />
          <Trust Icon={RotateCcw}     title="Easy refunds"    sub="Up to 7 days before" />
        </div>
      </section>

      {/* DESKTOP sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 hidden border-t border-maroon-900/10 bg-cream-50/92 backdrop-blur-glass shadow-glass md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-text-muted">{activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}</span>
            <span className="font-bold text-text-primary tabular">
              {formatINR(event.tiers.find((t) => t.id === activeTier)!.price)}/seat
            </span>
            <span className="text-text-subtle">·</span>
            <span className="text-rose-700 font-semibold">
              {event.tiers.find((t) => t.id === activeTier)!.seatsRemaining} left
            </span>
          </div>
          <GoldButton
            onClick={() => {
              trackEvent('click_book_now', { slug: event.slug, source: 'sticky' });
              router.push(`/checkout?event=${event.slug}&tier=${activeTier}&qty=1`);
            }}
          >
            Grab my seat →
          </GoldButton>
        </div>
      </div>

      {/* MOBILE sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[env(safe-area-inset-bottom,0)] pt-2 md:hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-cream-100 to-transparent" />
        <Link
          href={`/checkout?event=${event.slug}&tier=${activeTier}&qty=1`}
          className="relative flex h-[58px] w-full items-center justify-between gap-2 rounded-2xl bg-text-primary px-4 font-bold text-cream-50 active:scale-[0.99]"
        >
          <span className="flex flex-col text-left leading-tight">
            <span className="text-[11px] font-extrabold uppercase tracking-widest opacity-70">
              {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)} · From {formatINR(minPrice)}
            </span>
            <span className="text-[15px]">Grab my seat →</span>
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-saffron-grad text-text-primary">
            <ArrowLeft className="size-4 rotate-180" strokeWidth={2.6} />
          </span>
        </Link>
      </div>
    </>
  );
}

// ─── helpers ─────────────────────────────────────────────
function shortDate(iso: string) {
  const d = new Date(iso);
  return d
    .toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })
    .toUpperCase();
}

function Fact({
  Icon,
  label,
  value,
  sub,
}: {
  Icon: any;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <p className="flex items-center gap-1 text-[9px] font-extrabold uppercase tracking-widest text-text-muted">
        <Icon className="size-3 text-saffron-600" /> {label}
      </p>
      <p className="mt-1 font-display text-lg font-semibold leading-[1.1] text-text-primary sm:text-xl">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-[11px] text-text-muted">{sub}</p>}
    </div>
  );
}

function Trust({
  Icon,
  title,
  sub,
}: {
  Icon: any;
  title: string;
  sub: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-saffron-50 text-saffron-700">
        <Icon className="size-4" strokeWidth={2.4} />
      </div>
      <div>
        <p className="text-sm font-bold text-text-primary">{title}</p>
        <p className="text-[11px] text-text-muted">{sub}</p>
      </div>
    </div>
  );
}
