import { getApiBaseUrl } from "@/lib/api"
import type { GiftItem } from "@/content/types"

export type GiftSortKey = "random" | "price-desc" | "price-asc" | "name-asc"

export type GiftListResponse = {
  count: number
  page: number
  pageSize: number
  totalPages: number
  results: GiftItem[]
}

type ApiGift = {
  id: number
  slug: string
  name: string
  description: string
  amount_brl: string
  image_url: string | null
}

type ApiGiftList = {
  count: number
  page: number
  page_size: number
  total_pages: number
  results: ApiGift[]
}

const sortToApi: Record<GiftSortKey, string> = {
  random: "random",
  "price-desc": "price_desc",
  "price-asc": "price_asc",
  "name-asc": "name_asc",
}

function mapGift(item: ApiGift): GiftItem {
  return {
    id: item.id,
    slug: item.slug,
    name: item.name,
    description: item.description || undefined,
    amountBRL: Number(item.amount_brl),
    imageSrc: item.image_url,
  }
}

export async function fetchGifts(params: {
  q?: string
  page?: number
  pageSize?: number
  sort?: GiftSortKey
  seed?: number
}): Promise<GiftListResponse> {
  const sort = params.sort ?? "random"
  const search = new URLSearchParams()
  if (params.q?.trim()) search.set("q", params.q.trim())
  search.set("page", String(params.page ?? 1))
  search.set("page_size", String(params.pageSize ?? 12))
  search.set("sort", sortToApi[sort])
  if (sort === "random") {
    search.set("seed", String(params.seed ?? 0))
  }

  const res = await fetch(`${getApiBaseUrl()}/api/gifts/?${search.toString()}`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  })
  if (!res.ok) {
    throw new Error(await res.text())
  }
  const body = (await res.json()) as ApiGiftList
  return {
    count: body.count,
    page: body.page,
    pageSize: body.page_size,
    totalPages: body.total_pages,
    results: body.results.map(mapGift),
  }
}
