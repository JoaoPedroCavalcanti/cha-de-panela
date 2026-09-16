import type { Metadata } from "next"
import { ExternalLinkIcon } from "lucide-react"

import { PageHero } from "@/components/page-hero"
import { buttonVariants } from "@/components/ui/button"
import { copy } from "@/content/copy"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Chá de panela",
  description: `${event.dateLabel} · ${event.venueName}`,
}

export default function ChaDePanelaPage() {
  return (
    <div>
      <PageHero
        eyebrow={event.eventTitle}
        title={copy.cha.title}
        description={copy.cha.intro}
      />

      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20">
        <dl className="grid gap-8 sm:grid-cols-2">
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Data
            </dt>
            <dd className="mt-2 font-heading text-2xl text-foreground">
              {event.dateLabel}
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Horário
            </dt>
            <dd className="mt-2 font-heading text-2xl text-foreground">
              {event.timeLabel}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Local
            </dt>
            <dd className="mt-2 font-heading text-2xl text-foreground">
              {event.venueName}
            </dd>
            <p className="mt-2 text-muted-foreground">{event.venueAddress}</p>
            <a
              href={event.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "outline" }), "mt-4 inline-flex")}
            >
              Abrir no mapa
              <ExternalLinkIcon />
            </a>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
              Dress code
            </dt>
            <dd className="mt-2 text-lg text-foreground">{event.dressCode}</dd>
          </div>
        </dl>

        <section className="mt-16 border-t border-border/70 pt-12">
          <h2 className="font-heading text-3xl text-foreground">Informações úteis</h2>
          <ul className="mt-6 space-y-4">
            {event.notes.map((note) => (
              <li
                key={note}
                className="border-l-2 border-accent-foreground/20 pl-4 text-muted-foreground"
              >
                {note}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
