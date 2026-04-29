'use client';

import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

type Variant = 'gold' | 'ghost';
type Size = 'md' | 'lg' | 'xl';

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  pulse?: boolean;          // Pulsing beacon for primary CTAs
  withArrow?: boolean;
  fullWidth?: boolean;
  asChild?: boolean;        // Render as <a> for links
}

const sizeMap: Record<Size, string> = {
  md: 'text-sm px-5 py-3',
  lg: 'text-base px-7 py-4',
  xl: 'text-lg px-8 py-[18px] min-h-[56px]', // mobile-thumb friendly
};

/**
 * The CTA. Gold variant pulses by default (2s, ease-in-out — never seizure-y).
 * Subtle shine sweep adds polish without breaking the budget.
 */
export const GoldButton = forwardRef<HTMLButtonElement, GoldButtonProps>(
  function GoldButton(
    { variant = 'gold', size = 'lg', pulse = true, withArrow = true, fullWidth, className, children, ...rest },
    ref
  ) {
    const base =
      variant === 'gold'
        ? 'btn-gold'
        : 'btn-ghost';
    return (
      <button
        ref={ref}
        className={cn(
          base,
          sizeMap[size],
          fullWidth && 'w-full',
          variant === 'gold' && pulse && 'animate-gold-pulse',
          'group',
          className
        )}
        {...rest}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
          {withArrow && (
            <ArrowRight
              className="size-4 transition-transform duration-200 group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          )}
        </span>
      </button>
    );
  }
);
