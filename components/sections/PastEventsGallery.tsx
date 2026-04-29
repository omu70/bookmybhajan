'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import type { VideoAsset } from '@/types';

interface PastEventsGalleryProps {
  videos: VideoAsset[];
  galleryImages: string[];
}

/**
 * PastEventsGallery — modal-based video player + photo grid.
 * No autoplay. Lightweight: just thumbnails until clicked.
 */
export function PastEventsGallery({ videos, galleryImages }: PastEventsGalleryProps) {
  const [active, setActive] = useState<VideoAsset | null>(null);

  return (
    <section id="past-events" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-2xl">
        <p className="eyebrow">Moments from past events</p>
        <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
          See it. Then book it.
        </h2>
        <p className="mt-3 text-text-muted">
          Highlights from our past gatherings — recorded in 4K, with permission from devotees.
        </p>
      </div>

      {/* Video thumbnails */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v, i) => (
          <motion.button
            key={v.caption}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            type="button"
            onClick={() => setActive(v)}
            className="group relative aspect-video overflow-hidden rounded-2xl border border-glass-border"
            aria-label={`Play: ${v.caption}`}
          >
            <Image
              src={v.thumbnailUrl}
              alt={v.caption}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-gold/95 text-ink-900 shadow-gold-glow-lg transition-transform group-hover:scale-110">
                <Play className="ml-1 size-7 fill-ink-900" />
              </span>
            </div>
            <p className="absolute bottom-3 left-4 right-4 text-left text-sm font-semibold text-text-primary">
              {v.caption}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Photo grid */}
      {galleryImages.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
          {galleryImages.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-xl border border-white/5"
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/80 p-4 backdrop-blur-sm"
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Close"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-glassLo hover:bg-white/20"
              >
                <X className="size-4" />
              </button>
              <div className="overflow-hidden rounded-2xl border border-glass-border bg-black">
                <div className="aspect-video">
                  <iframe
                    src={`${active.videoUrl}?autoplay=1`}
                    className="size-full"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title={active.caption}
                  />
                </div>
              </div>
              <p className="mt-3 text-center text-sm text-text-muted">{active.caption}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
