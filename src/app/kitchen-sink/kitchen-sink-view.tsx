"use client"

import * as React from "react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Chapter } from "@/components/tybow/chapter"
import { CollectionStory } from "@/components/tybow/collection-story"
import { CtaBand } from "@/components/tybow/cta-band"
import { EditorialBlock } from "@/components/tybow/editorial-block"
import { FactsStrip } from "@/components/tybow/facts-strip"
import { FlushPhoto } from "@/components/tybow/flush-photo"
import { HomeStory } from "@/components/tybow/home-story"
import { SiteFooter } from "@/components/tybow/site-footer"
import { SiteHeader } from "@/components/tybow/site-header"
import { SitePlan } from "@/components/tybow/site-plan"
import { TourDialog } from "@/components/tybow/tour-dialog"
import { sampleContent } from "@/lib/sample-content"
import { tybowThemes, type TybowTheme } from "@/lib/themes"
import { cn } from "@/lib/utils"

const nav = [
  { href: "#community", label: "Community" },
  { href: "#plans", label: "Plans" },
  { href: "#ready-now", label: "Ready now" },
  { href: "#contact", label: "Contact" },
]

export function KitchenSinkView({ theme }: { theme: TybowTheme }) {
  const [tourOpen, setTourOpen] = React.useState(false)
  const cedar = sampleContent.communities[0]
  const millbrook = sampleContent.communities[1]
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

      <div className="fixed top-3 right-3 z-[60] flex items-center gap-1 rounded-lg bg-background/90 p-1 shadow-sm ring-1 ring-foreground/10 backdrop-blur">
        <span className="sr-only">Tybow UI theme</span>
        {tybowThemes.map((item) => (
          <Link
            key={item}
            href={`/kitchen-sink?theme=${item}`}
            aria-current={theme === item ? "page" : undefined}
            className={cn(
              "rounded-lg px-2.5 py-1 text-xs capitalize",
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
          copy={cedar.oneLiner}
          photo={cedar.hero}
          cta={{ href: "#contact", label: "Book a tour" }}
          layout="stacked"
          tone="flush"
        />

        <section id="community">
          <EditorialBlock
            eyebrow="The look"
            title="Stone, stucco, and long windows."
            copy="A community page is type on a photograph, then an honest block, a facts strip, and a published site plan. Not a magazine column and not a listing grid."
          />
          <div className="relative h-[70vh] min-h-[28rem] w-full overflow-hidden">
            <FlushPhoto
              src={millbrook.hero?.src}
              alt={millbrook.hero?.alt ?? "replace with client photo"}
              className="absolute inset-0 size-full"
            />
          </div>
          <div className="mx-auto max-w-[1100px] px-[7vw] py-section">
            <FactsStrip
              modelAddress={cedar.modelAddress}
              hours={cedar.hours}
              lotLine={cedar.lotLine}
            />
          </div>
          <SitePlan
            src={cedar.sitePlan?.src}
            alt={cedar.sitePlan?.alt}
            note="A published drawing. No sold colors, no GIS."
          />
        </section>

        <section id="plans" className="bg-background">
          <div className="mx-auto max-w-[1100px] px-[7vw] py-section">
            <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Plans
            </p>
            <h2 className="mt-4 font-display text-display text-foreground">
              Floor plans, listed honestly.
            </h2>
            <ul className="mt-8 space-y-3">
              {sampleContent.plans.map((plan) => (
                <li key={plan.slug} className="border-t border-border pt-3">
                  <p className="font-display text-foreground">{plan.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {plan.beds} bed · {plan.baths} bath
                    {plan.sqft ? ` · ${plan.sqft.toLocaleString()} sq ft` : ""}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="ready-now">
          <CollectionStory
            title={`${sampleContent.readyHomes.length} homes ready now`}
            copy="One intro, one collage, an honest paragraph, and the next step. Never a three-up listing grid."
            collage={sampleContent.readyHomes
              .map((item) => item.photo)
              .filter((item): item is NonNullable<typeof item> => Boolean(item))}
            primaryCta={{ href: "#contact", label: "Book a tour" }}
            secondaryCta={{ href: `#${home.slug}`, label: "Read a home story" }}
          />
          <HomeStory
            id={home.slug}
            title={home.name}
            specLine={home.specLine}
            summary={home.summary}
            photo={home.photo}
          />
        </section>

        <section id="contact">
          <CtaBand
            headline="Walk a model this weekend."
            phone={sampleContent.phone}
            onBookTour={() => setTourOpen(true)}
            photo={cedar.hero}
          />
          <div className="mx-auto flex max-w-[1400px] justify-center px-[7vw] py-10">
            <Button type="button" onClick={() => setTourOpen(true)}>
              Open tour dialog
            </Button>
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
