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
 * EventDetail — minimal, devotional product page.
 *
 *   1. Hero — poster image + Hindi title + English title + facts
 *      (date · doors · venue · address) + book CTA
 *      Falling petals + diya garland animate over the hero (BhajanAmbience)
 *
 *   2. Tier picker — Silver / Gold / Diamond
 *      Sat alongside an AuditoriumZones visual that mirrors the picked tier
 *
 *   3. Trust strip + sticky bottom bar
 *
 * No invented content. Only the facts the brand actually has.
 */
export function EventDetailClient({ event }: EventDetailClientProps) {
  const router = useRouter();
  const initialTier: Tier = (event.tiers.find((t) => t.popular)?.id ?? 'gold') as Tier;
  const [activeTier, setActiveTier] = useState<Tier>(initialTier);

  const minPrice = Math.min(...event.tiers.map((t) => t.price));
  const goldTier = event.tiers.find((t) => t.id === 'gold')!;

  useEffect(() => {
    trackEvent('view_event_detail', { slug: event.slug });
  }, [event.slug]);

  const proceed = (tier: Tier, qty: number) => {
    trackEvent('start_checkout', { slug: event.slug, tier, qty });
    router.push(`/checkout?event=${event.slug}&tier=${tier}&qty=${qty}`);
  };

  return (
    <>
      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden">
        {/* Atmospheric background — saffron radial glow */}
        <div className="absolute inset-0 -z-20 bg-hero-grad" />

        {/* Falling petals + hanging diya garland */}
        <BhajanAmbience petalCount={16} garland />

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 pb-12 pt-28 sm:px-6 sm:pt-32 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:pb-20 lg:pt-40">
          {/* Back link */}
          <div className="lg:col-span-12">
            <Link
              href="/#shows"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-text-muted hover:text-saffron-700"
            >
              <ArrowLeft className="size-3.5" /> All shows
            </Link>
          </div>

          {/* LEFT — poster image */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-3xl border border-maroon-900/15 bg-cream-200 shadow-card-hover">
              <EventPoster event={event} className="h-full w-full" />
            </div>
          </motion.div>

          {/* RIGHT — facts */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.08 }}
            className="lg:col-span-7"
          >
            <p className="eyebrow">Bookmybhajan presents</p>

            {event.titleHindi && (
              <p className="mt-4 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
                {event.titleHindi}
              </p>
            )}

            <h1 className="mt-1 max-w-2xl font-display font-medium leading-[1.05] tracking-tight text-text-primary text-h1-mobile sm:text-h1">
              {event.title}
            </h1>

            {/* Facts grid — 2-col on mobile */}
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-5 border-t border-maroon-900/10 pt-6 sm:grid-cols-3">
              <Fact Icon={Calendar} label="Date" value={formatLongDate(event.date)} />
              <Fact Icon={Clock}    label="Doors" value={`${event.doorsOpen} · Show ${event.startTime}`} />
              <Fact Icon={MapPin}   label="Venue" value={`${event.venue}, ${event.city}`} className="col-span-2 sm:col-span-1" />
            </div>

            {/* Primary CTA */}
            <div className="mt-8">
              <GoldButton
                size="xl"
                fullWidth
                onClick={() => {
                  trackEvent('click_book_now', { slug: event.slug, source: 'detail-hero' });
                  document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="sm:w-auto"
              >
                Reserve from {formatINR(minPrice)}
              </GoldButton>
            </div>

            <p className="mt-4 text-xs text-text-muted">
              First-come-first-served seating inside each tier · Razorpay-secure checkout
            </p>

            {/* AGGRESSIVE URGENCY PANEL — countdown + scarcity + live activity */}
            <div className="mt-8">
              <BookingUrgencyPanel event={event} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TIER PICKER + AUDITORIUM ═══════════════════════════ */}
      <section
        id="tickets"
        className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:px-8"
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

      {/* ═══ TRUST + STICKY BOOK BAR ═════════════════════════════ */}
      <section className="mx-auto max-w-3xl px-5 pb-20 sm:px-6">
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-maroon-900/10 bg-cream-50 p-4 sm:grid-cols-3 sm:p-5">
          <Trust Icon={Lock}            title="Secure"          sub="Razorpay · 256-bit SSL" />
          <Trust Icon={MessageCircle}   title="WhatsApp ticket" sub="Sent in 30 seconds" />
          <Trust Icon={RotateCcw}       title="Easy refunds"    sub="7 days before event" className="col-span-2 sm:col-span-1" />
        </div>
      </section>

      {/* Desktop sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 hidden border-t border-maroon-900/10 bg-cream-50/92 backdrop-blur-glass shadow-glass md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 lg:px-8">
          <div className="flex items-center gap-3 text-sm">
            <span className="text-text-muted">Gold</span>
            <span className="font-bold text-text-primary tabular">{formatINR(goldTier.price)}/seat</span>
            <span className="text-text-subtle">·</span>
            <span className="text-text-muted">{goldTier.seatsRemaining} left</span>
          </div>
          <GoldButton
            onClick={() => {
              trackEvent('click_book_now', { slug: event.slug, source: 'sticky' });
              document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book now
          </GoldButton>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 px-3 pb-[env(safe-area-inset-bottom,0)] pt-2 md:hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-cream-100 to-transparent" />
        <Link
          href={`/checkout?event=${event.slug}&tier=${activeTier}&qty=1`}
          className="relative flex h-[56px] w-full items-center justify-between gap-2 rounded-2xl bg-gold-grad px-5 font-bold text-text-primary active:scale-[0.99]"
        >
          <span className="flex flex-col text-left leading-tight">
            <span className="text-base">Book {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}</span>
            <span className="text-xs font-medium opacity-80">From {formatINR(minPrice)}</span>
          </span>
          <span className="text-lg">→</span>
        </Link>
      </div>
    </>
  );
}

// ─── small atoms ────────────────────────────────────────
function Fact({
  Icon,
  label,
  value,
  className = '',
}: {
  Icon: any;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-text-muted">
        <Icon className="size-3 text-saffron-600" /> {label}
      </p>
      <p className="mt-1 text-sm font-semibold leading-snug text-text-primary">{value}</p>
    </div>
  );
}

function Trust({
  Icon,
  title,
  sub,
  className = '',
}: {
  Icon: any;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-saffron-50 text-saffron-700">
        <Icon className="size-4" strokeWidth={2.4} />
      </div>
      <div>
        <p className="text-sm font-bold text-text-primary">{title}</p>
        <p className="text-[11px] text-text-muted">{sub}</p>
      </div>
    </div>
  );
}
