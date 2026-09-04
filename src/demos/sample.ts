import { sampleContent } from "@/lib/sample-content"

export { sampleContent }

export const cedar = sampleContent.communities[0]
export const millbrook = sampleContent.communities[1]
export const pasture = sampleContent.communities[2]
export const willow = sampleContent.plans[0]
export const ash = sampleContent.plans[1]
export const home = sampleContent.readyHomes[0]

export function collectionHomes() {
  return sampleContent.plans.map((plan) => ({
    slug: plan.slug,
    name: plan.name,
    href: `#${plan.slug}`,
    beds: String(plan.beds ?? ""),
    baths: String(plan.baths ?? ""),
    garage: plan.garage ?? "2-Car",
    sqft: plan.sqft ?? 0,
    price: plan.price,
    kind: plan.kind,
    modelHome: plan.modelHome,
    photos:
      plan.photos ??
      (plan.image ? [{ ...plan.image, label: "Exterior" as const }] : [{ alt: plan.name, label: "Exterior" }]),
  }))
}

export const nav = [
  { href: "#looks", label: "The look" },
  { href: "#community", label: "Finished" },
  { href: "#homes", label: "Homes" },
  { href: "#contact", label: "Contact" },
]
