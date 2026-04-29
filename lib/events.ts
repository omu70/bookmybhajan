/**
 * BOOKMYBHAJAN — REAL EVENT LINEUP (5 shows)
 * Source: actual posters from bookmybhajan.com
 *
 *   1. Surat       · 02 May 2026 (Sat) · Sardar Patel Auditorium
 *   2. Mumbai      · 23 May 2026 (Sat) · St. Andrews Auditorium, Bandra
 *   3. Pune        · 24 May 2026       · Elpro City Square Mall Auditorium, PCMC
 *   4. Ahmedabad   · 29 May 2026       · Pandit Deendayal Upadhyay Auditorium
 *   5. Bengaluru   · 14 June 2026 (Sat)· Chowdiah Hall
 *
 * All headlined by Fusion Albela Band. Tickets from ₹799.
 *
 * NOTE: hero/poster images use Unsplash placeholders. To use the real
 * posters, replace each `heroImage` URL with the uploaded asset URL.
 */

import type { DevotionalEvent, LiveBooking } from '@/types';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const FUSION_ALBELA_BAND = {
  name: 'Fusion Albela Band',
  bio: 'Eight musicians. Tabla, dhol, electric sarangi, synth, vocals — bhajans you can dance to.',
  imageUrl: img('1507003211169-0a1dd7228f2d'),
  blessedCount: 5_60_000,
};

const PERKS_SILVER  = ['Reserved auditorium seating', 'Welcome chai + prasad', 'Aarti songbook'];
const PERKS_GOLD    = ['Premium center seating', 'Welcome chai + prasad + tilak', 'Aarti songbook', 'Priority entry', 'Band meet & greet token'];
const PERKS_DIAMOND = ['Front-row VIP seating', 'Brass diya keepsake', 'VIP lounge access', 'Guaranteed band meet & greet', 'Sattvic dinner', 'Certificate of attendance'];

