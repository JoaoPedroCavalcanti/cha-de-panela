import type { Metadata } from "next"

import { PhotoGallery } from "@/components/photo-gallery"
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
          Galeria
        </p>
        <PhotoGallery
          photos={tito.photos}
          idPrefix="tito"
          showCaptions
          className="mt-10"
        />
      </section>

      <p className="mx-auto mt-10 max-w-xl text-center font-heading text-2xl text-foreground sm:text-3xl">
        {tito.closing}
      </p>
    </div>
  )
}
