/**
 * BOOKMYBHAJAN — REAL EVENT LINEUP
 *
 * Brand: bookmybhajan.com
 * Concept: "Bhajan Clubbing" — devotional fusion concerts with the
 *          Fusion Albela Band as headliner. Bhakti meets club energy.
 *          Targeted at Gen Z + millennial India.
 *
 * Cities currently active: Mumbai, Pune, Ahmedabad, Surat, Delhi, Bangalore.
 * Today: 2026-04-29 → all events 15+ days out.
 */

import type { DevotionalEvent, LiveBooking } from '@/types';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`;

// Reusable cast across cities — same band, same magic
const FUSION_ALBELA_BAND = {
  name: 'Fusion Albela Band',
  bio: 'India\'s loudest bhakti collective. Eight musicians. Tabla, dhol, electric sarangi, synth, vocals — bhajans you can dance to.',
  imageUrl: img('1507003211169-0a1dd7228f2d'),
  blessedCount: 5_60_000,
};

// Standardised pre/show timing
const PERKS_SILVER = [
  'General-floor seating',
  'Welcome chai + prasad',
  'Digital aarti songbook',
];
const PERKS_GOLD = [
  'Premium center seating',
  'Welcome chai + prasad + tilak',
  'Hardbound aarti songbook',
  'Priority entry (skip queue)',
  'Meet & greet token with the band',
];
const PERKS_DIAMOND = [
  'Front-row VIP seating',
  'Brass diya keepsake',
  'Welcome chai + prasad + tilak',
  'VIP lounge access (pre-show)',
  'Guaranteed band meet & greet',
  'Sattvic dinner inside the auditorium',
  'Personalised certificate of attendance',
];

const COMMON_VIDEOS = [
  {
    thumbnailUrl: img('1604608672516-f1b9b1b8b1b8'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caption: 'Mumbai 2025 — Fusion Albela Band live, full house',
  },
  {
    thumbnailUrl: img('1545158535-c3f7168c28b6'),
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    caption: 'Janmashtami 2025 — 4,200 people dancing in unison',
  },
];

const COMMON_GALLERY = [
  img('1604608672516-f1b9b1b8b1b8'),
  img('1545158535-c3f7168c28b6'),
  img('1601926038011-0e1e7d6f4d0a'),
];

const COMMON_TESTIMONIALS = [
  {
    name: 'Aanya R.', city: 'Mumbai', tier: 'gold' as const, rating: 5 as const,
    quote: 'I dragged my friends. By the third song they were screaming the chorus louder than I was. We are flying to Pune for the next one.',
    avatarUrl: img('1494790108377-be9c29b29330'),
  },
  {
    name: 'Karan T.', city: 'Pune', tier: 'silver' as const, rating: 5 as const,
    quote: 'Showed up alone, left with eight new friends. The Albela Band understands what 22-year-olds need from bhajans in 2026.',
    avatarUrl: img('1492562080023-ab3db95bfbce'),
  },
  {
    name: 'Riya M.', city: 'Ahmedabad', tier: 'diamond' as const, rating: 5 as const,
    quote: 'VIP lounge was full of mausis and 19-year-olds and everyone was vibing. That is the vibe. That is the only review you need.',
    avatarUrl: img('1438761681033-6461ffad8d80'),
  },
  {
    name: 'Dev P.', city: 'Surat', tier: 'silver' as const, rating: 5 as const,
    quote: 'Best ₹299 I have ever spent. Period.',
    avatarUrl: img('1500648767791-00dcc994a43e'),
  },
  {
    name: 'Meher S.', city: 'Delhi', tier: 'gold' as const, rating: 5 as const,
    quote: 'My dad cried. My cousin danced on a chair. The fusion arrangement of Achyutam Keshavam is going to live rent-free in my head forever.',
    avatarUrl: img('1535713875002-d1d0cf377fde'),
  },
];

export const EVENTS: DevotionalEvent[] = [
  // ═══════════════════════════════════════════════════════
  // 1. MUMBAI — 23 May 2026 (Saturday) — flagship
  // ═══════════════════════════════════════════════════════
  {
    slug: 'mumbai-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Mumbai's Biggest Bhajan Clubbing",
    titleHindi: 'मुंबई की सबसे बड़ी भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Mumbai',
    venue: 'NSCI Dome',
    venueAddress: 'Lala Lajpat Rai Marg, Worli, Mumbai — 400018',
    date: '2026-05-23T19:30:00+05:30',
    doorsOpen: '6:30 PM',
    startTime: '7:30 PM',
    durationHours: 3.5,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Bhakti, but at a different frequency. Fusion Albela Band. NSCI Dome. One Saturday night.',
    storyLong: [
      'Mumbai\'s biggest Bhajan Clubbing of 2026, headlined by the Fusion Albela Band — the eight-piece bhakti collective that has redefined what a bhajan night feels like.',
      'Tabla meets synth. Dhol meets sub-bass. Govinda Bolo meets a drop you will feel in your chest. Three and a half hours of bhajans you can dance to, sing to, or sit with — the auditorium leaves room for all three.',
      'Doors at 6:30. Sets till 11. The Saturday night you tell people about for the rest of the year.',
    ],
    spiritualSignificance:
      'Bhajan Clubbing is bhakti at the frequency of your generation — devotional, communal, electric.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      {
        id: 'silver', name: 'Silver', price: 799,
        perks: PERKS_SILVER,
        totalSeats: 3500, seatsRemaining: 1840,
      },
      {
        id: 'gold', name: 'Gold', price: 1499, popular: true,
        perks: PERKS_GOLD,
        totalSeats: 1200, seatsRemaining: 218,
      },
      {
        id: 'diamond', name: 'Diamond', price: 2999,
        perks: PERKS_DIAMOND,
        totalSeats: 380, seatsRemaining: 64,
      },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 5800,
    badge: 'almost-full',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 2. PUNE — 24 May 2026 — Hindi & Marathi
  // ═══════════════════════════════════════════════════════
  {
    slug: 'pune-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Pune's Biggest Bhajan Clubbing",
    titleHindi: 'पुणे की सबसे बड़ी भजन क्लबिंग',
    deity: 'Vitthal',
    category: 'kirtan-night',
    city: 'Pune',
    venue: 'Balewadi Sports Complex Auditorium',
    venueAddress: 'Mahalunge Road, Balewadi, Pune — 411045',
    date: '2026-05-24T19:30:00+05:30',
    doorsOpen: '6:30 PM',
    startTime: '7:30 PM',
    durationHours: 3.5,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Hindi & Marathi bhajans, fusion sound, Pune\'s loudest auditorium. Sunday night, sold out vibes.',
    storyLong: [
      'Pune gets its own night — and this one is bilingual. Hindi and Marathi bhajans woven into the Fusion Albela Band\'s signature setlist.',
      'Vitthal-Vitthal chants, Saint Tukaram couplets, fusion drops engineered to pull you up onto your feet. By the second song the seated section is standing.',
      'Bring your parents. Bring your hostel mates. Bring your Tinder date. Everyone leaves on the same wavelength.',
    ],
    spiritualSignificance: 'When bhajans cross languages, bhakti has no accent.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver', name: 'Silver', price: 799, perks: PERKS_SILVER, totalSeats: 2400, seatsRemaining: 1320 },
      { id: 'gold', name: 'Gold', price: 1499, popular: true, perks: PERKS_GOLD, totalSeats: 800, seatsRemaining: 184 },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 240, seatsRemaining: 47 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 3600,
    badge: 'trending',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 3. AHMEDABAD — 29 May 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'ahmedabad-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Ahmedabad's Biggest Bhajan Clubbing",
    titleHindi: 'अहमदाबाद की सबसे बड़ी भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Ahmedabad',
    venue: 'Karnavati Club Convention Hall',
    venueAddress: 'S.G. Highway, Ahmedabad — 380015',
    date: '2026-05-29T20:00:00+05:30',
    doorsOpen: '7:00 PM',
    startTime: '8:00 PM',
    durationHours: 3,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Friday night. Krishna bhajans on a fusion bassline. The kind of night Ahmedabad has been waiting for.',
    storyLong: [
      'Ahmedabad night is Krishna night. The Fusion Albela Band leans into Vrindavan — Madhurashtakam, Govinda Bolo, Achyutam Keshavam — re-arranged for a generation that grew up on Coke Studio.',
      'Three hours straight, no intermission. The setlist is built like an album — opener, build, peak, breakdown, finale.',
      'Doors close at 8 sharp. Late entry costs you the first bhajan, and the first bhajan is the one nobody wants to miss.',
    ],
    spiritualSignificance: 'Friday night, but rendered in saffron.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver', name: 'Silver', price: 799, perks: PERKS_SILVER, totalSeats: 1800, seatsRemaining: 920 },
      { id: 'gold', name: 'Gold', price: 1499, popular: true, perks: PERKS_GOLD, totalSeats: 600, seatsRemaining: 142 },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 180, seatsRemaining: 38 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 2900,
    badge: 'limited',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 4. SURAT — 31 May 2026 — entry-level pricing
  // ═══════════════════════════════════════════════════════
  {
    slug: 'surat-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Surat's Biggest Bhajan Clubbing",
    titleHindi: 'सूरत की सबसे बड़ी भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Surat',
    venue: 'Sanjeev Kumar Auditorium',
    venueAddress: 'Pal-Adajan Road, Surat — 395009',
    date: '2026-05-31T19:00:00+05:30',
    doorsOpen: '6:00 PM',
    startTime: '7:00 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Surat\'s first ever Bhajan Clubbing. Tickets from ₹299. Don\'t scroll past this.',
    storyLong: [
      'Surat — this is your first one. We priced it so nobody has to think twice. Silver entry at ₹299.',
      'Same Fusion Albela Band, same three-hour set, same bhakti-meets-bass energy that has sold out four cities. Sanjeev Kumar Auditorium has 1,800 seats and we expect every single one filled.',
      'If you have never been to a Bhajan Clubbing — this is the night to find out what the noise is about.',
    ],
    spiritualSignificance: 'First-timers welcome. Bhakti does not check your CV.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver', name: 'Silver', price: 299, perks: PERKS_SILVER, totalSeats: 1200, seatsRemaining: 740 },
      { id: 'gold', name: 'Gold', price: 999, popular: true, perks: PERKS_GOLD, totalSeats: 400, seatsRemaining: 156 },
      { id: 'diamond', name: 'Diamond', price: 1999, perks: PERKS_DIAMOND, totalSeats: 120, seatsRemaining: 41 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 1100,
    badge: 'new',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 5. DELHI — 6 June 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'delhi-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Delhi's Biggest Bhajan Clubbing",
    titleHindi: 'दिल्ली की सबसे बड़ी भजन क्लबिंग',
    deity: 'Ram',
    category: 'kirtan-night',
    city: 'Delhi',
    venue: 'Indira Gandhi Indoor Stadium',
    venueAddress: 'IP Estate, New Delhi — 110002',
    date: '2026-06-06T19:30:00+05:30',
    doorsOpen: '6:30 PM',
    startTime: '7:30 PM',
    durationHours: 3.5,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Delhi night, IGI Stadium, Ram Naam on a fusion arrangement that hits like a stadium anthem.',
    storyLong: [
      'Delhi gets the largest auditorium and the loudest set. The Fusion Albela Band scaled their rig for this one — 11 musicians, full strings section, the works.',
      'Setlist leans into Ram bhajans — Sri Ramachandra Kripalu, Raghupati Raghav — woven through fusion drops engineered for a 4,000-person sing-along.',
      'When the room sings Raghupati Raghav together you will understand why we do this.',
    ],
    spiritualSignificance: 'A stadium full of voices is the loudest prayer there is.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver', name: 'Silver', price: 799, perks: PERKS_SILVER, totalSeats: 4000, seatsRemaining: 2680 },
      { id: 'gold', name: 'Gold', price: 1499, popular: true, perks: PERKS_GOLD, totalSeats: 1400, seatsRemaining: 410 },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 400, seatsRemaining: 96 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 4200,
    badge: 'trending',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 6. BANGALORE — 13 June 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'bangalore-biggest-bhajan-clubbing-fusion-albela-band',
    title: "Bangalore's Biggest Bhajan Clubbing",
    titleHindi: 'बेंगलुरु की सबसे बड़ी भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Bangalore',
    venue: 'Manpho Convention Centre',
    venueAddress: 'Nagawara Junction, Outer Ring Road, Bangalore — 560045',
    date: '2026-06-13T19:30:00+05:30',
    doorsOpen: '6:30 PM',
    startTime: '7:30 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Bangalore — bilingual bhajans, fusion arrangements, the techiest crowd in India.',
    storyLong: [
      'Bangalore gets a bilingual set — Hindi and English. The Albela Band has been working this one for months: classic bhajans, contemporary harmonies, lyrics translated and projected so everyone in the room is singing.',
      'A perfect Saturday in June. 7:30 PM doors, 11 PM curfew. Three hours that pass in twenty minutes.',
      'Tickets always sell fastest in Bangalore. We mean it.',
    ],
    spiritualSignificance: 'Bhakti scales. So does this band.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver', name: 'Silver', price: 799, perks: PERKS_SILVER, totalSeats: 2200, seatsRemaining: 1290 },
      { id: 'gold', name: 'Gold', price: 1499, popular: true, perks: PERKS_GOLD, totalSeats: 700, seatsRemaining: 178 },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 220, seatsRemaining: 52 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 3300,
    badge: 'trending',
    featured: true,
  },
];

// ─── HELPERS ──────────────────────────────────────────────
export function getEventBySlug(slug: string): DevotionalEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function getFeaturedEvents(): DevotionalEvent[] {
  return EVENTS.filter((e) => e.featured);
}

export function getEventsByCity(city: string): DevotionalEvent[] {
  if (city === 'All') return EVENTS;
  return EVENTS.filter((e) => e.city === city || e.venue.toLowerCase().includes(city.toLowerCase()));
}

// ─── LIVE BOOKING TICKER (rotates every 90s in the UI) ───
export const RECENT_BOOKINGS: LiveBooking[] = [
  { name: 'Aanya', city: 'Mumbai', tier: 'gold', minutesAgo: 2 },
  { name: 'Karan', city: 'Pune', tier: 'silver', minutesAgo: 4 },
  { name: 'Riya', city: 'Ahmedabad', tier: 'diamond', minutesAgo: 6 },
  { name: 'Dev', city: 'Surat', tier: 'silver', minutesAgo: 8 },
  { name: 'Meher', city: 'Delhi', tier: 'gold', minutesAgo: 11 },
  { name: 'Aryan', city: 'Bangalore', tier: 'gold', minutesAgo: 13 },
  { name: 'Tara', city: 'Mumbai', tier: 'diamond', minutesAgo: 15 },
  { name: 'Ishaan', city: 'Pune', tier: 'gold', minutesAgo: 17 },
  { name: 'Naina', city: 'Ahmedabad', tier: 'silver', minutesAgo: 19 },
  { name: 'Vivaan', city: 'Surat', tier: 'silver', minutesAgo: 22 },
  { name: 'Saanvi', city: 'Delhi', tier: 'gold', minutesAgo: 25 },
  { name: 'Aditya', city: 'Bangalore', tier: 'diamond', minutesAgo: 28 },
];
