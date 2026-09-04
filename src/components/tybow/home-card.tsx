"use client"

import { useState } from "react"

import "./tybow-collection.css"

import { cn } from "@/lib/utils"

export type HomeCardPhoto = {
  src?: string
  alt: string
  label?: string
  fit?: "cover" | "contain"
}

export type HomeCardProps = {
  title: string
  href?: string
  price?: string
  sqft?: number | string
  beds?: string
  baths?: string
  garage?: string
  kind?: string
  modelHome?: boolean
  photos: HomeCardPhoto[]
  compared?: boolean
  onCompare?: () => void
  compareFull?: boolean
  className?: string
}

function fmtSqft(value?: number | string) {
  if (value == null || value === "") return ""
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.]/g, ""))
  if (!Number.isFinite(n)) return String(value)
  return n.toLocaleString("en-CA")
}

export function HomeCard({
  title,
  href,
  price,
  sqft,
  beds,
  baths,
  garage,
  kind,
  modelHome,
  photos,
  compared,
  onCompare,
  compareFull,
  className,
}: HomeCardProps) {
  const [on, setOn] = useState(0)
  const slides = photos.length ? photos : [{ alt: title, label: "Exterior" }]
  const current = slides[on]
  const sqftLabel = fmtSqft(sqft)
  const specs = [kind, beds && `${beds} Bed`, baths && `${baths} Bath`, garage, sqftLabel && `${sqftLabel} Sq Ft`]
    .filter(Boolean)
    .join(" · ")

  function go(next: number) {
    if (slides.length < 2) return
    setOn((next + slides.length) % slides.length)
  }

  return (
    <article
      className={cn(
        "tybow-home-card group relative flex cursor-pointer flex-col overflow-hidden border border-border bg-card transition-[background-color,border-color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted",
        compareFull && "is-full",
        className,
      )}
      onClick={(event) => {
        if (!href) return
        if ((event.target as HTMLElement).closest("a, button, label, input")) return
        window.location.href = href
      }}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        {slides.map((slide, index) =>
          slide.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={`${slide.src}-${index}`}
              src={slide.src}
              alt={index === on ? `${title} — ${slide.label ?? slide.alt}` : ""}
              className={cn(
                "tybow-home-card-slide absolute inset-0 size-full transition-opacity duration-300",
                index === on ? "opacity-100" : "opacity-0",
                slide.fit === "contain" ? "object-contain bg-background p-2.5" : "object-cover",
              )}
            />
          ) : (
            <div
              key={`${slide.alt}-${index}`}
              className={cn(
                "tybow-home-card-slide absolute inset-0 bg-muted transition-opacity duration-300",
                index === on ? "opacity-100" : "opacity-0",
              )}
              role="img"
              aria-label={slide.alt}
            />
          ),
        )}

        {slides.length > 1 ? (
          <>
            <button
              type="button"
              aria-label={`Previous image of ${title}`}
              className="tybow-home-card-arrow absolute top-1/2 left-2.5 z-[3] grid size-[34px] -translate-y-1/2 place-items-center rounded-full border border-primary-foreground/40 bg-foreground/70 text-xl text-primary-foreground transition-opacity"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                go(on - 1)
              }}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label={`Next image of ${title}`}
              className="tybow-home-card-arrow absolute top-1/2 right-2.5 z-[3] grid size-[34px] -translate-y-1/2 place-items-center rounded-full border border-primary-foreground/40 bg-foreground/70 text-xl text-primary-foreground transition-opacity"
              onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                go(on + 1)
              }}
            >
              ›
            </button>
            <div className="absolute bottom-2.5 left-1/2 z-[3] flex -translate-x-1/2 gap-1.5" aria-hidden>
              {slides.map((slide, index) => (
                <span
                  key={`${slide.alt}-${index}`}
                  className={cn(
                    "size-2 rounded-full border border-primary-foreground/70",
                    index === on && "border-primary bg-primary",
                  )}
                />
              ))}
            </div>
          </>
        ) : null}

        {current?.label ? (
          <span className="absolute bottom-2.5 left-2.5 z-[2] bg-foreground/70 px-2 py-0.5 text-[0.62rem] tracking-[0.1em] text-primary-foreground uppercase">
            {current.label}
          </span>
        ) : null}

        {modelHome ? (
          <span className="absolute top-2.5 left-2.5 z-[3] bg-primary/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-primary-foreground uppercase">
            Model home
          </span>
        ) : null}

        {sqftLabel ? (
          <span
            className={cn(
              "absolute left-2.5 z-[2] border border-primary-foreground/30 bg-primary/90 px-2.5 py-1 text-[0.62rem] font-semibold tracking-[0.12em] text-primary-foreground uppercase",
              modelHome ? "top-11" : "top-2.5",
            )}
          >
            {sqftLabel} sq ft
          </span>
        ) : null}

        {onCompare ? (
          <label
            className="tybow-home-card-compare absolute top-2.5 right-2.5 z-[3] flex cursor-pointer items-center gap-2 border border-primary-foreground/35 bg-primary/90 px-3 py-1.5 text-[0.62rem] font-semibold tracking-[0.14em] text-primary-foreground uppercase"
            title="Add to compare"
            onClick={(event) => event.stopPropagation()}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={compared}
              aria-label={`Compare ${title}`}
              onChange={onCompare}
            />
            <span className="tybow-home-card-check-box relative size-3.5 shrink-0 border-[1.5px] border-primary-foreground/70" />
            Compare
          </label>
        ) : null}
      </div>

      <div className="px-[18px] pt-4 pb-[18px]">
        <h3 className="font-display text-[length:clamp(1.35rem,2vw,1.65rem)] font-medium tracking-[-0.01em] text-foreground">
          {href ? (
            <a href={href} className="text-inherit no-underline hover:text-primary">
              {title}
            </a>
          ) : (
            title
          )}
        </h3>
        {price ? (
          <p className="mt-1.5 font-sans text-[1.0625rem] tracking-[0.04em] text-primary">
            {price}
          </p>
        ) : null}
        {specs ? (
          <p className="mt-2 text-[0.8125rem] text-muted-foreground">{specs}</p>
        ) : null}
        <span className="tybow-home-card-cta mt-2.5 inline-block text-[0.68rem] tracking-[0.12em] text-primary uppercase transition">
          View home details →
        </span>
      </div>
    </article>
  )
}
