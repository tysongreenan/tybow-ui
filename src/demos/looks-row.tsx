import { LooksRow } from "@/components/tybow/looks-row"
import { ash, home, millbrook, willow } from "@/demos/sample"

export default function LooksRowDemo() {
  return (
    <LooksRow
      id="looks-row"
      eyebrow="Available home designs"
      title="Stucco, stone and long windows"
      copy="Different silhouettes. The same finish. This is a looks row, not a listing grid."
      looks={[
        { name: willow.name, line: "Board and batten", photo: willow.image },
        { name: ash.name, line: "Stone arch", photo: ash.image },
        { name: home.name, line: "Craftsman", photo: home.photo },
        { name: millbrook.name, line: "French country", photo: millbrook.hero },
      ]}
    />
  )
}
