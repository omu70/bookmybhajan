'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Lock, MessageCircle, RotateCcw, Send } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const [phone, setPhone] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\+?[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))) return;
    trackEvent('whatsapp_optin', { source: 'footer' });
    setDone(true);
  };

  return (
    <footer className="mt-24 border-t border-white/5 bg-ink-900/60 backdrop-blur-glassLo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand + WhatsApp opt-in */}
          <div className="md:col-span-2">
            <p className="font-display text-2xl font-bold">Darshan</p>
            <p className="mt-2 max-w-md text-sm text-text-muted">
              India&apos;s most trusted devotional ticketing platform. Bhajans, kirtans,
              jagrans — booked in seconds, delivered to your WhatsApp.
            </p>

            {!done ? (
              <form
                onSubmit={submit}
                className="mt-5 flex max-w-md gap-2 rounded-full border border-glass-border bg-glass-surface p-1.5"
              >
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Get event drops on WhatsApp"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-transparent px-3 text-sm placeholder:text-text-muted focus:outline-none"
                  aria-label="WhatsApp number"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-4 py-2 text-xs font-bold text-ink-900 hover:brightness-110"
                >
                  <Send className="size-3.5" />
                  Subscribe
                </button>
              </form>
            ) : (
              <p className="mt-5 text-sm text-gold">
                ✓ Subscribed. We will WhatsApp you when new events drop.
              </p>
            )}
          </div>

          <FooterCol
            title="Explore"
            links={[
              { label: 'All events', href: '/events' },
              { label: 'Delhi', href: '/events?city=Delhi' },
              { label: 'Mumbai', href: '/events?city=Mumbai' },
              { label: 'Bangalore', href: '/events?city=Bangalore' },
              { label: 'Chennai', href: '/events?city=Chennai' },
              { label: 'Goa', href: '/events?city=Goa' },
            ]}
          />

          <FooterCol
            title="Support"
            links={[
              { label: 'Refund policy', href: '/policies/refund' },
              { label: 'Privacy', href: '/policies/privacy' },
              { label: 'Terms', href: '/policies/terms' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 border-t border-white/5 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} Darshan Tickets · Made with bhakti in Bharat
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-text-muted">
            <span className="inline-flex items-center gap-1.5"><Lock className="size-3.5 text-gold" /> 100% Secure</span>
            <span className="inline-flex items-center gap-1.5"><MessageCircle className="size-3.5 text-gold" /> WhatsApp e-ticket</span>
            <span className="inline-flex items-center gap-1.5"><RotateCcw className="size-3.5 text-gold" /> Easy refunds</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold text-text-primary">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-text-primary">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
