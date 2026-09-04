"use client"

import { useState } from "react"

import "./tybow-motion.css"

import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type LooksRowItem = {
  name: string
  line: string
  photo?: { src?: string; alt: string }
}

export type LooksRowProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  looks: LooksRowItem[]
}

export function LooksRow({
  id,
  eyebrow,
  title,
  copy,
  looks,
}: LooksRowProps) {
  const [on, setOn] = useState(0)

  return (
    <section id={id} className="bg-background px-[7vw] py-section">
      {eyebrow ? (
        <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 max-w-[46rem] font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
        {title}
      </h2>
      <p className="mt-4 max-w-[46rem] text-pretty text-foreground">{copy}</p>
      <div className="tybow-gallery mt-10" role="list">
        {looks.map((look, index) => (
          <button
            key={look.name}
            type="button"
            role="listitem"
            aria-pressed={index === on}
            className={cn("tybow-gallery-item", index === on && "is-active")}
            onMouseEnter={() => setOn(index)}
            onFocus={() => setOn(index)}
            onClick={() => setOn(index)}
          >
            {look.photo?.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={look.photo.src}
                alt={look.photo.alt}
                decoding="async"
                className="tybow-gallery-frame"
              />
            ) : (
              <FlushPhoto
                src={look.photo?.src}
                alt={look.photo?.alt ?? look.name}
                className="tybow-gallery-frame"
              />
            )}
            <span className="tybow-gallery-spine">{look.name}</span>
            <span className="tybow-gallery-cap">{look.line}</span>
          </button>
        ))}
      </div>
    </section>
  )
}
