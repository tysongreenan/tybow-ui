"use client"

import { useEffect, useRef, useState } from "react"

import "./tybow-motion.css"

import { ArrowButton } from "@/components/tybow/arrow-button"
import { MediaStack } from "@/components/tybow/flush-photo"
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
  const [on, setOn] = useState(0)
  const [restartKey, setRestartKey] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const current = photos[on]

  function go(n: number) {
    if (!photos.length) return
    setOn((n + photos.length) % photos.length)
    setRestartKey((key) => key + 1)
  }

  useEffect(() => {
    if (photos.length < 2) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const root = rootRef.current

    function stop() {
      if (timerRef.current) window.clearInterval(timerRef.current)
      timerRef.current = null
    }

    function restart() {
      stop()
      if (reduce) return
      timerRef.current = window.setInterval(() => {
        setOn((i) => (i + 1) % photos.length)
      }, 5200)
    }

    restart()
    if (!root) return () => stop()

    const onEnter = () => stop()
    const onLeave = () => restart()
    root.addEventListener("mouseenter", onEnter)
    root.addEventListener("mouseleave", onLeave)
    return () => {
      stop()
      root.removeEventListener("mouseenter", onEnter)
      root.removeEventListener("mouseleave", onLeave)
    }
  }, [photos.length, restartKey])

  return (
    <article
      id={id}
      className={cn(
        "grid items-stretch gap-0 bg-background lg:grid-cols-[minmax(0,1.35fr)_minmax(18rem,24rem)]",
        className,
      )}
    >
      <div
        ref={rootRef}
        className="relative min-h-[18rem] overflow-hidden bg-muted lg:min-h-[28rem]"
      >
        <MediaStack
          frames={photos}
          on={on}
          slideClassName="tybow-overview-slide"
          className="absolute inset-0 size-full"
        />
        {current?.label ? (
          <span className="absolute bottom-4 left-4 z-[2] bg-foreground/70 px-3 py-1 text-[0.65rem] tracking-[0.16em] text-primary-foreground uppercase">
            {current.label}
          </span>
        ) : null}
        {photos.length > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              className="absolute top-1/2 left-3 z-[3] grid size-[2.4rem] -translate-y-1/2 place-items-center border border-primary-foreground/45 bg-foreground/45 text-[1.35rem] text-primary-foreground"
              onClick={() => go(on - 1)}
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next image"
              className="absolute top-1/2 right-3 z-[3] grid size-[2.4rem] -translate-y-1/2 place-items-center border border-primary-foreground/45 bg-foreground/45 text-[1.35rem] text-primary-foreground"
              onClick={() => go(on + 1)}
            >
              ›
            </button>
          </>
        ) : null}
      </div>
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
