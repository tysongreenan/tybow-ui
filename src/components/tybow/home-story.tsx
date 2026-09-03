import { FlushPhoto } from "@/components/tybow/flush-photo"

export type HomeStoryProps = {
  id?: string
  title: string
  specLine: string
  summary: string
  photo?: { src?: string; alt: string }
}

export function HomeStory({
  id,
  title,
  specLine,
  summary,
  photo,
}: HomeStoryProps) {
  return (
    <article id={id} className="bg-background">
      <div className="mx-auto max-w-[1100px] px-[7vw] py-section">
        <h2 className="font-display text-display text-foreground">{title}</h2>
        <p className="mt-3 text-sm text-muted-foreground">{specLine}</p>
        <p className="mt-6 max-w-[62ch] text-pretty text-foreground">
          {summary}
        </p>
        {photo ? (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-lg">
            <FlushPhoto
              src={photo.src}
              alt={photo.alt}
              className="absolute inset-0 size-full"
            />
          </div>
        ) : null}
      </div>
    </article>
  )
}
