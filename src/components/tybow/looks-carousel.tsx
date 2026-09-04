"use client"

import { useCallback, useRef, useState } from "react"

import "./tybow-motion.css"

import { ArrowButton } from "@/components/tybow/arrow-button"
import { MediaStack } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

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
  const [on, setOn] = useState(0)
  const picksRef = useRef<HTMLDivElement>(null)
  const current = slides[on]

  const paint = useCallback(
    (index: number, scroll = false) => {
      if (!slides.length) return
      const next = (index + slides.length) % slides.length
      setOn(next)
      if (!scroll) return
      const picks = picksRef.current
      const active = picks?.children[next] as HTMLElement | undefined
      if (!picks || !active) return
      const target = active.offsetLeft - (picks.clientWidth - active.offsetWidth) / 2
      if (typeof picks.scrollTo === "function") {
        picks.scrollTo({ left: Math.max(0, target) })
      } else {
        picks.scrollLeft = Math.max(0, target)
      }
    },
    [slides.length],
  )

  return (
    <section id={id} className="bg-background py-section">
      <div className="px-[7vw]">
        <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
          {eyebrow}
        </p>
        <h2 className="mt-4 max-w-[16ch] font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
          {title}
        </h2>
        <p className="mt-5 max-w-[36rem] text-pretty text-foreground">{copy}</p>
        {cta ? (
          <p className="mt-8">
            <ArrowButton href={cta.href} variant="inverse">
              {cta.label}
            </ArrowButton>
          </p>
        ) : null}
      </div>

      <div className="mt-10 grid gap-3 px-[7vw]">
        <MediaStack
          frames={slides.map((slide) => slide.photo)}
          on={on}
          slideClassName="tybow-look-slide"
          className="aspect-[16/9] min-h-[14rem] outline outline-border -outline-offset-px md:min-h-[22rem]"
        />
        {current ? (
          <div className="flex min-h-[1.8rem] flex-wrap items-baseline justify-between gap-x-5 gap-y-1">
            <p className="font-display text-[length:clamp(1.45rem,2.2vw,1.9rem)] font-medium tracking-[-0.02em] text-foreground">
              {current.name}
            </p>
            <p className="text-[0.66rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
              {current.tag}
            </p>
          </div>
        ) : null}
        <div
          ref={picksRef}
          className="grid grid-cols-2 gap-2 overflow-x-auto pb-4 md:flex md:grid-cols-none md:gap-2 lg:grid lg:grid-cols-6 lg:overflow-visible"
          role="tablist"
          aria-label="Looks"
          onKeyDown={(event) => {
            if (
              event.key !== "ArrowDown" &&
              event.key !== "ArrowUp" &&
              event.key !== "ArrowRight" &&
              event.key !== "ArrowLeft"
            ) {
              return
            }
            event.preventDefault()
            const dir =
              event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1
            const next = (on + dir + slides.length) % slides.length
            paint(next, true)
            const child = picksRef.current?.children[next] as HTMLElement | undefined
            child?.focus()
          }}
        >
          {slides.map((slide, index) => {
            const selected = index === on
            return (
              <button
                key={slide.name}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${slide.name}, ${slide.tag}`}
                tabIndex={selected ? 0 : -1}
                className={cn(
                  "flex min-h-11 shrink-0 flex-col border bg-card text-left transition-[border-color,transform,box-shadow] duration-150 ease-[cubic-bezier(0.2,0,0,1)] md:w-[7.75rem] md:snap-start lg:w-auto",
                  selected ? "border-primary" : "border-border hover:border-primary",
                  "active:scale-[0.96]",
                )}
                onClick={() => paint(index, true)}
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-muted outline outline-border -outline-offset-px">
                  {slide.photo.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={slide.photo.src}
                      alt=""
                      decoding="async"
                      className="absolute inset-0 size-full object-cover"
                      style={{ objectPosition: "50% 40%" }}
                    />
                  ) : null}
                  {selected ? (
                    <span className="absolute inset-0 outline-2 outline-offset-2 outline-primary" />
                  ) : null}
                </span>
                <span className="px-2 pt-1.5 font-display text-[0.95rem] font-medium tracking-[-0.02em] text-foreground">
                  {slide.name}
                </span>
                <span className="px-2 pt-0.5 pb-2 text-[0.58rem] leading-[1.3] tracking-[0.06em] text-muted-foreground uppercase">
                  {slide.tag}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
