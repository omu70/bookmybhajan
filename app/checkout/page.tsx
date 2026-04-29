'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EventPoster } from '@/components/sections/EventPoster';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Check,
  Loader2,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { getEventBySlug } from '@/lib/events';
import { calcConvenienceFee, formatEventDate, formatINR, cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { openRazorpay, createServerOrder } from '@/lib/razorpay';
import type { BookingDetails, Tier } from '@/types';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sub: 'PhonePe · GPay · Paytm' },
  { id: 'card', label: 'Card', sub: 'Credit / Debit' },
  { id: 'netbanking', label: 'Net Banking', sub: 'All major banks' },
  { id: 'wallet', label: 'Wallets', sub: 'Paytm · Mobikwik' },
] as const;

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center pt-28">
          <Loader2 className="size-6 animate-spin text-saffron-500" />
        </div>
      }
    >
      <CheckoutInner />
    </Suspense>
  );
}

/**
 * SINGLE-PAGE CHECKOUT
 *
 *   • Tier + qty come via URL params (?event=…&tier=…&qty=…)
 *   • One column: tier summary → 3 fields → payment method → pay
 *   • No multi-step. No seat selection (FCFS within tier).
 *   • Total visible at top. Trust strip directly above pay.
 *   • Field validation is inline; pay button stays disabled until valid.
 */
