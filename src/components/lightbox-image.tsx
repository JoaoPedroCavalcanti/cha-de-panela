"use client"

import { useState, type ComponentProps } from "react"

import { PhotoLightbox } from "@/components/photo-lightbox"
import { cn } from "@/lib/utils"

type LightboxImageProps = Omit<ComponentProps<"img">, "onClick"> & {
  caption?: string
  buttonClassName?: string
}

export function LightboxImage({
  src,
  alt = "",
  caption,
  className,
  buttonClassName,
  ...imgProps
}: LightboxImageProps) {
  const [open, setOpen] = useState(false)

  if (!src) return null

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "block w-full overflow-hidden touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          buttonClassName
        )}
        aria-label={`Ampliar: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} {...imgProps} />
      </button>

      {open ? (
        <PhotoLightbox
          src={typeof src === "string" ? src : ""}
          alt={alt}
          caption={caption}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  )
}
