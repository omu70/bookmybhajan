import { HeroSection } from '@/components/sections/HeroSection';
import { VideoMarquee } from '@/components/sections/VideoMarquee';
import { EventGrid } from '@/components/sections/EventGrid';
import { EVENTS } from '@/lib/events';

export const dynamic = 'force-static';
export const revalidate = 60;

/**
 * HOMEPAGE — minimal, mirrors the actual bookmybhajan.com flow.
 *   1. Hero (one screen)
 *   2. Video marquee — live moments, 2 tiles on mobile, 4 on desktop
 *   3. Event grid — 5 posters, single-click to book
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoMarquee />
      <EventGrid
        events={EVENTS}
        eyebrow="Upcoming shows"
        heading="Bhajan Clubbing, live."
      />
    </>
  );
}
