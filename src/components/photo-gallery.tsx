"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog"
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
              className="group relative block w-full overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
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

      <Dialog
        open={active !== null}
        onOpenChange={(open) => {
          if (!open) setActive(null)
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="max-h-[92svh] w-[min(100%,42rem)] max-w-[calc(100%-1.5rem)] gap-0 overflow-hidden border-0 bg-transparent p-0 shadow-none ring-0 sm:max-w-2xl"
        >
          <DialogTitle className="sr-only">
            {active?.alt ?? "Foto ampliada"}
          </DialogTitle>
          <div className="relative">
            <DialogClose
              className="absolute top-3 right-3 z-10 inline-flex size-10 touch-manipulation items-center justify-center rounded-full bg-black/55 text-white"
              aria-label="Fechar"
            >
              <XIcon className="size-5" />
            </DialogClose>
            {active ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={active.src}
                alt={active.alt}
                className="max-h-[85svh] w-full object-contain"
              />
            ) : null}
            {active?.caption ? (
              <p className="mt-3 text-center font-heading text-base italic text-white/90">
                “{active.caption}”
              </p>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
