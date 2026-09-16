import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { copy } from "@/content/copy"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,oklch(0.92_0.03_140/0.55),transparent_45%),radial-gradient(circle_at_80%_10%,oklch(0.93_0.02_85/0.7),transparent_40%)]"
        />
        <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.28em] text-muted-foreground uppercase animate-in fade-in duration-700">
            {event.eventTitle}
          </p>
          <h1 className="mt-5 font-heading text-5xl leading-[1.05] text-foreground sm:text-7xl md:text-8xl animate-in fade-in slide-in-from-bottom-2 duration-1000">
            {event.coupleNames}
          </h1>
          <p className="mt-5 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase sm:text-xs animate-in fade-in duration-1000 delay-150">
            {event.dateLabel} · {event.timeLabel}
          </p>
          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg animate-in fade-in duration-1000 delay-200">
            {copy.home.supporting}
          </p>
          <div className="mt-10 flex w-full max-w-md flex-col gap-3 sm:flex-row sm:justify-center animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-300">
            <Link
              href="/presentes"
              className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
            >
              {copy.home.ctaGifts}
            </Link>
            <Link
              href="/confirmar-presenca"
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "w-full sm:w-auto"
              )}
            >
              {copy.home.ctaRsvp}
            </Link>
          </div>
        </div>

        <div className="relative h-[42vh] min-h-[240px] w-full overflow-hidden sm:h-[48vh]">
          <div
            className="absolute inset-0 bg-[linear-gradient(135deg,oklch(0.72_0.04_140)_0%,oklch(0.82_0.03_85)_45%,oklch(0.65_0.05_55)_100%)]"
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-background/40 to-transparent pb-8">
            <p className="max-w-lg px-4 text-center text-sm text-primary-foreground/95 drop-shadow-sm sm:text-base">
              {event.tagline}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
