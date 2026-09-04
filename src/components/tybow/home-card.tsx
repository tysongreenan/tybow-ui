"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowButton } from "@/components/tybow/arrow-button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type HomeCardPhoto = { src?: string; alt: string; label?: string }

export type HomeCardProps = {
  id?: string
  eyebrow: string
  title: string
  price?: string
  sqft?: string
  beds?: string
  baths?: string
  garage?: string
  photos: HomeCardPhoto[]
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  onPrimary?: () => void
  onSecondary?: () => void
  className?: string
}

function Spec({ value, label }: { value?: string; label: string }) {
  if (!value) return null
  return (
    <div className="border border-border px-4 py-3">
      <p className="font-display text-xl text-foreground">{value}</p>
      <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
        {label}
      </p>
    </div>
  )
}

export function HomeCard({
  id,
  eyebrow,
  title,
  price,
  sqft,
  beds,
  baths,
  garage,
  photos,
  primaryCta,
  secondaryCta,
  onPrimary,
  onSecondary,
  className,
}: HomeCardProps) {
  return (
    <article
      id={id}
      className={cn(
        "grid items-stretch gap-0 bg-background lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,24rem)]",
        className,
      )}
    >
      <Carousel className="relative min-h-[18rem] overflow-hidden bg-muted lg:min-h-[28rem]">
        <CarouselContent className="ml-0">
          {photos.map((photo, index) => (
            <CarouselItem key={`${photo.alt}-${index}`} className="relative min-h-[18rem] pl-0 lg:min-h-[28rem]">
              <FlushPhoto
                src={photo.src}
                alt={photo.alt}
                className="absolute inset-0 size-full"
              />
              {photo.label ? (
                <span className="absolute bottom-4 left-4 bg-foreground/70 px-3 py-1 text-[0.65rem] tracking-[0.16em] text-primary-foreground uppercase">
                  {photo.label}
                </span>
              ) : null}
            </CarouselItem>
          ))}
        </CarouselContent>
        {photos.length > 1 ? (
          <>
            <CarouselPrevious className="left-3 rounded-none border-0 bg-background/80" />
            <CarouselNext className="right-3 rounded-none border-0 bg-background/80" />
          </>
        ) : null}
      </Carousel>
      <div className="flex flex-col justify-center border border-border p-6 lg:border-l-0">
        <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-4xl font-medium text-foreground">
          {title}
        </h2>
        {price ? (
          <p className="mt-2 font-display text-2xl text-primary">{price}</p>
        ) : null}
        <div className="mt-6 grid grid-cols-2">
          <Spec value={sqft} label="Sq ft" />
          <Spec value={beds} label="Bedrooms" />
          <Spec value={baths} label="Bathrooms" />
          <Spec value={garage} label="Garage" />
        </div>
        <div className="mt-6 grid gap-3">
          {primaryCta || onPrimary ? (
            primaryCta ? (
              <ArrowButton href={primaryCta.href} variant="inverse">
                {primaryCta.label}
              </ArrowButton>
            ) : (
              <ArrowButton variant="inverse" onClick={onPrimary}>
                Ask about this home
              </ArrowButton>
            )
          ) : null}
          {secondaryCta ? (
            <a
              href={secondaryCta.href}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {secondaryCta.label}
            </a>
          ) : onSecondary ? (
            <button
              type="button"
              className={buttonVariants({ variant: "outline", size: "lg" })}
              onClick={onSecondary}
            >
              Add to compare
            </button>
          ) : null}
        </div>
      </div>
    </article>
  )
}
