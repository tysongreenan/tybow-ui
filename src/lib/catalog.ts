export type CatalogKind = "block" | "ui" | "template"

export type CatalogItem = {
  slug: string
  title: string
  description: string
  kind: CatalogKind
  preview: "full" | "padded"
  install?: string
}

export type CatalogGroup = {
  id: string
  label: string
  items: CatalogItem[]
}

export const catalog: CatalogGroup[] = [
  {
    id: "start",
    label: "Start",
    items: [
      {
        slug: "template",
        title: "Page template",
        description:
          "The composed community page: hero, looks, decided split, why deck, homes, journey, plan, form.",
        kind: "template",
        preview: "full",
      },
    ],
  },
  {
    id: "primitives",
    label: "Primitives",
    items: [
      {
        slug: "arrow-button",
        title: "Arrow button",
        description: "Pines CTA: label plus a square arrow tile. Cream, inverse, or ghost.",
        kind: "ui",
        preview: "padded",
      },
      {
        slug: "flush-photo",
        title: "Flush photo",
        description: "Full-bleed image, object-cover, no inner mat.",
        kind: "block",
        preview: "padded",
      },
    ],
  },
  {
    id: "chrome",
    label: "Chrome",
    items: [
      {
        slug: "site-header",
        title: "Site header",
        description: "Wordmark, nav, phone, book-a-tour. Overlay on a flush hero.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "communities-nav",
        title: "Communities nav",
        description: "Dropdown list of communities grouped by status.",
        kind: "block",
        preview: "padded",
      },
      {
        slug: "site-footer",
        title: "Site footer",
        description: "Builder name, phone, email, community list, legal slot.",
        kind: "block",
        preview: "full",
      },
    ],
  },
  {
    id: "sections",
    label: "Sections",
    items: [
      {
        slug: "chapter",
        title: "Chapter",
        description: "Flush hero: Ken Burns crossfade and word pull. Or paper stacked/split.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "looks-carousel",
        title: "Looks carousel",
        description: "Look board: stacked elevation photos, meta, thumbnail tablist.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "looks-row",
        title: "Looks row",
        description: "Expand-on-hover interiors gallery. Caption on the active pane.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "editorial-block",
        title: "Editorial block",
        description: "Decided split: tick schedule, overview photo crossfade, bleed photo.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "collection-story",
        title: "Collection story",
        description: "Why-this-place sticky deck. Pinned horizontal rail on desktop.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "facts-strip",
        title: "Facts strip",
        description: "Model address, hours, lot line. Not a card grid.",
        kind: "block",
        preview: "padded",
      },
      {
        slug: "preview-steps",
        title: "Preview steps",
        description: "Book, preview, reserve. Centered 1-2-3 from the Pines journey.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "site-plan",
        title: "Site plan",
        description: "One large object-contain image and the heading Browse the site plan.",
        kind: "block",
        preview: "full",
      },
      {
        slug: "cta-band",
        title: "CTA band",
        description: "Headline plus Book a tour and Call. Optional photo band.",
        kind: "block",
        preview: "full",
      },
    ],
  },
  {
    id: "homes",
    label: "Homes",
    items: [
      {
        slug: "home-card",
        title: "Home card",
        description: "Property card: photo crossfade, spec grid, two CTAs.",
        kind: "block",
        preview: "padded",
      },
      {
        slug: "home-story",
        title: "Home story",
        description: "Single home: title, spec line, paragraph, photo crossfade.",
        kind: "block",
        preview: "full",
      },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    items: [
      {
        slug: "tour-form",
        title: "Tour form",
        description: "Name, email, phone, community, plan of interest, message.",
        kind: "block",
        preview: "padded",
      },
      {
        slug: "tour-dialog",
        title: "Tour dialog",
        description: "Dialog wrapping the tour form.",
        kind: "block",
        preview: "padded",
      },
    ],
  },
]

export function catalogItems(): CatalogItem[] {
  return catalog.flatMap((group) => group.items)
}

export function getCatalogItem(slug: string): CatalogItem | undefined {
  return catalogItems().find((item) => item.slug === slug)
}

export function installCommand(slug: string) {
  return `pnpm dlx shadcn@latest add @tybow/${slug}`
}
