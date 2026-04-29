/**
 * Analytics — single facade over GTM + PostHog.
 * Loaded after TTI, never blocks the critical path.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    posthog?: any;
  }
}

export type AnalyticsEvent =
  | 'view_event_list'
  | 'view_event_detail'
  | 'select_tier'
  | 'change_quantity'
  | 'click_book_now'
  | 'view_seat_map'
  | 'select_seat'
  | 'start_checkout'
  | 'submit_details'
  | 'open_razorpay'
  | 'payment_success'
  | 'payment_failed'
  | 'payment_dismissed'
  | 'view_confirmation'
  | 'exit_intent_shown'
  | 'exit_intent_redeemed'
  | 'whatsapp_optin'
  | 'share_event';

export function trackEvent(event: AnalyticsEvent, props: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  // GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...props, ts: Date.now() });

  // PostHog
  if (window.posthog?.capture) {
    window.posthog.capture(event, props);
  }
}

export function identifyUser(id: string, traits: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;
  window.posthog?.identify?.(id, traits);
}
