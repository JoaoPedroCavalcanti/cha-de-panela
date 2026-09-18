import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chá de panela",
  description: `${event.dateLabel} · ${event.venueName}`,
}

export default function ChaDePanelaPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-20 sm:py-28">
      <header className="text-center">
        <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
          {event.coupleNames}
        </p>
        <h1 className="mt-6 font-heading text-4xl text-foreground sm:text-5xl">
          {event.eventTitle}
        </h1>
      </header>

      <div className="mx-auto mt-14 h-px w-10 bg-foreground/15" />

      <dl className="mt-14 space-y-12 text-center">
        <div>
          <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Data
          </dt>
          <dd className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">
            {event.dateLabel}
          </dd>
        </div>

        <div>
          <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Horário
          </dt>
          <dd className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">
            {event.timeLabel}
          </dd>
        </div>

        <div>
          <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Local
          </dt>
          <dd className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">
            {event.venueName}
          </dd>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {event.venueAddress}
          </p>
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
          >
            Ver no mapa
            <ExternalLinkIcon className="size-3.5 opacity-60" />
          </a>
        </div>

        <div>
          <dt className="text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
            Traje
          </dt>
          <dd className="mt-3 text-base text-foreground sm:text-lg">
            {event.dressCode}
          </dd>
        </div>
      </dl>

      <div className="mx-auto mt-14 h-px w-10 bg-foreground/15" />

      <ul className="mt-14 space-y-4 text-center">
        {event.notes.map((note) => (
          <li key={note} className="text-sm leading-relaxed text-muted-foreground">
            {note}
          </li>
        ))}
      </ul>

      <div className="mt-16 flex justify-center">
        <Link
          href="/confirmar-presenca"
          className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
        >
          Confirmar presença
        </Link>
      </div>
    </div>
  )
}
