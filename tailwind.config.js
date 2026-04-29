/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // 2026 Liquid Glass palette — devotional luxe
        ink: {
          900: '#0a0414', // deepest base
          800: '#120726',
          700: '#1a0a2e', // hero gradient start
          600: '#251040',
          500: '#321956',
        },
        saffron: {
          50: '#fff4e6',
          100: '#ffe1bd',
          200: '#ffc88a',
          300: '#ffae57',
          400: '#ff9430',
          500: '#ff6b1a', // hero gradient end
          600: '#e85614',
          700: '#c0440c',
        },
        gold: {
          DEFAULT: '#d4a017', // temple gold — CTAs only
          50: '#fdf7e2',
          100: '#f9ebb0',
          200: '#f0d96a',
          300: '#e3c235',
          400: '#d4a017',
          500: '#b3850e',
          600: '#8c6708',
        },
        text: {
          primary: '#f5f0ff', // warm near-white
          muted: 'rgba(245,240,255,0.55)',
          subtle: 'rgba(245,240,255,0.35)',
        },
        glass: {
          surface: 'rgba(255,255,255,0.06)',
          surfaceHi: 'rgba(255,255,255,0.10)',
          border: 'rgba(255,255,255,0.12)',
          borderGlow: 'rgba(212,160,23,0.35)',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        deva: ['var(--font-tiro)', 'serif'],
      },
      fontSize: {
        // Mobile-first scale — 16px floor
        'eyebrow': ['12px', { lineHeight: '16px', letterSpacing: '0.18em' }],
        'h1-mobile': ['36px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'h1': ['56px', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        'h1-xl': ['72px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
      },
      backdropBlur: {
        glass: '8px', // 6-10px max — non-negotiable
        glassLo: '6px',
        glassHi: '10px',
      },
      backgroundImage: {
        'hero-grad':
          'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,107,26,0.22) 0%, rgba(26,10,46,0.0) 60%), linear-gradient(180deg, #1a0a2e 0%, #0a0414 100%)',
        'gold-grad':
          'linear-gradient(135deg, #e3c235 0%, #d4a017 50%, #b3850e 100%)',
        'saffron-grad':
          'linear-gradient(135deg, #ff9430 0%, #ff6b1a 50%, #c0440c 100%)',
        'ticker-fade':
          'linear-gradient(90deg, transparent 0%, rgba(10,4,20,0) 5%, rgba(10,4,20,0) 95%, transparent 100%)',
      },
      boxShadow: {
        'gold-glow': '0 0 0 0 rgba(212,160,23,0.7)',
        'gold-glow-lg': '0 8px 28px -6px rgba(212,160,23,0.45)',
        'glass': '0 12px 40px -12px rgba(0,0,0,0.55)',
        'card-hover': '0 22px 48px -16px rgba(212,160,23,0.35), 0 8px 18px -8px rgba(0,0,0,0.6)',
      },
      animation: {
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'ticker': 'ticker 38s linear infinite',
        'flame-flicker': 'flameFlicker 1.6s ease-in-out infinite',
        'shine': 'shine 2.4s ease-in-out infinite',
      },
      keyframes: {
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,160,23,0.55)' },
          '50%': { boxShadow: '0 0 0 14px rgba(212,160,23,0)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flameFlicker: {
          '0%, 100%': { opacity: '0.92', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        shine: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
