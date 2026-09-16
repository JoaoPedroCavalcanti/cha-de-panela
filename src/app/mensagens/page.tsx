import type { Metadata } from "next"

import { MessageForm } from "@/components/message-form"
import { PageHero } from "@/components/page-hero"
import { copy } from "@/content/copy"

export const metadata: Metadata = {
  title: "Mensagens aos noivos",
  description: copy.messages.intro,
}

export default function MensagensPage() {
  return (
    <div>
      <PageHero title={copy.messages.title} description={copy.messages.intro} />
      <div className="mx-auto max-w-xl px-4 py-14 sm:px-6 sm:py-16">
        <p className="mb-8 text-center text-sm text-muted-foreground">
          {copy.messages.privacyNote}
        </p>
        <MessageForm />
      </div>
    </div>
  )
}
