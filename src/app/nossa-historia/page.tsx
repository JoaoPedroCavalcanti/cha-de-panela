import type { Metadata } from "next"

import { LightboxImage } from "@/components/lightbox-image"
import { PageHero } from "@/components/page-hero"
import { PhotoGallery } from "@/components/photo-gallery"
import { story } from "@/content/story"

export const metadata: Metadata = {
  title: "Nossa história",
  description: story.intro,
}

export default function NossaHistoriaPage() {
  const storyPhotos = story.blocks
    .filter((b) => b.imageSrc)
    .map((b) => ({
      src: b.imageSrc!,
      alt: b.imageAlt ?? b.title,
    }))

  return (
    <div>
      <PageHero title="Nossa história" description={story.intro} />
      <div className="mx-auto max-w-3xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {story.blocks.map((block, index) => (
          <article
            key={block.id}
            className="scroll-mt-24 animate-in fade-in slide-in-from-bottom-2 duration-700"
            style={{ animationDelay: `${Math.min(index, 6) * 60}ms` }}
          >
            <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
              {block.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {block.body}
            </p>
            {block.imageSrc ? (
              <div className="mt-8">
                <LightboxImage
                  src={block.imageSrc}
                  alt={block.imageAlt ?? block.title}
                  lightboxId={`historia-${block.id}`}
                  album={storyPhotos}
                  className="aspect-[4/5] w-full object-cover sm:aspect-[16/10]"
                />
              </div>
            ) : null}
          </article>
        ))}
      </div>

      {story.gallery && story.gallery.length > 0 ? (
        <section className="border-t border-border/60 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
            <h2 className="text-center font-heading text-3xl text-foreground sm:text-4xl">
              Galeria de fotos
            </h2>
            <PhotoGallery photos={story.gallery} idPrefix="momentos" className="mt-10" />
          </div>
        </section>
      ) : null}
    </div>
  )
}
