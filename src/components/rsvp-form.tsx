"use client"

import { useRef, useState, type FormEvent } from "react"
import { PlusIcon, XIcon } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getApiBaseUrl } from "@/lib/api"
import { cn } from "@/lib/utils"

type FormStatus = "idle" | "loading" | "success" | "error"

type Companion = {
  id: string
  name: string
}

export function RsvpForm() {
  const companionSeq = useRef(0)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [attending, setAttending] = useState<"sim" | "nao">("sim")
  const [companions, setCompanions] = useState<Companion[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const companionsEnabled = attending === "sim"

  function makeCompanion(): Companion {
    companionSeq.current += 1
    return { id: `c-${companionSeq.current}`, name: "" }
  }

  function resetCompanions() {
    setCompanions([])
  }

  function addCompanion() {
    if (!companionsEnabled) return
    setCompanions((prev) => [...prev, makeCompanion()])
  }

  function removeCompanion(id: string) {
    setCompanions((prev) => prev.filter((c) => c.id !== id))
  }

  function updateCompanion(id: string, name: string) {
    setCompanions((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)))
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const notes = String(data.get("notes") ?? "").trim()
    const companionNames = companionsEnabled
      ? companions.map((c) => c.name.trim()).filter(Boolean)
      : []

    if (!name) {
      setStatus("error")
      setErrorMessage("Informe seu nome completo.")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/rsvp/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          attending: attending === "sim",
          notes,
          companions: companionNames.map((companionName) => ({
            name: companionName,
          })),
        }),
      })

      if (!res.ok) {
        const detail = await res.text()
        throw new Error(detail || "Falha ao enviar")
      }

      setStatus("success")
      form.reset()
      setAttending("sim")
      resetCompanions()
    } catch {
      setStatus("error")
      setErrorMessage("Não foi possível confirmar. Tente novamente em instantes.")
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-border bg-muted/40 px-6 py-10 text-center"
        role="status"
      >
        <p className="font-heading text-2xl text-foreground">Confirmação recebida</p>
        <p className="mt-3 text-muted-foreground">
          Obrigado! Qualquer mudança, é só enviar de novo.
        </p>
        <button
          type="button"
          className={cn(buttonVariants({ variant: "outline" }), "mt-6")}
          onClick={() => setStatus("idle")}
        >
          Nova confirmação
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" name="name" required autoComplete="name" placeholder="Seu nome" />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Você irá ao evento?</legend>
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-8">
          <label className="relative z-0 flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="radio"
              name="attending"
              value="sim"
              checked={attending === "sim"}
              onChange={() => setAttending("sim")}
              className="size-4 shrink-0 accent-foreground"
            />
            Sim, estarei lá
          </label>
          <label className="relative z-0 flex cursor-pointer items-center gap-2.5 text-sm">
            <input
              type="radio"
              name="attending"
              value="nao"
              checked={attending === "nao"}
              onChange={() => {
                setAttending("nao")
                resetCompanions()
              }}
              className="size-4 shrink-0 accent-foreground"
            />
            Infelizmente não poderei
          </label>
        </div>
      </fieldset>

      <div
        className={cn(
          "space-y-3 transition-opacity",
          !companionsEnabled && "opacity-40"
        )}
      >
        <p className="text-sm font-medium">Acompanhantes</p>
        <p className="text-sm text-muted-foreground">
          {companionsEnabled
            ? "Se vier acompanhado(a), adicione o nome de cada pessoa. Sozinho(a)? Pode deixar em branco."
            : "Disponível apenas se você confirmar presença."}
        </p>

        {companions.length > 0 ? (
          <ul className="space-y-3">
            {companions.map((companion, index) => (
              <li key={companion.id} className="flex items-end gap-2">
                <div className="min-w-0 flex-1 space-y-2">
                  <Label htmlFor={`companion-${companion.id}`}>
                    Nome do acompanhante {index + 1}
                  </Label>
                  <input
                    id={`companion-${companion.id}`}
                    name={`companionName_${index + 1}`}
                    value={companion.name}
                    onChange={(e) => updateCompanion(companion.id, e.target.value)}
                    placeholder="Nome completo"
                    autoComplete="off"
                    disabled={!companionsEnabled}
                    className={cn(
                      "h-9 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 text-base outline-none",
                      "placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                      "disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    )}
                  />
                </div>
                <button
                  type="button"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "icon" }),
                    "shrink-0 touch-manipulation"
                  )}
                  aria-label={`Remover acompanhante ${index + 1}`}
                  onClick={() => removeCompanion(companion.id)}
                  disabled={!companionsEnabled}
                >
                  <XIcon className="size-4" />
                </button>
              </li>
            ))}
          </ul>
        ) : null}

        <button
          type="button"
          className={cn(
            "inline-flex h-9 touch-manipulation items-center justify-center gap-1.5 rounded-lg border border-border bg-background px-3 text-sm font-medium",
            "hover:bg-muted disabled:pointer-events-none disabled:opacity-50"
          )}
          onClick={() => addCompanion()}
          disabled={!companionsEnabled}
        >
          <PlusIcon className="size-4" aria-hidden />
          Adicionar acompanhante
        </button>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          name="notes"
          rows={3}
          placeholder="Restrições alimentares, crianças, etc."
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar confirmação"}
      </Button>
    </form>
  )
}
