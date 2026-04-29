'use client';

import { motion } from 'framer-motion';

/**
 * InsideTheNight — typography-led storytelling.
 *
 *   Five chapters of an evening, top to bottom. Each row is:
 *     [big italic chapter number]   [Hindi tag · English headline · short body]
 *
 *   No invented stats. Pure sensory, true-of-any-good-bhajan-night observations.
 *   Sits on the homepage between WhyBhajanClubbing and EventGrid.
 *
 *   Mobile: number stacks above text. sm+: number sits in a left rail.
 */

interface Chapter {
  hindi: string;
  headline: string;
  body: string;
}

const CHAPTERS: Chapter[] = [
  {
    hindi: 'द्वार',
    headline: 'The doorway.',
    body:
      'Aarti tilak at the entrance. A glass of chai pressed into your hand. Strangers lining up together — first-timers in jeans, regulars in saris, parents holding their kids by the wrist.',
  },
  {
    hindi: 'पहला स्वर',
    headline: 'The first note.',
    body:
      'Lights drop. The harmonium finds its pitch. The Albela Band walks on without a word. By the time the first line lands, the room is already leaning forward.',
  },
  {
    hindi: 'एक स्वर में',
    headline: 'The chorus, somewhere in the middle.',
    body:
      'Govinda Bolo, sung by three thousand strangers in unison. You will not notice when you started singing — only that you are. The drum solo lasts two minutes. Nobody is on their phone.',
  },
  {
    hindi: 'आत्मा का उछाल',
    headline: 'The drop.',
    body:
      'The fusion arrangement hits a beat the original never had. The whole auditorium rises off the floor for a second. You\'ll talk about that second on the drive home.',
  },
  {
    hindi: 'हल्के लौटे',
    headline: 'The walkout.',
    body:
      'Lights up. Sweat on your shirt. Strangers exchanging Instagrams, not goodbyes. You walk out lighter than you came in. That feeling, more than anything else, is what brought you here.',
  },
];

export function InsideTheNight() {
  return (
    <section className="relative isolate overflow-hidden bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <p className="eyebrow">A night, told</p>
          <p className="mt-4 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
            एक शाम का सफ़र
          </p>
          <h2 className="mt-2 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            What a Bhajan Clubbing{' '}
            <span className="italic text-saffron-grad">actually feels like.</span>
          </h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-text-muted sm:text-base">
            We can list the venue, the date, the band — and we have. But the part
            that matters most is the part you cannot put on a poster. Here, in five
            chapters, is what an evening with us actually feels like.
          </p>
        </motion.div>

        {/* Chapters */}
        <div className="mt-14 sm:mt-20">
          {CHAPTERS.map((c, i) => (
            <ChapterRow key={i} chapter={c} index={i} last={i === CHAPTERS.length - 1} />
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
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
      className={`grid grid-cols-1 gap-4 py-10 sm:grid-cols-12 sm:gap-8 sm:py-12 ${
        last ? '' : 'border-b border-maroon-900/10'
      }`}
    >
      {/* Chapter number — big italic serif */}
      <div className="sm:col-span-2">
        <p
          className="font-display text-5xl font-medium italic text-saffron-700 sm:text-6xl lg:text-7xl"
          aria-hidden
        >
          {String(index + 1).padStart(2, '0')}
        </p>
      </div>

      {/* Body */}
      <div className="sm:col-span-10">
        <p className="font-deva text-base font-semibold text-maroon-700 sm:text-lg">
          {chapter.hindi}
        </p>
        <h3 className="mt-1 font-display text-2xl font-medium leading-[1.15] text-text-primary sm:text-3xl lg:text-4xl">
          {chapter.headline}
        </h3>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-text-muted sm:text-base">
          {chapter.body}
        </p>
      </div>
    </motion.article>
  );
}
