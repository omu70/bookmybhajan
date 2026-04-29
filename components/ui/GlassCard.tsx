'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Tone = 'default' | 'gold' | 'hi';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: Tone;
  /** Adds a CSS-only 3D tilt on desktop hover. Disabled on touch. */
  tilt?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

const toneClass: Record<Tone, string> = {
  default: 'glass',
  hi: 'glass-hi',
  gold: 'glass-gold',
};

/**
 * GlassCard — the only blurred surface primitive in the system.
 * Rule: never nest one inside another. Max 4 instances per page.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  function GlassCard({ tone = 'default', tilt, className, children, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl p-5',
          toneClass[tone],
          tilt && 'tilt-card',
          className
        )}
        {...rest}
      >
        {children}
      </div>
    );
  }
);
