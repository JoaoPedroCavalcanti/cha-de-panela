export type GalleryPhoto = {
  src: string
  alt: string
  caption?: string
}

type PhotoGalleryProps = {
  photos: GalleryPhoto[]
  /** Unique prefix so multiple galleries on a page don't clash */
  idPrefix: string
  className?: string
  showCaptions?: boolean
}

/**
 * CSS :target lightbox — works without JavaScript (important on mobile tunnels).
 */
export function PhotoGallery({
  photos,
  idPrefix,
  className = "",
  showCaptions = false,
}: PhotoGalleryProps) {
  const closeHref = `#${idPrefix}-x`

  return (
    <div className={className}>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-3 md:gap-4">
        {photos.map((photo, i) => (
          <figure key={photo.src} className="min-w-0">
            <a
              href={`#${idPrefix}-${i}`}
              className="block w-full overflow-hidden"
              aria-label={`Ampliar: ${photo.alt}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="aspect-[3/4] w-full object-cover sm:aspect-[4/5]"
                loading="lazy"
              />
            </a>
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

      {/* Anchor used only to clear :target / close */}
      <span id={`${idPrefix}-x`} className="photo-lb-close-anchor" />

      {photos.map((photo, i) => {
        const prev = (i - 1 + photos.length) % photos.length
        const next = (i + 1) % photos.length
        const hasMany = photos.length > 1

        return (
          <div
            key={`lb-${photo.src}`}
            id={`${idPrefix}-${i}`}
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
                  href={`#${idPrefix}-${prev}`}
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
                  href={`#${idPrefix}-${next}`}
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
