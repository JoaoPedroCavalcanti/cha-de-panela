"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MenuIcon, XIcon } from "lucide-react"

import { navItems } from "@/content/nav"
import { event } from "@/content/event"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-[100] border-b border-border/60 bg-background">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href="/"
          className="relative z-[101] font-heading text-xl tracking-tight text-foreground sm:text-2xl"
        >
          {event.coupleNames}
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-[11px] font-medium tracking-[0.18em] uppercase transition-colors",
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Native details menu: works even if JS hydration fails on mobile/tunnel */}
        <details className="group relative z-[101] lg:hidden">
          <summary
            className={cn(
              "flex size-12 list-none cursor-pointer touch-manipulation items-center justify-center rounded-lg text-foreground",
              "[&::-webkit-details-marker]:hidden [-webkit-tap-highlight-color:transparent]"
            )}
            aria-label="Abrir menu"
          >
            <MenuIcon className="size-6 group-open:hidden" aria-hidden />
            <XIcon className="hidden size-6 group-open:block" aria-hidden />
          </summary>

          <nav
            className="fixed inset-x-0 top-16 z-[100] max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-border/60 bg-background px-4 py-3 shadow-sm"
            aria-label="Menu mobile"
          >
            <ul className="flex flex-col">
              {navItems.map((item) => {
                const active = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-3 py-3.5 text-base tracking-wide",
                        active
                          ? "bg-muted text-foreground"
                          : "text-foreground/80 active:bg-muted/60"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  )
}
