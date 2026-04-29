'use client';

import { cn } from '@/lib/utils';

interface MandalaDividerProps {
  className?: string;
}

/**
 * MandalaDivider — small concentric sacred-geometry rule used between sections.
 * Pure SVG, no animation. Sets devotional rhythm without adding text.
 */
export function MandalaDivider({ className }: MandalaDividerProps) {
  return (
    <div
      className={cn('flex items-center justify-center py-6 sm:py-10', className)}
      aria-hidden
    >
      {/* Left rule */}
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-saffron-500/45 sm:w-32" />

      {/* Mandala mark */}
      <svg width="44" height="44" viewBox="0 0 44 44" className="mx-3 shrink-0">
        <g
          transform="translate(22 22)"
          stroke="#c9921a"
          strokeWidth="1"
          fill="none"
          opacity="0.85"
        >
          {/* Outer ring */}
          <circle r="18" />
          {/* Inner ring */}
          <circle r="11" strokeDasharray="2 3" />
          {/* 8-petal flower */}
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx="3"
              ry="9"
              transform={`rotate(${i * 45})`}
              fill="rgba(255,122,26,0.18)"
              stroke="rgba(201,146,26,0.7)"
            />
          ))}
          {/* Centre dot */}
          <circle r="2.2" fill="#ff7a1a" stroke="none" />
        </g>
      </svg>

      {/* Right rule */}
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-saffron-500/45 sm:w-32" />
    </div>
  );
}
