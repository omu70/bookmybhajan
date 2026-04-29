'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ScrollStory — pinned, scroll-driven cinematic.
 * Spans ~400vh; visible 100vh sticky. Four chapters crossfade as the user scrolls.
 *
 * Mechanics:
 *  • Outer section is 400vh tall. The inner stage is `position: sticky; top:0; height:100vh`.
 *  • Each chapter has its own opacity / y / scale `useTransform` mapped to scrollYProgress.
 *  • Parallax: image shifts at 0.6× scroll speed; text shifts at 0.9× — depth without parallax sickness.
 *  • Word-reveal: each word's opacity is mapped to a slice of progress.
 *
 * Performance: opacity + transform only. No layout thrash. Reduced-motion neutralises via globals.css.
 */

// ─── Chapters ─────────────────────────────────────────────
type Chapter = {
  eyebrow: string;
  hindi: string;
  headline: string;       // word-by-word reveal
  body: string;
  image: string;
  imageAlt: string;
};

const CHAPTERS: Chapter[] = [
  {
    eyebrow: 'Chapter I',
    hindi: 'द्वार खुलते हैं',
    headline: 'Doors open at seven. Energy in the foyer.',
    body:
      'Aarti tilak at the door. Welcome chai pressed into your hand. Strangers in saffron and streetwear queueing together — first-timers, regulars, parents, college kids. Everyone\'s here for the same reason. None of you know it yet.',
    image:
      'https://images.unsplash.com/photo-1503095396549-807759245b35?w=1800&q=80&auto=format&fit=crop',
    imageAlt: 'Devotees gathering at the auditorium entrance',
  },
  {
    eyebrow: 'Chapter II',
    hindi: 'पहली बीट',
    headline: 'The Albela Band hits the first note.',
    body:
      'Tabla, dhol, a synth pad you feel in your sternum. The opener is Govinda Bolo — re-arranged, fusion-shaped, but still itself. By the second line the back rows are standing.',
    image:
      'https://images.unsplash.com/photo-1604608672516-f1b9b1b8b1b8?w=1800&q=80&auto=format&fit=crop',
    imageAlt: 'Fusion Albela Band performing live',
  },
  {
    eyebrow: 'Chapter III',
    hindi: 'सब एक स्वर',
    headline: 'Three thousand people dancing. Singing. Both.',
    body:
      'The drop hits on Achyutam Keshavam and the auditorium lifts — physically, emotionally, audibly. Auntiji next to you knows every word. The DJ-tabla solo is two minutes long. Nobody is looking at their phone.',
    image:
      'https://images.unsplash.com/photo-1545158535-c3f7168c28b6?w=1800&q=80&auto=format&fit=crop',
    imageAlt: 'Crowd dancing during the kirtan night',
  },
  {
    eyebrow: 'Chapter IV',
    hindi: 'घर तक',
    headline: 'You will not stop smiling for three days.',
    body:
      'The encore is Hare Krishna, sung slow, then fast, then slower than slow. When the lights come up everyone\'s sweating. Outside, you exchange Instagrams instead of goodbyes. The chorus follows you home, and into the week.',
    image:
      'https://images.unsplash.com/photo-1601926038011-0e1e7d6f4d0a?w=1800&q=80&auto=format&fit=crop',
    imageAlt: 'Aftermath of the bhajan clubbing — applause and lights',
  },
];

// Each chapter occupies a slice of total scroll progress.
// 4 chapters → 0.25 each.
const CHAPTER_RANGES = CHAPTERS.map((_, i) => {
  const start = i / CHAPTERS.length;
  const end = (i + 1) / CHAPTERS.length;
  return [start, end] as const;
});

export function ScrollStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  // Page-level progress bar fill
  const progressBarScaleY = scrollYProgress;

  return (
    <section
      ref={ref}
      className="relative bg-cream-100"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
      aria-label="A night of Bhajan Clubbing in four chapters"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Top warm glow */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-page-grad" />

        {/* Section title — fades out after chapter 1 */}
        <SectionTitle scrollYProgress={scrollYProgress} />

        {/* Chapter layers */}
        {CHAPTERS.map((c, i) => (
          <ChapterPanel
            key={i}
            index={i}
            chapter={c}
            scrollYProgress={scrollYProgress}
            range={CHAPTER_RANGES[i]}
          />
        ))}

        {/* Right-side progress rail */}
        <div className="pointer-events-none absolute right-4 top-1/2 z-30 hidden -translate-y-1/2 sm:block">
          <div className="relative h-44 w-[3px] overflow-hidden rounded-full bg-maroon-900/10">
            <motion.div
              style={{ scaleY: progressBarScaleY, transformOrigin: 'top' }}
              className="absolute inset-x-0 top-0 h-full rounded-full bg-saffron-grad"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {CHAPTERS.map((_, i) => (
              <ChapterDot key={i} scrollYProgress={scrollYProgress} index={i} total={CHAPTERS.length} />
            ))}
          </div>
        </div>

        {/* Scroll affordance at bottom — only during first chapter */}
        <ScrollHint scrollYProgress={scrollYProgress} />
      </div>
    </section>
  );
}

