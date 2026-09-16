import type { Metadata } from "next"
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { event } from "@/content/event"

import "./globals.css"

const heading = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-heading",
  display: "swap",
})

const sans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
})

const title = `${event.coupleNames} — ${event.eventTitle}`
const description = `${event.tagline} ${event.dateLabel}, ${event.timeLabel}.`

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title: {
    default: title,
    template: `%s · ${event.coupleNames}`,
  },
  description,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: event.siteUrl,
    siteName: title,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${heading.variable} ${sans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
