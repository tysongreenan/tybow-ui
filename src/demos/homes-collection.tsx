import { HomesCollection } from "@/components/tybow/homes-collection"
import { collectionHomes } from "@/demos/sample"

export default function HomesCollectionDemo() {
  return (
    <HomesCollection
      id="homes"
      eyebrow="The collection"
      title="The homes"
      homes={collectionHomes()}
    />
  )
}
