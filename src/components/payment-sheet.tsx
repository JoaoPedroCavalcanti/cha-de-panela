"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon, ExternalLinkIcon } from "lucide-react"

import type { GiftItem } from "@/content/types"
import { event } from "@/content/event"
import { formatBRL } from "@/lib/format"
import { Button, buttonVariants } from "@/components/ui/button"
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
  const [copied, setCopied] = useState(false)
  const [thankYou, setThankYou] = useState(false)

  const cardPaymentUrl = gift?.cardPaymentUrl || event.payment.cardPaymentUrl

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(event.payment.pixKey)
      setCopied(true)
      setThankYou(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setCopied(false)
      setThankYou(false)
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
                  Valor sugerido
                </p>
                <p className="mt-2 font-heading text-3xl text-foreground">
                  {formatBRL(gift.amountBRL)}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Contribuição livre. Use o valor como referência.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Pagar com PIX
                </h3>
                <p className="text-sm text-muted-foreground">
                  Chave: {event.payment.pixKeyLabel}
                </p>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
                  <code className="flex-1 truncate text-sm">{event.payment.pixKey}</code>
                  <Button type="button" size="sm" variant="outline" onClick={copyPix}>
                    {copied ? <CheckIcon /> : <CopyIcon />}
                    {copied ? "Copiado" : "Copiar"}
                  </Button>
                </div>
                {event.payment.pixQrImageSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={event.payment.pixQrImageSrc}
                    alt="QR Code PIX"
                    className="mx-auto mt-2 h-44 w-44 rounded-lg border border-border object-contain"
                  />
                ) : (
                  <div className="flex h-36 items-center justify-center rounded-lg border border-dashed border-border bg-muted/30 px-4 text-center text-sm text-muted-foreground">
                    QR Code será adicionado em{" "}
                    <span className="mx-1 font-medium">content/event.ts</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Ou pagar com cartão
                </h3>
                <a
                  href={cardPaymentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setThankYou(true)}
                  className={cn(buttonVariants({ size: "lg" }), "w-full")}
                >
                  Pagar com cartão de crédito
                  <ExternalLinkIcon />
                </a>
              </div>

              {thankYou ? (
                <p
                  className="rounded-lg bg-primary/5 px-4 py-3 text-center text-sm text-foreground animate-in fade-in"
                  role="status"
                >
                  Obrigado pelo carinho! Seu presente continua na lista para outras
                  pessoas também contribuírem.
                </p>
              ) : null}
            </div>
          </>
        ) : null}
      </SheetContent>
    </Sheet>
  )
}
