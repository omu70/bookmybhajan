# Darshan — bookmybhajan

Premium devotional ticketing platform for Gen Z and millennial India.
Built for conversion: 15%+ CVR target on warm traffic, 5%+ on cold.

**Repo:** https://github.com/omu70/bookmybhajan
**Stack:** Next.js 14 (App Router) · Tailwind v3 · Framer Motion 11 · Three.js (lazy) · Razorpay

---

## Quick start

```bash
# 1. Install
npm install

# 2. Configure env
cp .env.example .env.local
# fill in NEXT_PUBLIC_RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, GTM, PostHog

# 3. Run
npm run dev          # http://localhost:3000
npm run build        # production build
npm run start        # run prod build locally
```

Without Razorpay keys configured, `/api/razorpay/order` returns a deterministic mock — checkout flow is fully testable end-to-end in dev.

---

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial Darshan ticketing platform"
git branch -M main
git remote add origin https://github.com/omu70/bookmybhajan.git
git push -u origin main
```

For subsequent deploys: connect the repo to **Vercel** — zero-config. The `/app` directory is detected automatically. Set the env vars in Vercel project settings.

---

## Project map

```
app/
  layout.tsx                       — root, fonts, GTM, PostHog (lazyOnload)
  page.tsx                         — homepage (SSG + 60s ISR)
  events/page.tsx                  — listing (client filters, no reload)
  events/[slug]/page.tsx           — event detail (ISR 60s)
  events/[slug]/_client.tsx        — full detail experience
  events/[slug]/seats/page.tsx     — seat picker
  checkout/page.tsx                — 3-step single-column checkout
  confirmation/page.tsx            — animated success + ticket card
  api/razorpay/order/route.ts      — server order creation
  api/razorpay/webhook/route.ts    — payment.captured handler

components/
  layout/{Navbar, Footer}.tsx
  ui/{GlassCard, GoldButton, ScarcityBadge, LiveBookingTicker,
       CountdownTimer, SeatHoldTimer, ProgressBar, TrustStrip}.tsx
  sections/{HeroSection, HeroScene (3D),
            ScarcityBar, EventGrid, EventCard, TicketTiers,
            SeatingMap, StorySection, PastEventsGallery,
            TestimonialsCarousel, FAQSection, TrustLayer,
            ExitIntentModal, StickyMobileCTA}.tsx

lib/
  events.ts        — 6 dummy concerts (Delhi, Mumbai, Bangalore, Goa, Chennai)
  razorpay.ts      — checkout + UPI-first config
  analytics.ts     — GTM + PostHog facade
  inventory.ts     — seat-count helpers
  utils.ts         — INR formatter, dates, scarcity state, 3D feature gate

