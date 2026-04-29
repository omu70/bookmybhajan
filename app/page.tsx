import { HeroSection } from '@/components/sections/HeroSection';
import { EventGrid } from '@/components/sections/EventGrid';
import { EVENTS } from '@/lib/events';

export const dynamic = 'force-static';
export const revalidate = 60;

/**
 * HOMEPAGE — minimal, mirrors the actual bookmybhajan.com layout.
 *   1. Brand hero (one screen, simple)
 *   2. Event grid — 5 posters, that's it
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <EventGrid
        events={EVENTS}
        eyebrow="Upcoming shows"
        heading="Bhajan Clubbing, live."
      />
    </>
  );
}
