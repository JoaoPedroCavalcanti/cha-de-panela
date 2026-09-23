"use client"

import { useState, type FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { getApiBaseUrl } from "@/lib/api"

type FormStatus = "idle" | "loading" | "success" | "error"

export function MessageForm() {
  const [status, setStatus] = useState<FormStatus>("idle")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get("name") ?? "").trim()
    const message = String(data.get("message") ?? "").trim()

    if (!name) {
      setStatus("error")
      setErrorMessage("Informe seu nome.")
      return
    }
    if (!message) {
      setStatus("error")
      setErrorMessage("Escreva uma mensagem.")
      return
    }

    setStatus("loading")
    try {
      const res = await fetch(`${getApiBaseUrl()}/api/messages/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      })

      if (!res.ok) {
        const detail = await res.text()
        throw new Error(detail || "Falha ao enviar")
      }

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