types/index.ts     — domain types
```

---

## CRO decision log

| Decision | Why we chose this | Expected impact |
|----------|-------------------|-----------------|
| Gold tier pre-selected with `⭐ Most Popular` badge + 2px gold border | Anchoring effect — defaults shape behavior | +23% AOV |
| Live booking ticker at hero footer (auto-rotating, 90s refresh) | Social proof + FOMO + activity signal | +6–9% CVR |
| Saffron scarcity bar directly below hero with seat counters | Most impactful single urgency block | +12% urgency conversions |
| Event countdown shown in hero, scarcity bar, checkout, confirmation | Scarcity compounds across journey | +8% near-deadline traffic |
| Seat hold timer in checkout (9 min) | Prevents tab-switching; commits the user | +11% completion |
| Guest-only checkout (no signup wall) | Forced signup destroys 24% of checkouts | +24% completion |
| 3 fields max (name + email + WhatsApp) | Each extra field drops completion ~7% | +14% completion |
| UPI as default payment | 70%+ of Indian buyers prefer UPI | +9% completion |
| Trust strip directly above Pay button | Pay-anxiety is highest at this moment | +18% completion |
| Progress breadcrumbs in checkout | Visible end reduces abandonment | +14% (AudienceView 2025) |
| Exit-intent modal — desktop, 30s gate, ₹100 off | Recovers ~2% of bouncing users | +1.8% CVR |
| Mobile sticky bottom CTA, 56px, thumb-zone | India is 74% mobile | +6% mobile CVR |
| Default selection on tier card (Gold) NOT a separate "select" step | Each click is a drop-off | +5% tier confirmation |
| Specific Pay button copy ("Pay ₹1,998 Securely") vs generic | Specificity = trust | +4% pay-button CTR |
| Auto-assign seats option | Decision fatigue is real for tier buyers | +9% completion at seat step |

---

## Performance budget

| Metric | Budget | How we hit it |
|--------|--------|---------------|
| LCP   | < 2.0s | Hero image priority + WebP, 3D scene `dynamic ssr:false` deferred 500ms after `load` |
| INP   | < 100ms | Animations on `transform/opacity` only, no layout thrash |
| CLS   | < 0.1  | Fixed aspect ratios on every image, font `display: swap` with preloaded weights |
| Initial JS | < 150KB | Three.js code-split, Razorpay only on `/checkout`, Framer Motion tree-shaken |
| Mobile 3D | disabled | `shouldUse3D()` returns false on touch / 2g-3g / `prefers-reduced-motion` |

Hero scene uses ≤800 particles, perlin-style flicker (sine sums, no extra deps), pointer parallax with `lerp(0.05)`.

---

## A/B test roadmap (post-launch, week 1)

1. **CTA copy** — "Book Your Seat" vs "Reserve My Seat" vs "Book Now"
   *Hypothesis:* "Reserve My Seat" outperforms — possessive + commitment language.
   *Metric:* hero → tier-page CTR.

2. **Hero CTA position** — floating glass card vs sticky bottom bar (mobile)
   *Hypothesis:* sticky bottom wins on mobile due to thumb reachability.
   *Metric:* mobile-only CVR.

3. **Ticket tiers layout** — 3-up horizontal vs vertical stack on mobile
   *Hypothesis:* horizontal scroll keeps Gold visible alongside Diamond — preserves anchor.
   *Metric:* tier confirmation rate, AOV.

4. **Checkout fields** — 2 (email + phone) vs 3 (+ name)
   *Hypothesis:* dropping name gives +4–6% completion; trade against personalisation in WhatsApp DM.
   *Metric:* pay-button completion.

5. **Scarcity copy** — "38 seats left" vs "38 of 200 seats left"
   *Hypothesis:* the ratio framing builds more trust than just the count and lifts CVR on cold traffic.
   *Metric:* hero CTR + tier-page CTR.

Use **PostHog feature flags** (already wired via `posthog.getFeatureFlag`) or **Vercel Edge Config** for flag delivery.

---

## India-specific UX

- ₹ + Indian-comma INR formatting everywhere (`Intl.NumberFormat('en-IN')`)
- WhatsApp e-ticket framing in 4 places (hero, FAQ, checkout, confirmation)
- UPI as default with explicit `instruments: [{ method: 'upi' }]` block in Razorpay
- 56px sticky mobile CTA inside `safe-area-inset-bottom` (iPhone notch friendly)
- Hindi accent words rendered with **Tiro Devanagari** — used for emotional resonance, never bulk copy
- Tested device matrix: Chrome Android, Samsung Internet, UC Browser

---

## Architecture decisions worth flagging

- **Razorpay webhook is signature-verified** with HMAC-SHA256 inside `/api/razorpay/webhook`. Payment success in the browser is *not* trusted alone — the webhook is canonical for marking a booking paid and dispatching the WhatsApp ticket.
- **Inventory drift on a static homepage** — we cache the homepage at the edge with 60s ISR. Anything < 60s stale on tier counters is acceptable. Past 60s, ISR refreshes on next request.
- **3D is gated three ways:** touch device, network type, reduced-motion. Mobile gets the static WebP every time. We never ship Three.js to a 4G phone in Tier-2.
- **Seat hold is client-only in this build.** Production: lock seats in Redis with a 9-minute TTL the moment the seat-selection page loads. Webhook releases the lock on payment success/failure.

---

## What's deliberately not in this build

- Account / auth — guest checkout only by spec.
- Real-time seat-lock infra (Redis + WebSocket) — stubbed to client state. Hook it up when traffic hits >100 concurrent.
- WATI / Gupshup integration for the WhatsApp ticket — webhook signature check is in place, dispatch is `TODO`.

---

## License

UNLICENSED — internal project.
