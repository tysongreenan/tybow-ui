import { HomesExplorer } from "@/components/tybow/homes-explorer"
import { mapHomes } from "@/demos/sample"

export default function HomesExplorerDemo() {
  return (
    <HomesExplorer
      id="map"
      eyebrow="Move-in ready"
      title="Homes you can walk this weekend"
      note="Pins and cards stay in sync. On a wide screen, a card opens the map popup."
      homes={mapHomes()}
    />
  )
}
