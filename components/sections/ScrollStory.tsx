'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * ScrollStory — bhajan-clubbing cinematic, four chapters.
 *
 * Mobile (< md):  stacked vertical chapters, simple fade-in on scroll.
 *                 No sticky pin (iOS Safari hates it + scroll-jacking
 *                 fights URL-bar resizes). Each chapter is its own card.
 *
 * Desktop (md+):  pinned sticky stage spanning ~400vh.
 *                 Chapters crossfade as the user scrolls.
 *                 Parallax image, word-by-word headline reveal.
 */

type Chapter = {
  eyebrow: string;
  hindi: string;
  headline: string;
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
      "Aarti tilak at the door. Welcome chai pressed into your hand. Strangers in saffron and streetwear queueing together — first-timers, regulars, parents, college kids. Everyone's here for the same reason. None of you know it yet.",
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
      "The encore is Hare Krishna, sung slow, then fast, then slower than slow. When the lights come up everyone's sweating. Outside, you exchange Instagrams instead of goodbyes.",
    image:
      'https://images.unsplash.com/photo-1601926038011-0e1e7d6f4d0a?w=1800&q=80&auto=format&fit=crop',
    imageAlt: 'Aftermath of the bhajan clubbing — applause and lights',
  },
];

const RANGES = CHAPTERS.map((_, i) => {
  const start = i / CHAPTERS.length;
  const end = (i + 1) / CHAPTERS.length;
  return [start, end] as const;
});

export function ScrollStory() {
  return (
    <>
      {/* Section header — same on all viewports */}
      <header className="mx-auto max-w-7xl px-5 pt-20 pb-8 text-center sm:px-6 sm:pt-24 lg:px-8">
        <p className="eyebrow">A night of Bhajan Clubbing</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          in four chapters
        </h2>
        <div className="mx-auto mt-4 h-px w-24 bg-saffron-grad" />
      </header>

      {/* MOBILE — stacked chapters */}
      <div className="md:hidden">
        <div className="space-y-12 px-5 pb-12">
          {CHAPTERS.map((c, i) => (
            <MobileChapter key={i} chapter={c} index={i} />
          ))}
        </div>
      </div>

      {/* DESKTOP — pinned cinematic */}
      <div className="hidden md:block">
        <PinnedStory />
      </div>
    </>
  );
}

// ─── Mobile: simple stacked chapter cards ───────────────────────
function MobileChapter({ chapter, index }: { chapter: Chapter; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}
      className="overflow-hidden rounded-3xl border border-glass-border bg-cream-50 shadow-glass"
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={chapter.image}
          alt={chapter.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/55 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-maroon-700">
          <span className="inline-block h-px w-4 bg-saffron-500" />
          {chapter.eyebrow}
        </span>
      </div>
      <div className="px-5 py-6">
        <p className="font-deva text-sm font-semibold text-maroon-700">
          {chapter.hindi}
        </p>
        <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-text-primary">
          {chapter.headline}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-text-strong">
          {chapter.body}
        </p>
      </div>
    </motion.article>
  );
}

// ─── Desktop: pinned cinematic ──────────────────────────────────
function PinnedStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={ref}
      className="relative bg-cream-100"
      style={{ height: `${CHAPTERS.length * 100}vh` }}
      aria-label="A night of Bhajan Clubbing in four chapters"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-page-grad" />

        {CHAPTERS.map((c, i) => (
          <ChapterPanel
            key={i}
            index={i}
            chapter={c}
            scrollYProgress={scrollYProgress}
            range={RANGES[i]}
          />
        ))}

        {/* Right-side rail */}
        <div className="pointer-events-none absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 sm:block">
          <div className="relative h-44 w-[3px] overflow-hidden rounded-full bg-maroon-900/10">
            <motion.div
              style={{ scaleY: scrollYProgress, transformOrigin: 'top' }}
              className="absolute inset-x-0 top-0 h-full rounded-full bg-saffron-grad"
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {CHAPTERS.map((_, i) => (
              <ChapterDot key={i} scrollYProgress={scrollYProgress} index={i} total={CHAPTERS.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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

  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, end - 0.05, end]
      : [fadeIn, start + 0.04, end - 0.05, fadeOut],
    index === 0 ? [1, 1, 0] : [0, 1, 1, 0]
  );

  const imgY = useTransform(scrollYProgress, [start, end], ['0%', '-12%']);
  const imgScale = useTransform(scrollYProgress, [start, end], [1.04, 1.12]);
  const textY = useTransform(scrollYProgress, [start, end], ['18px', '-32px']);

  const words = chapter.headline.split(' ');
  const wordRanges = words.map((_, i) => {
    const w0 = start + 0.02 + (i / words.length) * (end - start - 0.06);
    return [w0, w0 + 0.04] as const;
  });

  return (
    <motion.article style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
        <Image
          src={chapter.image}
          alt={chapter.imageAlt}
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-50/95 via-cream-50/55 to-transparent md:from-cream-50/85 md:via-cream-50/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-50/30 via-transparent to-cream-100/85" />
      </motion.div>

      <motion.div
        style={{ y: textY }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-12"
      >
        <div className="max-w-xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-saffron-500" />
            {chapter.eyebrow}
          </p>
          <p className="mt-3 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
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
  const opacity = useTransform(scrollYProgress, [range[0], range[1]], [0.18, 1]);
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
    <motion.div style={{ opacity, scale }} className={cn('h-2 w-2 rounded-full', 'bg-saffron-500')} />
  );
}
