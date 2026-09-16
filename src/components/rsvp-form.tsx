"use client"

import { useState, type FormEvent } from "react"

import { event } from "@/content/event"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type FormStatus = "idle" | "loading" | "success" | "error"

function resolveEndpoint(formId: string) {
  if (!formId) return null
  return `https://formspree.io/f/${formId}`
}

export function RsvpForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [attending, setAttending] = useState<"sim" | "nao">("sim")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const endpoint = resolveEndpoint(event.formspree.rsvpFormId)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!endpoint) {
      setStatus("error")
      setErrorMessage(
        "Formspree ainda não configurado. Defina NEXT_PUBLIC_FORMSPREE_RSVP_ID no .env.local."
      )
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    data.set("formType", "rsvp")
    data.set("attending", attending)

    setStatus("loading")
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      })
      if (!res.ok) throw new Error("Falha ao enviar")
      setStatus("success")
      form.reset()
      setAttending("sim")
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
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Nova confirmação
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Nome completo</Label>
        <Input id="name" name="name" required autoComplete="name" placeholder="Seu nome" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone / WhatsApp</Label>
        <Input
          id="phone"
          name="phone"
          required
          autoComplete="tel"
          placeholder="(11) 99999-9999"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="voce@email.com"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Você irá ao evento?</legend>
        <RadioGroup
          value={attending}
          onValueChange={(value) => {
            if (value === "sim" || value === "nao") setAttending(value)
          }}
          className="flex flex-col gap-3 sm:flex-row sm:gap-6"
        >
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="sim" />
            Sim, estarei lá
          </label>
          <label className="flex items-center gap-2 text-sm">
            <RadioGroupItem value="nao" />
            Infelizmente não poderei
          </label>
        </RadioGroup>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="guests">Acompanhantes</Label>
        <Input
          id="guests"
          name="guests"
          type="number"
          min={0}
          defaultValue={0}
          placeholder="0"
        />
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
