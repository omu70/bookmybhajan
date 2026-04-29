'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn, formatINR } from '@/lib/utils';
import type { TicketTier, Tier } from '@/types';
import { ScarcityBadge } from '@/components/ui/ScarcityBadge';

interface AuditoriumZonesProps {
  tiers: TicketTier[];
  /** Selected tier id — drives which zone is highlighted */
  active: Tier;
  /** Optional click handler (lifts selection state up to the parent) */
  onZoneClick?: (id: Tier) => void;
  /** Read-only mode — no hover/click affordances */
  readOnly?: boolean;
}

/**
 * AuditoriumZones — visual venue map matching the actual bookmybhajan layout.
 *
 *   • Three coloured zones — Silver (back), Gold (middle), Diamond (front-of-stage)
 *   • Stage at the bottom edge, "ENTRANCE" labels mid-aisle
 *   • Click any zone to mirror the parent's selected tier (optional)
 *   • Within a zone, seating is first-come-first-served — no individual seat picker.
 *
 * Visual style references the venue maps the brand uses on bookmybhajan.com.
 */

const ZONE_STYLES = {
  silver: {
    fillIdle:    '#fdebcc',
    fillActive:  '#f4d069',
    stroke:      '#c9921a',
    label:       'Silver',
    labelColor:  '#7d590a',
  },
  gold: {
    fillIdle:    '#cfe1ff',
    fillActive:  '#7fa9f0',
    stroke:      '#3478e0',
    label:       'Gold',
    labelColor:  '#1d4a99',
  },
  diamond: {
    fillIdle:    '#cfeed7',
    fillActive:  '#73c98c',
    stroke:      '#2f8a4f',
    label:       'Diamond',
    labelColor:  '#1d5a35',
  },
} as const;

