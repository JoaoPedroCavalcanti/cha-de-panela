import { getApiBaseUrl } from "@/lib/api"

export type CheckoutResponse = {
  checkoutId: string
  checkoutUrl: string
  giftId: number
  status: string
}

export async function createGiftCheckout(giftId: number): Promise<CheckoutResponse> {
  const res = await fetch(`${getApiBaseUrl()}/api/gifts/${giftId}/checkout/`, {
    method: "POST",
    headers: { Accept: "application/json" },
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(detail || "Falha ao criar checkout")
  }

  const body = (await res.json()) as {
    checkout_id: string
    checkout_url: string
    gift_id: number
    status: string
  }

  return {
    checkoutId: body.checkout_id,
    checkoutUrl: body.checkout_url,
    giftId: body.gift_id,
    status: body.status,
  }
}
