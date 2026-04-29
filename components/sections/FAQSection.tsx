'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQ = [
  {
    q: 'Do I get to pick my seat?',
    a: 'Inside your tier, no — seating is first-come-first-served. So Diamond, Gold and Silver are zones, and the earlier you walk in, the better your view inside that zone. Doors open 60 minutes before showtime for a reason.',
  },
  {
    q: 'What if I can\'t attend?',
    a: 'Cancel up to 7 days before the event for a full refund — no questions asked. Within 7 days, you can transfer your ticket to a friend or family member by replying to your WhatsApp confirmation.',
  },
  {
    q: 'Will I get a confirmation?',
    a: 'Yes — instantly. Your QR e-ticket lands on WhatsApp within 30 seconds of payment, and is emailed to you as well. Show either at the gate.',
  },
  {
    q: 'Is the music traditional or fusion?',
    a: 'Both. The Fusion Albela Band keeps the bhajans you grew up with — Govinda Bolo, Achyutam Keshavam, Hare Krishna — and re-arranges them for a modern stage: tabla, dhol, electric sarangi, synth, full chorus. Your dadi will sing along. Your hostel mates will dance.',
  },
  {
    q: 'Can I buy tickets at the gate?',
    a: 'No. Every Bhajan Clubbing night so far has been sold out at the door. We do not release on-the-day tickets — book online to guarantee your spot.',
  },
];

/**
 * Conversion FAQ — only the questions that actually prevent checkout.
 * Generic FAQs (timings, dress code, etc.) belong in the support center, not here.
 */
export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <p className="eyebrow">Before you book</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          Quick answers to common questions
        </h2>
      </div>
      <div className="divide-y divide-white/5 rounded-2xl border border-glass-border bg-glass-surface">
        {FAQ.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-semibold text-text-primary">{item.q}</span>
                <ChevronDown
                  className={cn(
                    'size-5 shrink-0 text-text-muted transition-transform duration-200',
                    isOpen && 'rotate-180 text-gold'
                  )}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-text-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
