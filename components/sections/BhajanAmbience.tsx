'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * BhajanAmbience —  the visual atmosphere of a real bhajan clubbing night.
 *
 *   • Hanging diya garland (torana) at the top of the section, with each
 *     flame flickering on its own rhythm.
 *   • Marigold petals falling slowly across the section, varied size +
 *     drift + speed so it feels organic, not procedural.
 *
 * Rendered as a `pointer-events-none` overlay inside any section.
 * GPU-only animations (transform / opacity). Honours `prefers-reduced-motion`
 * via the global CSS rule that neutralises animations.
 */

interface BhajanAmbienceProps {
  /** How many petals to render. Default 14 — light enough for mobile. */
  petalCount?: number;
  /** Render the diya garland at the top */
  garland?: boolean;
  className?: string;
}

export function BhajanAmbience({
  petalCount = 14,
  garland = true,
  className,
}: BhajanAmbienceProps) {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className
      )}
      aria-hidden
    >
      {garland && <DiyaGarland />}
      {Array.from({ length: petalCount }).map((_, i) => (
        <FallingPetal key={i} index={i} />
      ))}
    </div>
  );
}

// ─── Hanging diya garland (torana) ──────────────────────────────
function DiyaGarland() {
  // 11 diyas across the top, swaying slightly
  const count = 11;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
      className="absolute inset-x-0 top-0 z-[1] h-20 sm:h-24"
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="h-full w-full"
        aria-hidden
      >
        {/* Torana string — gentle scoop */}
        <path
          d="M 0 24 Q 300 56, 600 24 T 1200 24"
          stroke="#c9921a"
          strokeWidth="1.4"
          fill="none"
          opacity="0.55"
        />
        {/* Marigold cluster every other position on the rope */}
        {Array.from({ length: count }).map((_, i) => {
          const x = 60 + (1080 / (count - 1)) * i;
          // Sag varies along the rope (sine of position)
          const sag = 24 + Math.sin((i / (count - 1)) * Math.PI) * 26;
          // Flame flicker speed varies per diya
          const flickerDur = 1.2 + ((i * 7) % 9) * 0.18;
          // Hanging cord
          const cordLen = 22 + ((i * 13) % 4) * 4;

          return (
            <g key={i} transform={`translate(${x}, ${sag})`}>
              {/* Hanging cord */}
              <line x1="0" y1="0" x2="0" y2={cordLen} stroke="#c9921a" strokeWidth="0.7" opacity="0.55" />

              {/* Diya bowl */}
              <ellipse cx="0" cy={cordLen + 6} rx="9" ry="4" fill="#a87810" />
              <ellipse cx="0" cy={cordLen + 5} rx="8" ry="3" fill="#7d590a" />

              {/* Flame */}
              <motion.path
                d={`M -3 ${cordLen + 4} Q 0 ${cordLen - 8}, 3 ${cordLen + 4} Q 0 ${cordLen}, -3 ${cordLen + 4} Z`}
                fill="#ff8125"
                animate={{
                  scaleY:  [1, 1.18, 0.92, 1.1, 1],
                  scaleX:  [1, 0.92, 1.06, 0.96, 1],
                  opacity: [0.92, 1, 0.85, 1, 0.92],
                }}
                transition={{
                  duration: flickerDur,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{ transformOrigin: `0 ${cordLen + 4}px` }}
              />
              {/* Flame core */}
              <motion.circle
                cx="0"
                cy={cordLen - 1}
                r="1.6"
                fill="#fff5e3"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: flickerDur, repeat: Infinity, ease: 'easeInOut' }}
              />
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}

// ─── Falling marigold petal ────────────────────────────────────
function FallingPetal({ index }: { index: number }) {
  // Spread across viewport width with deterministic pseudo-random offsets
  const left = (index * 11.7 + 3) % 100;
  const delayBase = (index * 0.83) % 9;
  const duration = 16 + (index % 5) * 3;
  const drift = ((index % 5) - 2) * 70; // -140..+140 px sway
  const size = 14 + (index % 4) * 4;
  const startRotate = (index * 47) % 360;
  const endRotate = startRotate + 360 + (index % 3) * 180;

  // Two species — marigold (orange) and rose (maroon)
  const isRose = index % 3 === 0;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${left}%`,
        top: -32,
        width: size,
        height: size,
      }}
      initial={{ opacity: 0, y: -40, rotate: startRotate }}
      animate={{
        y: ['0vh', '110vh'],
        x: [0, drift, drift * 0.6, drift, 0],
        rotate: [startRotate, endRotate],
        opacity: [0, 1, 1, 1, 0],
      }}
      transition={{
        duration,
        delay: delayBase,
        repeat: Infinity,
        ease: 'linear',
        // Per-axis easing
        x: { duration, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration, repeat: Infinity, ease: 'linear' },
      }}
    >
      {isRose ? <RosePetal /> : <Marigold />}
    </motion.div>
  );
}

function Marigold() {
  // Eight-petal marigold-style flower
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <g>
        {/* Outer petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="12"
            cy="12"
            rx="3"
            ry="6.5"
            fill="#ff7a1a"
            transform={`rotate(${angle} 12 12)`}
            opacity="0.92"
          />
        ))}
        {/* Inner petals */}
        {[22, 67, 112, 157, 202, 247, 292, 337].map((angle) => (
          <ellipse
            key={angle}
            cx="12"
            cy="12"
            rx="2.2"
            ry="4.5"
            fill="#ffae57"
            transform={`rotate(${angle} 12 12)`}
            opacity="0.95"
          />
        ))}
        {/* Center */}
        <circle cx="12" cy="12" r="2.2" fill="#c9921a" />
        <circle cx="12" cy="12" r="0.8" fill="#7d590a" />
      </g>
    </svg>
  );
}

function RosePetal() {
  // Single curved rose petal — maroon
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M 12 2 Q 22 8, 18 18 Q 12 22, 6 18 Q 2 8, 12 2 Z"
        fill="#9b3a52"
        opacity="0.85"
      />
      <path
        d="M 12 5 Q 18 9, 16 16 Q 12 19, 8 16 Q 6 9, 12 5 Z"
        fill="#7a2a3f"
        opacity="0.6"
      />
    </svg>
  );
}
