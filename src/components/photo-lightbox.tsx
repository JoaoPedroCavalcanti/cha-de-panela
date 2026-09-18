"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

export type LightboxPhoto = {
  src: string
  alt: string
  caption?: string
}

type PhotoLightboxProps = {
  photos: LightboxPhoto[]
  index: number
  onIndexChange: (index: number) => void
  onClose: () => void
}

export function PhotoLightbox({
  photos,
  index,
  onIndexChange,
  onClose,
}: PhotoLightboxProps) {
  const [mounted, setMounted] = useState(false)
  const photo = photos[index]
  const hasMany = photos.length > 1

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
      if (!hasMany) return
      if (e.key === "ArrowLeft") {
        onIndexChange((index - 1 + photos.length) % photos.length)
      }
      if (e.key === "ArrowRight") {
        onIndexChange((index + 1) % photos.length)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [mounted, onClose, onIndexChange, hasMany, index, photos.length])

  if (!mounted || !photo) return null

  function goPrev(e: React.MouseEvent) {
    e.stopPropagation()
    onIndexChange((index - 1 + photos.length) % photos.length)
  }

  function goNext(e: React.MouseEvent) {
    e.stopPropagation()
    onIndexChange((index + 1) % photos.length)
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={photo.alt}
      className="fixed inset-0 z-[300] flex flex-col bg-black/92"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-20 inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-white/15 text-white"
        aria-label="Fechar"
      >
        <XIcon className="size-5" />
      </button>

      {hasMany ? (
        <p className="absolute top-5 left-1/2 z-20 -translate-x-1/2 text-xs tracking-wide text-white/70">
          {index + 1} / {photos.length}
        </p>
      ) : null}

      <div className="relative flex min-h-0 flex-1 items-center justify-center p-3 pt-14 sm:p-6 sm:pt-16">
        {hasMany ? (
          <button
            type="button"
            onClick={goPrev}
            className="absolute left-2 z-20 inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-white/15 text-white sm:left-4"
            aria-label="Foto anterior"
          >
            <ChevronLeftIcon className="size-6" />
          </button>
        ) : null}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />

        {hasMany ? (
          <button
            type="button"
            onClick={goNext}
            className="absolute right-2 z-20 inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-white/15 text-white sm:right-4"
            aria-label="Próxima foto"
          >
            <ChevronRightIcon className="size-6" />
          </button>
        ) : null}
      </div>

      {photo.caption ? (
        <p
          className="shrink-0 px-4 pb-8 text-center font-heading text-base italic text-white/90 sm:pb-10 sm:text-lg"
          onClick={(e) => e.stopPropagation()}
        >
          “{photo.caption}”
        </p>
      ) : (
        <div className="pb-6" />
      )}
    </div>,
    document.body
  )
}
