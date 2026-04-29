import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="font-deva text-2xl text-maroon-700">यह पन्ना नहीं मिला</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Lost the rhythm.</h1>
      <p className="mt-2 text-text-muted">
        This page may have moved on. The Albela Band has not — see what&apos;s next.
      </p>
      <Link
        href="/events"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-grad px-5 py-2.5 text-sm font-bold text-text-primary"
      >
        Browse Bhajan Clubbing nights →
      </Link>
    </div>
  );
}
