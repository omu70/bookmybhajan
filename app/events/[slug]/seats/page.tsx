'use client';

import { Suspense, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

/**
 * Legacy /events/[slug]/seats route — we no longer offer per-seat selection.
 * Seating is first-come-first-served within a tier (Diamond / Gold / Silver),
 * so this page just hands the user to /checkout. Older deeplinks still work.
 */
export default function SeatsRedirect() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center pt-28">
          <Loader2 className="size-6 animate-spin text-saffron-500" />
        </div>
      }
    >
      <Redirector />
    </Suspense>
  );
}

function Redirector() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const search = useSearchParams();

  useEffect(() => {
    const tier = search.get('tier') ?? 'gold';
    const qty = search.get('qty') ?? '1';
    router.replace(`/checkout?event=${params.slug}&tier=${tier}&qty=${qty}`);
  }, [params.slug, router, search]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center pt-28">
      <Loader2 className="size-6 animate-spin text-saffron-500" />
    </div>
  );
}
