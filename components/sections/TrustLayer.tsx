'use client';

import { motion } from 'framer-motion';
import { Lock, MessageCircle, RotateCcw, ShieldCheck, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    Icon: Lock,
    title: '100% Secure Checkout',
    body: 'Razorpay-powered, PCI-DSS compliant. Your payment info never touches our servers.',
  },
  {
    Icon: MessageCircle,
    title: 'Instant WhatsApp E-Ticket',
    body: 'Your QR ticket lands on WhatsApp within 30 seconds. Show it at the gate. Done.',
  },
  {
    Icon: RotateCcw,
    title: 'Easy Cancellation',
    body: 'Cancel up to 7 days before the event for a full refund. No hidden fees, no calls.',
  },
];

export function TrustLayer() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Why 4,200+ devotees trust us</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Booked in seconds.{' '}
            <span className="text-saffron-grad">Worry-free attendance.</span>
          </h2>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold">
          <ShieldCheck className="size-4" />
          Verified by Razorpay
        </span>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {FEATURES.map(({ Icon, title, body }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border border-glass-border bg-glass-surface p-6"
          >
            <div className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
              <Icon className="size-5" strokeWidth={2.4} />
            </div>
            <p className="mt-4 text-base font-semibold text-text-primary">{title}</p>
            <p className="mt-1 text-sm text-text-muted">{body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 rounded-2xl border border-glass-border bg-glass-surface p-5 text-xs text-text-muted">
        <Sparkles className="size-4 text-gold" />
        <span>Trusted by Amar Ujala · Navbharat Times · The Hindu</span>
        <span className="hidden sm:inline">·</span>
        <span>Razorpay · ₹0 hidden fees · 7-day refund window</span>
      </div>
    </section>
  );
}
