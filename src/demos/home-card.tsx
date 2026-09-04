import { HomeCard } from "@/components/tybow/home-card"
import { collectionHomes } from "@/demos/sample"

export default function HomeCardDemo() {
  const home = collectionHomes()[0]
  return (
    <section className="bg-background px-[7vw] py-section">
      <div className="max-w-xl">
        <HomeCard
          title={home.name}
          href={home.href}
          price={home.price ? `$${home.price.toLocaleString("en-CA")}` : undefined}
          sqft={home.sqft}
          beds={home.beds}
          baths={home.baths}
          garage={home.garage}
          kind={home.kind}
          modelHome={home.modelHome}
          photos={home.photos}
          compared={false}
          onCompare={() => undefined}
        />
      </div>
    </section>
  )
}
