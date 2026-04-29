// ─── DOMAIN TYPES ──────────────────────────────────────────
export type City =
  | 'Mumbai'
  | 'Pune'
  | 'Ahmedabad'
  | 'Surat'
  | 'Delhi'
  | 'Bangalore'
  | 'Hyderabad'
  | 'Chennai'
  | 'Kolkata'
  | 'Goa';

export type Tier = 'silver' | 'gold' | 'diamond';

export type EventCategory =
  | 'bhajan-sandhya'
  | 'kirtan-night'
  | 'mahayagna'
  | 'aarti-experience'
  | 'devi-jagran'
  | 'satsang';

export interface Artist {
  name: string;
  bio: string; // 2 lines max
  imageUrl: string;
  blessedCount: number; // "X devotees blessed"
}

export interface TicketTier {
  id: Tier;
  name: string; // "Silver" | "Gold" | "Diamond"
  price: number; // INR
  perks: string[]; // 3 / 5 / 7 perks
  totalSeats: number;
  seatsRemaining: number;
  popular?: boolean;
}

export interface Testimonial {
  name: string;
  city: string;
  tier: Tier;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string; // max 2 lines
  avatarUrl?: string;
}

export interface VideoAsset {
  thumbnailUrl: string;
  videoUrl: string; // can be YouTube embed or mp4
  caption: string;
}

export interface DevotionalEvent {
  slug: string;
  title: string;
  titleHindi?: string;       // Tiro Devanagari accent
  deity: string;             // "Krishna", "Shiv", "Hanuman", etc.
  category: EventCategory;
  city: City;
  venue: string;
  venueAddress: string;
  date: string;              // ISO
  doorsOpen: string;         // "5:30 PM"
  startTime: string;         // "6:00 PM"
  durationHours: number;
  heroImage: string;
  heroVideo?: string;        // hero loop video (mp4)
  galleryImages: string[];
  pastEventVideos: VideoAsset[];
  storyShort: string;        // 1 line — for cards
  storyLong: string[];       // 2-3 paragraphs — for detail page
  spiritualSignificance: string;
  artists: Artist[];
  tiers: TicketTier[];
  testimonials: Testimonial[];
  attendedCount: number;     // "4,200+ devotees attended Diwali 2024"
  badge?: 'trending' | 'almost-full' | 'limited' | 'new';
  featured?: boolean;
}

export interface BookingDraft {
  eventSlug: string;
  tier: Tier;
  quantity: number;
  selectedSeatIds?: string[];
  subtotal: number;
  convenienceFee: number;
  total: number;
}

export interface BookingDetails {
  fullName: string;
  email: string;
  whatsapp: string; // E.164, +91 prefix
}

export interface LiveBooking {
  name: string;
  city: string;
  tier: Tier;
  minutesAgo: number;
}
