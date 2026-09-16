import type { Metadata } from "next"

import { PageHero } from "@/components/page-hero"
import { RsvpForm } from "@/components/rsvp-form"
import { copy } from "@/content/copy"

export const metadata: Metadata = {
  title: "Confirmar presença",
  description: copy.rsvp.intro,
}

export default function ConfirmarPresencaPage() {
  return (
    <div>
      <PageHero title={copy.rsvp.title} description={copy.rsvp.intro} />
      <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-16">
        <RsvpForm />
      </div>
    </div>
  )
}
