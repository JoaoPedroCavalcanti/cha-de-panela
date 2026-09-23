import type { EventContent } from "./types"

/**
 * Replace placeholders with real couple details before launch.
 * RSVP goes to NEXT_PUBLIC_API_URL. Messages still use Formspree.
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
  venueName: "Casa da Família — salão dos fundos",
  venueAddress: "Rua das Flores, 123 — Bairro Jardim, Natal, RN",
  mapUrl: "https://maps.google.com/?q=São+Paulo",
  dressCode: "Esporte fino, cores claras e alegres",
  notes: [
    "Cheguem com antecedência para um brinde de boas-vindas.",
    "Haverá estacionamento na rua e no estacionamento parceiro ao lado.",
    "Crianças são bem-vindas — avise na confirmação se vierem com vocês.",
  ],
  payment: {
    pixKey: "70300571470",
    pixKeyLabel: "CPF",
    pixQrImageSrc: "/photos/pix-qrcode.png",
    cardPaymentUrl: "https://www.asaas.com/c/6q5ks9koceclygn5",
  },
  formspree: {
    // Mensagens ainda no Formspree — set in .env.local
    messagesFormId: process.env.NEXT_PUBLIC_FORMSPREE_MESSAGES_ID ?? "",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cha-de-panela.vercel.app",
  ogImage: "/og.jpg",
  heroImageSrc: "/photos/hero.jpg",
  heroImageAlt: "Carol e João mostrando as alianças",
}
