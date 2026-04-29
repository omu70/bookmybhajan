'use client';

import { useEffect, useRef, useState, MouseEvent, TouchEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LightADiya — interactive devotional moment.
 *
 *   Tap anywhere on the dark "night sky" strip to light a diya at the
 *   tapped spot. Each diya is a small SVG flame that flickers. Diyas
 *   persist in localStorage so the user sees their own across visits.
 *
 *   Caps at 80 diyas (FIFO) to keep the DOM light. The counter at the
 *   bottom shows the total lit "tonight".
 *
 *   No copy beyond a one-line prompt. The interaction is the point.
 */
const STORAGE_KEY = 'bmb-diyas-v1';
const MAX_DIYAS = 80;

interface Diya {
  id: number;
  // 0..1 normalised position inside the canvas
  x: number;
  y: number;
}

export function LightADiya() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [diyas, setDiyas] = useState<Diya[]>([]);
  const [hint, setHint] = useState(true);

  // Hydrate from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDiyas(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(diyas));
    } catch {
      /* ignore */
    }
  }, [diyas]);

  const place = (clientX: number, clientY: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    if (x < 0 || x > 1 || y < 0 || y > 1) return;
    setDiyas((cur) => {
      const next = [...cur, { id: Date.now() + Math.random(), x, y }];
      return next.length > MAX_DIYAS ? next.slice(next.length - MAX_DIYAS) : next;
    });
    setHint(false);
  };

  const onClick = (e: MouseEvent<HTMLDivElement>) => place(e.clientX, e.clientY);
  const onTouch = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.touches[0] ?? e.changedTouches[0];
    if (t) place(t.clientX, t.clientY);
  };

  return (
    <section className="relative isolate overflow-hidden bg-cream-50 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Light one</p>
          <p className="mt-3 font-deva text-xl font-semibold text-maroon-700 sm:text-2xl">
            एक दीया जला
          </p>
          <h2 className="mt-1 font-display text-3xl font-medium leading-[1.05] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
            Tap the sky.{' '}
            <span className="italic text-saffron-grad">Light a diya.</span>
          </h2>
        </div>

        {/* The interactive night-sky surface */}
        <div
          ref={ref}
          role="button"
          aria-label="Tap to light a diya"
          tabIndex={0}
          onClick={onClick}
          onTouchEnd={onTouch}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              const r = ref.current?.getBoundingClientRect();
              if (r) place(r.left + r.width / 2, r.top + r.height / 2);
            }
          }}
          className="relative mt-8 aspect-[16/9] w-full cursor-pointer select-none overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-900 via-maroon-800 to-ink-900 sm:mt-10 sm:aspect-[21/9]"
        >
          {/* Star dust */}
          <Stars />

          {/* Soft glow vignette */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,170,80,0.10),transparent_70%)]"
          />

          {/* Hint */}
          <AnimatePresence>
            {hint && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <span className="rounded-full bg-cream-50/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-cream-50/80 backdrop-blur-glassLo">
                  ✨ tap anywhere
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lit diyas */}
          <AnimatePresence>
            {diyas.map((d) => (
              <DiyaPin key={d.id} x={d.x} y={d.y} />
            ))}
          </AnimatePresence>

          {/* Counter pinned bottom-right */}
          <div className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-cream-50/12 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-cream-50/85 backdrop-blur-glassLo sm:bottom-4 sm:right-4 sm:text-xs">
            {diyas.length} {diyas.length === 1 ? 'diya' : 'diyas'} glowing
          </div>
        </div>

        <p className="mt-3 text-center text-[11px] text-text-muted sm:text-xs">
          Yours stays lit on every visit · clear browser data to reset
        </p>
      </div>
    </section>
  );
}

// ─── Diya pin (positioned + flickering) ──────────────────
function DiyaPin({ x, y }: { x: number; y: number }) {
  // Flicker speed varies per diya
  const dur = 1.2 + (Math.abs(x - y) * 1.4);
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
      className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2"
    >
      <svg width="36" height="44" viewBox="0 0 36 44">
        {/* Glow halo */}
        <motion.circle
          cx="18"
          cy="14"
          r="14"
          fill="rgba(255,170,80,0.45)"
          animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.9, 1.15, 0.9] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '18px 14px' }}
        />
        {/* Bowl */}
        <ellipse cx="18" cy="32" rx="13" ry="5" fill="#a87810" />
        <ellipse cx="18" cy="30" rx="11" ry="3.5" fill="#7d590a" />
        {/* Wick */}
        <rect x="17.4" y="20" width="1.2" height="6" fill="#3d1426" />
        {/* Flame */}
        <motion.path
          d="M 14 20 Q 18 6, 22 20 Q 18 18, 14 20 Z"
          fill="#ff8125"
          animate={{
            scaleY: [1, 1.18, 0.92, 1.1, 1],
            scaleX: [1, 0.92, 1.06, 0.96, 1],
            opacity: [0.92, 1, 0.85, 1, 0.92],
          }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '18px 20px' }}
        />
        {/* Flame core */}
        <motion.circle
          cx="18"
          cy="14"
          r="2"
          fill="#fff5e3"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    </motion.div>
  );
}

// ─── Tiny star dust ──────────────────────────────────────
function Stars() {
  // Deterministic positions so SSR + CSR match
  const stars = Array.from({ length: 28 }).map((_, i) => ({
    x: (i * 13.31 + 7) % 100,
    y: (i * 17.07 + 4) % 100,
    size: 1 + (i % 3) * 0.6,
    op: 0.3 + ((i * 11) % 7) / 16,
    dur: 2 + ((i * 5) % 7) * 0.4,
  }));
  return (
    <div className="pointer-events-none absolute inset-0">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-cream-50"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.op,
          }}
          animate={{ opacity: [s.op * 0.4, s.op, s.op * 0.4] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}
