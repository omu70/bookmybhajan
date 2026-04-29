'use client';

import { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { SeatingMap } from '@/components/sections/SeatingMap';
import { GoldButton } from '@/components/ui/GoldButton';
import { SeatHoldTimer } from '@/components/ui/SeatHoldTimer';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { getEventBySlug } from '@/lib/events';
import { calcConvenienceFee, formatEventDate, formatINR } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import type { Tier } from '@/types';

export default function SeatSelectionPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const event = getEventBySlug(params.slug);

  const [tier, setTier] = useState<Tier>('gold');
  const [qty, setQty] = useState(1);
  const [seats, setSeats] = useState<string[]>([]);

  // Read draft from prior page
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('darshan-draft');
    if (!raw) return;
    try {
      const draft = JSON.parse(raw);
      if (draft.tier) setTier(draft.tier);
      if (draft.quantity) setQty(draft.quantity);
    } catch {}
    trackEvent('view_seat_map', { slug: params.slug });
  }, [params.slug]);

  if (!event) return null;

  const activeTier = event.tiers.find((t) => t.id === tier)!;
  const subtotal = activeTier.price * Math.max(qty, seats.length || qty);
  const fee = calcConvenienceFee(subtotal);
  const total = subtotal + fee;

  const proceed = () => {
    if (typeof window === 'undefined') return;
    sessionStorage.setItem(
      'darshan-draft',
      JSON.stringify({
        eventSlug: event.slug,
        tier,
        quantity: qty,
        selectedSeatIds: seats,
        subtotal,
        convenienceFee: fee,
        total,
      })
    );
    trackEvent('start_checkout', { slug: event.slug, total, qty, tier });
    router.push('/checkout');
  };

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back + progress */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/events/${event.slug}`}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary"
          >
            <ArrowLeft className="size-4" /> Back to event
          </Link>
          <div className="w-full max-w-md">
            <ProgressBar current="tickets" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT: seat map */}
          <div className="lg:col-span-7">
            <header className="mb-6">
              <p className="eyebrow">Step 1 of 3</p>
              <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                Pick your seats
              </h1>
              <p className="mt-2 max-w-xl text-text-muted">
                Or use auto-assign — we always pick the best available together.
              </p>
            </header>

            <SeatingMap
              tiers={event.tiers}
              initialTier={tier}
              quantity={qty}
              onSeatsChange={(ids) => {
                setSeats(ids);
                if (ids.length) trackEvent('select_seat', { count: ids.length, tier });
              }}
            />
          </div>

          {/* RIGHT: order summary */}
          <aside className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="sticky top-28 rounded-2xl border border-glass-border bg-glass-surface p-6"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-xl font-bold">Order summary</p>
                <SeatHoldTimer seconds={9 * 60} />
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-text-primary">{event.title}</p>
                    <p className="text-xs text-text-muted">
                      <Calendar className="mr-1 inline size-3" />
                      {formatEventDate(event.date)} · {event.startTime}
                    </p>
                    <p className="text-xs text-text-muted">
                      <MapPin className="mr-1 inline size-3" />
                      {event.venue}, {event.city}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl bg-black/30 p-4 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-text-muted">Tier</span>
                    <span className="font-semibold capitalize">{activeTier.name}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-text-muted">Seats</span>
                    <span className="font-semibold">
                      {seats.length > 0 ? seats.join(', ') : `${qty} × auto-assign`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-3 tabular">
                  <Row label="Subtotal" value={formatINR(subtotal)} />
                  <Row
                    label={`Convenience fee (₹${fee})`}
                    value={formatINR(fee)}
                    hint="Razorpay processing — shown upfront"
                  />
                  <div className="flex items-center justify-between border-t border-white/10 pt-3">
                    <span className="text-sm text-text-muted">Total</span>
                    <span className="text-2xl font-bold text-text-primary">
                      {formatINR(total)}
                    </span>
                  </div>
                </div>

                <GoldButton
                  fullWidth
                  size="xl"
                  onClick={proceed}
                  disabled={seats.length === 0 && qty < 1}
                >
                  Proceed to Checkout
                </GoldButton>
                <TrustStrip className="mt-1" />
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-text-muted">
        {label}
        {hint && <span className="ml-1 text-[10px] opacity-70">{hint}</span>}
      </span>
      <span className="font-semibold text-text-primary">{value}</span>
    </div>
  );
}
