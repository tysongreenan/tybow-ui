"use client"

import { Button } from "@/components/ui/button"
import { useTour } from "@/demos/tour"

export default function TourDialogDemo() {
  const { setOpen } = useTour()

  return (
    <div className="flex items-center justify-center bg-background px-[7vw] py-section">
      <Button size="lg" onClick={() => setOpen(true)}>
        Open tour dialog
      </Button>
    </div>
  )
}
