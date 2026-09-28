"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

type PageTransitionProps = {
  children: ReactNode
}

/**
 * Soft enter animation on route change (fade + slight rise).
 * Respects prefers-reduced-motion via CSS.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
