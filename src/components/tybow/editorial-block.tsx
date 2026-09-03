import type { ReactNode } from "react"

import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type EditorialBlockProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  photo?: { src?: string; alt: string }
  children?: ReactNode
}

export function EditorialBlock({
  id,
  eyebrow,
  title,
  copy,
  photo,
  children,
}: EditorialBlockProps) {
  return (
    <section id={id} className="bg-background">
      <div
        className={cn(
          "mx-auto max-w-[1100px] px-[7vw] py-section",
          photo &&
            "grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]",
        )}
      >
        <div>
          {eyebrow ? (
            <p className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={cn(
              "max-w-[18ch] font-display text-display text-foreground",
              eyebrow && "mt-4",
            )}
          >
            {title}
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-foreground">{copy}</p>
          {children}
        </div>
        {photo ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <FlushPhoto
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 size-full"
            />
          </div>
        ) : null}
      </div>
    </section>
  )
}
