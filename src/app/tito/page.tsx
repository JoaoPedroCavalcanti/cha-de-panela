import type { Metadata } from "next"

import { tito } from "@/content/tito"

export const metadata: Metadata = {
  title: "Tito",
  description: tito.intro,
}

export default function TitoPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
      <header className="mx-auto max-w-2xl text-center">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          O terceiro da casa
        </p>
        <h1 className="mt-5 font-heading text-5xl text-foreground sm:text-6xl">
          {tito.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {tito.intro}
        </p>
      </header>

      <p className="mx-auto mt-12 max-w-2xl text-center text-base leading-relaxed text-foreground/80 sm:text-lg">
        {tito.story}
      </p>

      <ul className="mx-auto mt-14 grid max-w-2xl gap-3 sm:grid-cols-2">
        {tito.roles.map((role) => (
          <li
            key={role}
            className="border-t border-foreground/10 pt-3 text-sm text-muted-foreground"
          >
            {role}
          </li>
        ))}
      </ul>

      <section className="mt-20">
        <p className="text-center text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
          Arquivo oficial
        </p>
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3">
          {tito.photos.map((photo) => (
            <figure key={photo.src} className="mb-8 break-inside-avoid">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full object-cover"
              />
              <figcaption className="mt-3 text-sm leading-snug text-muted-foreground">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <p className="mx-auto mt-8 max-w-xl text-center font-heading text-2xl text-foreground sm:text-3xl">
        {tito.closing}
      </p>
    </div>
  )
}
