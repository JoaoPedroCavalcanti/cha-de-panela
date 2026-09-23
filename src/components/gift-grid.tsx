"use client"

import { useEffect, useState } from "react"

import { copy } from "@/content/copy"
import type { GiftItem } from "@/content/types"
import { PaymentSheet } from "@/components/payment-sheet"
import { Button } from "@/components/ui/button"
import { fetchGifts, type GiftSortKey } from "@/lib/gifts-api"
import { formatBRL } from "@/lib/format"

const sortOptions: { value: GiftSortKey; label: string }[] = [
  { value: "price-desc", label: "Maior preço" },
  { value: "price-asc", label: "Menor preço" },
  { value: "name-asc", label: "Nome A–Z" },
]

const PAGE_SIZE = 12

export function GiftGrid() {
  const [selected, setSelected] = useState<GiftItem | null>(null)
  const [open, setOpen] = useState(false)
  const [sort, setSort] = useState<GiftSortKey>("price-desc")
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [page, setPage] = useState(1)
  const [items, setItems] = useState<GiftItem[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query)
      setPage(1)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [query])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetchGifts({
      q: debouncedQuery,
      page,
      pageSize: PAGE_SIZE,
      sort,
    })
      .then((data) => {
        if (cancelled) return
        setItems(data.results)
        setTotalPages(data.totalPages)
        setCount(data.count)
      })
      .catch(() => {
        if (cancelled) return
        setError("Não foi possível carregar os presentes. Tente de novo.")
        setItems([])
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [debouncedQuery, page, sort])

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
            onChange={(e) => {
              setSort(e.target.value as GiftSortKey)
              setPage(1)
            }}
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

      {error ? (
        <p className="py-10 text-center text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="py-10 text-center text-sm text-muted-foreground">Carregando…</p>
      ) : null}

      {!loading && !error && items.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted-foreground">
          {debouncedQuery.trim()
            ? `Nenhum presente encontrado para “${debouncedQuery.trim()}”.`
            : "Nenhum presente cadastrado ainda."}
        </p>
      ) : null}

      {!loading && items.length > 0 ? (
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((gift) => (
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
      ) : null}

      {!loading && count > 0 ? (
        <div className="mt-10 flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            {count} presente{count === 1 ? "" : "s"} · página {page} de {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Anterior
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Próxima
            </Button>
          </div>
        </div>
      ) : null}

      <PaymentSheet gift={selected} open={open} onOpenChange={setOpen} />
    </>
  )
}
