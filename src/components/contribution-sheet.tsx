"use client"

import { useState } from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { event } from "@/content/event"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

type ContributionSheetProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContributionSheet({ open, onOpenChange }: ContributionSheetProps) {
  const [copied, setCopied] = useState(false)

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(event.payment.pixKey)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  function handleOpenChange(next: boolean) {
    if (!next) setCopied(false)
    onOpenChange(next)
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="bottom"
        className="mx-auto max-h-[90vh] max-w-lg overflow-y-auto rounded-t-2xl"
      >
        <SheetHeader className="text-left">
          <SheetTitle className="font-heading text-2xl">Contribuir via PIX</SheetTitle>
          <SheetDescription className="mt-2 text-base leading-relaxed">
            Escaneie o QR Code ou copie a chave. O valor fica por sua conta.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4 pb-8">
          {event.payment.pixQrImageSrc ? (
            <div className="flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={event.payment.pixQrImageSrc}
                alt="QR Code PIX"
                className="h-52 w-52 rounded-xl border border-border bg-white object-contain p-2 sm:h-56 sm:w-56"
              />
            </div>
          ) : null}

          <div className="space-y-2">
            <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Chave PIX · {event.payment.pixKeyLabel}
            </p>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2">
              <code className="flex-1 truncate text-sm text-foreground">
                {event.payment.pixKey}
              </code>
              <Button type="button" size="sm" variant="outline" onClick={() => void copyPix()}>
                {copied ? <CheckIcon /> : <CopyIcon />}
                {copied ? "Copiado" : "Copiar"}
              </Button>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Depois de pagar, pode seguir navegando. A lista de presentes continua
            disponível.
          </p>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full")}
          >
            Fechar
          </button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
