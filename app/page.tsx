import { HeroSection } from '@/components/sections/HeroSection';
import { ScarcityBar } from '@/components/sections/ScarcityBar';
import { EventGrid } from '@/components/sections/EventGrid';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { TrustLayer } from '@/components/sections/TrustLayer';
import { ExitIntentModal } from '@/components/sections/ExitIntentModal';
import { StickyMobileCTA } from '@/components/sections/StickyMobileCTA';
import { EVENTS, getFeaturedEvents } from '@/lib/events';

// SSG — static, pre-built. Homepage is the most-hit page; cache forever.
export const dynamic = 'force-static';
export const revalidate = 60; // 60s ISR for inventory drift

export default function HomePage() {
  const heroEvent = EVENTS[0];
  const featured = getFeaturedEvents();
  const minPrice = Math.min(...heroEvent.tiers.map((t) => t.price));

  return (
    <>
      <HeroSection event={heroEvent} />

      {/* Mandatory scarcity bar — directly under hero */}
      <ScarcityBar event={heroEvent} />

      <EventGrid
        events={featured}
        eyebrow="Upcoming · 5 cities · 6 events"
        heading="Sacred experiences across India"
        description="From Delhi's bhajan halls to Goa's beach aartis — pick your moment. Tickets start at ₹349."
      />

      {/* All events listing CTA */}
      <div className="mx-auto -mt-6 mb-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <a
          href="/events"
          className="inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass-surface px-4 py-2 text-sm text-text-muted hover:border-gold/40 hover:text-text-primary"
        >
          Browse all events →
        </a>
      </div>

      <TestimonialsCarousel
        testimonials={heroEvent.testimonials}
        attendedCount={heroEvent.attendedCount}
      />

      <TrustLayer />

      <ExitIntentModal />
      <StickyMobileCTA href={`/events/${heroEvent.slug}`} fromPrice={minPrice} />
    </>
  );
}
