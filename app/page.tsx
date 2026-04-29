import { HeroSection } from '@/components/sections/HeroSection';
import { CityMarquee } from '@/components/sections/CityMarquee';
import { ScrollStory } from '@/components/sections/ScrollStory';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { ScarcityBar } from '@/components/sections/ScarcityBar';
import { EventGrid } from '@/components/sections/EventGrid';
import { StatsBand } from '@/components/sections/StatsBand';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { TrustLayer } from '@/components/sections/TrustLayer';
import { ExitIntentModal } from '@/components/sections/ExitIntentModal';
import { StickyMobileCTA } from '@/components/sections/StickyMobileCTA';
import { EVENTS, getFeaturedEvents } from '@/lib/events';

// SSG — homepage cached at the edge with 60s ISR for inventory drift.
export const dynamic = 'force-static';
export const revalidate = 60;

export default function HomePage() {
  const heroEvent = EVENTS[0];
  const featured = getFeaturedEvents();
  const minPrice = Math.min(...heroEvent.tiers.map((t) => t.price));

  return (
    <>
      {/* 1 ─── HERO — grand, expansive, two-column on desktop */}
      <HeroSection event={heroEvent} />

      {/* 2 ─── CITY / VENUE MARQUEE — credibility ribbon */}
      <CityMarquee />

      {/* 3 ─── SCARCITY BAR — single highest-impact urgency block */}
      <ScarcityBar event={heroEvent} />

      {/* 4 ─── SCROLL-STORY — pinned cinematic, four chapters */}
      <div id="the-story">
        <ScrollStory />
      </div>

      {/* 5 ─── HOW IT WORKS — friction-removal */}
      <HowItWorks />

      {/* 6 ─── EVENTS GRID — all featured, conversion-tuned cards */}
      <EventGrid
        events={featured}
        eyebrow="Upcoming · 6 cities · 6 Saturdays"
        heading="Pick your city. Pick your night."
        description="The Fusion Albela Band rolls through six Indian cities — Mumbai, Pune, Ahmedabad, Surat, Delhi, Bangalore. Tickets from ₹299. Bhakti, but at the frequency of your generation."
      />

      {/* 7 ─── BROWSE-ALL CTA */}
      <div className="mx-auto -mt-2 mb-6 max-w-7xl px-4 sm:px-6 lg:px-8">
        <a
          href="/events"
          className="inline-flex items-center gap-2 rounded-full border border-maroon-900/15 bg-cream-50 px-4 py-2 text-sm font-semibold text-text-strong hover:border-saffron-500/45 hover:text-saffron-700"
        >
          Browse all events →
        </a>
      </div>

      {/* 8 ─── STATS BAND — number-led credibility */}
      <StatsBand />

      {/* 9 ─── TESTIMONIALS */}
      <TestimonialsCarousel
        testimonials={heroEvent.testimonials}
        attendedCount={heroEvent.attendedCount}
      />

      {/* 10 ─── TRUST LAYER */}
      <TrustLayer />

      <ExitIntentModal />
      <StickyMobileCTA href={`/events/${heroEvent.slug}`} fromPrice={minPrice} />
    </>
  );
}
