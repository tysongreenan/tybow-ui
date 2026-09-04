"use client"

import { useState } from "react"

import { HomesMapFrame } from "@/components/tybow/homes-map-frame"
import type { MapHome } from "@/components/tybow/homes-map"
import { cn } from "@/lib/utils"

export type HomesExplorerProps = {
  id?: string
  eyebrow?: string
  title: string
  note?: string
  homes: MapHome[]
}

function isDesktop() {
  return window.matchMedia("(min-width: 1280px)").matches
}

export function HomesExplorer({
  id = "map",
  eyebrow,
  title,
  note,
  homes,
}: HomesExplorerProps) {
  const [activeSlug, setActiveSlug] = useState<string | undefined>()

  function onCardClick(home: MapHome) {
    if (isDesktop()) {
      setActiveSlug((current) => (current === home.slug ? undefined : home.slug))
      return
    }
    if (home.href) window.location.href = home.href
  }

  return (
    <section id={id} className="bg-muted">
      <div className="mx-auto w-full max-w-[1600px] px-[7vw] py-section">
        {eyebrow ? (
          <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 max-w-[18ch] font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
          {title}
        </h2>

        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(24rem,0.8fr)] xl:items-start">
          <div className="relative isolate z-0 min-h-[50svh] overflow-hidden outline outline-foreground/10 xl:col-start-2 xl:row-start-1 xl:sticky xl:top-8 xl:h-[calc(100dvh-6rem)] xl:min-h-[28rem]">
            <div className="absolute inset-0">
              <HomesMapFrame
                homes={homes}
                activeSlug={activeSlug}
                onSelect={setActiveSlug}
              />
            </div>
          </div>

          <ul className="relative z-10 grid grid-cols-2 gap-3 xl:col-start-1 xl:row-start-1">
            {homes.map((home) => {
              const active = home.slug === activeSlug
              const photo = home.photos[0]
              return (
                <li key={home.slug}>
                  <article
                    className={cn(
                      "group relative flex flex-col overflow-hidden bg-card outline transition-shadow",
                      active
                        ? "outline-primary shadow-[0_12px_32px_color-mix(in_oklch,var(--foreground)_12%,transparent)]"
                        : "outline-foreground/10 hover:shadow-[0_10px_28px_color-mix(in_oklch,var(--foreground)_8%,transparent)]",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => onCardClick(home)}
                      aria-pressed={active}
                      className="relative block aspect-[3/2] w-full overflow-hidden bg-muted"
                    >
                      {photo?.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="absolute inset-0 size-full object-cover"
                        />
                      ) : null}
                    </button>
                    <button
                      type="button"
                      onClick={() => onCardClick(home)}
                      aria-pressed={active}
                      className="flex flex-col px-3 py-2.5 pr-12 text-left md:px-4 md:py-3"
                    >
                      <h3 className="font-display text-[15px] leading-tight text-foreground md:text-base">
                        {home.name}
                      </h3>
                      <p className="mt-0.5 text-[11px] text-muted-foreground md:text-xs">
                        {[home.community, home.city].filter(Boolean).join(" · ")}
                      </p>
                      {home.price ? (
                        <p className="mt-1 font-display text-[14px] text-foreground tabular-nums md:text-[15px]">
                          {home.price}
                        </p>
                      ) : null}
                    </button>
                    <a
                      href={home.href}
                      className="absolute right-2.5 bottom-2.5 z-10 text-[0.68rem] font-semibold tracking-[0.12em] text-primary uppercase"
                    >
                      View home
                    </a>
                  </article>
                </li>
              )
            })}
          </ul>
        </div>
        {note ? (
          <p className="mt-3 text-xs text-muted-foreground">{note}</p>
        ) : null}
      </div>
    </section>
  )
}
