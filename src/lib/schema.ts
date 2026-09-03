export type CommunityStatus =
  | "available"
  | "selling"
  | "sold-out"
  | "coming-soon"

export type Community = {
  slug: string
  name: string
  town: string
  status: CommunityStatus
  oneLiner: string
  modelAddress?: string
  hours?: string
  lotLine?: string
  hero?: { src: string; alt: string }
  sitePlan?: { src: string; alt: string }
}

export type Plan = {
  slug: string
  communitySlug: string
  name: string
  beds?: number
  baths?: number
  sqft?: number
  image?: { src: string; alt: string }
}

export type ReadyHome = {
  slug: string
  name: string
  communitySlug?: string
  specLine: string
  summary: string
  photo?: { src: string; alt: string }
}

export type SiteContent = {
  builderName: string
  phone: string
  email: string
  communities: Community[]
  plans: Plan[]
  readyHomes: ReadyHome[]
}

export const communityStatusLabel: Record<CommunityStatus, string> = {
  available: "Available",
  selling: "Selling",
  "sold-out": "Sold out",
  "coming-soon": "Coming soon",
}
