import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type ChapterProps = {
  id?: string
  eyebrow: string
  line: string
  photo?: { src?: string; alt: string }
  cta?: { href: string; label: string }
  layout?: "stacked" | "split"
  /** Split only. Alternate photo side; still one layout, not a third variant. */
  photoSide?: "start" | "end"
}

export function Chapter({
  id,
  eyebrow,
  line,
  photo,
  cta,
  layout = "stacked",
  photoSide = "end",
}: ChapterProps) {
  const visual = photo ? (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg",
        layout === "split" ? "aspect-[4/3]" : "aspect-[16/9]",
        layout === "split" && photoSide === "start" && "lg:order-first",
      )}
    >
      <FlushPhoto
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 size-full"
      />
    </div>
  ) : null

  return (
    <section id={id} className="bg-background">
      <div
        className={cn(
          "mx-auto max-w-[1400px] px-[7vw] py-section",
          layout === "split" &&
            "grid items-start gap-12 lg:grid-cols-2 lg:gap-20",
        )}
      >
        <div>
          <p className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
            {eyebrow}
          </p>
          <h2 className="mt-5 max-w-[16ch] font-display text-display text-foreground">
            {line}
          </h2>
          {cta ? (
            <p className="mt-10">
              <Link
                href={cta.href}
                className={buttonVariants({ variant: "outline" })}
              >
                {cta.label}
              </Link>
            </p>
          ) : null}
        </div>
        {layout === "stacked" ? (
          <div className="mt-10">{visual}</div>
        ) : (
          visual
        )}
      </div>
    </section>
  )
}
