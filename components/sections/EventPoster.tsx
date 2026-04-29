'use client';

import type { DevotionalEvent } from '@/types';

interface EventPosterProps {
  event: DevotionalEvent;
  className?: string;
}

/**
 * EventPoster — SVG poster generated from event data, on-brand by default.
 *
 *   • Saffron → maroon radial backdrop
 *   • Two stage spotlight cones from the top
 *   • Decorative concentric mandala ring at centre
 *   • "BOOKMYBHAJAN PRESENTS" eyebrow
 *   • "Bhajan Clubbing" italic display headline
 *   • "ft. Fusion Albela Band"
 *   • Big date block · doors line
 *   • Venue & city footer
 *   • "BOOK TICKETS NOW" pill at the bottom
 *
 * Square 800×800. Every card and the product hero use this — no more
 * generic stock photos.
 */
export function EventPoster({ event, className }: EventPosterProps) {
  const d = new Date(event.date);
  const day = d.getDate();
  const month = d.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase();
  const year = d.getFullYear();
  const weekday = d.toLocaleDateString('en-IN', { weekday: 'long' }).toUpperCase();
  const safeId = event.slug.replace(/[^a-z0-9-]/gi, '');

  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${event.title} poster`}
    >
      <defs>
        <radialGradient id={`bg-${safeId}`} cx="50%" cy="-10%" r="130%">
          <stop offset="0%" stopColor="#ffae57" />
          <stop offset="30%" stopColor="#ff6b1a" />
          <stop offset="65%" stopColor="#7a2a3f" />
          <stop offset="100%" stopColor="#1f0a13" />
        </radialGradient>
        <linearGradient id={`spot-${safeId}`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,224,150,0.55)" />
          <stop offset="100%" stopColor="rgba(255,224,150,0)" />
        </linearGradient>
        <linearGradient id={`pill-${safeId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ffae57" />
          <stop offset="100%" stopColor="#ff7a1a" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="800" height="800" fill={`url(#bg-${safeId})`} />

      {/* Stage spotlights from above */}
      <path d="M 110 0 L 240 0 L 360 800 L -10 800 Z" fill={`url(#spot-${safeId})`} />
      <path d="M 560 0 L 690 0 L 810 800 L 440 800 Z" fill={`url(#spot-${safeId})`} />

      {/* Decorative mandala ring */}
      <g transform="translate(400, 400)" opacity="0.16" stroke="#fff5e3" strokeWidth="1.4" fill="none">
        <circle r="200" />
        <circle r="220" />
        <circle r="240" strokeDasharray="2 6" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-200"
            x2="0"
            y2="-240"
            transform={`rotate(${(i * 360) / 24})`}
          />
        ))}
      </g>

      {/* Top: brand presents */}
      <text
        x="400"
        y="78"
        fill="#fff5e3"
        textAnchor="middle"
        fontSize="18"
        letterSpacing="6"
        opacity="0.95"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="800"
      >
        BOOKMYBHAJAN PRESENTS
      </text>

      {/* Hindi accent */}
      {event.titleHindi && (
        <text
          x="400"
          y="138"
          fill="#ffd9a8"
          textAnchor="middle"
          fontSize="22"
          fontFamily="ui-serif, serif"
          opacity="0.9"
        >
          {event.titleHindi}
        </text>
      )}

      {/* Big italic — "Bhajan Clubbing" */}
      <text
        x="400"
        y="280"
        fill="#fff5e3"
        textAnchor="middle"
        fontSize="92"
        fontStyle="italic"
        fontWeight="600"
        fontFamily="ui-serif, Georgia, serif"
        letterSpacing="-1"
      >
        Bhajan Clubbing
      </text>

      <text
        x="400"
        y="332"
        fill="#ffd9a8"
        textAnchor="middle"
        fontSize="28"
        fontStyle="italic"
        fontFamily="ui-serif, Georgia, serif"
      >
        ft. Fusion Albela Band
      </text>

      {/* Divider */}
      <line x1="320" y1="380" x2="480" y2="380" stroke="#ffae57" strokeWidth="1" opacity="0.6" />

      {/* Date block */}
      <text
        x="400"
        y="498"
        fill="#fff5e3"
        textAnchor="middle"
        fontSize="58"
        fontWeight="800"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        letterSpacing="3"
      >
        {day} {month} {year}
      </text>
      <text
        x="400"
        y="538"
        fill="#ffae57"
        textAnchor="middle"
        fontSize="20"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="700"
        letterSpacing="6"
        opacity="0.9"
      >
        {weekday} · {event.startTime}
      </text>

      {/* Venue */}
      <text
        x="400"
        y="608"
        fill="#fff5e3"
        textAnchor="middle"
        fontSize="20"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontWeight="500"
        opacity="0.95"
      >
        {event.venue}
      </text>
      <text
        x="400"
        y="636"
        fill="#fff5e3"
        textAnchor="middle"
        fontSize="16"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        opacity="0.7"
      >
        {event.city}
      </text>

      {/* Book pill */}
      <g transform="translate(265, 695)">
        <rect width="270" height="56" rx="28" fill={`url(#pill-${safeId})`} />
        <text
          x="135"
          y="36"
          fill="#1f0a13"
          textAnchor="middle"
          fontSize="16"
          fontWeight="800"
          fontFamily="ui-sans-serif, system-ui, sans-serif"
          letterSpacing="3"
        >
          BOOK TICKETS NOW
        </text>
      </g>
    </svg>
  );
}
