"use client"

import { useEffect, useState } from "react"

import "./tybow-motion.css"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { ArrowButton } from "@/components/tybow/arrow-button"
import { FlushPhoto, MediaStack } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type ChapterPhoto = { src?: string; alt: string }

export type ChapterProps = {
  id?: string
  eyebrow: string
  line: string
  copy?: string
  photo?: ChapterPhoto
  photos?: ChapterPhoto[]
  cta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  layout?: "stacked" | "split"
  photoSide?: "start" | "end"
  tone?: "paper" | "flush"
}

export function Chapter({
  id,
  eyebrow,
  line,
  copy,
  photo,
  photos,
  cta,
  secondaryCta,
  layout = "stacked",
  photoSide = "end",
  tone = "paper",
}: ChapterProps) {
  const frames = photos?.length ? photos : photo ? [photo] : []
  const flush = tone === "flush" && layout === "stacked" && frames.length > 0
  const [on, setOn] = useState(0)
  const words = line.trim().split(/\s+/)

  useEffect(() => {
    if (!flush || frames.length < 2) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduce) return
    const timer = window.setInterval(() => {
      setOn((i) => (i + 1) % frames.length)
    }, 5600)
    return () => window.clearInterval(timer)
  }, [flush, frames.length])

  const visual = frames.length ? (
    flush ? (
      <MediaStack
        frames={frames}
        on={on}
        slideClassName="tybow-hero-slide"
        className="absolute inset-0 rounded-none"
      />
    ) : (
      <div
        className={cn(
          "relative overflow-hidden",
          layout === "split" ? "aspect-[4/3] rounded-lg" : "aspect-[16/9] rounded-lg",
          layout === "split" && photoSide === "start" && "lg:order-first",
        )}
      >
        <FlushPhoto
          src={frames[0]?.src}
          alt={frames[0]?.alt ?? ""}
          className="absolute inset-0 size-full"
        />
      </div>
    )
  ) : null

  const copyBlock = (
    <div className={cn(flush && "relative z-10 max-w-[min(38rem,100%)]")}>
      <p
        className={cn(
          "text-[0.72rem] font-semibold tracking-[0.2em] uppercase",
          flush ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display font-medium tracking-[-0.045em] text-balance",
          flush
            ? "text-[length:clamp(4.2rem,13vw,10.5rem)] leading-[0.86] text-primary-foreground"
            : "max-w-[16ch] text-display leading-[1.05] text-foreground",
        )}
      >
        {flush
          ? words.map((word, index) => (
              <span
                key={`${word}-${index}`}
                className="tybow-pull"
                style={{ ["--i" as string]: index }}
              >
                {word}
                {index < words.length - 1 ? "\u00a0" : null}
              </span>
            ))
          : line}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 max-w-md text-pretty",
            flush
              ? "tybow-pull-late text-primary-foreground/90 [animation-delay:0.42s]"
              : "text-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
      {cta || secondaryCta ? (
        <div
          className={cn(
            "flex flex-wrap items-center gap-3",
            flush ? "tybow-pull-late mt-8 [animation-delay:0.58s]" : "mt-10",
          )}
        >
          {cta ? (
            flush ? (
              <ArrowButton href={cta.href} variant="cream">
                {cta.label}
              </ArrowButton>
            ) : (
              <Link
                href={cta.href}
                className={buttonVariants({ variant: "default", size: "lg" })}
              >
                {cta.label}
              </Link>
            )
          ) : null}
          {secondaryCta ? (
            flush ? (
              <ArrowButton href={secondaryCta.href} variant="ghost">
                {secondaryCta.label}
              </ArrowButton>
            ) : (
              <Link
                href={secondaryCta.href}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                {secondaryCta.label}
              </Link>
            )
          ) : null}
        </div>
      ) : null}
    </div>
  )

  if (flush) {
    return (
      <section
        id={id}
        className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-foreground"
      >
        {visual}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--foreground)_78%,transparent)_0%,color-mix(in_oklch,var(--foreground)_42%,transparent)_16%,transparent_38%),linear-gradient(to_right,color-mix(in_oklch,var(--foreground)_72%,transparent)_0%,color-mix(in_oklch,var(--foreground)_14%,transparent)_46%,transparent_62%),linear-gradient(to_top,color-mix(in_oklch,var(--foreground)_86%,transparent)_0%,color-mix(in_oklch,var(--foreground)_52%,transparent)_38%,transparent_66%)]"
          aria-hidden="true"
        />
        <div className="relative z-10 px-[7vw] pt-32 pb-16">{copyBlock}</div>
      </section>
    )
  }

  return (
    <section id={id} className="bg-background">
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-[7vw] py-section",
          layout === "split" &&
            "grid items-start gap-12 lg:grid-cols-2 lg:gap-20",
        )}
      >
        {copyBlock}
        {layout === "stacked" ? <div className="mt-10">{visual}</div> : visual}
      </div>
    </section>
  )
}
