import { FlushPhoto } from "@/components/tybow/flush-photo"
import { TourForm } from "@/components/tybow/tour-form"
import { home, sampleContent } from "@/demos/sample"

export default function ContactDemo() {
  return (
    <section
      id="contact"
      className="bg-primary px-[7vw] py-section text-primary-foreground"
    >
      <div className="mx-auto grid max-w-[1100px] items-start gap-10 lg:grid-cols-2">
        <div className="relative aspect-[4/5] overflow-hidden bg-primary-foreground/10">
          <FlushPhoto
            src={home.photo?.src}
            alt={home.photo?.alt ?? "replace with client photo"}
            className="absolute inset-0 size-full"
          />
        </div>
        <div className="text-primary-foreground">
          <p className="text-[0.7rem] font-medium tracking-[0.26em] uppercase opacity-80">
            Your contact
          </p>
          <h2 className="mt-3 font-display text-4xl font-medium">
            Book a private tour
          </h2>
          <p className="mt-4 max-w-[36ch] text-lg text-pretty opacity-90">
            Name, email, phone, community, plan of interest, and a short
            message. We will follow up.
          </p>
          <div className="mt-8 rounded-sm bg-background p-6 text-foreground">
            <TourForm
              communities={sampleContent.communities}
              plans={sampleContent.plans}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
