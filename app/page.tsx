import { HeroSection } from '@/components/sections/HeroSection';
import { VideoMarquee } from '@/components/sections/VideoMarquee';
import { WhyBhajanClubbing } from '@/components/sections/WhyBhajanClubbing';
import { InsideTheNight } from '@/components/sections/InsideTheNight';
import { EventGrid } from '@/components/sections/EventGrid';
import { DevoteeVoices } from '@/components/sections/DevoteeVoices';
import { EVENTS } from '@/lib/events';

export const dynamic = 'force-static';
export const revalidate = 60;

/**
 * Homepage — devotional, story-led.
 *
 *   1. Hero               — brand statement + diya garland + falling petals
 *   2. VideoMarquee       — live moments
 *   3. WhyBhajanClubbing  — 4 emotional triggers (why your Saturday)
 *   4. InsideTheNight     — 5-chapter typography-led storytelling
 *   5. EventGrid          — 5 real shows, single-click to book
 *   6. DevoteeVoices      — reviews from past nights
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoMarquee />
      <WhyBhajanClubbing />
      <InsideTheNight />
      <EventGrid
        events={EVENTS}
        eyebrow="Upcoming shows"
        heading="Bhajan Clubbing, live."
      />
      <DevoteeVoices />
    </>
  );
}
