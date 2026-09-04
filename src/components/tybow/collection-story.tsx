"use client"

import { useEffect, useRef } from "react"

import "./tybow-motion.css"

import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type CollectionStoryCard = {
  title: string
  line?: string
  photo?: { src?: string; alt: string }
}

export type CollectionStoryProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  cards?: CollectionStoryCard[]
  photo?: { src?: string; alt: string }
  collage?: { src?: string; alt: string }[]
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
}

export function CollectionStory({
  id,
  eyebrow,
  title,
  copy,
  cards,
  photo,
  collage,
}: CollectionStoryProps) {
  const rail: CollectionStoryCard[] =
    cards ??
    (collage ?? (photo ? [photo] : [])).map((item) => ({
      title: item.alt,
      photo: item,
    }))
  const deckRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const deckEl = deckRef.current
    const trackEl = trackRef.current
    const viewportEl = viewportRef.current
    const bar = barRef.current
    if (!deckEl || !trackEl || !viewportEl || rail.length < 2) return
    const deck = deckEl
    const track = trackEl
    const viewport = viewportEl

    const mq = window.matchMedia("(min-width: 960px)")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    let wired = false
    let ticking = false
    let maxX = 0

    const cardEls = () =>
      Array.from(deck.querySelectorAll<HTMLElement>("[data-tybow-card]"))

    function setActive(idx: number) {
      cardEls().forEach((card, i) => {
        card.classList.toggle("is-active", i === idx)
      })
    }

    function teardown() {
      deck.style.height = ""
      track.style.transform = ""
      if (bar) bar.style.transform = ""
      cardEls().forEach((card) => card.classList.add("is-active"))
    }

    function measure() {
      maxX = Math.max(0, track.scrollWidth - (viewport.clientWidth || 1))
      const vh = window.innerHeight || 800
      const byCards = Math.max(0, rail.length - 1) * vh * 0.75
      const byTrack = maxX * 0.9
      let travel = Math.max(byCards, byTrack)
      if (travel < vh * 1.1) travel = vh * 1.1
      deck.style.height = `${Math.round(vh + travel)}px`
    }

    function apply(p: number) {
      const travel = Math.max(0, Math.min(1, (p - 0.06) / 0.94))
      track.style.transform = `translate3d(${(-(travel * maxX)).toFixed(2)}px,0,0)`
      if (bar) bar.style.transform = `scaleX(${travel.toFixed(4)})`

      const viewportBox = viewport.getBoundingClientRect()
      const visibleLeft = Math.max(0, viewportBox.left)
      const visibleRight = Math.min(window.innerWidth, viewportBox.right)
      const mid = visibleLeft + Math.max(0, visibleRight - visibleLeft) / 2
      let best = 0
      let bestDist = Infinity
      cardEls().forEach((card, i) => {
        const box = card.getBoundingClientRect()
        const d = Math.abs(box.left + box.width / 2 - mid)
        if (d < bestDist) {
          bestDist = d
          best = i
        }
      })
      setActive(best)
    }

    function progress() {
      const range = deck.offsetHeight - window.innerHeight
      const p = range < 1 ? 0 : -deck.getBoundingClientRect().top / range
      return p < 0 ? 0 : p > 1 ? 1 : p
    }

    function sync() {
      ticking = false
      apply(progress())
    }

    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(sync)
    }

    function activate() {
      if (!mq.matches || reduced.matches) {
        if (wired) {
          window.removeEventListener("scroll", onScroll)
          wired = false
        }
        teardown()
        return
      }
      measure()
      sync()
      if (!wired) {
        window.addEventListener("scroll", onScroll, { passive: true })
        wired = true
      }
    }

    activate()
    window.addEventListener("resize", activate, { passive: true })
    window.addEventListener("load", activate)
    mq.addEventListener?.("change", activate)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", activate)
      window.removeEventListener("load", activate)
      teardown()
    }
  }, [rail.length])

  return (
    <section ref={deckRef} id={id} className="relative z-[3] bg-background">
      <div className="flex min-h-0 flex-col max-[959px]:static max-[959px]:h-auto max-[959px]:overflow-visible min-[960px]:sticky min-[960px]:top-0 min-[960px]:h-svh min-[960px]:overflow-hidden">
        <div className="flex h-full w-full flex-col gap-[clamp(1.1rem,2.2vh,1.75rem)] pt-[clamp(3.5rem,8vw,5.75rem)] pb-[clamp(3.5rem,8vw,5.75rem)] min-[960px]:pt-[clamp(5.25rem,9vh,6.75rem)] min-[960px]:pb-[clamp(1.5rem,3.5vh,2.5rem)]">
          <div className="max-w-[44rem] px-[7vw]">
            {eyebrow ? (
              <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
                {eyebrow}
              </p>
            ) : null}
            <h2 className="mt-3 font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
              {title}
            </h2>
            <p className="mt-4 max-w-[38rem] text-pretty text-foreground">{copy}</p>
            <div className="mt-3 hidden max-w-[11rem] min-[960px]:flex">
              <div className="relative h-px flex-1 overflow-hidden bg-foreground/20">
                <span
                  ref={barRef}
                  className="absolute inset-0 origin-left bg-primary"
                  style={{ transform: "scaleX(0)" }}
                />
              </div>
            </div>
          </div>
          <div
            ref={viewportRef}
            className="min-w-0 overflow-x-auto overflow-y-hidden pr-0 pl-[7vw] max-[959px]:snap-x max-[959px]:snap-mandatory min-[960px]:w-0 min-[960px]:min-w-full min-[960px]:flex-1 min-[960px]:overflow-hidden"
          >
            <div
              ref={trackRef}
              className="tybow-deck-track flex h-[min(64vw,32rem)] gap-[clamp(14px,1.6vw,26px)] will-change-transform min-[960px]:h-full"
            >
              {rail.map((card, index) => (
                <article
                  key={card.title}
                  data-tybow-card
                  className={cn(
                    "tybow-deck-card relative h-full w-[min(86vw,420px)] shrink-0 overflow-hidden bg-muted max-[959px]:h-[min(64vw,520px)] max-[959px]:snap-start min-[960px]:w-[clamp(720px,82vw,1120px)]",
                    index === 0 && "is-active",
                  )}
                >
                  {card.photo ? (
                    <FlushPhoto
                      src={card.photo.src}
                      alt={card.photo.alt}
                      className="absolute inset-0 size-full"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,color-mix(in_oklch,var(--foreground)_68%,transparent)_72%,color-mix(in_oklch,var(--foreground)_96%,transparent)_100%),color-mix(in_oklch,var(--foreground)_26%,transparent)]"
                    aria-hidden="true"
                  />
                  <div className="tybow-deck-card-body absolute inset-x-0 bottom-[clamp(1.5rem,4vh,2.75rem)] z-[2] px-[clamp(1rem,2vw,1.75rem)] text-center text-primary-foreground">
                    <h3 className="font-display text-[length:clamp(1.6rem,2.5vw,2.75rem)] font-light tracking-[0.045em] uppercase">
                      {card.title}
                    </h3>
                    {card.line ? (
                      <p className="mt-3 text-[0.66rem] font-medium tracking-[0.2em] text-primary-foreground/80 uppercase">
                        {card.line}
                      </p>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
