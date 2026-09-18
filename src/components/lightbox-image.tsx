"use client"

import { useState, type ComponentProps } from "react"

import { PhotoLightbox } from "@/components/photo-lightbox"
import { cn } from "@/lib/utils"

type LightboxImageProps = Omit<ComponentProps<"img">, "onClick"> & {
  caption?: string
  buttonClassName?: string
  /** Optional album so arrows can browse related photos */
  album?: { src: string; alt: string; caption?: string }[]
}

export function LightboxImage({
  src,
  alt = "",
  caption,
  className,
  buttonClassName,
  album,
  ...imgProps
}: LightboxImageProps) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  if (!src || typeof src !== "string") return null

  const photos =
    album && album.length > 0
      ? album
      : [{ src, alt, caption }]

  function openAt() {
    const start = photos.findIndex((p) => p.src === src)
    setIndex(start >= 0 ? start : 0)
    setOpen(true)
  }

  return (
    <>
      <button
        type="button"
        onClick={openAt}
        className={cn(
          "block w-full touch-manipulation overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          buttonClassName
        )}
        aria-label={`Ampliar: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} {...imgProps} />
      </button>

      {open ? (
        <PhotoLightbox
          photos={photos}
          index={index}
          onIndexChange={setIndex}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
