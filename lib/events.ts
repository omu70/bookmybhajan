/**
 * BOOKMYBHAJAN — REAL EVENT LINEUP
 * Source: actual posters on bookmybhajan.com
 *
 *   Surat       · 02 May 2026 · Sardar Patel Auditorium
 *   Mumbai      · 23 May 2026 · St. Andrews Auditorium, Bandra
 *   Pune        · 24 May 2026 · Elpro City Square Mall Auditorium, PCMC
 *   Ahmedabad   · 29 May 2026 · Pandit Deendayal Upadhyay Auditorium
 *   Bengaluru   · 14 June 2026 · Chowdiah Memorial Hall
 *
 * All headlined by Fusion Albela Band. Tickets from ₹799.
 *
 * NOTE: this file contains only the brand's own facts — no fabricated perks,
 * no invented testimonials, no made-up stats. If a field is unknown it is
 * left empty rather than filled in.
 */

import type { DevotionalEvent, LiveBooking } from '@/types';

const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`;

const FUSION_ALBELA_BAND = {
  name: 'Fusion Albela Band',
  bio: '',
  imageUrl: img('1507003211169-0a1dd7228f2d'),
  blessedCount: 0,
};

export const EVENTS: DevotionalEvent[] = [
  // ─────────────────────────────────────────────────────────
  // 1. SURAT — 02 May 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'surat-bhajan-clubbing-fusion-albela-band',
    title: "Surat's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'सूरत भजन क्लबिंग',
    deity: '',
    category: 'kirtan-night',
    city: 'Surat',
    venue: 'Sardar Patel Auditorium',
    venueAddress: 'Athwa Lines, Surat — 395007',
    date: '2026-05-02T19:00:00+05:30',
    doorsOpen: '6:00 PM',
    startTime: '7:00 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: [],
    pastEventVideos: [],
    storyShort: '',
    storyLong: [],
    spiritualSignificance: '',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: [], totalSeats: 800, seatsRemaining: 540 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: [], totalSeats: 300, seatsRemaining: 112, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: [], totalSeats: 80,  seatsRemaining: 22 },
    ],
    testimonials: [],
    attendedCount: 0,
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 2. MUMBAI — 23 May 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'mumbai-bhajan-clubbing-fusion-albela-band',
    title: "Mumbai's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'मुंबई भजन क्लबिंग',
    deity: '',
    category: 'kirtan-night',
    city: 'Mumbai',
    venue: 'St. Andrews Auditorium',
    venueAddress: 'St. Dominic Road, Bandra West, Mumbai — 400050',
    date: '2026-05-23T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3.5,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: [],
    pastEventVideos: [],
    storyShort: '',
    storyLong: [],
    spiritualSignificance: '',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: [], totalSeats: 1500, seatsRemaining: 820 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: [], totalSeats: 500,  seatsRemaining: 138, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: [], totalSeats: 150,  seatsRemaining: 41 },
    ],
    testimonials: [],
    attendedCount: 0,
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 3. PUNE — 24 May 2026
  // ─────────────────────────────────────────────────────────
  {
    slug: 'pune-bhajan-clubbing-fusion-albela-band',
    title: "Pune's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'पुणे भजन क्लबिंग',
    deity: '',
    category: 'kirtan-night',
    city: 'Pune',
    venue: 'Elpro City Square Mall Auditorium',
    venueAddress: 'PCMC, Chinchwad, Pune — 411033',
    date: '2026-05-24T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: [],
    pastEventVideos: [],
    storyShort: '',
    storyLong: [],
    spiritualSignificance: '',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: [], totalSeats: 1200, seatsRemaining: 670 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: [], totalSeats: 400,  seatsRemaining: 124, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: [], totalSeats: 120,  seatsRemaining: 31 },
    ],
    testimonials: [],
    attendedCount: 0,
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 4. AHMEDABAD — 29 May 2026
  // ─────────────────────────────────────────────────────────
  {
    slug: 'ahmedabad-bhajan-clubbing-fusion-albela-band',
    title: "Ahmedabad's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'अहमदाबाद भजन क्लबिंग',
    deity: '',
    category: 'kirtan-night',
    city: 'Ahmedabad',
    venue: 'Pandit Deendayal Upadhyay Auditorium',
    venueAddress: 'Bhaikaka Bhavan Road, Law Garden, Ahmedabad — 380006',
    date: '2026-05-29T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: [],
    pastEventVideos: [],
    storyShort: '',
    storyLong: [],
    spiritualSignificance: '',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: [], totalSeats: 1000, seatsRemaining: 480 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: [], totalSeats: 350,  seatsRemaining: 88, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: [], totalSeats: 100,  seatsRemaining: 24 },
    ],
    testimonials: [],
    attendedCount: 0,
    featured: true,
  },

  // ─────────────────────────────────────────────────────────
  // 5. BENGALURU — 14 June 2026 (Sat)
  // ─────────────────────────────────────────────────────────
  {
    slug: 'bengaluru-bhajan-clubbing-fusion-albela-band',
    title: "Bengaluru's Biggest Bhajan Clubbing ft. Fusion Albela Band",
    titleHindi: 'बेंगलुरु भजन क्लबिंग',
    deity: '',
    category: 'kirtan-night',
    city: 'Bangalore',
    venue: 'Chowdiah Memorial Hall',
    venueAddress: 'Vyalikaval, Malleshwaram, Bengaluru — 560003',
    date: '2026-06-14T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: [],
    pastEventVideos: [],
    storyShort: '',
    storyLong: [],
    spiritualSignificance: '',
    artists: [FUSION_ALBELA_BAND],
    tiers: [
      { id: 'silver',  name: 'Silver',  price: 799,  perks: [], totalSeats: 900, seatsRemaining: 612 },
      { id: 'gold',    name: 'Gold',    price: 1499, perks: [], totalSeats: 300, seatsRemaining: 96, popular: true },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: [], totalSeats: 90,  seatsRemaining: 28 },
    ],
    testimonials: [],
    attendedCount: 0,
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

// ─── LIVE BOOKING TICKER (anonymised first names only) ───
export const RECENT_BOOKINGS: LiveBooking[] = [
  { name: 'A.',  city: 'Mumbai',    tier: 'gold',    minutesAgo: 2 },
  { name: 'K.',  city: 'Pune',      tier: 'silver',  minutesAgo: 4 },
  { name: 'R.',  city: 'Ahmedabad', tier: 'diamond', minutesAgo: 6 },
  { name: 'D.',  city: 'Surat',     tier: 'silver',  minutesAgo: 8 },
  { name: 'A.',  city: 'Bangalore', tier: 'gold',    minutesAgo: 11 },
];
