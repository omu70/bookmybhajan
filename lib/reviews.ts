/**
 * REVIEWS — placeholder copy.
 *
 * ⚠️ REPLACE WITH REAL ATTENDEE REVIEWS BEFORE LAUNCH.
 *   • Collect via WhatsApp / Instagram DM after each show.
 *   • Keep first-name-only attribution unless you have explicit consent.
 *   • Swap out this array; the component renders whatever it finds.
 */

export interface DevoteeReview {
  /** First name (or alias) */
  name: string;
  city: string;
  /** Optional event slug if you want to link the review to a specific show */
  eventSlug?: string;
  /** 1–5 */
  rating: number;
  quote: string;
}

export const REVIEWS: DevoteeReview[] = [
  // Placeholder — short, believable, anonymous-feeling. Replace with the real ones.
  { name: 'A.',  city: 'Mumbai',    rating: 5, quote: 'Dad cried by the third bhajan. Already booking the next city.' },
  { name: 'K.',  city: 'Pune',      rating: 5, quote: 'Came alone, left with eight new friends. The Albela Band is something else.' },
  { name: 'R.',  city: 'Ahmedabad', rating: 5, quote: 'Dadi knew every word. I learned half. Taking my whole hostel next time.' },
  { name: 'V.',  city: 'Mumbai',    rating: 5, quote: 'Three hours felt like twenty minutes. The encore — goosebumps.' },
];
