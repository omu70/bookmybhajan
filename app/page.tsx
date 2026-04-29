import { HeroSection } from '@/components/sections/HeroSection';
import { VideoMarquee } from '@/components/sections/VideoMarquee';
import { WhyBhajanClubbing } from '@/components/sections/WhyBhajanClubbing';
import { InsideTheNight } from '@/components/sections/InsideTheNight';
import { EventGrid } from '@/components/sections/EventGrid';
import { DevoteeVoices } from '@/components/sections/DevoteeVoices';
import { MandalaDivider } from '@/components/ui/MandalaDivider';
import { EVENTS } from '@/lib/events';

export const dynamic = 'force-static';
export const revalidate = 60;

/**
 * Homepage — devotional, story-led, less prose.
 *   1. Hero — brand statement + diya garland + falling petals
 *   2. VideoMarquee — live moments
 *   3. WhyBhajanClubbing — 4 short reason tiles
 *      ─── mandala divider ───
 *   4. InsideTheNight — 5-chapter scroll story (icons + headlines)
 *   5. LightADiya — interactive devotional moment (tap to light)
 *      ─── mandala divider ───
 *   6. EventGrid — 5 real shows, single-click to book
 *   7. DevoteeVoices — 4 short reviews
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <VideoMarquee />
      <WhyBhajanClubbing />
      <MandalaDivider />
      <InsideTheNight />
      <MandalaDivider />
      <EventGrid
        events={EVENTS}
        eyebrow="Upcoming shows"
        heading="Bhajan Clubbing, live."
      />
      <DevoteeVoices />
    </>
  );
}
