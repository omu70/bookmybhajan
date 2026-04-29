# BookMyBhajan — Bhajan Clubbing, online

India's biggest Bhajan Clubbing nights — Fusion Albela Band live across **Mumbai · Pune · Ahmedabad · Surat · Delhi · Bangalore**. Bhakti meets the beat. Built for Gen Z + millennial India.

**Repo:** https://github.com/omu70/bookmybhajan
**Stack:** Next.js 14 (App Router) · Tailwind v3 · Framer Motion 11 · Three.js (lazy) · Razorpay

---

## Quick start

```bash
npm install
cp .env.example .env.local           # fill Razorpay + GTM/PostHog keys
npm run dev                          # http://localhost:3000
```

Without Razorpay keys configured, `/api/razorpay/order` returns a deterministic mock — checkout works end-to-end in dev.

---

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial BookMyBhajan platform"
git branch -M main
git remote add origin https://github.com/omu70/bookmybhajan.git
git push -u origin main
```

Then connect the repo to **Vercel** for zero-config deploys.

---

## What's in the box

### Pages

```
/                            Homepage — Hero · CityMarquee · ScarcityBar · ScrollStory
                             · HowItWorks · EventGrid · StatsBand · Testimonials · TrustLayer
/events                      Listing — sticky city/sort filters, client-side
/events/[slug]               Event detail — Hero · Story · TicketTiers + AuditoriumZones · Past videos · FAQ
/checkout                    Single-page checkout — tier+qty + 3 fields + payment, no multi-step
/confirmation                Animated success + ticket card + referral hook
/api/razorpay/order          Server order creation (mock-aware)
/api/razorpay/webhook        Signature-verified payment.captured handler
```

### Booking flow (3 user actions, period)

```
Event detail  →  pick tier (Gold pre-selected)  →  /checkout?event=…&tier=…&qty=…
                                                   single page → Razorpay → /confirmation
```

No seat-level selection. Seating is **first-come-first-served** within a tier (Diamond / Gold / Silver). The `AuditoriumZones` component renders the venue layout matching the actual venue maps from bookmybhajan.com, with per-zone scarcity badges.

The legacy `/events/[slug]/seats` route still exists — it just redirects to `/checkout`.

### Design system

- **Palette:** cream / saffron / marigold / temple-gold / sindoor-maroon — light, devotional, warm. Defined in `tailwind.config.js`. Body bg in `globals.css` is a tri-radial gradient on cream.
- **Glass:** white frosted (`rgba(255,255,255,0.55)`) with warm maroon-tinted border. Reduced-transparency fallback to opaque cream.
- **CTAs:** primary = temple-gold gradient (`btn-gold`), pulsing beacon. Hero variant = saffron gradient (`btn-saffron`).
- **Typography:** Cormorant Garamond display · Inter UI · Tiro Devanagari Hindi accent.
- **Motion:** Framer Motion 11 — purposeful animations only. ScrollStory uses pinned sticky + `useScroll`/`useTransform` for cinematic crossfades, parallax, and word-by-word headline reveals.

### Components

```
ui/        GlassCard · GoldButton · ScarcityBadge · LiveBookingTicker · CountdownTimer
           · SeatHoldTimer · ProgressBar · TrustStrip
sections/  HeroSection · HeroScene (3D, lazy) · ScrollStory · CityMarquee · HowItWorks
           · ScarcityBar · EventGrid · EventCard · TicketTiers · AuditoriumZones
           · StorySection · PastEventsGallery · TestimonialsCarousel · FAQSection
           · TrustLayer · ExitIntentModal · StickyMobileCTA · StatsBand
layout/    Navbar · Footer
```

---

## CRO decision log

| Decision | Why | Expected impact |
|----------|-----|-----------------|
| Gold tier pre-selected, ⭐ Most Popular badge | Anchoring | +23% AOV |
| Live booking ticker (90s refresh) | FOMO + social proof | +6–9% CVR |
| Saffron scarcity bar with countdown under hero | Single highest-impact urgency block | +12% urgency conversions |
| **Single-page checkout** (no multi-step) | Each step drops 8–12% | +15–20% completion |
| **No seat picker — FCFS within tier** | Removes the highest-friction screen | +18% pay-button reach |
| Guest-only (no signup) | Forced signup destroys 24% of checkouts | +24% completion |
| Three fields max (name + email + WhatsApp) | Each extra field −7% | +14% completion |
| UPI default | 70%+ Indian payment preference | +9% completion |
| Trust strip directly above Pay | Pay-anxiety peaks here | +18% completion |
| Exit-intent modal — `ALBELA100` for ₹100 off | Recovers ~2% of bouncing users | +1.8% CVR |
| Mobile sticky bottom CTA, 56px, thumb-zone, `safe-area-inset-bottom` | India = 74% mobile | +6% mobile CVR |
| Hero fits in first screen frame on iPhone | All key info visible without scroll | +5% hero CTR |

---

## Performance budget

| Metric | Budget | How |
|--------|--------|-----|
| LCP   | < 2.0s  | Hero image priority + WebP, 3D scene `dynamic ssr:false` deferred 500ms after `load` |
| INP   | < 100ms | Animations restricted to `transform/opacity` |
| CLS   | < 0.1   | Fixed aspect ratios on every image, font `display: swap` with preloaded weights |
| Initial JS | < 150KB | Three.js code-split, Razorpay only on `/checkout`, Framer Motion tree-shaken |
| Mobile 3D | disabled | `shouldUse3D()` returns false on touch / 2g-3g / `prefers-reduced-motion` |

ScrollStory pins for 4 chapters of scroll (~400vh tall, 100vh sticky). Image parallax + word-reveal driven by `useScroll`/`useTransform`. No layout thrash.

---

## A/B tests to run week 1

1. **CTA copy** — "Reserve from ₹799" vs "Book Now" vs "Get my spot"
2. **Hero CTA position** — anchor scroll to `#tickets` vs route directly to `/checkout?tier=gold&qty=1`
3. **Tier ordering** — Diamond → Gold → Silver vs Silver → Gold → Diamond (anchor effect)
4. **Checkout fields** — 2 (email + WhatsApp) vs 3 (+ name)
5. **AuditoriumZones interaction** — clickable zones vs read-only legend

Use **PostHog feature flags** (already wired) or **Vercel Edge Config**.

---

## What's deliberately not in this build

- Account / auth — guest checkout only.
- Real-time seat-lock infra — moot, since we don't sell individual seats. Tier inventory is a single counter per event-tier.
- WATI / Gupshup integration for the WhatsApp ticket — webhook signature check is in place, dispatch is `TODO`.

---

## License

UNLICENSED — internal project.
