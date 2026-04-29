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
        // ─── LIGHT DEVOTIONAL PALETTE — cream / saffron / marigold / temple-gold / sindoor-maroon ───

        // Cream — surface family (page backgrounds, cards on light)
        cream: {
          50:  '#fffaf0',
          100: '#fff5e3',
          200: '#fdebcc',
          300: '#fadeb0',
          400: '#f6cf8a',
        },

        // Saffron — primary CTA, hero accent, urgency
        saffron: {
          50:  '#fff4e6',
          100: '#ffe1bd',
          200: '#ffc88a',
          300: '#ffae57',
          400: '#ff9430',
          500: '#ff7a1a',
          600: '#e8651a',
          700: '#c0440c',
        },

        // Marigold — secondary accent, festive highlight
        marigold: {
          50:  '#fff8de',
          100: '#fbecb6',
          200: '#f7df8c',
          300: '#f4d069',
          400: '#f4b942',
          500: '#e0a233',
          600: '#bd8525',
        },

        // Gold — premium accent (CTA fills, divider lines, certificate touches)
        gold: {
          DEFAULT: '#c9921a',
          50:  '#fdf7e2',
          100: '#f9ebb0',
          200: '#f0d96a',
          300: '#e3c235',
          400: '#d4a017',
          500: '#c9921a',
          600: '#a87810',
          700: '#7d590a',
        },

        // Maroon — sindoor-deep, used for Hindi accent text and ornament
        maroon: {
          50:  '#fbe9ee',
          100: '#f3c1cd',
          200: '#e890aa',
          300: '#cc5d7a',
          500: '#9b3a52',
          700: '#7a2a3f',
          800: '#5a1f3a',
          900: '#3d1426',
        },

        // Ink — kept for occasional dark surfaces (modal backdrops, dim overlays)
        ink: {
          900: '#1f0a13', // deepest text colour
          800: '#3d1426',
          700: '#5a1f3a',
          600: '#7a3550',
          500: '#9b556e',
        },

        // Semantic text + glass tokens (keep keys stable so JSX doesn't churn)
        text: {
          primary: '#1f0a13',
          strong:  '#3d1426',
          muted:   'rgba(31,10,19,0.62)',
          subtle:  'rgba(31,10,19,0.42)',
        },
        glass: {
          surface:    'rgba(255,255,255,0.55)',
          surfaceHi:  'rgba(255,255,255,0.78)',
          border:     'rgba(122,42,63,0.16)',
          borderGlow: 'rgba(201,146,26,0.45)',
        },
      },

      fontFamily: {
        display: ['var(--font-cormorant)', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        deva:    ['var(--font-tiro)', 'serif'],
      },

      fontSize: {
        eyebrow:    ['12px', { lineHeight: '16px', letterSpacing: '0.18em' }],
        'h1-mobile':['40px', { lineHeight: '1.04', letterSpacing: '-0.02em' }],
        h1:         ['64px', { lineHeight: '1.0',  letterSpacing: '-0.025em' }],
        'h1-xl':    ['88px', { lineHeight: '0.96', letterSpacing: '-0.03em' }],
      },

      backdropBlur: {
        glass:   '8px',
        glassLo: '5px',
        glassHi: '12px',
      },

      backgroundImage: {
        // Body / page warm gradient — sandalwood + marigold + saffron glow
        'page-grad':
          'radial-gradient(1200px 700px at 80% -10%, rgba(255,122,26,0.22) 0%, transparent 60%),' +
          'radial-gradient(900px 600px at -10% 25%,  rgba(244,185,66,0.28) 0%, transparent 60%),' +
          'radial-gradient(1000px 800px at 50% 110%, rgba(122,42,63,0.10)  0%, transparent 70%),' +
          'linear-gradient(180deg, #fff5e3 0%, #fdebcc 60%, #fadeb0 100%)',

        // Hero — warm glow concentrated on subject
        'hero-grad':
          'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(255,122,26,0.32) 0%, rgba(255,245,227,0) 60%),' +
          'linear-gradient(180deg, #fff5e3 0%, #fdebcc 100%)',

        // CTA fills
        'gold-grad':
          'linear-gradient(135deg, #f4d069 0%, #c9921a 50%, #a87810 100%)',
        'saffron-grad':
          'linear-gradient(135deg, #ffae57 0%, #ff7a1a 50%, #c0440c 100%)',
        'marigold-grad':
          'linear-gradient(135deg, #f7df8c 0%, #f4b942 60%, #bd8525 100%)',

        // Decorative
        'kalash-shine':
          'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
      },

      boxShadow: {
        'gold-glow':     '0 0 0 0 rgba(201,146,26,0.55)',
        'gold-glow-lg':  '0 8px 28px -6px rgba(201,146,26,0.45)',
        'saffron-glow':  '0 12px 36px -8px rgba(255,107,26,0.55)',
        glass:           '0 12px 40px -12px rgba(122,42,63,0.18)',
        'card-hover':    '0 24px 56px -18px rgba(255,107,26,0.30), 0 10px 22px -10px rgba(122,42,63,0.18)',
      },

      animation: {
        'gold-pulse':     'goldPulse 2s ease-in-out infinite',
        'ticker':         'ticker 38s linear infinite',
        'flame-flicker':  'flameFlicker 1.6s ease-in-out infinite',
        'shine':          'shine 2.4s ease-in-out infinite',
        'float-slow':     'floatSlow 6s ease-in-out infinite',
      },

      keyframes: {
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,146,26,0.55)' },
          '50%':      { boxShadow: '0 0 0 14px rgba(201,146,26,0)' },
        },
        ticker: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        flameFlicker: {
          '0%, 100%': { opacity: '0.92', transform: 'scale(1)' },
          '50%':      { opacity: '1',    transform: 'scale(1.06)' },
        },
        shine: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
