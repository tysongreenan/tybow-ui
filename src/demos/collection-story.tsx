import { CollectionStory } from "@/components/tybow/collection-story"
import { cedar, home, millbrook, pasture } from "@/demos/sample"

export default function CollectionStoryDemo() {
  return (
    <CollectionStory
      id="why"
      eyebrow="Why this place"
      title="A different kind of new home."
      copy="Finished. Built quickly. Chosen by the designers. The scale changed. The build did not."
      cards={[
        { title: "Finished", line: "No base model. No upgrade sheet.", photo: cedar.hero },
        { title: "Built quickly", line: "Fixed spec. Signing to keys, faster.", photo: millbrook.hero },
        { title: "Chosen", line: "All the taste, none of the spiral.", photo: pasture.hero },
        { title: "The same standard", line: "The scale changed. The build did not.", photo: home.photo },
      ]}
    />
  )
}
