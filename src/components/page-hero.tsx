import { cn } from "@/lib/utils"

type PageHeroProps = {
  eyebrow?: string
  title: string
  description?: string
  className?: string
}

export function PageHero({ eyebrow, title, description, className }: PageHeroProps) {
  return (
    <section className={cn("border-b border-border/50", className)}>
      <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-20">
        {eyebrow ? (
          <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase animate-in fade-in duration-700">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-heading text-4xl leading-tight text-foreground sm:text-5xl animate-in fade-in slide-in-from-bottom-2 duration-700">
          {title}
        </h1>
        {description ? (
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg animate-in fade-in duration-700 delay-100">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  )
}
