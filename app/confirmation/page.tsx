'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  CheckCircle2,
  Download,
  Gift,
  Loader2,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { getEventBySlug } from '@/lib/events';
import { formatLongDate, formatINR } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { BookingDraft, BookingDetails } from '@/types';

interface Receipt extends BookingDraft, BookingDetails {
  paymentId: string;
  bookingId: string;
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<ConfirmationFallback />}>
      <ConfirmationInner />
    </Suspense>
  );
}

function ConfirmationFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <Loader2 className="size-6 animate-spin text-gold" />
    </div>
  );
}

function ConfirmationInner() {
  const params = useSearchParams();
  const bookingId = params.get('booking_id');
  const [receipt, setReceipt] = useState<Receipt | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('darshan-receipt');
    if (!raw) return;
    try {
      setReceipt(JSON.parse(raw));
      trackEvent('view_confirmation', { booking_id: bookingId });
    } catch {}
  }, [bookingId]);

  const event = receipt ? getEventBySlug(receipt.eventSlug) : null;

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        {/* Animated success */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 220, damping: 22, duration: 0.6 }}
          className="text-center"
        >
          <span className="relative inline-flex">
            <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
            <span className="relative inline-flex size-20 items-center justify-center rounded-full bg-gold-grad text-ink-900 shadow-gold-glow-lg">
              <CheckCircle2 className="size-10" strokeWidth={2} />
            </span>
          </span>
          <p className="mt-4 font-deva text-lg text-saffron-200">
            🙏 जय श्री {event?.deity ?? 'राम'}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl">
            You&apos;re in!
          </h1>
          <p className="mt-2 text-text-muted">
            Your seat is confirmed.{' '}
            {receipt ? (
              <>WhatsApp ticket sent to <span className="font-semibold text-text-primary">+91 {receipt.whatsapp}</span></>
            ) : (
              'WhatsApp ticket sent.'
            )}
          </p>
        </motion.div>

        {/* Ticket card */}
        <motion.div
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="mt-10 overflow-hidden rounded-3xl border border-glass-borderGlow bg-ink-800/85 backdrop-blur-glass"
        >
          {/* Top — event */}
          <div className="border-b border-white/5 p-6">
            <p className="eyebrow">E-Ticket</p>
            {event && (
              <>
                <p className="mt-1 font-display text-2xl font-bold leading-tight">
                  {event.title}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                  <Info Icon={Calendar} label={formatLongDate(event.date)} />
                  <Info Icon={MapPin} label={`${event.venue}, ${event.city}`} />
                </div>
              </>
            )}
          </div>

          {/* Notch */}
          <div className="relative h-6">
            <div className="absolute inset-y-0 left-0 size-6 -translate-x-1/2 rounded-full bg-ink-900" />
            <div className="absolute inset-y-0 right-0 size-6 translate-x-1/2 rounded-full bg-ink-900" />
            <div className="absolute inset-x-6 top-1/2 border-t border-dashed border-white/15" />
          </div>

          {/* Bottom — QR + meta */}
          <div className="grid grid-cols-3 gap-4 p-6">
            <div className="col-span-1">
              <FakeQR />
            </div>
            <div className="col-span-2 space-y-2 text-xs">
              {receipt ? (
                <>
                  <KV label="Booking ID" value={receipt.bookingId} mono />
                  <KV label="Tier" value={receipt.tier.toUpperCase()} />
                  <KV
                    label="Seats"
                    value={
                      receipt.selectedSeatIds && receipt.selectedSeatIds.length
                        ? receipt.selectedSeatIds.join(', ')
                        : `${receipt.quantity} × auto-assigned`
                    }
                  />
                  <KV label="Total paid" value={formatINR(receipt.total)} bold />
                </>
              ) : (
                <p className="text-text-muted">Loading…</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 border-t border-white/5 bg-black/20 p-4">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 py-2.5 text-sm font-semibold hover:bg-white/10"
            >
              <Download className="size-4" /> Download
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500/90 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400"
            >
              <MessageCircle className="size-4" /> Share on WhatsApp
            </button>
          </div>
        </motion.div>

        {/* Next actions — referral hook */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-glass-border bg-glass-surface p-5">
            <Calendar className="size-5 text-gold" />
            <p className="mt-3 font-semibold">Add to Google Calendar</p>
            <p className="mt-1 text-xs text-text-muted">Never miss the doors. Auto-reminders set.</p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
            >
              Add reminder →
            </button>
          </div>
          <div className="rounded-2xl border border-gold/30 bg-gold/5 p-5">
            <Gift className="size-5 text-gold" />
            <p className="mt-3 font-semibold">Invite a friend, save ₹100</p>
            <p className="mt-1 text-xs text-text-muted">
              They get ₹100 off their first ticket. You get ₹100 credit on your next event.
            </p>
            <button
              type="button"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline"
            >
              Copy referral link →
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/events">
            <GoldButton variant="ghost" pulse={false} withArrow>
              <Sparkles className="size-4" /> Explore more events
            </GoldButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Info({ Icon, label }: { Icon: any; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-text-muted">
      <Icon className="size-3.5 text-gold" />
      {label}
    </span>
  );
}

function KV({
  label,
  value,
  mono,
  bold,
}: {
  label: string;
  value: string;
  mono?: boolean;
  bold?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-text-muted">{label}</span>
      <span
        className={`${mono ? 'font-mono' : ''} ${bold ? 'text-base font-bold text-gold' : 'font-semibold text-text-primary'}`}
      >
        {value}
      </span>
    </div>
  );
}

/** Fake-but-credible-looking QR. Real implementation: use a `qrcode` lib or server-render. */
function FakeQR() {
  const cells = Array.from({ length: 81 }).map(() => Math.random() > 0.5);
  return (
    <div className="aspect-square w-full rounded-xl bg-white p-2">
      <div className="grid h-full w-full grid-cols-9 gap-px">
        {cells.map((on, i) => (
          <div key={i} className={on ? 'bg-ink-900' : 'bg-white'} />
        ))}
      </div>
    </div>
  );
}
