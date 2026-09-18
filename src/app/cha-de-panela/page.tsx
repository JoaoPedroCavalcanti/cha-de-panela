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
    <div>
      {/* Photo-led opening — same language as home */}
      <section className="relative isolate min-h-[72svh] overflow-hidden sm:min-h-[78svh]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/historia-noite.jpg"
          alt="Carol e João"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div aria-hidden className="absolute inset-0 bg-black/45" />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/25"
        />
        <div className="relative mx-auto flex min-h-[72svh] max-w-4xl flex-col items-center justify-end px-4 pb-14 pt-28 text-center sm:min-h-[78svh] sm:px-6 sm:pb-20">
          <p className="text-[11px] font-medium tracking-[0.3em] text-white/80 uppercase drop-shadow-sm animate-in fade-in duration-700">
            {event.coupleNames}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-white drop-shadow-md sm:text-6xl md:text-7xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
            {event.eventTitle}
          </h1>
          <p className="mt-5 text-[11px] font-medium tracking-[0.22em] text-white/85 uppercase drop-shadow-sm sm:text-xs animate-in fade-in duration-1000 delay-150">
            {event.dateLabel} · {event.timeLabel}
          </p>
        </div>
      </section>

      {/* Invitation letter */}
      <section className="bg-background">
        <div className="mx-auto max-w-xl px-6 py-20 text-center sm:py-28">
          <p className="font-heading text-2xl leading-snug text-foreground sm:text-3xl animate-in fade-in duration-700">
            Com alegria, convidamos vocês para celebrar conosco o começo da nossa
            casa.
          </p>

          <div className="mx-auto mt-12 h-px w-12 bg-foreground/20" />

          <div className="mt-12 space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-1000">
            <div>
              <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Quando
              </p>
              <p className="mt-3 font-heading text-3xl text-foreground sm:text-[2.5rem]">
                {event.dateLabel}
              </p>
              <p className="mt-2 text-lg text-foreground/70">às {event.timeLabel}</p>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Onde
              </p>
              <p className="mt-3 font-heading text-3xl text-foreground sm:text-[2.5rem]">
                {event.venueName}
              </p>
              <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
                {event.venueAddress}
              </p>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline decoration-foreground/25 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                Ver no mapa
                <ExternalLinkIcon className="size-3.5 opacity-70" />
              </a>
            </div>

            <div>
              <p className="text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
                Traje
              </p>
              <p className="mt-3 font-heading text-2xl text-foreground sm:text-3xl">
                {event.dressCode}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* House */}
      <section className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/photos/casa-nova.jpg"
          alt="A casa onde vamos morar"
          className="aspect-[4/5] w-full object-cover sm:aspect-[16/9]"
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-10 sm:py-12">
          <p className="text-center text-[11px] tracking-[0.22em] text-white/75 uppercase">
            Nossa casa
          </p>
          <p className="mt-2 text-center font-heading text-2xl text-white sm:text-3xl">
            Onde a festa — e a vida nova — acontecem
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto max-w-lg px-6 py-20 sm:py-24">
        <p className="text-center text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
          Detalhes
        </p>
        <div className="mt-10 space-y-6">
          {event.notes.map((note) => (
            <p
              key={note}
              className="text-center text-base leading-relaxed text-foreground/70 sm:text-lg"
            >
              {note}
            </p>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/confirmar-presenca"
            className={cn(buttonVariants({ size: "lg" }), "inline-flex")}
          >
            Confirmar presença
          </Link>
        </div>
      </section>
    </div>
  )
}
