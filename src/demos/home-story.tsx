"use client"

import { HomeStory } from "@/components/tybow/home-story"
import { cedar, home, millbrook } from "@/demos/sample"
import { useTour } from "@/demos/tour"

export default function HomeStoryDemo() {
  const { setOpen } = useTour()

  return (
    <HomeStory
      id={home.slug}
      eyebrow={`${cedar.name} · ${cedar.town}`}
      title={home.name}
      specLine={home.specLine}
      summary={home.summary}
      photo={home.photo}
      sqft="2,140"
      beds="3"
      baths="2.5"
      garage="2-car"
      photos={[
        { ...(home.photo ?? { alt: home.name }), label: "Exterior" },
        { ...(millbrook.hero ?? { alt: millbrook.name }), label: "Kitchen" },
      ]}
      onAsk={() => setOpen(true)}
    />
  )
}
