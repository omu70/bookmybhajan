'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Clock,
  Share2,
  Heart,
  Flame,
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GoldButton } from '@/components/ui/GoldButton';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';
import { CountdownTimer } from '@/components/ui/CountdownTimer';
import { TicketTiers } from '@/components/sections/TicketTiers';
import { AuditoriumZones } from '@/components/sections/AuditoriumZones';
import { StorySection } from '@/components/sections/StorySection';
import { PastEventsGallery } from '@/components/sections/PastEventsGallery';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { FAQSection } from '@/components/sections/FAQSection';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { StickyMobileCTA } from '@/components/sections/StickyMobileCTA';
import { ExitIntentModal } from '@/components/sections/ExitIntentModal';
import { trackEvent } from '@/lib/analytics';
import { formatINR, formatLongDate } from '@/lib/utils';
import type { DevotionalEvent, Tier } from '@/types';

interface EventDetailClientProps {
  event: DevotionalEvent;
}

export function EventDetailClient({ event }: EventDetailClientProps) {
  const router = useRouter();
  const [wishlisted, setWishlisted] = useState(false);
  // Lifted tier state — TicketTiers + AuditoriumZones share it
  const initialTier: Tier = (event.tiers.find((t) => t.popular)?.id ?? 'gold') as Tier;
  const [activeTier, setActiveTier] = useState<Tier>(initialTier);

  const goldTier = event.tiers.find((t) => t.id === 'gold')!;
  const minPrice = Math.min(...event.tiers.map((t) => t.price));

  useEffect(() => {
    trackEvent('view_event_detail', { slug: event.slug });
  }, [event.slug]);

  /** Single-tap path → straight to /checkout with tier+qty in URL. No seat picker. */
  const proceed = (tier: Tier, qty: number) => {
    trackEvent('start_checkout', { slug: event.slug, tier, qty });
    router.push(`/checkout?event=${event.slug}&tier=${tier}&qty=${qty}`);
  };

  const share = async () => {
    trackEvent('share_event', { slug: event.slug });
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.storyShort,
          url: typeof window !== 'undefined' ? window.location.href : '',
        });
      } catch {
        /* dismissed */
      }
    }
  };

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────── */}
      <section className="relative isolate min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={event.heroImage}
            alt={event.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          {/* Bottom-to-top warm vignette — image fades into the cream page */}
          <div className="absolute inset-0 bg-gradient-to-t from-cream-100 via-cream-100/45 to-maroon-900/15" />
        </div>

        <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-4 pb-10 pt-32 sm:px-6 lg:px-8 lg:pb-16">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Floating glass info card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              className="lg:col-span-5"
            >
              <GlassCard tone="hi" className="!p-6">
                <p className="eyebrow">Sacred Experience</p>
                {event.titleHindi && (
                  <p className="mt-2 font-deva text-base text-saffron-200">
                    {event.titleHindi}
                  </p>
                )}
                <h1 className="mt-1 font-display text-3xl font-bold leading-tight text-text-primary sm:text-4xl">
                  {event.title}
                </h1>

                <div className="mt-4 space-y-2 text-sm text-text-muted">
                  <p className="flex items-center gap-2">
                    <Calendar className="size-4 text-gold" />
                    {formatLongDate(event.date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="size-4 text-gold" />
                    Doors {event.doorsOpen} · Begins {event.startTime}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="size-4 text-gold" />
                    {event.venue}, {event.city}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 border border-rose-500/40 px-2.5 py-1 text-xs font-bold text-rose-200">
                    <Flame className="size-3.5" />
                    Only {goldTier.seatsRemaining} Gold seats left
                  </span>
                </div>

                <div className="mt-5">
                  <GoldButton
                    fullWidth
                    onClick={() => {
                      trackEvent('click_book_now', { slug: event.slug, source: 'hero' });
                      document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Seats Now — from {formatINR(minPrice)}
                  </GoldButton>
                </div>

                <div className="mt-3 flex items-center justify-between gap-2 text-xs">
                  <button
                    type="button"
                    onClick={share}
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary"
                  >
                    <Share2 className="size-3.5" /> Share
                  </button>
                  <button
                    type="button"
                    onClick={() => setWishlisted((w) => !w)}
                    aria-pressed={wishlisted}
                    className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-primary"
                  >
                    <Heart
                      className={`size-3.5 ${wishlisted ? 'fill-rose-400 text-rose-400' : ''}`}
                    />
                    Wishlist
                  </button>
                </div>

                <div className="mt-4 border-t border-white/5 pt-4">
                  <CountdownTimer target={event.date} compact label="Begins in" />
                </div>
              </GlassCard>
            </motion.div>

            <div className="lg:col-span-7" />
          </div>
        </div>
      </section>

      {/* ─── STORY ───────────────────────────────────────── */}
      <StorySection event={event} />

      {/* ─── TICKET TIERS + AUDITORIUM VIEW (synced) ─── */}
      <section
        id="tickets"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8"
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

      {/* ─── PAST EVENTS GALLERY ─────────────────────────── */}
      <PastEventsGallery
        videos={event.pastEventVideos}
        galleryImages={event.galleryImages}
      />

      {/* ─── TESTIMONIALS ────────────────────────────────── */}
      <TestimonialsCarousel
        testimonials={event.testimonials}
        attendedCount={event.attendedCount}
      />

      {/* ─── TRUST + FAQ ─────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <TrustStrip variant="stacked" />
      </section>
      <FAQSection />

      {/* ─── EXIT INTENT + STICKY ────────────────────────── */}
      <ExitIntentModal />
      <StickyMobileCTA href={`/events/${event.slug}#tickets`} fromPrice={minPrice} />

      {/* Desktop sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-30 hidden border-t border-maroon-900/10 bg-cream-50/92 backdrop-blur-glass shadow-glass md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <p className="text-sm">
              <span className="text-text-muted">Gold tier</span>{' '}
              <span className="font-bold text-text-primary">{formatINR(goldTier.price)}/seat</span>
            </p>
            <ScarcityBadge remaining={goldTier.seatsRemaining} total={goldTier.totalSeats} hideIfLow={false} />
          </div>
          <GoldButton
            onClick={() => {
              trackEvent('click_book_now', { slug: event.slug, source: 'sticky-bar' });
              document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Book Now
          </GoldButton>
        </div>
      </div>
    </>
  );
}
