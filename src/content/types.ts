export type NavItem = {
  href: string
  label: string
}

export type EventContent = {
  coupleNames: string
  partnerOne: string
  partnerTwo: string
  eventTitle: string
  tagline: string
  dateLabel: string
  dateISO: string
  timeLabel: string
  venueName: string
  venueAddress: string
  mapUrl: string
  dressCode: string
  notes: string[]
  payment: {
    pixKey: string
    pixKeyLabel: string
    pixQrImageSrc: string | null
    cardPaymentUrl: string
  }
  siteUrl: string
  ogImage: string
  heroImageSrc: string
  heroImageAlt: string
}

export type StoryBlock = {
  id: string
  title: string
  body: string
  imageSrc?: string
  imageAlt?: string
}

export type StoryGalleryItem = {
  src: string
  alt: string
}

export type StoryContent = {
  intro: string
  blocks: StoryBlock[]
  gallery?: StoryGalleryItem[]
}

export type GiftItem = {
  id: string
  name: string
  description?: string
  amountBRL: number
  imageSrc?: string
  cardPaymentUrl?: string
}

export type SiteCopy = {
  home: {
    ctaGifts: string
    ctaRsvp: string
    supporting: string
  }
  gifts: {
    title: string
    intro: string
    contributeCta: string
  }
  messages: {
    title: string
    intro: string
    privacyNote: string
  }
  rsvp: {
    title: string
    intro: string
  }
  cha: {
    title: string
    intro: string
  }
}
