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
  dateLabel: "Sábado, 17 de outubro de 2026",
  dateISO: "2026-10-17",
  timeLabel: "11h00",
  venueName: "Condomínio Residencial Cheverny",
  venueAddress: "Av. Romualdo Galvão, 1834 - Lagoa Nova",
  mapUrl: "https://www.google.com/maps/place/Condom%C3%ADnio+Residencial+Cheverny/data=!4m2!3m1!1s0x0:0x91e850a7a8d0736f?sa=X&ved=1t:2428&ictx=111",
  dressCode: "Esporte fino, cores claras e alegres",
  notes: [],
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cha-de-panela.vercel.app",
  ogImage: "/og.jpg",
  heroImageSrc: "/photos/hero.jpg",
  heroImageAlt: "Carol e João mostrando as alianças",
}
