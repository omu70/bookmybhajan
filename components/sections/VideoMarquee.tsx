'use client';

import { motion } from 'framer-motion';

/**
 * VideoMarquee — auto-scrolling row of 16:9 video tiles.
 *
 *   • Mobile: 2 tiles in viewport (each tile = 50% of viewport width)
 *   • Desktop ≥ md: 4 tiles in viewport (each tile = 25%)
 *
 * The track is duplicated (×2) so the marquee loops seamlessly when it
 * scrolls one full set of tiles to the left.
 *
 * Performance:
 *   • <video> tags are muted + autoPlay + loop + playsInline (mobile policy)
 *   • preload="metadata" — only the first frame is fetched until visible
 *   • All tiles share one source for now; replace `VIDEOS` with the real
 *     event clips once they're uploaded to /public/videos/
 */

interface VideoTile {
  src: string;
  poster?: string;
  caption: string;
}

const VIDEOS: VideoTile[] = [
  { src: '/videos/marquee-1.mp4', caption: "Mumbai · St. Andrews Auditorium" },
  { src: '/videos/marquee-1.mp4', caption: "Pune · Elpro City Square" },
  { src: '/videos/marquee-1.mp4', caption: "Ahmedabad · PD Upadhyay" },
  { src: '/videos/marquee-1.mp4', caption: "Bengaluru · Chowdiah Hall" },
  { src: '/videos/marquee-1.mp4', caption: "Surat · Sardar Patel" },
  { src: '/videos/marquee-1.mp4', caption: "Tour highlights · 2025" },
];

export function VideoMarquee() {
  // Two copies for seamless looping
  const track = [...VIDEOS, ...VIDEOS];

  return (
    <section className="relative overflow-hidden border-y border-maroon-900/10 bg-cream-100 py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 pb-6 sm:px-6 lg:px-8">
        <p className="eyebrow">Live moments</p>
        <h2 className="mt-3 max-w-2xl font-display text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl">
          From the auditorium floor.
        </h2>
      </div>

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-cream-100 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-cream-100 to-transparent sm:w-24" />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
        className="flex w-max"
      >
        {track.map((v, i) => (
          <Tile key={i} video={v} />
        ))}
      </motion.div>
    </section>
  );
}

function Tile({ video }: { video: VideoTile }) {
  return (
    <div
      className={[
        // Each tile width — 50vw on mobile, 25vw on md+
        'shrink-0 px-2 sm:px-3',
        'w-[50vw] md:w-[25vw]',
        // Cap inside the max-w-7xl container so it doesn't get absurdly large on huge screens
        'lg:max-w-[300px]',
      ].join(' ')}
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-maroon-900/10 bg-text-primary shadow-glass">
        <video
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          aria-label={video.caption}
        />
        {/* Bottom caption */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-text-primary/85 via-text-primary/30 to-transparent p-3">
          <p className="text-[11px] font-bold uppercase tracking-widest text-cream-50">
            {video.caption}
          </p>
        </div>
      </div>
    </div>
  );
}
