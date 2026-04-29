/**
 * MOCK EVENT INVENTORY
 * In production, this is fetched from CMS/DB via ISR (60s revalidate).
 * Today: 2026-04-29 → all events are 15+ days out (May 14 onwards).
 *
 * 6 dummy concerts:
 *   1. Krishna Bhajan Sandhya — Delhi
 *   2. Shiv Tandav Live      — Bangalore
 *   3. Hanuman Chalisa Mahayagna — Mumbai
 *   4. Ganga Aarti Sunset    — Goa
 *   5. Devi Bhajan Jagran    — Chennai
 *   6. Ram Naam Sankirtan    — Delhi
 */

import type { DevotionalEvent, LiveBooking } from '@/types';

// Stable Unsplash image URLs — temple, diya, bhakti themes
const img = (id: string) => `https://images.unsplash.com/photo-${id}?w=1600&q=80&auto=format&fit=crop`;

export const EVENTS: DevotionalEvent[] = [
  // ═══════════════════════════════════════════════════════
  // 1. KRISHNA BHAJAN SANDHYA — Delhi — 14 May 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'krishna-bhajan-sandhya-delhi',
    title: 'Krishna Bhajan Sandhya',
    titleHindi: 'श्री कृष्ण भजन संध्या',
    deity: 'Krishna',
    category: 'bhajan-sandhya',
    city: 'Delhi',
    venue: 'Indira Gandhi Indoor Stadium',
    venueAddress: 'IP Estate, New Delhi — 110002',
    date: '2026-05-14T18:00:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:00 PM',
    durationHours: 3.5,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: [
      img('1545158535-c3f7168c28b6'),
      img('1604608672516-f1b9b1b8b1b8'),
      img('1601926038011-0e1e7d6f4d0a'),
    ],
    pastEventVideos: [
      {
        thumbnailUrl: img('1604608672516-f1b9b1b8b1b8'),
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Diwali 2024 — 4,200 devotees in one voice',
      },
      {
        thumbnailUrl: img('1545158535-c3f7168c28b6'),
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        caption: 'Janmashtami 2024 — Govinda Bolo highlights',
      },
    ],
    storyShort: 'A 3-hour journey through Vrindavan — bhajans that make the heart melt.',
    storyLong: [
      'You will sit in a hall lit only by the glow of 1,008 diyas. The first note will rise — soft, then full — and the whole room will lean in.',
      'For three hours, you will live inside the bhajans of Vrindavan: Govinda Bolo, Achyutam Keshavam, Madhurashtakam. Not as a listener, but as part of the chorus.',
      'When the last bhajan fades, you will not want to leave. That is what people tell us, every single time.',
    ],
    spiritualSignificance:
      'Bhajan Sandhya is the bridge between dusk and the divine — the hour when even Krishna pauses to listen.',
    artists: [
      {
        name: 'Pt. Sanjeev Krishna Sharma',
        bio: 'Trained at the Mathura gharana for 28 years. Known for the Madhurashtakam that brings rooms to silence.',
        imageUrl: img('1507003211169-0a1dd7228f2d'),
        blessedCount: 2_40_000,
      },
      {
        name: 'Smt. Jaya Kishori (special set)',
        bio: 'India\'s most-streamed bhakti voice. Joining for a 30-minute Krishna special.',
        imageUrl: img('1494790108377-be9c29b29330'),
        blessedCount: 8_00_000,
      },
    ],
    tiers: [
      {
        id: 'silver', name: 'Silver', price: 499,
        perks: [
          'Reserved seating — middle/back sections',
          'Welcome prasad pouch',
          'Digital aarti songbook',
        ],
        totalSeats: 2400, seatsRemaining: 1180,
      },
      {
        id: 'gold', name: 'Gold', price: 999, popular: true,
        perks: [
          'Premium center seating — rows 5–12',
          'Welcome prasad + temple shawl',
          'Digital aarti songbook',
          'Priority entry (skip queue)',
          'Post-event meet & greet token',
        ],
        totalSeats: 800, seatsRemaining: 38,
      },
      {
        id: 'diamond', name: 'Diamond', price: 2499,
        perks: [
          'Front-row VIP seating — first 4 rows',
          'Welcome prasad + silver kalash',
          'Hardbound aarti songbook',
          'VIP entry + private lounge access',
          'Guaranteed meet & greet with artists',
          'Post-event traditional dinner (sattvic)',
          'Personalised certificate of attendance',
        ],
        totalSeats: 240, seatsRemaining: 64,
      },
    ],
    testimonials: [
      { name: 'Rahul M.', city: 'Mumbai', tier: 'gold', rating: 5, quote: 'I came alone. Left with two hundred people who felt like family. The Govinda Bolo at 9 PM — I will hear it in my dreams.', avatarUrl: img('1535713875002-d1d0cf377fde') },
      { name: 'Priya S.', city: 'Delhi', tier: 'diamond', rating: 5, quote: 'Worth every rupee. The diamond lounge prasad alone — my mother is still talking about it.', avatarUrl: img('1494790108377-be9c29b29330') },
      { name: 'Arjun T.', city: 'Gurugram', tier: 'silver', rating: 5, quote: 'Silver tier and still felt like I was in Vrindavan. Booking gold next time, no question.', avatarUrl: img('1500648767791-00dcc994a43e') },
      { name: 'Neha K.', city: 'Noida', tier: 'gold', rating: 5, quote: 'Took my parents. Dad cried in the second bhajan. Best gift I have ever given them.', avatarUrl: img('1438761681033-6461ffad8d80') },
      { name: 'Vikram J.', city: 'Delhi', tier: 'gold', rating: 5, quote: 'The sound design alone is worth the ticket. You feel each note in your chest.', avatarUrl: img('1492562080023-ab3db95bfbce') },
    ],
    attendedCount: 4200,
    badge: 'almost-full',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 2. SHIV TANDAV — Bangalore — 21 May 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'shiv-tandav-stotram-live-bangalore',
    title: 'Shiv Tandav Stotram — Live',
    titleHindi: 'शिव ताण्डव स्तोत्रम्',
    deity: 'Shiv',
    category: 'kirtan-night',
    city: 'Bangalore',
    venue: 'Manpho Convention Centre',
    venueAddress: 'Nagawara Junction, Outer Ring Road, Bangalore — 560045',
    date: '2026-05-21T19:00:00+05:30',
    doorsOpen: '6:30 PM',
    startTime: '7:00 PM',
    durationHours: 2.5,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: [
      img('1545158535-c3f7168c28b6'),
      img('1604608672516-f1b9b1b8b1b8'),
      img('1601926038011-0e1e7d6f4d0a'),
    ],
    pastEventVideos: [
      { thumbnailUrl: img('1545158535-c3f7168c28b6'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Mahashivratri 2024 — 108 chants in one breath' },
    ],
    storyShort: 'The Tandav, performed live with 11 Rudra-veena artists. Goosebumps guaranteed.',
    storyLong: [
      'Ravan composed the Tandav Stotram in chains. You will hear it as it was meant to be heard — full orchestra, full chorus, full devotion.',
      'Eleven Rudra-veena artists, three percussion masters, and one voice that has chanted Shiva at Kashi for forty years.',
      'When Bhole Nath\'s name is sung 108 times in unison, the hall goes quiet for 30 seconds afterward. Every. Single. Time.',
    ],
    spiritualSignificance:
      'Tandav is the cosmic dance — destruction that creates. To hear it live is to feel reset.',
    artists: [
      {
        name: 'Acharya Hariharan Iyer',
        bio: 'Has chanted at Kashi Vishwanath every Mahashivratri for 40 years. Voice carries the Ganges.',
        imageUrl: img('1507003211169-0a1dd7228f2d'),
        blessedCount: 1_50_000,
      },
    ],
    tiers: [
      { id: 'silver', name: 'Silver', price: 599, perks: ['Reserved seating', 'Welcome rudraksh thread', 'Digital chant book'], totalSeats: 1800, seatsRemaining: 920 },
      { id: 'gold', name: 'Gold', price: 1199, popular: true, perks: ['Center seating rows 5–12', 'Rudraksh thread + bhasma tilak', 'Digital chant book', 'Priority entry', 'Meet & greet token'], totalSeats: 600, seatsRemaining: 142 },
      { id: 'diamond', name: 'Diamond', price: 2999, perks: ['Front-row VIP', 'Silver rudraksh mala', 'Hardbound chant book', 'VIP lounge', 'Guaranteed meet & greet', 'Sattvic dinner', 'Certificate'], totalSeats: 180, seatsRemaining: 41 },
    ],
    testimonials: [
      { name: 'Karthik R.', city: 'Bangalore', tier: 'gold', rating: 5, quote: 'I have been to 20 concerts. None hit like this. The 108 Bhole Naths — I felt my spine straighten.', avatarUrl: img('1500648767791-00dcc994a43e') },
      { name: 'Anita P.', city: 'Mysore', tier: 'silver', rating: 5, quote: 'Drove 3 hours for it. Would drive 6.', avatarUrl: img('1438761681033-6461ffad8d80') },
    ],
    attendedCount: 2800,
    badge: 'trending',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 3. HANUMAN CHALISA MAHAYAGNA — Mumbai — 28 May 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'hanuman-chalisa-mahayagna-mumbai',
    title: 'Hanuman Chalisa Mahayagna',
    titleHindi: 'हनुमान चालीसा महायज्ञ',
    deity: 'Hanuman',
    category: 'mahayagna',
    city: 'Mumbai',
    venue: 'NSCI Dome',
    venueAddress: 'Lala Lajpat Rai Marg, Worli, Mumbai — 400018',
    date: '2026-05-28T17:00:00+05:30',
    doorsOpen: '4:30 PM',
    startTime: '5:00 PM',
    durationHours: 4,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: [
      img('1601926038011-0e1e7d6f4d0a'),
      img('1604608672516-f1b9b1b8b1b8'),
      img('1545158535-c3f7168c28b6'),
    ],
    pastEventVideos: [
      { thumbnailUrl: img('1601926038011-0e1e7d6f4d0a'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Hanuman Jayanti 2024 — 108 Chalisa recitations' },
      { thumbnailUrl: img('1604608672516-f1b9b1b8b1b8'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Sankat Mochan finale — 5,000 voices' },
    ],
    storyShort: '108 Hanuman Chalisa recitations in unison. The largest in Mumbai. Period.',
    storyLong: [
      'On a Tuesday in May, 5,000 devotees will recite the Hanuman Chalisa together — 108 times. By the 40th, the room will be vibrating.',
      'A havan kund the size of a small car will burn at the center, fed every 11 minutes. The smoke is sweet — guggul, sandalwood, ghee.',
      'You will leave with red eyes and a quieter mind. That is what Hanuman does.',
    ],
    spiritualSignificance:
      'The Chalisa removes Sankat — obstacles. 108 recitations remove the deepest ones.',
    artists: [
      {
        name: 'Pandit Shyam Mohan Goswami',
        bio: 'Lead priest at Mehandipur Balaji for 22 years. Has performed 4,000+ yagnas.',
        imageUrl: img('1507003211169-0a1dd7228f2d'),
        blessedCount: 3_60_000,
      },
    ],
    tiers: [
      { id: 'silver', name: 'Silver', price: 399, perks: ['Reserved seating', 'Hanuman locket', 'Digital Chalisa book'], totalSeats: 3500, seatsRemaining: 2100 },
      { id: 'gold', name: 'Gold', price: 899, popular: true, perks: ['Center seating', 'Hanuman locket + sindoor packet', 'Hardbound Chalisa', 'Priority entry', 'Yagna offering token'], totalSeats: 1200, seatsRemaining: 480 },
      { id: 'diamond', name: 'Diamond', price: 2199, perks: ['Front circle around havan kund', 'Silver Hanuman locket', 'Yagna participation', 'VIP lounge', 'Meet & greet', 'Sattvic dinner', 'Certificate'], totalSeats: 400, seatsRemaining: 88 },
    ],
    testimonials: [
      { name: 'Ramesh G.', city: 'Mumbai', tier: 'diamond', rating: 5, quote: 'Sat 8 feet from the havan. The heat, the chants — I felt every Sankat lift off me.', avatarUrl: img('1492562080023-ab3db95bfbce') },
      { name: 'Sneha D.', city: 'Thane', tier: 'gold', rating: 5, quote: 'Took my whole family. Mother said it was the most powerful evening of her life.', avatarUrl: img('1494790108377-be9c29b29330') },
    ],
    attendedCount: 5800,
    badge: 'trending',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 4. GANGA AARTI SUNSET — Goa — 4 June 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'ganga-aarti-sunset-goa',
    title: 'Ganga Aarti by the Sea',
    titleHindi: 'गंगा आरती',
    deity: 'Ganga',
    category: 'aarti-experience',
    city: 'Goa',
    venue: 'Miramar Beach Amphitheatre',
    venueAddress: 'Miramar, Panaji, Goa — 403002',
    date: '2026-06-04T18:30:00+05:30',
    doorsOpen: '5:30 PM',
    startTime: '6:30 PM',
    durationHours: 2,
    heroImage: img('1604608672516-f1b9b1b8b1b8'),
    galleryImages: [
      img('1604608672516-f1b9b1b8b1b8'),
      img('1601926038011-0e1e7d6f4d0a'),
      img('1545158535-c3f7168c28b6'),
    ],
    pastEventVideos: [
      { thumbnailUrl: img('1604608672516-f1b9b1b8b1b8'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Goa 2024 — sunset aarti at Miramar' },
    ],
    storyShort: 'Varanasi\'s Ganga Aarti — recreated on the Arabian Sea. Sunset till stars.',
    storyLong: [
      'The aarti you have only seen in videos from Varanasi — performed on the sand of Miramar, with the Arabian Sea as your Ganga.',
      'Eleven priests, brass lamps the size of footballs, and a sunset that seems choreographed for the moment.',
      'Bring your family. Bring your camera. Bring nothing — just be there.',
    ],
    spiritualSignificance:
      'Aarti is the moment of seeing — when you see the divine, and the divine sees you.',
    artists: [
      {
        name: 'Acharya Mishra (Varanasi)',
        bio: 'Has led the evening aarti at Dashashwamedh Ghat for 18 years. Travels for 3 events a year.',
        imageUrl: img('1507003211169-0a1dd7228f2d'),
        blessedCount: 95_000,
      },
    ],
    tiers: [
      { id: 'silver', name: 'Silver', price: 699, perks: ['Open seating on sand', 'Floating diya', 'Digital aarti book'], totalSeats: 1500, seatsRemaining: 760 },
      { id: 'gold', name: 'Gold', price: 1399, popular: true, perks: ['Reserved cushion seating', 'Floating diya + flower garland', 'Hardbound aarti book', 'Priority entry', 'Sunset photo token'], totalSeats: 500, seatsRemaining: 92 },
      { id: 'diamond', name: 'Diamond', price: 3499, perks: ['Front-row platform seating', 'Brass diya keepsake', 'Family of 2 floating diyas', 'Beachfront private lounge', 'Aarti participation', 'Sattvic dinner on the sand', 'Photographer assigned'], totalSeats: 120, seatsRemaining: 22 },
    ],
    testimonials: [
      { name: 'Maya F.', city: 'Goa', tier: 'gold', rating: 5, quote: 'I have lived in Goa 14 years. This was the most beautiful evening this beach has ever held.', avatarUrl: img('1494790108377-be9c29b29330') },
      { name: 'Rohan B.', city: 'Pune', tier: 'diamond', rating: 5, quote: 'Drove down for it. Diamond was overkill in the best way — beach lounge with my parents, dinner on the sand.', avatarUrl: img('1500648767791-00dcc994a43e') },
    ],
    attendedCount: 1900,
    badge: 'limited',
    featured: true,
  },

  // ═══════════════════════════════════════════════════════
  // 5. DEVI BHAJAN JAGRAN — Chennai — 12 June 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'devi-bhajan-jagran-chennai',
    title: 'Devi Bhajan Jagran',
    titleHindi: 'देवी भजन जागरण',
    deity: 'Devi',
    category: 'devi-jagran',
    city: 'Chennai',
    venue: 'Music Academy',
    venueAddress: 'TTK Road, Chennai — 600014',
    date: '2026-06-12T20:00:00+05:30',
    doorsOpen: '7:30 PM',
    startTime: '8:00 PM',
    durationHours: 5,
    heroImage: img('1601926038011-0e1e7d6f4d0a'),
    galleryImages: [
      img('1601926038011-0e1e7d6f4d0a'),
      img('1604608672516-f1b9b1b8b1b8'),
      img('1545158535-c3f7168c28b6'),
    ],
    pastEventVideos: [
      { thumbnailUrl: img('1601926038011-0e1e7d6f4d0a'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Navratri 2024 — all-night Mata jagran' },
    ],
    storyShort: 'All-night Mata jagran. 8 PM to 1 AM. The Devi listens loudest at midnight.',
    storyLong: [
      'A traditional jagran — five hours of bhajans, garba, and Devi paath. From 8 PM, when the doors open, until 1 AM, when the aarti closes the night.',
      'You will dance, you will sing, you will sit silent. The room takes you through every emotion the Devi knows.',
      'Tea and snacks served through the night. No one leaves before the final aarti — that is the rule of the Devi.',
    ],
    spiritualSignificance:
      'A jagran is a vow — to stay awake with the Mother through the night. She remembers.',
    artists: [
      {
        name: 'Smt. Anuradha Paudwal',
        bio: 'India\'s most-recorded Devi voice. 4,000+ recorded bhajans. Special 90-minute set.',
        imageUrl: img('1494790108377-be9c29b29330'),
        blessedCount: 12_00_000,
      },
    ],
    tiers: [
      { id: 'silver', name: 'Silver', price: 449, perks: ['Reserved seating', 'Welcome chai + prasad', 'Digital paath book'], totalSeats: 1600, seatsRemaining: 980 },
      { id: 'gold', name: 'Gold', price: 949, popular: true, perks: ['Center seating', 'Chai + prasad + bindi packet', 'Hardbound paath book', 'Priority entry', 'Midnight aarti token'], totalSeats: 500, seatsRemaining: 178 },
      { id: 'diamond', name: 'Diamond', price: 2299, perks: ['Front-row platform', 'Silver Devi locket', 'All-night refreshments', 'VIP lounge with cot rest', 'Aarti participation', 'Pre-dawn breakfast', 'Certificate'], totalSeats: 150, seatsRemaining: 47 },
    ],
    testimonials: [
      { name: 'Lakshmi V.', city: 'Chennai', tier: 'gold', rating: 5, quote: 'Stayed till 1:30 AM. Walked out feeling lighter than I have in years.', avatarUrl: img('1438761681033-6461ffad8d80') },
      { name: 'Suresh K.', city: 'Coimbatore', tier: 'silver', rating: 5, quote: 'My mother\'s 60th birthday. She has not stopped smiling for a week.', avatarUrl: img('1492562080023-ab3db95bfbce') },
    ],
    attendedCount: 2300,
    badge: 'new',
    featured: false,
  },

  // ═══════════════════════════════════════════════════════
  // 6. RAM NAAM SANKIRTAN — Delhi — 19 June 2026
  // ═══════════════════════════════════════════════════════
  {
    slug: 'ram-naam-sankirtan-delhi',
    title: 'Ram Naam Sankirtan',
    titleHindi: 'राम नाम संकीर्तन',
    deity: 'Ram',
    category: 'satsang',
    city: 'Delhi',
    venue: 'Talkatora Indoor Stadium',
    venueAddress: 'Talkatora Garden, New Delhi — 110001',
    date: '2026-06-19T18:30:00+05:30',
    doorsOpen: '6:00 PM',
    startTime: '6:30 PM',
    durationHours: 3,
    heroImage: img('1545158535-c3f7168c28b6'),
    galleryImages: [
      img('1545158535-c3f7168c28b6'),
      img('1604608672516-f1b9b1b8b1b8'),
      img('1601926038011-0e1e7d6f4d0a'),
    ],
    pastEventVideos: [
      { thumbnailUrl: img('1545158535-c3f7168c28b6'), videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', caption: 'Ram Navami 2024 — sankirtan with 3,500 voices' },
    ],
    storyShort: '108-minute non-stop Ram Naam. Doors close at 6:30 sharp — no late entry.',
    storyLong: [
      '108 minutes. One name. Ten thousand repetitions. No breaks, no announcements, no introductions — just Ram, Ram, Ram, until the room becomes the name.',
      'Doors close at 6:30 PM and do not reopen until 8:18 PM. This is a sankirtan, not a concert.',
      'Bring water. Bring patience. Leave with something quieter than you came in with.',
    ],
    spiritualSignificance:
      'The Ram Naam is the boat. 108 minutes of it crosses what years of effort cannot.',
    artists: [
      {
        name: 'Swami Atmananda Saraswati',
        bio: 'Disciple of Swami Dayananda. Has led sankirtans across 14 countries.',
        imageUrl: img('1507003211169-0a1dd7228f2d'),
        blessedCount: 60_000,
      },
    ],
    tiers: [
      { id: 'silver', name: 'Silver', price: 349, perks: ['Reserved seating', 'Tulsi mala', 'Digital sankirtan card'], totalSeats: 1800, seatsRemaining: 1100 },
      { id: 'gold', name: 'Gold', price: 799, popular: true, perks: ['Center seating', 'Tulsi mala + Ram tilak', 'Hardbound sankirtan book', 'Priority entry', 'Post-event satsang access'], totalSeats: 600, seatsRemaining: 215 },
      { id: 'diamond', name: 'Diamond', price: 1899, perks: ['Front-circle around the dais', 'Sandalwood Ram mala', 'Pre-event meet with Swamiji', 'VIP lounge', 'Sattvic dinner', 'Personal blessing token', 'Certificate'], totalSeats: 200, seatsRemaining: 56 },
    ],
    testimonials: [
      { name: 'Deepak A.', city: 'Delhi', tier: 'silver', rating: 5, quote: '108 minutes flew. I checked my watch at 7:50 thinking 20 minutes had passed.', avatarUrl: img('1492562080023-ab3db95bfbce') },
      { name: 'Asha M.', city: 'Faridabad', tier: 'gold', rating: 5, quote: 'I have been to many satsangs. None pulled me in like this one. The silence at 8:18 was thunderous.', avatarUrl: img('1438761681033-6461ffad8d80') },
    ],
    attendedCount: 3400,
    badge: 'limited',
    featured: false,
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
  return EVENTS.filter((e) => e.city === city);
}

// ─── LIVE BOOKING TICKER (rotates every 90s in the UI) ───
export const RECENT_BOOKINGS: LiveBooking[] = [
  { name: 'Rahul', city: 'Mumbai', tier: 'gold', minutesAgo: 2 },
  { name: 'Priya', city: 'Delhi', tier: 'silver', minutesAgo: 4 },
  { name: 'Karthik', city: 'Bangalore', tier: 'diamond', minutesAgo: 6 },
  { name: 'Anjali', city: 'Pune', tier: 'gold', minutesAgo: 8 },
  { name: 'Suresh', city: 'Chennai', tier: 'gold', minutesAgo: 11 },
  { name: 'Maya', city: 'Goa', tier: 'diamond', minutesAgo: 13 },
  { name: 'Vikram', city: 'Noida', tier: 'silver', minutesAgo: 15 },
  { name: 'Neha', city: 'Gurugram', tier: 'gold', minutesAgo: 17 },
  { name: 'Arjun', city: 'Hyderabad', tier: 'gold', minutesAgo: 19 },
  { name: 'Sneha', city: 'Thane', tier: 'silver', minutesAgo: 22 },
  { name: 'Lakshmi', city: 'Coimbatore', tier: 'gold', minutesAgo: 25 },
  { name: 'Rohan', city: 'Pune', tier: 'diamond', minutesAgo: 28 },
];
