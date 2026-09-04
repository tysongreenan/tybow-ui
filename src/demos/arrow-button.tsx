import { ArrowButton } from "@/components/tybow/arrow-button"

export default function ArrowButtonDemo() {
  return (
    <div className="space-y-8 bg-background px-[7vw] py-section">
      <div className="flex flex-wrap items-center gap-4 bg-foreground p-8">
        <ArrowButton href="#contact" variant="cream">
          Book a private tour
        </ArrowButton>
        <ArrowButton href="#contact" variant="ghost">
          Join the list
        </ArrowButton>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <ArrowButton href="#contact" variant="inverse">
          Book a private preview
        </ArrowButton>
      </div>
    </div>
  )
}
