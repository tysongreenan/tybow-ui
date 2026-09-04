"use client"

import { SiteHeader } from "@/components/tybow/site-header"
import { nav, sampleContent } from "@/demos/sample"
import { useTour } from "@/demos/tour"

export function SiteHeaderBlock() {
  const { setOpen } = useTour()

  return (
    <SiteHeader
      wordmark={sampleContent.builderName}
      phone={sampleContent.phone}
      communities={sampleContent.communities}
      nav={nav}
      onBookTour={() => setOpen(true)}
      getCommunityHref={(community) => `#${community.slug}`}
      overlay
    />
  )
}

export default function SiteHeaderDemo() {
  return (
    <div className="relative min-h-48 bg-foreground">
      <SiteHeaderBlock />
    </div>
  )
}
