import type { Metadata } from "next"

import { ContributionInvite } from "@/components/contribution-invite"
import { GiftGrid } from "@/components/gift-grid"
import { PageHero } from "@/components/page-hero"
import { copy } from "@/content/copy"

export const metadata: Metadata = {
  title: "Presentes",
  description: copy.gifts.intro,
}

export default function PresentesPage() {
  return (
    <div>
      <PageHero title={copy.gifts.title} description={copy.gifts.intro} />
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
        <GiftGrid />
        <div className="mt-16 sm:mt-20">
          <ContributionInvite />
        </div>
      </div>
    </div>
  )
}
