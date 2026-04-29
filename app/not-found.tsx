import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-4 text-center">
      <p className="font-deva text-2xl text-saffron-200">श्रद्धा अधूरी रही</p>
      <h1 className="mt-3 font-display text-5xl font-bold">Not found</h1>
      <p className="mt-2 text-text-muted">
        This page may have moved on. Browse upcoming events instead.
      </p>
      <Link
        href="/events"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink-900"
      >
        Explore events →
      </Link>
    </div>
  );
}
