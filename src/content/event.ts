import type { EventContent } from "./types"

/**
 * Replace placeholders with real couple details before launch.
 * RSVP, messages and gift checkout go through NEXT_PUBLIC_API_URL (Asaas).
 */
export const event: EventContent = {
  coupleNames: "Carol & João",
  partnerOne: "Carol",
  partnerTwo: "João",
  eventTitle: "Chá de Panela",
  tagline: "Venha celebrar conosco o começo do nosso sonho.",
  notes: [],
  payment: {
    pixKey: "70300571470",
    pixKeyLabel: "CPF",
    pixQrImageSrc: "/photos/pix-qrcode.png",
  },
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://cha-de-panela.vercel.app",
  ogImage: "/og.jpg",
  heroImageSrc: "/photos/hero.jpg",
  heroImageAlt: "Carol e João mostrando as alianças",
}
