"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type CtaBandProps = {
  id?: string
  headline: string
  phone: string
  onBookTour?: () => void
  photo?: { src?: string; alt: string }
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

export function CtaBand({
  id = "visit",
  headline,
  phone,
  onBookTour,
  photo,
}: CtaBandProps) {
  const onPhoto = Boolean(photo)

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden border-t border-border",
        onPhoto ? "text-primary-foreground" : "bg-background",
      )}
    >
      {photo ? (
        <>
          <FlushPhoto
            src={photo.src}
            alt={photo.alt}
            className="absolute inset-0 size-full"
          />
          <div className="absolute inset-0 bg-primary/80" />
        </>
      ) : null}
      <div className="relative mx-auto flex max-w-[1400px] flex-col gap-8 px-[7vw] py-section md:flex-row md:items-end md:justify-between">
        <h2
          className={cn(
            "max-w-[16ch] font-display text-display",
            onPhoto ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {headline}
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            variant={onPhoto ? "secondary" : "default"}
            onClick={onBookTour}
          >
            Book a tour
          </Button>
          <a
            href={telHref(phone)}
            className={buttonVariants({
              variant: onPhoto ? "outline" : "secondary",
            })}
          >
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
