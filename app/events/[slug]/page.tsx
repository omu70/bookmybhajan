import { notFound } from 'next/navigation';
import { EVENTS, getEventBySlug } from '@/lib/events';
import { EventDetailClient } from './_client';
import type { Metadata } from 'next';

// ISR — revalidate every 60s for fresh inventory
export const revalidate = 60;
export const dynamicParams = false;

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const event = getEventBySlug(params.slug);
  if (!event) return { title: 'Event not found' };
  return {
    title: `${event.title} · ${event.city}`,
    description: event.storyShort,
    openGraph: {
      title: `${event.title} — ${event.city}`,
      description: event.storyShort,
      images: [event.heroImage],
    },
  };
}

export default function EventDetailPage({ params }: { params: { slug: string } }) {
  const event = getEventBySlug(params.slug);
  if (!event) notFound();
  return <EventDetailClient event={event} />;
}
