import { CommunitiesNav } from "@/components/tybow/communities-nav"
import { sampleContent } from "@/demos/sample"

export default function CommunitiesNavDemo() {
  return (
    <div className="bg-background px-[7vw] py-section">
      <CommunitiesNav communities={sampleContent.communities} />
    </div>
  )
}
