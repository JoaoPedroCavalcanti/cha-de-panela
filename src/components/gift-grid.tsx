"use client"

import { useState } from "react"

import type { GiftItem } from "@/content/types"
import { copy } from "@/content/copy"
import { formatBRL } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { PaymentSheet } from "@/components/payment-sheet"

type GiftGridProps = {
  items: GiftItem[]
}

export function GiftGrid({ items }: GiftGridProps) {
  const [selected, setSelected] = useState<GiftItem | null>(null)
  const [open, setOpen] = useState(false)

  function openGift(gift: GiftItem) {
    setSelected(gift)
    setOpen(true)
  }

  return (
    <>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((gift) => (
          <li
            key={gift.id}
            className="flex flex-col border-b border-border/70 pb-6 transition-opacity hover:opacity-95"
          >
            <div className="mb-4 flex aspect-[4/3] items-center justify-center bg-muted/50">
              {gift.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gift.imageSrc}
                  alt={gift.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="font-heading text-3xl text-muted-foreground/40">
                  {gift.name.charAt(0)}
                </span>
              )}
            </div>
            <h2 className="font-heading text-xl text-foreground">{gift.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
              {gift.description}
            </p>
            <p className="mt-4 text-base font-medium text-foreground">
              {formatBRL(gift.amountBRL)}
            </p>
            <Button
              type="button"
              className="mt-4 w-full"
              onClick={() => openGift(gift)}
            >
              {copy.gifts.contributeCta}
            </Button>
          </li>
        ))}
      </ul>

      <PaymentSheet gift={selected} open={open} onOpenChange={setOpen} />
    </>
  )
}