function CheckoutInner() {
  const router = useRouter();
  const params = useSearchParams();

  const slug = params.get('event') ?? '';
  const initialTier = (params.get('tier') ?? 'gold') as Tier;
  const initialQty = Math.max(1, Math.min(6, parseInt(params.get('qty') ?? '1', 10) || 1));

  const event = getEventBySlug(slug);

  const [tier, setTier] = useState<Tier>(initialTier);
  const [qty, setQty] = useState(initialQty);
  const [details, setDetails] = useState<BookingDetails>({
    fullName: '',
    email: '',
    whatsapp: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingDetails, string>>>({});
  const [paymentMethod, setPaymentMethod] = useState<(typeof PAYMENT_METHODS)[number]['id']>('upi');
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (!event) router.replace('/events');
    else trackEvent('start_checkout', { slug });
  }, [event, router, slug]);

  const activeTier = event?.tiers.find((t) => t.id === tier);

  const totals = useMemo(() => {
    if (!activeTier) return { subtotal: 0, fee: 0, total: 0 };
    const subtotal = activeTier.price * qty;
    const fee = calcConvenienceFee(subtotal);
    return { subtotal, fee, total: subtotal + fee };
  }, [activeTier, qty]);

  if (!event || !activeTier) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center pt-28">
        <Loader2 className="size-6 animate-spin text-saffron-500" />
      </div>
    );
  }

  const validate = () => {
    const e: Partial<Record<keyof BookingDetails, string>> = {};
    if (details.fullName.trim().length < 2) e.fullName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = 'Enter a valid email';
    if (!/^\+?91?[6-9]\d{9}$/.test(details.whatsapp.replace(/\s/g, '')))
      e.whatsapp = 'Enter a valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const isFormValid =
    details.fullName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email) &&
    /^\+?91?[6-9]\d{9}$/.test(details.whatsapp.replace(/\s/g, ''));

  const onPay = async () => {
    if (!validate()) return;
    setSubmitting(true);
    setPaymentError(null);
    trackEvent('open_razorpay', { method: paymentMethod, total: totals.total, slug });
    try {
      const order = await createServerOrder({
        amount: totals.total,
        receipt: `bmb_${Date.now()}`,
      });
      await openRazorpay({
        draft: {
          eventSlug: slug,
          tier,
          quantity: qty,
          subtotal: totals.subtotal,
          convenienceFee: totals.fee,
          total: totals.total,
        },
        details,
        eventTitle: event.title,
        bookingId: order.id,
        onSuccess: (paymentId) => {
          if (typeof window !== 'undefined') {
            sessionStorage.setItem(
              'bmb-receipt',
              JSON.stringify({
                eventSlug: slug,
                tier,
                quantity: qty,
                subtotal: totals.subtotal,
                convenienceFee: totals.fee,
                total: totals.total,
                ...details,
                paymentId,
                bookingId: order.id,
              })
            );
          }
          router.push(`/confirmation?booking_id=${order.id}`);
        },
        onFailure: (err) => {
          setPaymentError(
            err?.error?.description ??
              'Payment did not go through. Your card was not charged. Try a different method.'
          );
          setSubmitting(false);
        },
        onDismiss: () => setSubmitting(false),
      });
    } catch (err: any) {
      setPaymentError(err.message ?? 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href={`/events/${event.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary"
        >
          <ArrowLeft className="size-4" /> Back to event
        </Link>

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          {/* ─── LEFT: form ─────────────────────────────── */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-3"
          >
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Reserve your spot.
            </h1>
            <p className="mt-2 text-sm text-text-muted">
              Three fields. One tap to pay. WhatsApp ticket in 30 seconds.
            </p>

            {/* Tier + qty inline editor */}
            <div className="mt-6 rounded-2xl border border-glass-border bg-cream-50 p-4">
              <div className="flex items-center justify-between">
                <p className="eyebrow">Your selection</p>
                <Link
                  href={`/events/${event.slug}#tickets`}
                  className="text-xs font-semibold text-saffron-700 hover:underline"
                >
                  Change
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <TierChips event={event} active={tier} onChange={(t) => setTier(t)} />
              </div>
              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-xs text-text-muted">Quantity</span>
                <div className="inline-flex items-center gap-3 rounded-full border border-maroon-900/15 bg-cream-50 px-2 py-1.5">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-8 items-center justify-center rounded-full hover:bg-maroon-900/8"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-6 text-center font-bold tabular">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQty((q) => Math.min(6, q + 1))}
                    className="flex size-8 items-center justify-center rounded-full hover:bg-maroon-900/8"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>
              <p className="mt-3 text-[11px] text-text-muted">
                Seating is first-come-first-served inside the {tier.toUpperCase()} area —
                early entry = better view.
              </p>
            </div>

            {/* Details form */}
            <div className="mt-6 space-y-4">
              <h2 className="font-display text-xl font-bold">Your details</h2>

              <Field
                label="Full name"
                error={errors.fullName}
                input={
                  <input
                    type="text"
                    autoComplete="name"
                    inputMode="text"
                    value={details.fullName}
                    onChange={(e) => setDetails((d) => ({ ...d, fullName: e.target.value }))}
                    className="w-full rounded-xl border border-maroon-900/18 bg-cream-50 px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-saffron-500 focus:outline-none"
                    placeholder="Aanya Raghav"
                  />
                }
              />

              <Field
                label="Email"
                hint="Backup ticket + refund updates"
                error={errors.email}
                input={
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={details.email}
                    onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                    className="w-full rounded-xl border border-maroon-900/18 bg-cream-50 px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-saffron-500 focus:outline-none"
                    placeholder="aanya@example.com"
                  />
                }
              />

              <Field
                label="WhatsApp number"
                hint="QR e-ticket lands here in 30s"
                error={errors.whatsapp}
                input={
                  <div className="flex items-center rounded-xl border border-maroon-900/18 bg-cream-50 focus-within:border-saffron-500">
                    <span className="border-r border-maroon-900/15 px-4 py-3 text-sm text-text-muted">+91</span>
                    <input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      value={details.whatsapp}
                      onChange={(e) =>
                        setDetails((d) => ({
                          ...d,
                          whatsapp: e.target.value.replace(/[^\d]/g, '').slice(0, 10),
                        }))
                      }
                      className="w-full bg-transparent px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:outline-none"
                      placeholder="98765 43210"
                    />
                  </div>
                }
              />
            </div>

            {/* Payment method */}
            <div className="mt-8">
              <h2 className="font-display text-xl font-bold">Payment method</h2>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {PAYMENT_METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    className={cn(
                      'rounded-2xl border p-3 text-left transition-all',
                      paymentMethod === m.id
                        ? 'border-saffron-500 bg-saffron-50'
                        : 'border-maroon-900/15 bg-cream-50 hover:border-saffron-500/40'
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <p className="text-sm font-bold text-text-primary">{m.label}</p>
                      {paymentMethod === m.id && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-saffron-500 text-white">
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-[11px] text-text-muted">{m.sub}</p>
                    {m.id === 'upi' && (
                      <span className="mt-1.5 inline-block rounded-full bg-saffron-grad px-2 py-0.5 text-[9px] font-bold text-white">
                        Recommended
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {paymentError && (
              <p className="mt-4 rounded-xl border border-rose-400/40 bg-rose-50 p-3 text-sm text-rose-800">
                {paymentError}
              </p>
            )}

            {/* Trust strip — directly above pay */}
            <div className="mt-6 rounded-2xl border border-glass-border bg-cream-50 p-4">
              <TrustStrip />
              <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                <ShieldCheck className="size-3.5 text-saffron-600" />
                Razorpay · 256-bit SSL · PCI-DSS compliant · 7-day refund window
              </p>
            </div>

            {/* CTA */}
            <div className="mt-5">
              <GoldButton
                size="xl"
                fullWidth
                onClick={onPay}
                disabled={submitting || !isFormValid}
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" /> Opening Razorpay…
                  </span>
                ) : (
                  <>Pay {formatINR(totals.total)} securely</>
                )}
              </GoldButton>
              <p className="mt-3 text-center text-[11px] text-text-muted">
                Tap pay → Razorpay opens → done in 20 seconds.
              </p>
            </div>
          </motion.section>

          {/* ─── RIGHT: order summary (sticky on desktop) ── */}
          <aside className="md:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="md:sticky md:top-28"
            >
              <div className="overflow-hidden rounded-3xl border border-saffron-500/30 bg-cream-50 shadow-card-hover">
                <div className="relative aspect-square w-full">
                  <EventPoster event={event} className="h-full w-full" />
                  <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/55 to-transparent" />
                  <div className="absolute inset-x-3 bottom-3">
                    <p className="text-[10px] uppercase tracking-widest text-saffron-200">
                      You&apos;re booking
                    </p>
                    <p className="font-display text-lg font-bold leading-tight text-cream-50">
                      {event.title}
                    </p>
                    <p className="text-xs text-cream-100/85">
                      {event.venue} · {formatEventDate(event.date)} · {event.startTime}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 p-5 text-sm tabular">
                  <Row label={`${activeTier.name} × ${qty}`} value={formatINR(totals.subtotal)} />
                  <Row
                    label="Convenience fee"
                    value={formatINR(totals.fee)}
                    hint="Razorpay processing"
                  />
                  <div className="flex items-center justify-between border-t border-maroon-900/10 pt-3">
                    <span className="text-base font-semibold text-text-primary">Total</span>
                    <span className="font-display text-3xl font-bold text-saffron-700">
                      {formatINR(totals.total)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-text-muted">
                <Sparkles className="size-3.5 text-saffron-500" />
                {activeTier.seatsRemaining} seats remaining in {activeTier.name}
              </p>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}

// ─── helpers ────────────────────────────────────────────
function Field({
  label,
  hint,
  error,
  input,
}: {
  label: string;
  hint?: string;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      {hint && !error && (
        <span className="ml-1 text-xs text-text-muted">— {hint}</span>
      )}
      <div className="mt-1.5">{input}</div>
      {error && <span className="mt-1 block text-xs text-rose-600">{error}</span>}
    </label>
  );
}

function TierChips({
  event,
  active,
  onChange,
}: {
  event: ReturnType<typeof getEventBySlug>;
  active: Tier;
  onChange: (t: Tier) => void;
}) {
  if (!event) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {event.tiers.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onChange(t.id)}
          className={cn(
            'rounded-full border px-3 py-1.5 text-xs font-bold transition-all',
            active === t.id
              ? 'border-saffron-500 bg-saffron-50 text-saffron-700'
              : 'border-maroon-900/15 bg-cream-50 text-text-muted hover:border-saffron-500/40'
          )}
        >
          {t.name} · {formatINR(t.price)}
        </button>
      ))}
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
        {hint && <span className="ml-1 text-[10px] opacity-70">· {hint}</span>}
      </span>
      <span className="font-semibold text-text-primary">{value}</span>
    </div>
  );
}
