"use client"

import { useState } from "react"

import type { GiftItem } from "@/content/types"
import { copy } from "@/content/copy"
import { formatBRL } from "@/lib/format"
import { Button } from "@/components/ui/button"
import { PaymentSheet } from "@/components/payment-sheet"

type SortKey = "price-desc" | "price-asc" | "name-asc"

type GiftGridProps = {
  items: GiftItem[]
}

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "price-desc", label: "Maior preço" },
  { value: "price-asc", label: "Menor preço" },
  { value: "name-asc", label: "Nome A–Z" },
]

function sortGifts(items: GiftItem[], sort: SortKey) {
  const list = [...items]
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => a.amountBRL - b.amountBRL)
    case "price-desc":
      return list.sort((a, b) => b.amountBRL - a.amountBRL)
    case "name-asc":
      return list.sort((a, b) => a.name.localeCompare(b.name, "pt-BR"))
    default:
      return list
  }
}

export function GiftGrid({ items }: GiftGridProps) {
  const [selected, setSelected] = useState<GiftItem | null>(null)
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState<SortKey>("price-desc")
  const [query, setQuery] = useState("")

  const filtered = sortGifts(
    items.filter((gift) =>
      gift.name.toLowerCase().includes(query.trim().toLowerCase())
    ),
    sort
  )

  function openGift(gift: GiftItem) {
    setSelected(gift)
    setOpen(true)
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nome…"
          aria-label="Buscar presente por nome"
          className="h-9 w-full rounded-lg border border-input bg-transparent px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 sm:max-w-xs"
        />
        <div className="flex items-center justify-between gap-3 sm:justify-end">
          <label htmlFor="gift-sort" className="text-sm text-muted-foreground">
            Ordenar
          </label>
          <select
            id="gift-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-9 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          Nenhum presente encontrado para “{query.trim()}”.
        </p>
      ) : null}

      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((gift) => (
          <li
            key={gift.id}
            className="flex flex-col border-b border-border/70 pb-6 transition-opacity hover:opacity-95"
          >
            <div className="mb-4 flex aspect-square items-center justify-center overflow-hidden bg-muted/40 p-4">
              {gift.imageSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={gift.imageSrc}
                  alt={gift.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <span className="font-heading text-3xl text-muted-foreground/40">
                  {gift.name.charAt(0)}
                </span>
              )}
            </div>
            <h2 className="font-heading text-xl text-foreground">{gift.name}</h2>
            {gift.description ? (
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {gift.description}
              </p>
            ) : null}
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
