import { SiteFooter } from "@/components/tybow/site-footer"
import { sampleContent } from "@/demos/sample"

export default function SiteFooterDemo() {
  return (
    <SiteFooter
      builderName={sampleContent.builderName}
      phone={sampleContent.phone}
      email={sampleContent.email}
      communities={sampleContent.communities}
      legal={<p>Legal slot. Replace with the client’s notice.</p>}
    />
  )
}
