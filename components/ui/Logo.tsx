'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  /** Render only the brand mark (saffron tile + dholak), no wordmark */
  iconOnly?: boolean;
}

const SIZES = {
  sm: { tile: 'size-7 rounded-md',  drum: 'size-4', text: 'text-base'  },
  md: { tile: 'size-9 rounded-lg',  drum: 'size-5', text: 'text-lg'    },
  lg: { tile: 'size-12 rounded-xl', drum: 'size-7', text: 'text-2xl'   },
};

/**
 * BookMyBhajan logo —
 *   ▣ Saffron rounded tile
 *   ▣ Dark dholak icon centred inside
 *   ▣ Wordmark: "bookmy" in ink + "bhajan" in saffron
 *
 * To swap in the real PNG/SVG asset:
 *   1. Drop the file at /public/logo.png  (or /public/logo.svg)
 *   2. Replace the body of this component with:
 *        <Image src="/logo.png" alt="bookmybhajan" width={500} height={100} priority />
 */
export function Logo({ size = 'md', className, iconOnly }: LogoProps) {
  const s = SIZES[size];
  return (
    <span className={cn('inline-flex items-center gap-2.5 leading-none', className)}>
      <span
        className={cn(
          'grid place-items-center bg-saffron-grad',
          s.tile
        )}
        aria-hidden
      >
        <DholakIcon className={cn('text-text-primary', s.drum)} />
      </span>
      {!iconOnly && (
        <span className={cn('font-extrabold tracking-tight', s.text)}>
          <span className="text-text-primary">bookmy</span>
          <span className="text-saffron-600">bhajan</span>
        </span>
      )}
    </span>
  );
}

/** Stylised dholak — horizontal pinched barrel with end-caps and strings. */
function DholakIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {/* Body — pinched barrel */}
      <path
        d="M5 8.5 Q3.4 12, 5 15.5 L19 15.5 Q20.6 12, 19 8.5 Z"
        fill="currentColor"
      />
      {/* Left + right end caps (drum heads) */}
      <ellipse cx="5" cy="12" rx="1.1" ry="3.5" fill="currentColor" opacity="0.65" />
      <ellipse cx="19" cy="12" rx="1.1" ry="3.5" fill="currentColor" opacity="0.65" />
      {/* Cords */}
      <g stroke="#fff5e3" strokeWidth="0.5" opacity="0.6" strokeLinecap="round">
        <line x1="6"  y1="9.6"  x2="18" y2="9.6"  />
        <line x1="6"  y1="14.4" x2="18" y2="14.4" />
      </g>
      {/* Mallet handle suggestion */}
      <line
        x1="19" y1="8.7" x2="22" y2="6"
        stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"
      />
    </svg>
  );
}
