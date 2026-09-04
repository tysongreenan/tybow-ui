import { FactsStrip } from "@/components/tybow/facts-strip"
import { cedar } from "@/demos/sample"

export default function FactsStripDemo() {
  return (
    <div className="bg-background px-[7vw] py-section">
      <FactsStrip
        modelAddress={cedar.modelAddress}
        hours={cedar.hours}
        lotLine={cedar.lotLine}
      />
    </div>
  )
}
