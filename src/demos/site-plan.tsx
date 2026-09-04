import { SitePlan } from "@/components/tybow/site-plan"
import { cedar } from "@/demos/sample"

export default function SitePlanDemo() {
  return (
    <SitePlan
      src={cedar.sitePlan?.src}
      alt={cedar.sitePlan?.alt}
      note="Artist’s concept. Lot lines approximate and subject to final survey."
    />
  )
}
