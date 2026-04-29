'use client';

import { motion } from 'framer-motion';
import { DoorOpen, Mic, Users, Flame, ArrowUpRight } from 'lucide-react';

/**
 * InsideTheNight — typography-led, icon-flagged storytelling.
 *
 *   Each chapter row:  [chapter number]   [icon · Hindi · 1-line headline]
 *
 *   Alternating slide-in animation (z-feel) on each row.
 *   No body copy — headlines do the work.
 */

interface Chapter {
  Icon: any;
  hindi: string;
  headline: string;
}

const CHAPTERS: Chapter[] = [
  { Icon: DoorOpen,      hindi: 'द्वार',         headline: 'Tilak. Chai. Doors open.' },
  { Icon: Mic,           hindi: 'पहला स्वर',     headline: 'Lights down. Band walks on.' },
  { Icon: Users,         hindi: 'एक स्वर में',   headline: 'You stop noticing whose voice is yours.' },
  { Icon: Flame,         hindi: 'आत्मा का उछाल', headline: 'The drop hits. The room lifts.' },
  { Icon: ArrowUpRight,  hindi: 'हल्के लौटे',    headline: 'You walk out lighter.' },
];

export function InsideTheNight() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Header — short */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">A night, in five</p>
          <h2 className="mt-3 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What it actually{' '}
            <span className="italic text-saffron-grad">feels like.</span>
          </h2>
        </motion.div>

        {/* Chapters */}
        <div className="mt-12 sm:mt-16">
          {CHAPTERS.map((c, i) => (
            <ChapterRow
              key={i}
              chapter={c}
              index={i}
              last={i === CHAPTERS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ChapterRow({
  chapter,
  index,
  last,
}: {
  chapter: Chapter;
  index: number;
  last: boolean;
}) {
  // Alternating slide-in direction — even rows from left, odd from right.
  const fromLeft = index % 2 === 0;
  const { Icon } = chapter;

  return (
    <article
      className={`grid grid-cols-1 items-center gap-4 py-8 sm:grid-cols-12 sm:gap-8 sm:py-10 ${
        last ? '' : 'border-b border-maroon-900/10'
      }`}
      style={{ perspective: 1400 }}
    >
      {/* Chapter number — slides in from one side */}
      <motion.div
        initial={{
          opacity: 0,
          x: fromLeft ? -90 : 90,
          rotateY: fromLeft ? -22 : 22,
          scale: 0.9,
        }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.7, delay: 0.05, ease: [0.2, 0.7, 0.2, 1] }}
        className="sm:col-span-2"
      >
        <p
          className="font-display text-5xl font-medium italic text-saffron-700 sm:text-6xl lg:text-7xl"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </p>
      </motion.div>

      {/* Body — slides in from the OPPOSITE side, slight delay */}
      <motion.div
        initial={{
          opacity: 0,
          x: fromLeft ? 80 : -80,
          rotateY: fromLeft ? 14 : -14,
          scale: 0.95,
        }}
        whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.75, delay: 0.18, ease: [0.2, 0.7, 0.2, 1] }}
        className="sm:col-span-10"
      >
        <div className="flex items-start gap-3 sm:items-center sm:gap-4">
          {/* Icon tile */}
          <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-saffron-50 text-saffron-700 sm:size-11">
            <Icon className="size-5" strokeWidth={2} />
          </span>

          <div className="min-w-0">
            <p className="font-deva text-sm font-semibold text-maroon-700 sm:text-base">
              {chapter.hindi}
            </p>
            <h3 className="font-display text-xl font-medium leading-[1.15] text-text-primary sm:text-2xl lg:text-3xl">
              {chapter.headline}
            </h3>
          </div>
        </div>
      </motion.div>
    </article>
  );
}
