import type { Metadata, Viewport } from 'next';
import { Manrope, Fraunces, Hind } from 'next/font/google';
import Script from 'next/script';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

// ─── Fonts — contemporary, mobile-readable, devotional warmth ────────
//
// Manrope:  modern geometric sans — body + UI. Variable, very legible at 14–18px.
// Fraunces: friendly modern serif — display headlines, hero, sections. Has personality.
// Hind:     clean Devanagari — Hindi accent runs.
const sans = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
  preload: true,
});

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  weight: ['500', '600', '700', '800', '900'],
  preload: true,
});

const deva = Hind({
  subsets: ['devanagari'],
  display: 'swap',
  variable: '--font-deva',
  weight: ['400', '500', '600', '700'],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://bookmybhajan.com'),
  title: {
    default: 'BookMyBhajan — India\'s Biggest Bhajan Clubbing nights',
    template: '%s · BookMyBhajan',
  },
  description:
    'Bhakti meets the beat. Fusion Albela Band live across Mumbai, Pune, Ahmedabad, Surat, Delhi & Bangalore. Tickets from ₹299. WhatsApp e-ticket. Razorpay-secure.',
  keywords: ['bhajan clubbing', 'fusion albela band', 'bhajan tickets', 'kirtan tickets', 'bookmybhajan', 'devotional concert india'],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'BookMyBhajan',
    title: 'BookMyBhajan — Bhakti meets the beat',
    description: 'Fusion Albela Band live across 6 Indian cities. Tickets from ₹299.',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#1a0a2e',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${deva.variable}`}>
      <head>
        {/* GTM container slot — single script, all tags managed inside */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script
            id="gtm-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
                j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className="antialiased">
        {/* GTM noscript fallback */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        <Navbar />
        <main id="main">{children}</main>
        <Footer />

        {/* PostHog — load AFTER TTI so it never blocks LCP */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <Script
            id="posthog-init"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep onSessionId".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', { api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com'}' });
              `,
            }}
          />
        )}
      </body>
    </html>
  );
}
