import Link from "next/link"

import { buttonVariants } from "@/components/ui/button"
import { ArrowButton } from "@/components/tybow/arrow-button"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { cn } from "@/lib/utils"

export type ChapterProps = {
  id?: string
  eyebrow: string
  line: string
  copy?: string
  photo?: { src?: string; alt: string }
  cta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
  layout?: "stacked" | "split"
  /** Split only. Alternate photo side; still one layout, not a third variant. */
  photoSide?: "start" | "end"
  /** Paper sits beside the photo. Flush puts type on the photo, Pines-style. */
  tone?: "paper" | "flush"
}

export function Chapter({
  id,
  eyebrow,
  line,
  copy,
  photo,
  cta,
  secondaryCta,
  layout = "stacked",
  photoSide = "end",
  tone = "paper",
}: ChapterProps) {
  const flush = tone === "flush" && layout === "stacked" && Boolean(photo)

  const visual = photo ? (
    <div
      className={cn(
        "relative overflow-hidden",
        flush
          ? "absolute inset-0 rounded-none"
          : layout === "split"
            ? "aspect-[4/3] rounded-lg"
            : "aspect-[16/9] rounded-lg",
        !flush && layout === "split" && photoSide === "start" && "lg:order-first",
      )}
    >
      <FlushPhoto
        src={photo.src}
        alt={photo.alt}
        className="absolute inset-0 size-full"
      />
    </div>
  ) : null

  const copyBlock = (
    <div className={cn(flush && "relative z-10 max-w-xl")}>
      <p
        className={cn(
          "text-xs font-semibold tracking-[0.2em] uppercase",
          flush ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {eyebrow}
      </p>
      <h2
        className={cn(
          "mt-3 font-display font-medium tracking-[-0.045em] text-balance",
          flush
            ? "text-[length:var(--display-hero,var(--display-size))] leading-[0.88] text-primary-foreground"
            : "max-w-[16ch] text-display leading-[1.05] text-foreground",
        )}
      >
        {line}
      </h2>
      {copy ? (
        <p
          className={cn(
            "mt-4 max-w-md text-pretty",
            flush ? "text-primary-foreground/90" : "text-foreground",
          )}
        >
          {copy}
        </p>
      ) : null}
      {cta || secondaryCta ? (
        <div className={cn("flex flex-wrap items-center gap-3", flush ? "mt-8" : "mt-10")}>
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
        className="relative isolate flex min-h-svh flex-col justify-end overflow-hidden bg-primary"
      >
        {visual}
        <div
          className="absolute inset-0 bg-primary/35"
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
