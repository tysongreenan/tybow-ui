import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type CollectionStoryProps = {
  id?: string
  title: string
  copy: string
  photo?: { src?: string; alt: string }
  collage?: { src?: string; alt: string }[]
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
}

export function CollectionStory({
  id,
  title,
  copy,
  photo,
  collage,
  primaryCta,
  secondaryCta,
}: CollectionStoryProps) {
  const frames = (collage ?? (photo ? [photo] : [])).slice(0, 2)

  return (
    <section id={id} className="bg-background">
      <div className="mx-auto max-w-[760px] px-[7vw] py-section text-center">
        {frames.length > 0 ? (
          <div
            className={cn(
              "grid overflow-hidden rounded-lg",
              frames.length === 2 ? "grid-cols-2 gap-2" : "grid-cols-1",
            )}
          >
            {frames.map((frame) => (
              <div
                key={frame.alt}
                className="relative aspect-[16/9] overflow-hidden"
              >
                <FlushPhoto
                  src={frame.src}
                  alt={frame.alt}
                  className="absolute inset-0 size-full"
                />
              </div>
            ))}
          </div>
        ) : null}
        <h2 className="mt-10 font-display text-display text-foreground">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-foreground">
          {copy}
        </p>
        {primaryCta || secondaryCta ? (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {primaryCta ? (
              <Link href={primaryCta.href} className={buttonVariants()}>
                {primaryCta.label}
              </Link>
            ) : null}
            {secondaryCta ? (
              <Link
                href={secondaryCta.href}
                className={buttonVariants({ variant: "outline" })}
              >
                {secondaryCta.label}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  )
}
