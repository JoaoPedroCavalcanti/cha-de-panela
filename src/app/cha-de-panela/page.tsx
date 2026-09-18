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

export default function ChaDePanelaPage() {
  return (
    <div>
      {/* Invitation opening */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,oklch(0.93_0.03_140/0.55),transparent_55%),radial-gradient(ellipse_at_bottom_right,oklch(0.94_0.02_85/0.7),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <p className="text-[11px] font-medium tracking-[0.32em] text-muted-foreground uppercase animate-in fade-in duration-700">
            {event.coupleNames}
          </p>
          <h1 className="mt-6 font-heading text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
            {copy.cha.title}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg animate-in fade-in duration-1000 delay-150">
            {copy.cha.intro}
          </p>
        </div>
      </section>

      {/* Big date / time */}
      <section className="border-b border-border/40 bg-foreground text-background">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-14 text-center sm:flex-row sm:justify-between sm:gap-12 sm:px-6 sm:py-16 sm:text-left">
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700">
            <p className="text-[11px] tracking-[0.22em] text-background/55 uppercase">Quando</p>
            <p className="mt-3 font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
              {event.dateLabel}
            </p>
          </div>
          <div
            aria-hidden
            className="hidden h-16 w-px bg-background/20 sm:block"
          />
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-100">
            <p className="text-[11px] tracking-[0.22em] text-background/55 uppercase">Horário</p>
            <p className="mt-3 font-heading text-3xl leading-tight sm:text-4xl md:text-5xl">
              {event.timeLabel}
            </p>
          </div>
        </div>
      </section>

      {/* Venue with photo */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="order-2 lg:order-1 animate-in fade-in slide-in-from-bottom-2 duration-700">
          <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">Onde</p>
          <h2 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            {event.venueName}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            {event.venueAddress}
          </p>
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ size: "lg" }), "mt-8 inline-flex")}
          >
            Como chegar
            <ExternalLinkIcon />
          </a>
        </div>

        <figure className="order-1 overflow-hidden lg:order-2 animate-in fade-in duration-1000">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/photos/casa-nova.jpg"
            alt="Local do chá de panela — a nova casa"
            className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
          />
        </figure>
      </section>

      {/* Dress code band */}
      <section className="relative overflow-hidden border-y border-border/50 bg-[oklch(0.95_0.025_140)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,oklch(0.98_0.01_85/0.8),transparent_45%)]"
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="text-[11px] tracking-[0.22em] text-muted-foreground uppercase">
            Dress code
          </p>
          <p className="mt-5 font-heading text-3xl text-foreground sm:text-4xl md:text-5xl">
            {event.dressCode}
          </p>
          <p className="mx-auto mt-5 max-w-md text-muted-foreground">
            Venha confortável e com vontade de celebrar — o clima é de casa cheia e mesa posta.
          </p>
        </div>
      </section>

      {/* Notes */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="text-center font-heading text-3xl text-foreground sm:text-4xl">
          Para facilitar o dia
        </h2>
        <ol className="mt-12 space-y-10">
          {event.notes.map((note, index) => (
            <li
              key={note}
              className="flex gap-5 sm:gap-8 animate-in fade-in slide-in-from-bottom-2 duration-700"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <span className="font-heading text-3xl leading-none text-foreground/25 sm:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="pt-1 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {note}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Closing CTAs */}
      <section className="border-t border-border/50 bg-muted/35">
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-20">
          <p className="font-heading text-3xl text-foreground sm:text-4xl">
            Contamos com você
          </p>
          <p className="mt-4 max-w-md text-muted-foreground">
            Confirme presença e, se quiser, dê uma olhada na lista de presentes.
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/confirmar-presenca"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              Confirmar presença
            </Link>
            <Link
              href="/presentes"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto"
              )}
            >
              Ver presentes
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
