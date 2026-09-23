"use client"

import { useState } from "react"
import { ExternalLinkIcon } from "lucide-react"

import type { GiftItem } from "@/content/types"
import { formatBRL } from "@/lib/format"
import { createGiftCheckout } from "@/lib/payments-api"
import { buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type PaymentSheetProps = {
  gift: GiftItem | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PaymentSheet({ gift, open, onOpenChange }: PaymentSheetProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startCheckout() {
    if (!gift) return
    setLoading(true)
    setError(null)
    try {
      const checkout = await createGiftCheckout(gift.id)
      window.location.href = checkout.checkoutUrl
    } catch {
      setError(
        "Não foi possível abrir o pagamento. O presente pode ter sido esgotado — tente outro."
      )
      setLoading(false)
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setError(null)
      setLoading(false)
    }
    onOpenChange(next)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="bottom" className="mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-t-2xl">
        {gift ? (
          <>
            <SheetHeader className="text-left">
              <div className="flex items-center gap-4">
                {gift.imageSrc ? (
                  <div className="flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-muted/40 p-2.5 sm:size-32">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={gift.imageSrc}
                      alt={gift.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <SheetTitle className="font-heading text-xl leading-snug sm:text-2xl">
                    {gift.name}
                  </SheetTitle>
                  {gift.description ? (
                    <SheetDescription className="mt-2 text-base leading-relaxed">
                      {gift.description}
                    </SheetDescription>
                  ) : null}
                </div>
              </div>
            </SheetHeader>

            <div className="mt-6 space-y-6 px-4 pb-8">
              <div className="rounded-xl bg-muted/60 px-4 py-5 text-center">
                <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  Valor
                </p>
                <p className="mt-2 font-heading text-3xl text-foreground">
                  {formatBRL(gift.amountBRL)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Pagamento seguro via Asaas — PIX ou cartão.
                </p>
              </div>

              {error ? (
                <p className="text-sm text-destructive" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                disabled={loading}
                onClick={() => void startCheckout()}
                className={cn(buttonVariants({ size: "lg" }), "w-full")}
              >
                {loading ? "Abrindo pagamento…" : "Pagar com PIX ou cartão"}
                {!loading ? <ExternalLinkIcon /> : null}
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Você será redirecionado ao checkout do Asaas para escolher a forma de
                pagamento. Após a confirmação, o presente sai da lista.
              </p>
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
