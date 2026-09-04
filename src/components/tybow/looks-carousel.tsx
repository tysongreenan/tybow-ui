"use client"

import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { FlushPhoto } from "@/components/tybow/flush-photo"

export type LooksCarouselSlide = {
  name: string
  tag: string
  photo: { src?: string; alt: string }
}

export type LooksCarouselProps = {
  id?: string
  eyebrow: string
  title: string
  copy: string
  cta?: { href: string; label: string }
  slides: LooksCarouselSlide[]
}

export function LooksCarousel({
  id,
  eyebrow,
  title,
  copy,
  cta,
  slides,
}: LooksCarouselProps) {
  return (
    <section id={id} className="bg-background">
      <div className="grid items-center gap-10 py-section lg:grid-cols-2">
        <div className="px-[7vw] lg:pr-4">
          <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-4 max-w-[16ch] font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-5 max-w-[36rem] text-pretty text-foreground">{copy}</p>
          {cta ? (
            <p className="mt-8">
              <Link
                href={cta.href}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {cta.label}
              </Link>
            </p>
          ) : null}
        </div>
        <Carousel className="relative min-h-[22rem] w-full overflow-hidden bg-muted lg:min-h-[32rem]">
          <CarouselContent className="ml-0 h-full">
            {slides.map((slide) => (
              <CarouselItem key={slide.name} className="relative min-h-[22rem] pl-0 lg:min-h-[32rem]">
                <FlushPhoto
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  className="absolute inset-0 size-full"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/70 to-transparent p-6 text-primary-foreground">
                  <p className="font-display text-3xl">{slide.name}</p>
                  <p className="mt-1 text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
                    {slide.tag}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3 rounded-none border-0 bg-background/80 text-foreground" />
          <CarouselNext className="right-3 rounded-none border-0 bg-background/80 text-foreground" />
        </Carousel>
      </div>
    </section>
  )
}
