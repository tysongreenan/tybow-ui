"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import { TourDialog } from "@/components/tybow/tour-dialog"
import { sampleContent } from "@/demos/sample"

type TourContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const TourContext = createContext<TourContextValue | null>(null)

export function useTour() {
  const value = useContext(TourContext)
  if (!value) {
    throw new Error("useTour must be used inside DemoProviders")
  }
  return value
}

export function DemoProviders({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const value = useMemo(() => ({ open, setOpen }), [open])

  return (
    <TourContext.Provider value={value}>
      <TourDialog
        open={open}
        onOpenChange={setOpen}
        communities={sampleContent.communities}
        plans={sampleContent.plans}
      />
      {children}
    </TourContext.Provider>
  )
}
