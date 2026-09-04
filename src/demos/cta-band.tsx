"use client"

import { CtaBand } from "@/components/tybow/cta-band"
import { cedar, sampleContent } from "@/demos/sample"
import { useTour } from "@/demos/tour"

export default function CtaBandDemo() {
  const { setOpen } = useTour()

  return (
    <CtaBand
      headline="Walk the model this weekend."
      phone={sampleContent.phone}
      onBookTour={() => setOpen(true)}
      photo={cedar.hero}
    />
  )
}
