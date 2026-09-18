"use client"

import { useState } from "react"

import { PhotoLightbox } from "@/components/photo-lightbox"
import { cn } from "@/lib/utils"

export type GalleryPhoto = {
  src: string
  alt: string
  caption?: string
}

type PhotoGalleryProps = {
  photos: GalleryPhoto[]
  className?: string
  showCaptions?: boolean
}

export function PhotoGallery({
  photos,
  className,
  showCaptions = false,
}: PhotoGalleryProps) {
  const [active, setActive] = useState<GalleryPhoto | null>(null)

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4",
          className
        )}
      >
        {photos.map((photo) => (
          <figure key={photo.src} className="min-w-0">
            <button
              type="button"
              onClick={() => setActive(photo)}
              className="group relative block w-full touch-manipulation overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Ampliar: ${photo.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-active:scale-[0.99] sm:aspect-[4/5]"
                loading="lazy"
              />
            </button>
            {showCaptions && photo.caption ? (
              <figcaption className="mt-2.5 px-1 text-center">
                <span className="font-heading text-sm italic leading-snug text-foreground/75 sm:text-base">
                  “{photo.caption}”
                </span>
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>

      {active ? (
        <PhotoLightbox
          src={active.src}
          alt={active.alt}
          caption={active.caption}
          onClose={() => setActive(null)}
        />
      ) : null}
    </>
  )
}
