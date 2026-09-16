import type { EventContent } from "./types"

/**
 * Replace placeholders with real couple details before launch.
 * Formspree IDs can also be overridden via NEXT_PUBLIC_FORMSPREE_* env vars.
 */
export const event: EventContent = {
  coupleNames: "Ana & Bruno",
  partnerOne: "Ana",
  partnerTwo: "Bruno",
  eventTitle: "Chá de Panela",
  tagline: "Venha celebrar conosco o começo da nossa casa.",
  dateLabel: "Sábado, 15 de novembro de 2025",
  dateISO: "2025-11-15",
  timeLabel: "15h00",
  venueName: "Casa da Família — salão dos fundos",
  venueAddress: "Rua das Flores, 123 — Bairro Jardim, São Paulo, SP",
  mapUrl: "https://maps.google.com/?q=São+Paulo",
  dressCode: "Esporte fino, cores claras e alegres",
  notes: [
    "Cheguem com antecedência para um brinde de boas-vindas.",
    "Haverá estacionamento na rua e no estacionamento parceiro ao lado.",
    "Crianças são bem-vindas — avise na confirmação se vierem com vocês.",
  ],
  payment: {
    pixKey: "00000000000",
    pixKeyLabel: "CPF (placeholder — trocar pela chave real)",
    pixQrImageSrc: null,
    picPayDefaultUrl: "https://picpay.me/",
  },
  formspree: {
    // Set real IDs in .env.local — see README
    messagesFormId: process.env.NEXT_PUBLIC_FORMSPREE_MESSAGES_ID ?? "",
    rsvpFormId: process.env.NEXT_PUBLIC_FORMSPREE_RSVP_ID ?? "",
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://cha-de-panela.vercel.app",
  ogImage: "/og.png",
}
