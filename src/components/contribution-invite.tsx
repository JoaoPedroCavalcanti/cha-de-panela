"use client"

import { useState } from "react"

import { ContributionSheet } from "@/components/contribution-sheet"
import { buttonVariants } from "@/components/ui/button"
import { copy } from "@/content/copy"
import { cn } from "@/lib/utils"

export function ContributionInvite() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className="border-t border-border/60 pt-12 sm:pt-14">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
            Outra forma de ajudar
          </p>
          <h2 className="mt-3 font-heading text-3xl text-foreground sm:text-4xl">
            {copy.gifts.openContributionTitle}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {copy.gifts.openContributionBody}
          </p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "mt-7")}
          >
            {copy.gifts.openContributionCta}
          </button>
        </div>
      </section>

      <ContributionSheet open={open} onOpenChange={setOpen} />
    </>
  )
}