export function AuditoriumZones({
  tiers,
  active,
  onZoneClick,
  readOnly = false,
}: AuditoriumZonesProps) {
  const [hover, setHover] = useState<Tier | null>(null);

  const silver  = tiers.find((t) => t.id === 'silver');
  const gold    = tiers.find((t) => t.id === 'gold');
  const diamond = tiers.find((t) => t.id === 'diamond');

  const isHi = (id: Tier) => active === id || hover === id;

  return (
    <div className="rounded-3xl border border-glass-border bg-cream-50 p-5 shadow-glass sm:p-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <div>
          <p className="eyebrow">Venue layout</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-text-primary">
            Pick your area
          </h3>
        </div>
        <p className="max-w-[18rem] text-right text-xs text-text-muted">
          Seating is <span className="font-semibold text-text-strong">first-come-first-served</span>{' '}
          inside each area — early entry = better view.
        </p>
      </div>

      {/* SVG venue */}
      <div className="relative mx-auto aspect-[5/6] w-full max-w-md">
        <svg
          viewBox="0 0 500 600"
          className="h-full w-full"
          role="img"
          aria-label="Auditorium seating areas: Silver at the back, Gold in the middle, Diamond near the stage"
        >
          {/* House frame */}
          <rect
            x="10" y="10" width="480" height="580"
            rx="14"
            fill="#fff5e3"
            stroke="rgba(122,42,63,0.18)"
            strokeWidth="1.5"
          />

          {/* SILVER — back / upper rows */}
          <Zone
            tier="silver"
            tierMeta={silver}
            isActive={isHi('silver')}
            x={30} y={40} w={440} h={180}
            seatRows={6}
            seatCols={22}
            readOnly={readOnly}
            onClick={() => onZoneClick?.('silver')}
            onHover={setHover}
          />

          {/* GOLD — middle rows */}
          <Zone
            tier="gold"
            tierMeta={gold}
            isActive={isHi('gold')}
            x={30} y={235} w={440} h={170}
            seatRows={5}
            seatCols={22}
            readOnly={readOnly}
            onClick={() => onZoneClick?.('gold')}
            onHover={setHover}
          />

          {/* DIAMOND — front-of-stage */}
          <Zone
            tier="diamond"
            tierMeta={diamond}
            isActive={isHi('diamond')}
            x={60} y={420} w={380} h={120}
            seatRows={4}
            seatCols={18}
            readOnly={readOnly}
            onClick={() => onZoneClick?.('diamond')}
            onHover={setHover}
          />

          {/* Aisle / entrance markers */}
          <g opacity="0.55" fontSize="9" fontWeight="700" fill="#7a2a3f" letterSpacing="2">
            <text x="180" y="222" textAnchor="middle">ENTRANCE</text>
            <text x="320" y="222" textAnchor="middle">ENTRANCE</text>
          </g>

          {/* Stage */}
          <rect x="60" y="555" width="380" height="22" rx="4" fill="#1f0a13" />
          <text
            x="250" y="571"
            textAnchor="middle"
            fontSize="11"
            letterSpacing="6"
            fontWeight="700"
            fill="#fff5e3"
          >
            STAGE
          </text>
        </svg>
      </div>

      {/* Zone legend with prices + scarcity */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {(['diamond', 'gold', 'silver'] as Tier[]).map((id) => {
          const t = tiers.find((tt) => tt.id === id);
          if (!t) return null;
          const isActive = active === id;
          const colour = ZONE_STYLES[id];
          return (
            <button
              key={id}
              type="button"
              disabled={readOnly}
              onClick={() => onZoneClick?.(id)}
              className={cn(
                'group flex items-center gap-3 rounded-xl border p-3 text-left transition-all',
                isActive
                  ? 'border-saffron-500/60 bg-saffron-50 shadow-gold-glow-lg'
                  : 'border-maroon-900/12 bg-cream-50 hover:border-saffron-500/40'
              )}
            >
              <span
                className="size-6 shrink-0 rounded"
                style={{ background: colour.fillActive, border: `1px solid ${colour.stroke}` }}
                aria-hidden
              />
              <div className="flex-1">
                <p className="text-sm font-bold text-text-primary">{colour.label}</p>
                <p className="text-xs text-text-muted">{formatINR(t.price)}</p>
              </div>
              <ScarcityBadge remaining={t.seatsRemaining} total={t.totalSeats} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Internal: a single zone ──────────────────────────────────────────
function Zone({
  tier,
  tierMeta,
  isActive,
  x,
  y,
  w,
  h,
  seatRows,
  seatCols,
  readOnly,
  onClick,
  onHover,
}: {
  tier: Tier;
  tierMeta?: TicketTier;
  isActive: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  seatRows: number;
  seatCols: number;
  readOnly?: boolean;
  onClick?: () => void;
  onHover?: (id: Tier | null) => void;
}) {
  const cfg = ZONE_STYLES[tier];

  // Generate a faint dot grid hinting at seats — no per-seat clicking.
  const dots: React.ReactNode[] = [];
  const padX = 16;
  const padY = 16;
  const aisleX = w / 2; // center aisle
  const cols = seatCols;
  const rows = seatRows;
  const colSpace = (w - padX * 2) / (cols - 1);
  const rowSpace = (h - padY * 2) / (rows - 1);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Skip the column straddling the center aisle to mimic the ENTRANCE gap
      const centerCol = Math.floor(cols / 2);
      if (c === centerCol || c === centerCol - 1) continue;
      const cx = x + padX + c * colSpace;
      const cy = y + padY + r * rowSpace;
      dots.push(
        <rect
          key={`${r}-${c}`}
          x={cx - 2.2}
          y={cy - 2.2}
          width={4.4}
          height={4.4}
          rx={0.7}
          fill="rgba(31,10,19,0.32)"
          opacity={isActive ? 0.55 : 0.32}
        />
      );
    }
  }

  return (
    <g
      style={{ cursor: readOnly ? 'default' : 'pointer' }}
      onClick={readOnly ? undefined : onClick}
      onMouseEnter={readOnly ? undefined : () => onHover?.(tier)}
      onMouseLeave={readOnly ? undefined : () => onHover?.(null)}
    >
      <motion.rect
        x={x} y={y} width={w} height={h}
        rx="8"
        animate={{
          fill: isActive ? cfg.fillActive : cfg.fillIdle,
          opacity: isActive ? 1 : 0.78,
        }}
        transition={{ duration: 0.35 }}
        stroke={cfg.stroke}
        strokeWidth={isActive ? 2.4 : 1}
      />
      {dots}

      {/* Zone label inside */}
      <text
        x={x + w / 2}
        y={y + h / 2 + 6}
        textAnchor="middle"
        fontSize={tier === 'diamond' ? 26 : 32}
        fontStyle="italic"
        fontWeight="700"
        fill={cfg.labelColor}
        opacity={isActive ? 0.95 : 0.75}
        fontFamily="serif"
        style={{ pointerEvents: 'none' }}
      >
        {cfg.label}
      </text>

      {/* Price chip */}
      {tierMeta && (
        <g style={{ pointerEvents: 'none' }}>
          <rect
            x={x + w - 78}
            y={y + 8}
            width={70}
            height={22}
            rx={11}
            fill="#1f0a13"
            opacity="0.85"
          />
          <text
            x={x + w - 43}
            y={y + 23}
            textAnchor="middle"
            fontSize="11"
            fontWeight="700"
            fill="#fff5e3"
          >
            ₹{tierMeta.price}
          </text>
        </g>
      )}
    </g>
  );
}
