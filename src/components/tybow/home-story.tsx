"use client"

import { ArrowButton } from "@/components/tybow/arrow-button"
import { HomeCard, type HomeCardPhoto } from "@/components/tybow/home-card"

export type HomeStoryProps = {
  id?: string
  title: string
  specLine: string
  summary: string
  photo?: { src?: string; alt: string }
  eyebrow?: string
  price?: string
  sqft?: string
  beds?: string
  baths?: string
  garage?: string
  photos?: HomeCardPhoto[]
  onAsk?: () => void
}

export function HomeStory({
  id,
  title,
  specLine,
  summary,
  photo,
  eyebrow = specLine,
  price,
  sqft,
  beds,
  baths,
  garage,
  photos,
  onAsk,
}: HomeStoryProps) {
  const gallery: HomeCardPhoto[] =
    photos ?? (photo ? [{ ...photo, label: "Exterior" }] : [])

  return (
    <article id={id} className="bg-background px-[7vw] py-section">
      <HomeCard
        eyebrow={eyebrow}
        title={title}
        price={price}
        sqft={sqft}
        beds={beds}
        baths={baths}
        garage={garage}
        photos={gallery}
        onPrimary={onAsk}
      />
      <p className="mx-auto mt-10 max-w-[62ch] text-pretty text-foreground">
        {summary}
      </p>
      {onAsk ? (
        <p className="mt-6">
          <ArrowButton variant="inverse" onClick={onAsk}>
            Ask about this home
          </ArrowButton>
        </p>
      ) : null}
    </article>
  )
}
