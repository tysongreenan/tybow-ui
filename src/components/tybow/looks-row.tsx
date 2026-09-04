import { FlushPhoto } from "@/components/tybow/flush-photo"

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
      <ul className="mt-10 flex gap-3 overflow-x-auto pb-2">
        {looks.map((look) => (
          <li key={look.name} className="w-[11.5rem] shrink-0">
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <FlushPhoto
                src={look.photo?.src}
                alt={look.photo?.alt ?? look.name}
                className="absolute inset-0 size-full"
              />
            </div>
            <p className="mt-2 text-[0.7rem] font-semibold tracking-[0.12em] text-foreground uppercase">
              {look.name}
            </p>
            <p className="text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
              {look.line}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}
