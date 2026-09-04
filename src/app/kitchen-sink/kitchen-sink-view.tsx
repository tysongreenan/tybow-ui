"use client"

import { useEffect } from "react"
import Link from "next/link"

import { ChapterDemo } from "@/demos"
import { CollectionStoryDemo } from "@/demos"
import { ContactDemo } from "@/demos"
import { EditorialBlockDemo } from "@/demos"
import { HomeCardDemo } from "@/demos"
import { HomeStoryDemo } from "@/demos"
import { LooksCarouselDemo } from "@/demos"
import { LooksRowDemo } from "@/demos"
import { PreviewStepsDemo } from "@/demos"
import { SiteFooterDemo } from "@/demos"
import { SitePlanDemo } from "@/demos"
import { SiteHeaderBlock } from "@/demos/site-header"
import { DemoProviders } from "@/demos/tour"
import { tybowThemes, type TybowTheme } from "@/lib/themes"
import { cn } from "@/lib/utils"

export function KitchenSinkView({ theme }: { theme: TybowTheme }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return (
    <DemoProviders>
      <div className="min-h-svh bg-background text-foreground">
        <div className="fixed top-3 right-3 z-[60] flex items-center gap-1 rounded-sm bg-background/90 p-1 shadow-sm ring-1 ring-foreground/10 backdrop-blur">
          <Link
            href={`/?theme=${theme}`}
            className="px-2.5 py-1 text-xs text-foreground hover:bg-muted"
          >
            Directory
          </Link>
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

        <SiteHeaderBlock />
        <main>
          <ChapterDemo />
          <LooksCarouselDemo />
          <LooksRowDemo />
          <EditorialBlockDemo />
          <CollectionStoryDemo />
          <HomeCardDemo />
          <HomeStoryDemo />
          <PreviewStepsDemo />
          <SitePlanDemo />
          <ContactDemo />
        </main>
        <SiteFooterDemo />
      </div>
    </DemoProviders>
  )
}
