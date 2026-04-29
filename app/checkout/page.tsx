'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Loader2, ShieldCheck } from 'lucide-react';
import { GoldButton } from '@/components/ui/GoldButton';
import { ProgressBar, type Step } from '@/components/ui/ProgressBar';
import { SeatHoldTimer } from '@/components/ui/SeatHoldTimer';
import { TrustStrip } from '@/components/ui/TrustStrip';
import { getEventBySlug } from '@/lib/events';
import { formatINR, cn } from '@/lib/utils';
import { trackEvent } from '@/lib/analytics';
import { openRazorpay, createServerOrder } from '@/lib/razorpay';
import type { BookingDetails, BookingDraft } from '@/types';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI', sub: 'PhonePe, GPay, Paytm' },
  { id: 'card', label: 'Card', sub: 'Credit / Debit' },
  { id: 'netbanking', label: 'Net Banking', sub: 'All major banks' },
  { id: 'wallet', label: 'Wallets', sub: 'Paytm, Mobikwik' },
] as const;

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>('details');
  const [draft, setDraft] = useState<BookingDraft | null>(null);
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
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('darshan-draft');
    if (!raw) {
      router.replace('/events');
      return;
    }
    try {
      setDraft(JSON.parse(raw));
    } catch {
      router.replace('/events');
    }
  }, [router]);

  if (!draft) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-gold" />
      </div>
    );
  }

  const event = getEventBySlug(draft.eventSlug);
  if (!event) return null;

  const validate = () => {
    const e: Partial<Record<keyof BookingDetails, string>> = {};
    if (!details.fullName.trim()) e.fullName = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(details.email)) e.email = 'Enter a valid email';
    if (!/^\+?91?[6-9]\d{9}$/.test(details.whatsapp.replace(/\s/g, '')))
      e.whatsapp = 'Enter a valid 10-digit number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onContinue = () => {
    if (!validate()) return;
    trackEvent('submit_details', { slug: draft.eventSlug });
    setStep('pay');
  };

  const onPay = async () => {
    setSubmitting(true);
    setPaymentError(null);
    trackEvent('open_razorpay', { method: paymentMethod, total: draft.total });
    try {
      const order = await createServerOrder({
        amount: draft.total,
        receipt: `dr_${Date.now()}`,
      });
      await openRazorpay({
        draft,
        details,
        eventTitle: event.title,
        bookingId: order.id,
        onSuccess: (paymentId) => {
          sessionStorage.setItem(
            'darshan-receipt',
            JSON.stringify({ ...draft, ...details, paymentId, bookingId: order.id })
          );
          router.push(`/confirmation?booking_id=${order.id}`);
        },
        onFailure: (err) => {
          setPaymentError(
            err?.error?.description ??
              'Your payment may have gone through — check WhatsApp for ticket. If not, try again.'
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
    <div className="pt-24">
      <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link
            href={`/events/${event.slug}/seats`}
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text-primary"
          >
            <ArrowLeft className="size-4" /> Change seats
          </Link>
          <SeatHoldTimer seconds={8 * 60} />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={step} />
        </div>

        {/* Total — always visible */}
        <div className="mb-6 rounded-2xl border border-gold/30 bg-gold/5 p-4 text-center">
          <p className="text-xs uppercase tracking-widest text-gold">Order total</p>
          <p className="mt-1 font-display text-3xl font-bold tabular text-text-primary">
            {formatINR(draft.total)}
          </p>
          <p className="text-xs text-text-muted">
            {draft.quantity} × {draft.tier.toUpperCase()} · incl. fees
          </p>
        </div>

        {/* Step 1 — ticket summary preview */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 rounded-2xl border border-glass-border bg-glass-surface p-5"
        >
          <p className="text-sm font-semibold">{event.title}</p>
          <p className="mt-1 text-xs text-text-muted">
            {event.venue}, {event.city}
          </p>
          <p className="mt-1 text-xs text-text-muted">
            {draft.selectedSeatIds && draft.selectedSeatIds.length > 0
              ? `Seats: ${draft.selectedSeatIds.join(', ')}`
              : `${draft.quantity} × auto-assigned best seats`}
          </p>
        </motion.section>

        {step === 'details' && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            aria-labelledby="details-heading"
          >
            <h2 id="details-heading" className="font-display text-2xl font-bold">
              Your details
            </h2>
            <p className="text-sm text-text-muted">
              Your e-ticket lands on WhatsApp + email within 30 seconds of payment.
            </p>

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
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-gold/60 focus:outline-none"
                  placeholder="Rahul Sharma"
                />
              }
            />

            <Field
              label="Email"
              error={errors.email}
              hint="For your e-ticket and refund updates"
              input={
                <input
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  value={details.email}
                  onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                  className="w-full rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:border-gold/60 focus:outline-none"
                  placeholder="rahul@example.com"
                />
              }
            />

            <Field
              label="WhatsApp number"
              error={errors.whatsapp}
              hint="Your e-ticket will be sent here instantly"
              input={
                <div className="flex items-center rounded-xl border border-white/15 bg-black/30 focus-within:border-gold/60">
                  <span className="border-r border-white/10 px-4 py-3 text-sm text-text-muted">+91</span>
                  <input
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={details.whatsapp}
                    onChange={(e) =>
                      setDetails((d) => ({ ...d, whatsapp: e.target.value.replace(/[^\d]/g, '').slice(0, 10) }))
                    }
                    className="w-full bg-transparent px-4 py-3 text-base text-text-primary placeholder:text-text-subtle focus:outline-none"
                    placeholder="98765 43210"
                  />
                </div>
              }
            />

            <GoldButton size="xl" fullWidth onClick={onContinue}>
              Continue to payment
            </GoldButton>
          </motion.section>
        )}

        {step === 'pay' && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            aria-labelledby="pay-heading"
          >
            <h2 id="pay-heading" className="font-display text-2xl font-bold">
              Payment method
            </h2>

            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-left transition-all',
                    paymentMethod === m.id
                      ? 'border-gold bg-gold/10'
                      : 'border-white/15 bg-glass-surface hover:border-white/30'
                  )}
                >
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-text-primary">{m.label}</p>
                    {paymentMethod === m.id && (
                      <span className="flex size-5 items-center justify-center rounded-full bg-gold text-ink-900">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-text-muted">{m.sub}</p>
                  {m.id === 'upi' && (
                    <span className="mt-2 inline-block rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold">
                      Recommended
                    </span>
                  )}
                </button>
              ))}
            </div>

            {paymentError && (
              <p className="rounded-xl border border-rose-500/40 bg-rose-500/10 p-3 text-sm text-rose-200">
                {paymentError}
              </p>
            )}

            {/* Trust signals — DIRECTLY above pay */}
            <div className="rounded-2xl border border-glass-border bg-glass-surface p-4">
              <TrustStrip />
              <p className="mt-3 inline-flex items-center gap-1.5 text-[11px] text-text-muted">
                <ShieldCheck className="size-3.5 text-gold" />
                Razorpay · 256-bit SSL · PCI-DSS compliant · 7-day refund window
              </p>
            </div>

            <GoldButton size="xl" fullWidth onClick={onPay} disabled={submitting}>
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="size-4 animate-spin" /> Opening Razorpay…
                </span>
              ) : (
                <>Pay {formatINR(draft.total)} Securely</>
              )}
            </GoldButton>

            <p className="text-center text-[11px] text-text-muted">
              By continuing you agree to our refund and privacy policies.
            </p>
          </motion.section>
        )}
      </div>
    </div>
  );
}

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
      {error && <span className="mt-1 block text-xs text-rose-300">{error}</span>}
    </label>
  );
}