const COMMON_VIDEOS = [
  { thumbnailUrl: img('1604608672516-f1b9b1b8b1b8'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Fusion Albela Band — last tour highlights' },
];
const COMMON_GALLERY = [
  img('1604608672516-f1b9b1b8b1b8'),
  img('1545158535-c3f7168c28b6'),
  img('1601926038011-0e1e7d6f4d0a'),
];

const COMMON_TESTIMONIALS = [
  { name: 'Aanya R.',  city: 'Mumbai',    tier: 'gold' as const,    rating: 5 as const, quote: 'The drop on Achyutam Keshavam — I will hear it for weeks.', avatarUrl: img('1494790108377-be9c29b29330') },
  { name: 'Karan T.',  city: 'Pune',      tier: 'silver' as const,  rating: 5 as const, quote: 'Showed up alone, left with eight new friends.', avatarUrl: img('1492562080023-ab3db95bfbce') },
  { name: 'Dev P.',    city: 'Surat',     tier: 'silver' as const,  rating: 5 as const, quote: 'Best ₹799 I have spent. Period.', avatarUrl: img('1500648767791-00dcc994a43e') },
];

export const EVENTS: DevotionalEvent[] = [
  // ─────────────────────────────────────────────────────────
  // 1. SURAT — 02 May 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'surat-bhajan-clubbing-fusion-albela-band',
    title: "Surat's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'सूरत भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Surat',
    venue: 'Sardar Patel Auditorium',
    venueAddress: 'Athwa Lines, Surat — 395007',
    date: '2026-05-02T19:00:00+05:30',
    doorsOpen: '6:00 PM',
    startTime: '7:00 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Bhajan Clubbing comes to Surat. Sardar Patel Auditorium. Saturday night.',
    storyLong: [
      "Surat's first Bhajan Clubbing of the year — Sardar Patel Auditorium, Saturday night, doors at six.",
      'Fusion Albela Band opens at seven sharp. Three hours of bhajans you can dance to, sing to, or sit with.',
      'Tickets from ₹799. Seating first-come-first-served inside each tier.',
    ],
    spiritualSignificance: "Bhakti at the frequency of your generation.",
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: PERKS_SILVER,  totalSeats: 800, seatsRemaining: 540 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: PERKS_GOLD,    totalSeats: 300, seatsRemaining: 112, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 80,  seatsRemaining: 22 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 1100,
    badge: 'limited',
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 2. MUMBAI — 23 May 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'mumbai-bhajan-clubbing-fusion-albela-band',
    title: "Mumbai's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'मुंबई भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Mumbai',
    venue: 'St. Andrews Auditorium',
    venueAddress: 'St. Dominic Road, Bandra West, Mumbai — 400050',
    date: '2026-05-23T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3.5,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Mumbai night. St. Andrews Bandra. The biggest Bhajan Clubbing of the year.',
    storyLong: [
      'Mumbai gets the flagship night. St. Andrews Auditorium, Bandra — 1,200 seats and we expect every one filled.',
      'Fusion Albela Band live: tabla, dhol, synth, full chorus. Three and a half hours, no intermission.',
      'Doors at 5:30. Show at 6:30. The Saturday night you tell people about for the rest of the year.',
    ],
    spiritualSignificance: 'Bhakti, on the beat — Mumbai edition.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: PERKS_SILVER,  totalSeats: 1500, seatsRemaining: 820 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: PERKS_GOLD,    totalSeats: 500,  seatsRemaining: 138, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 150,  seatsRemaining: 41 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 4200,
    badge: 'almost-full',
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 3. PUNE — 24 May 2026
  // ─────────────────────────────────────────────────────────
  {
    slug: 'pune-bhajan-clubbing-fusion-albela-band',
    title: "Pune's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'पुणे भजन क्लबिंग',
    deity: 'Vitthal',
    category: 'kirtan-night',
    city: 'Pune',
    venue: 'Elpro City Square Mall Auditorium',
    venueAddress: 'PCMC, Chinchwad, Pune — 411033',
    date: '2026-05-24T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Sunday in Pune. Hindi + Marathi bhajans. Elpro City Square Auditorium.',
    storyLong: [
      'Pune gets a bilingual set — Hindi and Marathi bhajans woven into the Albela Band\'s signature setlist.',
      'Vitthal-Vitthal chants, Saint Tukaram couplets, fusion drops engineered to pull you onto your feet.',
      'Bring your parents. Bring your hostel mates. Everyone leaves on the same wavelength.',
    ],
    spiritualSignificance: 'When bhajans cross languages, bhakti has no accent.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: PERKS_SILVER,  totalSeats: 1200, seatsRemaining: 670 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: PERKS_GOLD,    totalSeats: 400,  seatsRemaining: 124, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 120,  seatsRemaining: 31 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 2400,
    badge: 'trending',
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 4. AHMEDABAD — 29 May 2026
  // ─────────────────────────────────────────────────────────
  {
    slug: 'ahmedabad-bhajan-clubbing-fusion-albela-band',
    title: "Ahmedabad's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'अहमदाबाद भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Ahmedabad',
    venue: 'Pandit Deendayal Upadhyay Auditorium',
    venueAddress: 'Bhaikaka Bhavan Road, Law Garden, Ahmedabad — 380006',
    date: '2026-05-29T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Friday night. Krishna bhajans on a fusion bassline. Pandit Deendayal Upadhyay Auditorium.',
    storyLong: [
      'Ahmedabad night is Krishna night. The Albela Band leans into Vrindavan — Madhurashtakam, Govinda Bolo, Achyutam Keshavam — re-arranged for a generation that grew up on Coke Studio.',
      'Three hours straight, no intermission. Doors close at 6:30 sharp.',
      'Limited seats — book early.',
    ],
    spiritualSignificance: 'Friday night, but rendered in saffron.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: PERKS_SILVER,  totalSeats: 1000, seatsRemaining: 480 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: PERKS_GOLD,    totalSeats: 350,  seatsRemaining: 88, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 100,  seatsRemaining: 24 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 2900,
    badge: 'limited',
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 5. BENGALURU — 14 June 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'bengaluru-bhajan-clubbing-fusion-albela-band',
    title: "Bengaluru's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'बेंगलुरु भजन क्लबिंग',
    deity: 'Krishna',
    category: 'kirtan-night',
    city: 'Bangalore',
    venue: 'Chowdiah Memorial Hall',
    venueAddress: 'Vyalikaval, Malleshwaram, Bengaluru — 560003',
    date: '2026-06-14T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: COMMON_GALLERY,
    pastEventVideos: COMMON_VIDEOS,
    storyShort: 'Bengaluru night. Chowdiah Hall. The most-anticipated Bhajan Clubbing of the season.',
    storyLong: [
      'Bengaluru — Chowdiah Hall, Saturday June 14, 6:30 PM. The Albela Band has been working this set for months.',
      'Classic bhajans, contemporary harmonies, lyrics projected so everyone in the room is singing.',
      'Tickets always sell fastest in Bengaluru. We mean it.',
    ],
    spiritualSignificance: 'Bhakti scales. So does this band.',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: PERKS_SILVER,  totalSeats: 900,  seatsRemaining: 612 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: PERKS_GOLD,    totalSeats: 300,  seatsRemaining: 96, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: PERKS_DIAMOND, totalSeats: 90,   seatsRemaining: 28 },
    ],
    testimonials: COMMON_TESTIMONIALS,
    attendedCount: 2200,
    badge: 'new',
    featured: true,
  },
];

// ─── HELPERS ──────────────────────────────────────────────
export function getEventBySlug(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}
export function getFeaturedEvents() {
  return EVENTS.filter((e) => e.featured);
}
export function getEventsByCity(city: string) {
  if (city === 'All') return EVENTS;
  return EVENTS.filter((e) => e.city === city);
}

// ─── LIVE BOOKING TICKER ──────────────────────────────────
export const RECENT_BOOKINGS: LiveBooking[] = [
  { name: 'Aanya',  city: 'Mumbai',    tier: 'gold',    minutesAgo: 2 },
  { name: 'Karan',  city: 'Pune',      tier: 'silver',  minutesAgo: 4 },
  { name: 'Riya',   city: 'Ahmedabad', tier: 'diamond', minutesAgo: 6 },
  { name: 'Dev',    city: 'Surat',     tier: 'silver',  minutesAgo: 8 },
  { name: 'Aryan',  city: 'Bangalore', tier: 'gold',    minutesAgo: 11 },
  { name: 'Tara',   city: 'Mumbai',    tier: 'silver',  minutesAgo: 14 },
  { name: 'Ishaan', city: 'Pune',      tier: 'gold',    minutesAgo: 17 },
  { name: 'Naina',  city: 'Ahmedabad', tier: 'silver',  minutesAgo: 21 },
];
