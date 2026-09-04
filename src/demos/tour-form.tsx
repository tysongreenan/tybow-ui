import { TourForm } from "@/components/tybow/tour-form"
import { sampleContent } from "@/demos/sample"

export default function TourFormDemo() {
  return (
    <div className="bg-background px-[7vw] py-section">
      <div className="mx-auto max-w-xl rounded-sm border border-border p-6">
        <TourForm
          communities={sampleContent.communities}
          plans={sampleContent.plans}
        />
      </div>
    </div>
  )
}
