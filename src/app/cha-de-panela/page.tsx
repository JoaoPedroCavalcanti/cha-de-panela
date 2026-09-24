import type { Metadata } from "next"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { copy } from "@/content/copy"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chá de panela",
  description: `${event.dateLabel} · ${event.venueName}`,
}

const monthNames = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro",
]

function parseEventDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number)
  return {
    day: String(day),
    month: monthNames[month - 1] ?? "",
    year: String(year),
  }
}

export default function ChaDePanelaPage() {
  const { day, month, year } = parseEventDate(event.dateISO)

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20 lg:items-start">
        {/* Date as the only visual gesture */}
        <div className="text-center lg:sticky lg:top-28 lg:text-left">
          <p className="text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
            {event.eventTitle}
          </p>
          <p className="mt-6 font-heading text-[7.5rem] leading-none tracking-tight text-foreground sm:text-[9rem]">
            {day}
          </p>
          <p className="mt-2 font-heading text-3xl capitalize text-foreground/80 sm:text-4xl">
            {month}
          </p>
          <p className="mt-1 text-sm tracking-[0.2em] text-muted-foreground">
            {year}
          </p>
        </div>

        {/* Details */}
        <div className="lg:pt-2">
          <h1 className="font-heading text-3xl text-foreground sm:text-4xl">
            {copy.cha.title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {copy.cha.intro}
          </p>

          <div className="mt-12 space-y-8 border-t border-foreground/10 pt-10">
            <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Horário
              </p>
              <p className="text-lg text-foreground">{event.timeLabel}</p>
            </div>

            <div className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-6">
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Local
              </p>
              <div>
                <p className="text-lg text-foreground">{event.venueName}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {event.venueAddress}
                </p>
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-foreground underline decoration-foreground/20 underline-offset-4 hover:decoration-foreground"
                >
                  Ver no mapa
                  <ExternalLinkIcon className="size-3.5 opacity-60" />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 space-y-3 border-t border-foreground/10 pt-10">
            {event.notes.map((note) => (
              <p key={note} className="text-sm leading-relaxed text-muted-foreground">
                {note}
              </p>
            ))}
          </div>

          <div className="mt-12">
            <Link
              href="/confirmar-presenca"
              className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
            >
              Confirmar presença
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
