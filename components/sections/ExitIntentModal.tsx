'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { trackEvent } from '@/lib/analytics';

const STORAGE_KEY = 'bmb-exit-intent-shown';

/**
 * ExitIntentModal — desktop only. Triggers when:
 *   1. mouse leaves through top 10% of viewport
 *   2. user has been on page > 30s
 *   3. has not been shown this session
 *
 * One CTA. Soft. Not aggressive.
 */
export function ExitIntentModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return; // touch — skip
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const startedAt = Date.now();
    const onLeave = (e: MouseEvent) => {
      if (Date.now() - startedAt < 30_000) return;
      if (e.clientY > 0) return;
      if (sessionStorage.getItem(STORAGE_KEY)) return;
      sessionStorage.setItem(STORAGE_KEY, '1');
      setOpen(true);
      trackEvent('exit_intent_shown', {});
    };
    document.addEventListener('mouseleave', onLeave);
    return () => document.removeEventListener('mouseleave', onLeave);
  }, []);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-maroon-900/55 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-intent-title"
        >
          <motion.div
            initial={{ scale: 0.92, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl border border-glass-borderGlow bg-cream-50 p-8 text-center shadow-card-hover"
          >
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full text-text-muted hover:bg-maroon-900/8 hover:text-text-primary"
            >
              <X className="size-4" />
            </button>

            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold-grad text-ink-900">
              <Gift className="size-7" strokeWidth={2} />
            </span>

            <h3
              id="exit-intent-title"
              className="mt-5 font-display text-3xl font-bold leading-tight"
            >
              Hold on — one tap saves ₹100.
            </h3>
            <p className="mt-2 text-text-muted">
              First Bhajan Clubbing? Use{' '}
              <span className="font-mono font-bold text-text-primary">ALBELA100</span>{' '}
              at checkout for <span className="font-bold text-saffron-700">₹100 off</span> any tier.
            </p>

            <div className="mt-6">
              <GoldButton
                fullWidth
                onClick={() => {
                  trackEvent('exit_intent_redeemed', {});
                  setOpen(false);
                  document.querySelector('#tickets')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Apply ALBELA100 — save ₹100
              </GoldButton>
            </div>

            <p className="mt-4 text-[11px] text-text-muted">
              One-time use · valid for 24 hours · across all events
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
