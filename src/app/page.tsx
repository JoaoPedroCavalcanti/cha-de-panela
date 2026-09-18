import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { copy } from "@/content/copy"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <div>
      <section className="relative isolate min-h-[calc(100svh-4rem)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={event.heroImageSrc}
          alt={event.heroImageAlt}
          className="absolute inset-0 h-full w-full object-cover object-[center_28%] animate-in fade-in duration-1000"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/35 to-black/25"
        />

        <div className="relative mx-auto flex min-h-[calc(100svh-4rem)] max-w-5xl flex-col items-center justify-end px-4 pb-14 pt-24 text-center sm:px-6 sm:pb-20">
          <p className="text-[11px] font-medium tracking-[0.28em] text-white/75 uppercase animate-in fade-in duration-700">
            {event.eventTitle}
          </p>
          <h1 className="mt-4 font-heading text-5xl leading-[1.05] text-white sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
            {event.coupleNames}
          </h1>
          <p className="mt-5 text-[11px] font-medium tracking-[0.22em] text-white/70 uppercase sm:text-xs animate-in fade-in duration-1000 delay-150">
            {event.dateLabel} · {event.timeLabel}
          </p>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/85 sm:text-lg animate-in fade-in duration-1000 delay-200">
            {copy.home.supporting}
          </p>
          <div className="mt-9 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
            <Link
              href="/presentes"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full border-transparent bg-white text-foreground hover:bg-white/90 sm:w-auto"
              )}
            >
              {copy.home.ctaGifts}
            </Link>
            <Link
              href="/confirmar-presenca"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full border-white/55 bg-transparent text-white hover:bg-white/10 hover:text-white sm:w-auto"
              )}
            >
              {copy.home.ctaRsvp}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
