import { HomeCard } from "@/components/tybow/home-card"
import { cedar, home, willow } from "@/demos/sample"

export default function HomeCardDemo() {
  return (
    <section className="bg-background px-[7vw] py-section">
      <HomeCard
        eyebrow={`${cedar.name} · ${cedar.town} · bungalow`}
        title={willow.name}
        price="From $890,000"
        sqft="2,140"
        beds="3"
        baths="2.5"
        garage="2-car"
        photos={[
          { ...(willow.image ?? { alt: willow.name }), label: "Exterior" },
          { ...(cedar.hero ?? { alt: cedar.name }), label: "Street" },
        ]}
        primaryCta={{ href: `#${home.slug}`, label: "Ask about this home" }}
        secondaryCta={{ href: "#contact", label: "Add to compare" }}
      />
    </section>
  )
}
