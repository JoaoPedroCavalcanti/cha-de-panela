import { event } from "@/content/event"

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-10 text-center sm:px-6">
        <p className="font-heading text-lg text-foreground">{event.coupleNames}</p>
        <p className="text-sm text-muted-foreground">
          {event.eventTitle} · {event.dateLabel}
        </p>
      </div>
    </footer>
  )
}
