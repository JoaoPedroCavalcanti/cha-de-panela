import { cn } from "@/lib/utils"

type AlbumPhoto = {
  src: string
  alt: string
  caption?: string
}

type LightboxImageProps = {
  src: string
  alt: string
  caption?: string
  className?: string
  buttonClassName?: string
  /** Unique id for this lightbox instance */
  lightboxId: string
  /** Optional album for prev/next */
  album?: AlbumPhoto[]
}

/**
 * Single image that opens a CSS :target lightbox (no JS required).
 */
export function LightboxImage({
  src,
  alt,
  caption,
  className,
  buttonClassName,
  lightboxId,
  album,
}: LightboxImageProps) {
  const photos =
    album && album.length > 0 ? album : [{ src, alt, caption }]
  const startIndex = Math.max(
    0,
    photos.findIndex((p) => p.src === src)
  )
  const closeHref = `#${lightboxId}-x`

  return (
    <div className={cn("w-full", buttonClassName)}>
      <a
        href={`#${lightboxId}-${startIndex}`}
        className="block w-full overflow-hidden"
        aria-label={`Ampliar: ${alt}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={className} />
      </a>

      <span id={`${lightboxId}-x`} className="photo-lb-close-anchor" />

      {photos.map((photo, i) => {
        const prev = (i - 1 + photos.length) % photos.length
        const next = (i + 1) % photos.length
        const hasMany = photos.length > 1

        return (
          <div
            key={`${lightboxId}-lb-${photo.src}`}
            id={`${lightboxId}-${i}`}
            className="photo-lb"
            role="dialog"
            aria-label={photo.alt}
          >
            <a href={closeHref} className="photo-lb-backdrop" aria-label="Fechar">
              <span className="sr-only">Fechar</span>
            </a>

            <div className="photo-lb-frame">
              <a href={closeHref} className="photo-lb-btn photo-lb-close" aria-label="Fechar">
                ×
              </a>

              {hasMany ? (
                <p className="photo-lb-count">
                  {i + 1} / {photos.length}
                </p>
              ) : null}

              {hasMany ? (
                <a
                  href={`#${lightboxId}-${prev}`}
                  className="photo-lb-btn photo-lb-prev"
                  aria-label="Foto anterior"
                >
                  ‹
                </a>
              ) : null}

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} className="photo-lb-img" />

              {hasMany ? (
                <a
                  href={`#${lightboxId}-${next}`}
                  className="photo-lb-btn photo-lb-next"
                  aria-label="Próxima foto"
                >
                  ›
                </a>
              ) : null}

              {photo.caption ? (
                <p className="photo-lb-caption">“{photo.caption}”</p>
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}
