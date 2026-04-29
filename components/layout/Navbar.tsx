'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/ui/Logo';

/**
 * Navbar — minimal. Brand mark + brand name, "All shows" link, mobile drawer.
 * Becomes a frosted cream bar on scroll.
 */
export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-40 transition-colors duration-300',
        scrolled
          ? 'bg-cream-50/85 backdrop-blur-glass border-b border-maroon-900/10'
          : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:h-[72px] sm:px-6 lg:px-8">
        {/* Brand */}
        <Link href="/" aria-label="bookmybhajan home">
          <Logo size="md" />
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link href="/#shows" className="text-sm font-medium text-text-strong hover:text-saffron-700">
            All shows
          </Link>
          <Link href="/events" className="text-sm font-medium text-text-strong hover:text-saffron-700">
            Cities
          </Link>
          <Link
            href="/#shows"
            className="rounded-full bg-text-primary px-4 py-2 text-sm font-semibold text-cream-50 hover:bg-maroon-800"
          >
            Book tickets
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden rounded-full p-2 text-text-primary hover:bg-maroon-900/8"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden mx-4 mb-3 rounded-2xl border border-maroon-900/10 bg-cream-50 p-5 shadow-glass">
          <nav className="flex flex-col gap-4 text-base">
            <Link href="/#shows" onClick={() => setOpen(false)}>All shows</Link>
            <Link href="/events" onClick={() => setOpen(false)}>By city</Link>
            <Link
              href="/#shows"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center justify-center rounded-full bg-text-primary px-4 py-2.5 text-sm font-semibold text-cream-50"
            >
              Book tickets
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

