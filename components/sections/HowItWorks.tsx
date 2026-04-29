'use client';

import { motion } from 'framer-motion';
import { Sparkles, Smartphone, Ticket } from 'lucide-react';

const STEPS = [
  {
    n: '01',
    Icon: Sparkles,
    title: 'Pick your city',
    body: 'Mumbai. Pune. Ahmedabad. Surat. Delhi. Bangalore. The Albela Band rolls into one of these every Saturday — pick your night.',
  },
  {
    n: '02',
    Icon: Smartphone,
    title: 'Book in 60 seconds',
    body: 'Pick Diamond, Gold or Silver area. Three fields. UPI default. No accounts, no OTP loops. Done before your chai cools.',
  },
  {
    n: '03',
    Icon: Ticket,
    title: 'Walk in, vibe out',
    body: 'QR e-ticket on WhatsApp in 30 seconds. Show at the gate. First-come-first-served inside your tier — early entry, better view.',
  },
];

/**
 * HowItWorks — friction-removal section.
 * Three steps, cards stagger in on scroll, soft saffron rule connecting them on desktop.
 */
export function HowItWorks() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-14 max-w-2xl">
        <p className="eyebrow">How it works</p>
        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Three steps. <span className="text-saffron-grad">Sixty seconds.</span>
        </h2>
        <p className="mt-3 text-text-muted">
          No accounts. No OTP-on-OTP. No fine print. UPI default. WhatsApp ticket in thirty seconds.
          Then it&apos;s just you, the band, and three thousand new friends.
        </p>
      </div>

      <div className="relative grid gap-6 md:grid-cols-3">
        {/* Connecting line — desktop only */}
        <div
          className="pointer-events-none absolute inset-x-0 top-[88px] hidden md:block"
          aria-hidden
        >
          <div className="ornament-divider mx-auto w-[80%]" />
        </div>

        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative rounded-2xl border border-glass-border bg-cream-50/80 p-7 backdrop-blur-glassLo"
          >
            <div className="relative z-10 flex items-center justify-between">
              <span className="font-display text-5xl font-bold text-saffron-500/30">
                {s.n}
              </span>
              <span className="flex size-12 items-center justify-center rounded-full bg-gold-grad text-text-primary">
                <s.Icon className="size-5" strokeWidth={2.2} />
              </span>
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold text-text-primary">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{s.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
