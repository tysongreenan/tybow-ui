"use client"

import * as React from "react"
import Link from "next/link"

import { Chapter } from "@/components/tybow/chapter"
import { CollectionStory } from "@/components/tybow/collection-story"
import { EditorialBlock } from "@/components/tybow/editorial-block"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { HomeCard } from "@/components/tybow/home-card"
import { HomeStory } from "@/components/tybow/home-story"
import { LooksCarousel } from "@/components/tybow/looks-carousel"
import { LooksRow } from "@/components/tybow/looks-row"
import { PreviewSteps } from "@/components/tybow/preview-steps"
import { SiteFooter } from "@/components/tybow/site-footer"
import { SiteHeader } from "@/components/tybow/site-header"
import { SitePlan } from "@/components/tybow/site-plan"
import { TourDialog } from "@/components/tybow/tour-dialog"
import { TourForm } from "@/components/tybow/tour-form"
import { sampleContent } from "@/lib/sample-content"
import { tybowThemes, type TybowTheme } from "@/lib/themes"
import { cn } from "@/lib/utils"

const nav = [
  { href: "#looks", label: "The look" },
  { href: "#community", label: "Finished" },
  { href: "#homes", label: "Homes" },
  { href: "#contact", label: "Contact" },
]

export function KitchenSinkView({ theme }: { theme: TybowTheme }) {
  const [tourOpen, setTourOpen] = React.useState(false)
  const cedar = sampleContent.communities[0]
  const millbrook = sampleContent.communities[1]
  const pasture = sampleContent.communities[2]
  const willow = sampleContent.plans[0]
  const ash = sampleContent.plans[1]
  const home = sampleContent.readyHomes[0]

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <div className="min-h-svh bg-background text-foreground">
      <TourDialog
        open={tourOpen}
        onOpenChange={setTourOpen}
        communities={sampleContent.communities}
        plans={sampleContent.plans}
      />

      <div className="fixed top-3 right-3 z-[60] flex items-center gap-1 rounded-sm bg-background/90 p-1 shadow-sm ring-1 ring-foreground/10 backdrop-blur">
        {tybowThemes.map((item) => (
          <Link
            key={item}
            href={`/kitchen-sink?theme=${item}`}
            aria-current={theme === item ? "page" : undefined}
            className={cn(
              "rounded-sm px-2.5 py-1 text-xs capitalize",
              theme === item
                ? "bg-primary text-primary-foreground"
                : "text-foreground hover:bg-muted",
            )}
          >
            {item}
          </Link>
        ))}
      </div>

      <SiteHeader
        wordmark={sampleContent.builderName}
        phone={sampleContent.phone}
        communities={sampleContent.communities}
        nav={nav}
        onBookTour={() => setTourOpen(true)}
        getCommunityHref={(community) => `#${community.slug}`}
        overlay
      />

      <main>
        <Chapter
          id="home"
          eyebrow={`Coming soon · ${cedar.town}`}
          line={cedar.name}
          copy="Fully finished homes. Each one released complete."
          photo={cedar.hero}
          photos={[cedar.hero, millbrook.hero, pasture.hero].filter(
            (item): item is NonNullable<typeof item> => Boolean(item),
          )}
          cta={{ href: "#contact", label: "Book a private tour" }}
          secondaryCta={{ href: "#contact", label: "Join the list" }}
          layout="stacked"
          tone="flush"
        />

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

        <LooksRow
          id="looks-row"
          eyebrow="Available home designs"
          title="Stucco, stone and long windows"
          copy="Different silhouettes. The same finish. This is a looks row, not a listing grid."
          looks={[
            {
              name: willow.name,
              line: "Board and batten",
              photo: willow.image,
            },
            {
              name: ash.name,
              line: "Stone arch",
              photo: ash.image,
            },
            {
              name: home.name,
              line: "Craftsman",
              photo: home.photo,
            },
            {
              name: millbrook.name,
              line: "French country",
              photo: millbrook.hero,
            },
          ]}
        />

        <EditorialBlock
          id="community"
          eyebrow="Fully finished"
          title="You choose the plan. The finishes are already in."
          copy="These are not inventory homes waiting on a street, and they are not a base model you upgrade later. You pick a plan and a lot. The exterior is already set."
          coda="We build it for you, under a million dollars."
          pointsTitle="Included in the price"
          points={[
            "Quartz counters",
            "Hardwood main floor",
            "Upgraded cabinetry and island",
            "Stone exterior wainscot",
            "Designer lighting package",
            "Ensuite glass shower",
          ]}
          photo={millbrook.hero}
          photos={[
            {
              ...(millbrook.hero ?? { alt: millbrook.name }),
              name: millbrook.name,
              tag: "Kitchen",
            },
            {
              ...(cedar.hero ?? { alt: cedar.name }),
              name: cedar.name,
              tag: "Street",
            },
            {
              ...(pasture.hero ?? { alt: pasture.name }),
              name: pasture.name,
              tag: "Place",
            },
          ]}
          cta={{ href: "#contact", label: "Book a private preview" }}
          note="Final specification confirmed at your appointment."
        />

        <CollectionStory
          id="why"
          eyebrow="Why this place"
          title="A different kind of new home."
          copy="Finished. Built quickly. Chosen by the designers. The scale changed. The build did not."
          cards={[
            {
              title: "Finished",
              line: "No base model. No upgrade sheet.",
              photo: cedar.hero,
            },
            {
              title: "Built quickly",
              line: "Fixed spec. Signing to keys, faster.",
              photo: millbrook.hero,
            },
            {
              title: "Chosen",
              line: "All the taste, none of the spiral.",
              photo: pasture.hero,
            },
            {
              title: "The same standard",
              line: "The scale changed. The build did not.",
              photo: home.photo,
            },
          ]}
        />

        <section id="homes" className="space-y-10 bg-background px-[7vw] py-section">
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

        <HomeStory
          id={home.slug}
          eyebrow={`${cedar.name} · ${cedar.town}`}
          title={home.name}
          specLine={home.specLine}
          summary={home.summary}
          photo={home.photo}
          sqft="2,140"
          beds="3"
          baths="2.5"
          garage="2-car"
          photos={[
            { ...(home.photo ?? { alt: home.name }), label: "Exterior" },
            { ...(millbrook.hero ?? { alt: millbrook.name }), label: "Kitchen" },
          ]}
          onAsk={() => setTourOpen(true)}
        />

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

        <SitePlan
          src={cedar.sitePlan?.src}
          alt={cedar.sitePlan?.alt}
          note="Artist’s concept. Lot lines approximate and subject to final survey."
        />

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
                  onSubmit={() => setTourOpen(false)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter
        builderName={sampleContent.builderName}
        phone={sampleContent.phone}
        email={sampleContent.email}
        communities={sampleContent.communities}
        legal={<p>Legal slot. Replace with the client’s notice.</p>}
      />
    </div>
  )
}
