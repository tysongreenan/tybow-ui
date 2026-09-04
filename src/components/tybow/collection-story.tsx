import { FlushPhoto } from "@/components/tybow/flush-photo"

export type CollectionStoryCard = {
  title: string
  line?: string
  photo?: { src?: string; alt: string }
}

export type CollectionStoryProps = {
  id?: string
  eyebrow?: string
  title: string
  copy: string
  cards?: CollectionStoryCard[]
  photo?: { src?: string; alt: string }
  collage?: { src?: string; alt: string }[]
  primaryCta?: { href: string; label: string }
  secondaryCta?: { href: string; label: string }
}

export function CollectionStory({
  id,
  eyebrow,
  title,
  copy,
  cards,
  photo,
  collage,
}: CollectionStoryProps) {
  const rail: CollectionStoryCard[] =
    cards ??
    (collage ?? (photo ? [photo] : [])).map((item) => ({
      title: item.alt,
      photo: item,
    }))

  return (
    <section id={id} className="bg-background">
      <div className="grid items-center gap-8 py-section lg:grid-cols-[minmax(16rem,26vw)_minmax(0,1fr)]">
        <div className="flex flex-col justify-center gap-5 px-[7vw] lg:max-w-[26rem] lg:px-[7vw] lg:pr-0">
          {eyebrow ? (
            <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
            {title}
          </h2>
          <p className="max-w-[24rem] text-pretty text-foreground">{copy}</p>
        </div>
        <div className="flex gap-4 overflow-x-auto px-[7vw] pb-2 lg:px-0 lg:pr-0">
          {rail.slice(0, 4).map((card) => (
            <article
              key={card.title}
              className="relative min-h-[22rem] w-[min(28rem,80vw)] shrink-0 overflow-hidden bg-muted"
            >
              {card.photo ? (
                <FlushPhoto
                  src={card.photo.src}
                  alt={card.photo.alt}
                  className="absolute inset-0 size-full"
                />
              ) : null}
              <div className="absolute inset-0 bg-primary/45" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-primary-foreground">
                <h3 className="font-display text-2xl font-light tracking-[0.06em] uppercase">
                  {card.title}
                </h3>
                {card.line ? (
                  <p className="mt-2 text-[0.68rem] font-semibold tracking-[0.14em] uppercase">
                    {card.line}
                  </p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
