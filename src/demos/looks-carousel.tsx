import { LooksCarousel } from "@/components/tybow/looks-carousel"
import { ash, home, willow } from "@/demos/sample"

export default function LooksCarouselDemo() {
  return (
    <LooksCarousel
      id="looks"
      eyebrow="You buy what you see"
      title="Eight designs. One decision."
      copy="There is no upgrade sheet and no exterior customization later. Every elevation, material and finish is specified and priced into the home."
      cta={{ href: "#homes", label: "View the collection" }}
      slides={[
        {
          name: willow.name,
          tag: "Colour look · warm clay",
          photo: willow.image ?? { alt: willow.name },
        },
        {
          name: ash.name,
          tag: "Stone arch",
          photo: ash.image ?? { alt: ash.name },
        },
        {
          name: home.name,
          tag: "Craftsman",
          photo: home.photo ?? { alt: home.name },
        },
      ]}
    />
  )
}
