"use client"

import { useEffect, useRef, useState } from "react"

import "./tybow-motion.css"

import { ArrowButton } from "@/components/tybow/arrow-button"
import { MediaStack } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type EditorialPhoto = {
  src?: string
  alt: string
  name?: string
  tag?: string
}

export type EditorialBlockProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  coda?: string
  pointsTitle?: string
  points?: string[]
  photo?: { src?: string; alt: string }
  photos?: EditorialPhoto[]
  cta?: { href: string; label: string }
  note?: string
}

export function EditorialBlock({
  id,
  eyebrow,
  title,
  copy,
  coda,
  pointsTitle,
  points,
  photo,
  photos,
  cta,
  note,
}: EditorialBlockProps) {
  const frames: EditorialPhoto[] = photos?.length
    ? photos
    : photo
      ? [photo]
      : []
  const [on, setOn] = useState(0)
  const [restartKey, setRestartKey] = useState(0)
  const rootRef = useRef<HTMLDivElement>(null)
  const specRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<number | null>(null)
  const current = frames[on]

  function go(n: number) {
    if (!frames.length) return
    setOn((n + frames.length) % frames.length)
    setRestartKey((key) => key + 1)
  }

  useEffect(() => {
    const spec = specRef.current
    if (!spec) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) {
      spec.classList.add("is-inview")
      return
    }
    const mark = () => spec.classList.add("is-inview")
    const due = () => spec.getBoundingClientRect().top < window.innerHeight * 0.88
    if (!("IntersectionObserver" in window)) {
      mark()
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && !due()) return
          mark()
          io.disconnect()
        })
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    )
    const onScroll = () => {
      if (!due()) return
      mark()
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
    if (due() && spec.getBoundingClientRect().bottom > 0) {
      requestAnimationFrame(() => requestAnimationFrame(mark))
    } else {
      io.observe(spec)
      window.addEventListener("scroll", onScroll, { passive: true })
    }
    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
    const framesCount = frames.length
    if (framesCount < 2) return
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
        setOn((i) => (i + 1) % framesCount)
      }, 5200)
    }

    restart()
    if (!root) return () => stop()

    const onEnter = () => stop()
    const onLeave = () => restart()
    const onFocusIn = () => stop()
    const onFocusOut = (event: FocusEvent) => {
      if (!root.contains(event.relatedTarget as Node | null)) restart()
    }
    root.addEventListener("mouseenter", onEnter)
    root.addEventListener("mouseleave", onLeave)
    root.addEventListener("focusin", onFocusIn)
    root.addEventListener("focusout", onFocusOut)
    return () => {
      stop()
      root.removeEventListener("mouseenter", onEnter)
      root.removeEventListener("mouseleave", onLeave)
      root.removeEventListener("focusin", onFocusIn)
      root.removeEventListener("focusout", onFocusOut)
    }
  }, [frames.length, restartKey])

  return (
    <section id={id} className="bg-background">
      <div
        className={cn(
          "grid items-start gap-10 py-section pl-[7vw]",
          frames.length
            ? "lg:grid-cols-[minmax(0,clamp(23rem,38vw,36rem))_minmax(0,1fr)] lg:grid-rows-[auto_1fr]"
            : "max-w-[46rem] pr-[7vw]",
        )}
      >
        <div className="max-w-xl pr-6">
          {eyebrow ? (
            <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 max-w-[18ch] font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
            {title}
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-[1.72] text-pretty text-foreground">
            {copy}
          </p>
          {coda ? (
            <p className="mt-5 font-display text-xl font-medium text-balance text-foreground">
              {coda}
            </p>
          ) : null}
        </div>
        {frames.length ? (
          <div
            ref={rootRef}
            className="relative min-h-[22rem] w-full overflow-hidden bg-muted lg:row-span-2 lg:min-h-[36rem]"
          >
            <MediaStack
              frames={frames}
              on={on}
              slideClassName="tybow-overview-slide"
              className="absolute inset-0 size-full"
            />
            {current?.name ? (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-foreground/70 to-transparent px-5 pt-10 pb-9 text-center text-primary-foreground">
                <p className="font-display text-[length:clamp(1.35rem,2.2vw,1.85rem)] font-medium tracking-[-0.02em]">
                  {current.name}
                </p>
                {current.tag ? (
                  <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.14em] uppercase">
                    {current.tag}
                  </p>
                ) : null}
              </div>
            ) : null}
            {frames.length > 1 ? (
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
                <div className="absolute bottom-2 left-1/2 z-[3] flex -translate-x-1/2 gap-1">
                  {frames.map((frame, index) => (
                    <button
                      key={`${frame.alt}-${index}`}
                      type="button"
                      aria-label={`Show image ${index + 1}`}
                      className={cn(
                        "size-[0.45rem]",
                        index === on
                          ? "bg-primary-foreground"
                          : "bg-primary-foreground/40",
                      )}
                      onClick={() => go(index)}
                    />
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
        {points && points.length > 0 ? (
          <div ref={specRef} className="tybow-spec max-w-xl pr-6 lg:col-start-1">
            {pointsTitle ? (
              <p className="border-b border-border pb-3 text-[0.6875rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                {pointsTitle}
              </p>
            ) : null}
            <ul>
              {points.map((point) => (
                <li
                  key={point}
                  className="tybow-spec-line relative grid grid-cols-[1rem_minmax(0,1fr)] items-center gap-3 py-3 text-foreground"
                >
                  <span
                    aria-hidden="true"
                    className="tybow-spec-tick size-4 bg-primary [mask:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path fill=%22white%22 d=%22M9.2 16.6 4.8 12.2l1.4-1.4 3 3 8.2-8.2 1.4 1.4z%22/></svg>')_center_/_contain_no-repeat]"
                  />
                  {point}
                </li>
              ))}
            </ul>
            {cta || note ? (
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                {cta ? (
                  <ArrowButton href={cta.href} variant="inverse">
                    {cta.label}
                  </ArrowButton>
                ) : null}
                {note ? (
                  <p className="max-w-[17rem] text-[0.8125rem] leading-5 text-muted-foreground">
                    {note}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