// ─── Section title ──────────────────────────────────────
function SectionTitle({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.22], [0, -40]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-24 z-20 text-center sm:top-32"
    >
      <p className="eyebrow">A night of Bhajan Clubbing</p>
      <p className="mt-2 font-display text-2xl text-maroon-700 sm:text-3xl">
        in four chapters
      </p>
      <div className="mx-auto mt-3 h-px w-24 bg-saffron-grad" />
    </motion.div>
  );
}

// ─── Chapter panel ──────────────────────────────────────
function ChapterPanel({
  chapter,
  index,
  scrollYProgress,
  range,
}: {
  chapter: Chapter;
  index: number;
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const [start, end] = range;
  const fadeIn = start - 0.04;
  const fadeOut = end + 0.02;

  // Smooth crossfade — first chapter is visible at scroll 0
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, end - 0.05, end]
      : [fadeIn, start + 0.04, end - 0.05, fadeOut],
    index === 0 ? [1, 1, 0] : [0, 1, 1, 0]
  );

  // Parallax image (slow drift) + scale (subtle Ken Burns)
  const imgY = useTransform(scrollYProgress, [start, end], ['0%', '-12%']);
  const imgScale = useTransform(scrollYProgress, [start, end], [1.04, 1.12]);

  // Text rises slowly inside its window
  const textY = useTransform(scrollYProgress, [start, end], ['18px', '-32px']);

  // Word-by-word reveal — each word gets its own slice
  const words = chapter.headline.split(' ');
  const wordRanges = words.map((_, i) => {
    const w0 = start + 0.02 + (i / words.length) * (end - start - 0.06);
    const w1 = w0 + 0.04;
    return [w0, w1] as const;
  });

  return (
    <motion.article
      style={{ opacity }}
      className="absolute inset-0"
      aria-hidden={index !== 0 ? undefined : false}
    >
      {/* IMAGE — full bleed, parallax */}
      <motion.div
        style={{ y: imgY, scale: imgScale }}
        className="absolute inset-0"
      >
        <Image
          src={chapter.image}
          alt={chapter.imageAlt}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
        {/* Warm vignette + bottom cream fade — image meets cream page seamlessly */}
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/55 to-transparent md:from-cream-50/85 md:via-cream-50/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 via-transparent to-cream-100/85" />
      </motion.div>

      {/* TEXT — left aligned glass card */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pt-20 sm:px-6 lg:px-12"
      >
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-saffron-500" />
            {chapter.eyebrow}
          </p>
          <p className="mt-3 font-deva text-xl text-maroon-700 sm:text-2xl">
            {chapter.hindi}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-text-primary sm:text-5xl lg:text-6xl">
            {words.map((w, wi) => (
              <Word
                key={wi}
                word={w}
                scrollYProgress={scrollYProgress}
                range={wordRanges[wi]}
              />
            ))}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-text-strong sm:text-lg">
            {chapter.body}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

function Word({
  word,
  scrollYProgress,
  range,
}: {
  word: string;
  scrollYProgress: MotionValue<number>;
  range: readonly [number, number];
}) {
  const opacity = useTransform(scrollYProgress, [range[0], range[1]], [0.15, 1]);
  const y = useTransform(scrollYProgress, [range[0], range[1]], [8, 0]);
  return (
    <>
      <motion.span style={{ opacity, y }} className="word">
        {word}
      </motion.span>{' '}
    </>
  );
}

function ChapterDot({
  scrollYProgress,
  index,
  total,
}: {
  scrollYProgress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(scrollYProgress, [start - 0.02, start, end, end + 0.02], [0.4, 1, 1, 0.4]);
  const scale = useTransform(scrollYProgress, [start, (start + end) / 2, end], [0.9, 1.4, 0.9]);
  return (
    <motion.div
      style={{ opacity, scale }}
      className={cn('h-2 w-2 rounded-full', 'bg-saffron-500')}
    />
  );
}

function ScrollHint({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.18], [1, 1, 0]);
  return (
    <motion.div
      style={{ opacity }}
      className="pointer-events-none absolute inset-x-0 bottom-8 z-30 flex justify-center"
    >
      <div className="flex flex-col items-center gap-2 text-text-muted">
        <span className="text-[11px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-8 w-[2px] animate-float-slow rounded-full bg-saffron-500/60" />
      </div>
    </motion.div>
  );
}
