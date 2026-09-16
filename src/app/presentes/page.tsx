import type { Metadata } from "next"

import { GiftGrid } from "@/components/gift-grid"
import { PageHero } from "@/components/page-hero"
import { copy } from "@/content/copy"
import { gifts } from "@/content/gifts"

export const metadata: Metadata = {
  title: "Presentes",
  description: copy.gifts.intro,
}

export default function PresentesPage() {
  return (
    <div>
      <PageHero title={copy.gifts.title} description={copy.gifts.intro} />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <GiftGrid items={gifts} />
      </div>
    </div>
  )
}
