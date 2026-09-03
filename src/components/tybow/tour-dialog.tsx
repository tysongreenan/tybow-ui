"use client"

import type { ReactNode } from "react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  TourForm,
  type TourFormOption,
  type TourFormValues,
} from "@/components/tybow/tour-form"

export type TourDialogProps = {
  communities: TourFormOption[]
  plans?: TourFormOption[]
  defaultCommunity?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: ReactNode
  onSubmit?: (values: TourFormValues) => void
}

export function TourDialog({
  communities,
  plans,
  defaultCommunity,
  open,
  onOpenChange,
  trigger,
  onSubmit,
}: TourDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger ? <DialogTrigger render={trigger as never} /> : null}
      <DialogContent className="sm:max-w-md" showCloseButton>
        <DialogHeader>
          <DialogTitle className="font-display">Book a tour</DialogTitle>
          <DialogDescription>
            Name, email, phone, community, plan of interest, and a short
            message. We will follow up.
          </DialogDescription>
        </DialogHeader>
        <TourForm
          communities={communities}
          plans={plans}
          defaultCommunity={defaultCommunity}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}
