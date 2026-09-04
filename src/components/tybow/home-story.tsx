"use client"

import { useState } from "react"

import "./tybow-motion.css"

import { ArrowButton } from "@/components/tybow/arrow-button"
import { FlushPhoto, MediaStack } from "@/components/tybow/flush-photo"
import { type HomeCardPhoto } from "@/components/tybow/home-card"

export type { HomeCardPhoto }

export type HomeStoryProps = {
  id?: string
  title: string
  specLine: string
  summary: string
  photo?: { src?: string; alt: string }
  eyebrow?: string
  price?: string
  sqft?: string
  beds?: string
  baths?: string
  garage?: string
  photos?: HomeCardPhoto[]
  onAsk?: () => void
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

export function HomeStory({
  id,
  title,
  specLine,
  summary,
  photo,
  eyebrow = specLine,
  price,
  sqft,
  beds,
  baths,
  garage,
  photos,
  onAsk,
}: HomeStoryProps) {
  const gallery: HomeCardPhoto[] =
    photos ?? (photo ? [{ ...photo, label: "Exterior" }] : [])
  const [on, setOn] = useState(0)

  return (
    <article id={id} className="bg-background px-[7vw] py-section">
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,24rem)]">
        <div className="relative min-h-[18rem] overflow-hidden bg-muted lg:min-h-[28rem]">
          {gallery.length ? (
            <>
              <MediaStack
                frames={gallery}
                on={on}
                slideClassName="tybow-overview-slide"
                className="absolute inset-0 size-full"
              />
              {gallery.length > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    className="absolute top-1/2 left-3 z-[3] grid size-[2.4rem] -translate-y-1/2 place-items-center border border-primary-foreground/45 bg-foreground/45 text-[1.35rem] text-primary-foreground"
                    onClick={() => setOn((i) => (i - 1 + gallery.length) % gallery.length)}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    className="absolute top-1/2 right-3 z-[3] grid size-[2.4rem] -translate-y-1/2 place-items-center border border-primary-foreground/45 bg-foreground/45 text-[1.35rem] text-primary-foreground"
                    onClick={() => setOn((i) => (i + 1) % gallery.length)}
                  >
                    ›
                  </button>
                </>
              ) : null}
            </>
          ) : (
            <FlushPhoto src={photo?.src} alt={photo?.alt ?? title} className="absolute inset-0" />
          )}
        </div>
        <div className="flex flex-col justify-center border border-border p-6 lg:border-l-0">
          <p className="text-[0.7rem] font-semibold tracking-[0.16em] text-primary uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium text-foreground">{title}</h2>
          {price ? (
            <p className="mt-2 font-display text-2xl text-primary">{price}</p>
          ) : null}
          <div className="mt-6 grid grid-cols-2">
            <Spec value={sqft} label="Sq ft" />
            <Spec value={beds} label="Bedrooms" />
            <Spec value={baths} label="Bathrooms" />
            <Spec value={garage} label="Garage" />
          </div>
          {onAsk ? (
            <div className="mt-6">
              <ArrowButton variant="inverse" onClick={onAsk}>
                Ask about this home
              </ArrowButton>
            </div>
          ) : null}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[62ch] text-pretty text-foreground">{summary}</p>
    </article>
  )
}
