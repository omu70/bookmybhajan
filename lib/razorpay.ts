/**
 * RAZORPAY HANDLER
 * Pre-fills name/email/phone from checkout form, theme-matched to brand.
 * UPI is the default method (70%+ of Indian buyers).
 */

import type { BookingDetails, BookingDraft } from '@/types';
import { trackEvent } from './analytics';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface OpenRazorpayArgs {
  draft: BookingDraft;
  details: BookingDetails;
  eventTitle: string;
  bookingId: string; // server-issued order id
  onSuccess: (paymentId: string) => void;
  onFailure: (error: any) => void;
  onDismiss?: () => void;
}

export async function loadRazorpayScript(): Promise<boolean> {
  if (typeof window === 'undefined') return false;
  if (window.Razorpay) return true;
  return new Promise((resolve) => {
    const s = document.createElement('script');
    s.src = 'https://checkout.razorpay.com/v1/checkout.js';
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

export async function openRazorpay({
  draft,
  details,
  eventTitle,
  bookingId,
  onSuccess,
  onFailure,
  onDismiss,
}: OpenRazorpayArgs) {
  const ok = await loadRazorpayScript();
  if (!ok) {
    onFailure(new Error('Razorpay SDK failed to load. Check your connection.'));
    return;
  }

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: draft.total * 100, // paise
    currency: 'INR',
    name: 'Darshan',
    description: `${eventTitle} — ${draft.tier.toUpperCase()} × ${draft.quantity}`,
    order_id: bookingId,
    image: '/icons/logo.svg',
    prefill: {
      name: details.fullName,
      email: details.email,
      contact: details.whatsapp,
    },
    theme: {
      color: '#1a0a2e',
      backdrop_color: 'rgba(10, 4, 20, 0.85)',
    },
    // UPI first — Indian default
    method: { upi: true, card: true, netbanking: true, wallet: true },
    config: {
      display: {
        blocks: {
          upi: {
            name: 'Pay via UPI',
            instruments: [{ method: 'upi' }],
          },
          other: {
            name: 'Other methods',
            instruments: [
              { method: 'card' },
              { method: 'netbanking' },
              { method: 'wallet' },
            ],
          },
        },
        sequence: ['block.upi', 'block.other'],
        preferences: { show_default_blocks: false },
      },
    },
    handler: function (response: { razorpay_payment_id: string }) {
      trackEvent('payment_success', {
        booking_id: bookingId,
        payment_id: response.razorpay_payment_id,
        amount: draft.total,
        tier: draft.tier,
      });
      onSuccess(response.razorpay_payment_id);
    },
    modal: {
      ondismiss: () => {
        trackEvent('payment_dismissed', { booking_id: bookingId });
        onDismiss?.();
      },
      escape: true,
      backdropclose: false, // prevent accidental close mid-payment
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', (resp: any) => {
    trackEvent('payment_failed', {
      booking_id: bookingId,
      reason: resp?.error?.description,
    });
    onFailure(resp);
  });
  rzp.open();
}

// Server-side order creation stub (call from a route handler in production)
export interface CreateOrderInput {
  amount: number; // INR rupees
  receipt: string;
}
export async function createServerOrder(_: CreateOrderInput) {
  // Real impl in /app/api/razorpay/order/route.ts hits Razorpay Orders API
  // Returning shape only here.
  return { id: `order_${Date.now()}`, amount: _.amount * 100, currency: 'INR' };
}
