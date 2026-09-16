"use client"

import { useState, type FormEvent } from "react"

import { event } from "@/content/event"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

type FormStatus = "idle" | "loading" | "success" | "error"

function resolveEndpoint(formId: string) {
  if (!formId) return null
  return `https://formspree.io/f/${formId}`
}

export function MessageForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const endpoint = resolveEndpoint(event.formspree.messagesFormId)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!endpoint) {
      setStatus("error")
      setErrorMessage(
        "Formspree ainda não configurado. Defina NEXT_PUBLIC_FORMSPREE_MESSAGES_ID no .env.local."
      )
      return
    }

    const form = e.currentTarget
    const data = new FormData(form)
    data.set("formType", "mensagem")

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
    } catch {
      setStatus("error")
      setErrorMessage("Não foi possível enviar. Tente novamente em instantes.")
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-xl border border-border bg-muted/40 px-6 py-10 text-center"
        role="status"
      >
        <p className="font-heading text-2xl text-foreground">Mensagem enviada</p>
        <p className="mt-3 text-muted-foreground">
          Obrigado pelo carinho — lemos tudo com atenção.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Enviar outra mensagem
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Seu nome</Label>
        <Input id="name" name="name" required autoComplete="name" placeholder="Nome completo" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Mensagem</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Escreva seu recado para o casal..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact">Contato (opcional)</Label>
        <Input
          id="contact"
          name="contact"
          autoComplete="email"
          placeholder="E-mail ou WhatsApp"
        />
      </div>

      {status === "error" && errorMessage ? (
        <p className="text-sm text-destructive" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={status === "loading"}>
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  )
}
