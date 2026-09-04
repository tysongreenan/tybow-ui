import { PreviewSteps } from "@/components/tybow/preview-steps"

export default function PreviewStepsDemo() {
  return (
    <PreviewSteps
      id="plans"
      eyebrow="The private preview"
      title="See it before anyone else does"
      copy="Thirty minutes, no obligation. The homes, the plans and the lots stay off the public page until you sit down with us."
      steps={[
        {
          title: "Book",
          copy: "Choose a time to preview a space. Thirty minutes, no obligation.",
        },
        {
          title: "Preview",
          copy: "See the homes, the plans and the lots — none of which are public yet.",
        },
        {
          title: "Reserve",
          copy: "If a lot is right for you, hold it before the community opens to the public.",
        },
      ]}
      cta={{ href: "#contact", label: "Book a private tour" }}
    />
  )
}
