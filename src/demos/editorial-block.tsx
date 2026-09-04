import { EditorialBlock } from "@/components/tybow/editorial-block"
import { cedar, millbrook, pasture } from "@/demos/sample"

export default function EditorialBlockDemo() {
  return (
    <EditorialBlock
      id="community"
      eyebrow="Fully finished"
      title="You choose the plan. The finishes are already in."
      copy="These are not inventory homes waiting on a street, and they are not a base model you upgrade later. You pick a plan and a lot. The exterior is already set."
      coda="We build it for you, under a million dollars."
      pointsTitle="Included in the price"
      points={[
        "Quartz counters",
        "Hardwood main floor",
        "Upgraded cabinetry and island",
        "Stone exterior wainscot",
        "Designer lighting package",
        "Ensuite glass shower",
      ]}
      photo={millbrook.hero}
      photos={[
        { ...(millbrook.hero ?? { alt: millbrook.name }), name: millbrook.name, tag: "Kitchen" },
        { ...(cedar.hero ?? { alt: cedar.name }), name: cedar.name, tag: "Street" },
        { ...(pasture.hero ?? { alt: pasture.name }), name: pasture.name, tag: "Place" },
      ]}
      cta={{ href: "#contact", label: "Book a private preview" }}
      note="Final specification confirmed at your appointment."
    />
  )
}
