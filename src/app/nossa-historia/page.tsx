import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { copy } from "@/content/copy"
import { story } from "@/content/story"

export const metadata: Metadata = {
  title: "Nossa história",
  description: story.intro,
}

export default function NossaHistoriaPage() {
  return (
    <div>
      <PageHero title="Nossa história" description={story.intro} />
      <div className="mx-auto max-w-3xl space-y-16 px-4 py-14 sm:px-6 sm:py-20">
        {story.blocks.map((block, index) => (
          <article
            key={block.id}
            className="scroll-mt-24"
            style={{ animationDelay: `${index * 80}ms` }}
          >
            <p className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
              {block.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {block.body}
            </p>
            <div className="mt-8 aspect-[16/10] overflow-hidden bg-muted/60">
              {block.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={block.imageSrc}
                  alt={block.imageAlt ?? block.title}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
                  Espaço para foto — adicione em{" "}
                  <code className="mx-1">src/content/story.ts</code>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
