import { FlushPhoto } from "@/components/tybow/flush-photo"

export type SitePlanProps = {
  src?: string
  alt?: string
  note?: string
}

export function SitePlan({
  src,
  alt = "Published site plan. replace with client photo.",
  note,
}: SitePlanProps) {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1400px] px-[7vw] py-section">
        <p className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
          Site plan
        </p>
        <h2 className="mt-4 font-display text-display text-foreground">
          Browse the site plan.
        </h2>
        {note ? (
          <p className="mt-4 max-w-2xl text-foreground">{note}</p>
        ) : null}
        <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-muted">
          <FlushPhoto
            src={src}
            alt={alt}
            fit="contain"
            label="replace with client photo"
            className="absolute inset-0 size-full"
          />
        </div>
      </div>
    </section>
  )
}
