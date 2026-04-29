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
  { name: 'A.',  city: 'Mumbai',    rating: 5, quote: 'I dragged my parents along. By the third bhajan, dad was crying. Already booking the next city.' },
  { name: 'K.',  city: 'Pune',      rating: 5, quote: 'Showed up alone. Walked out with eight new people I am meeting next weekend. The Albela Band is something else.' },
  { name: 'R.',  city: 'Ahmedabad', rating: 5, quote: 'My dadi knew every word. I learned half. Going back next month, taking my whole hostel.' },
  { name: 'V.',  city: 'Mumbai',    rating: 5, quote: 'Three hours felt like twenty minutes. The encore on Hare Krishna — I will hear it for weeks.' },
  { name: 'N.',  city: 'Bengaluru', rating: 5, quote: 'Best Saturday I have had in months. We need this monthly. We need this everywhere.' },
  { name: 'S.',  city: 'Surat',     rating: 5, quote: 'Came in skeptical. Left in tears. The drop on Achyutam Keshavam — goosebumps for the rest of the night.' },
];
