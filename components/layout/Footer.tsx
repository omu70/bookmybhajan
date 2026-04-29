import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';

/**
 * Footer — minimal. Brand, two link columns, legal line.
 */
export function Footer() {
  return (
    <footer className="mt-24 border-t border-maroon-900/10 bg-cream-50">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-text-muted">
              Bhajan Clubbing nights ft. Fusion Albela Band, live across India.
              Bhakti, on the beat.
            </p>
          </div>

          <FooterCol
            title="Shows"
            links={[
              { label: 'All shows', href: '/#shows' },
              { label: 'Mumbai', href: '/events?city=Mumbai' },
              { label: 'Pune', href: '/events?city=Pune' },
              { label: 'Ahmedabad', href: '/events?city=Ahmedabad' },
              { label: 'Surat', href: '/events?city=Surat' },
              { label: 'Bengaluru', href: '/events?city=Bangalore' },
            ]}
          />

          <FooterCol
            title="Help"
            links={[
              { label: 'Refund policy', href: '/policies/refund' },
              { label: 'Privacy', href: '/policies/privacy' },
              { label: 'Terms', href: '/policies/terms' },
              { label: 'Contact', href: '/contact' },
            ]}
          />
        </div>

        <p className="mt-12 border-t border-maroon-900/10 pt-6 text-xs text-text-muted">
          © {new Date().getFullYear()} BookMyBhajan · Bhakti meets the beat · Made in Bharat
        </p>
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
      <p className="text-xs font-bold uppercase tracking-widest text-text-strong">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-saffron-700">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
