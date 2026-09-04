import type { ReactNode } from "react"
import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type EditorialBlockProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  coda?: string
  pointsTitle?: string
  points?: string[]
  photo?: { src?: string; alt: string }
  cta?: { href: string; label: string }
  note?: string
  children?: ReactNode
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
  cta,
  note,
  children,
}: EditorialBlockProps) {
  return (
    <section id={id} className="bg-background">
      <div
        className={cn(
          "grid items-start gap-10 py-section pl-[7vw]",
          photo
            ? "lg:grid-cols-[minmax(0,clamp(23rem,38vw,36rem))_minmax(0,1fr)]"
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
          {children}
          {points && points.length > 0 ? (
            <div className="mt-10">
              {pointsTitle ? (
                <p className="border-b border-border pb-3 text-[0.6875rem] font-medium tracking-[0.2em] text-muted-foreground uppercase">
                  {pointsTitle}
                </p>
              ) : null}
              <ul>
                {points.map((point) => (
                  <li
                    key={point}
                    className="grid grid-cols-[1rem_minmax(0,1fr)] items-center gap-3 border-b border-border py-3 text-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="size-3 bg-primary [mask:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22><path fill=%22white%22 d=%22M9.2 16.6 4.8 12.2l1.4-1.4 3 3 8.2-8.2 1.4 1.4z%22/></svg>')_center_/_contain_no-repeat]"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {cta || note ? (
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              {cta ? (
                <Link
                  href={cta.href}
                  className={buttonVariants({ variant: "outline", size: "lg" })}
                >
                  {cta.label}
                </Link>
              ) : null}
              {note ? (
                <p className="max-w-[17rem] text-[0.8125rem] leading-5 text-muted-foreground">
                  {note}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
        {photo ? (
          <div className="relative min-h-[22rem] w-full overflow-hidden bg-muted lg:min-h-[36rem]">
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
