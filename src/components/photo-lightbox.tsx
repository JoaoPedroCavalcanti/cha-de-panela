"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { XIcon } from "lucide-react"

type PhotoLightboxProps = {
  src: string
  alt: string
  caption?: string
  onClose: () => void
}

export function PhotoLightbox({ src, alt, caption, onClose }: PhotoLightboxProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const previous = document.body.style.overflow
    document.body.style.overflow = "hidden"

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener("keydown", onKey)
    }
  }, [mounted, onClose])

  if (!mounted) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      className="fixed inset-0 z-[300] flex flex-col bg-black/92"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-10 inline-flex size-11 touch-manipulation items-center justify-center rounded-full bg-white/15 text-white"
        aria-label="Fechar"
      >
        <XIcon className="size-5" />
      </button>

      <div className="flex min-h-0 flex-1 items-center justify-center p-3 pt-14 sm:p-6 sm:pt-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {caption ? (
        <p
          className="shrink-0 px-4 pb-8 text-center font-heading text-base italic text-white/90 sm:pb-10 sm:text-lg"
          onClick={(e) => e.stopPropagation()}
        >
          “{caption}”
        </p>
      ) : (
        <div className="pb-6" />
      )}
    </div>,
    document.body
  )
}
