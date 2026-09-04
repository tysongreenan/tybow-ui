import { Chapter } from "@/components/tybow/chapter"
import { cedar, millbrook, pasture } from "@/demos/sample"

export default function ChapterDemo() {
  return (
    <Chapter
      id="home"
      eyebrow={`Coming soon · ${cedar.town}`}
      line={cedar.name}
      copy="Fully finished homes. Each one released complete."
      photo={cedar.hero}
      photos={[cedar.hero, millbrook.hero, pasture.hero].filter(
        (item): item is NonNullable<typeof item> => Boolean(item),
      )}
      cta={{ href: "#contact", label: "Book a private tour" }}
      secondaryCta={{ href: "#contact", label: "Join the list" }}
      layout="stacked"
      tone="flush"
    />
  )
}
