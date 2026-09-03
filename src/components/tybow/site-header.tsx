"use client"

import type { ReactNode } from "react"
import Link from "next/link"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { CommunitiesNav } from "@/components/tybow/communities-nav"
import type { Community } from "@/lib/schema"

export type SiteHeaderLink = {
  href: string
  label: string
}

export type SiteHeaderProps = {
  wordmark: ReactNode
  phone: string
  communities: Community[]
  nav?: SiteHeaderLink[]
  onBookTour?: () => void
  getCommunityHref?: (community: Community) => string
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

export function SiteHeader({
  wordmark,
  phone,
  communities,
  nav = [],
  onBookTour,
  getCommunityHref,
}: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background">
      <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-8">
          <div className="font-display text-lg tracking-tight text-foreground">
            {wordmark}
          </div>
          <nav
            className="hidden items-center gap-6 xl:flex"
            aria-label="Primary"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium tracking-[0.08em] text-muted-foreground uppercase hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <CommunitiesNav
              communities={communities}
              getHref={getCommunityHref}
            />
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <a
            href={telHref(phone)}
            className={buttonVariants({ variant: "outline" })}
          >
            Call {phone}
          </a>
          <Button
            type="button"
            className="hidden xl:inline-flex"
            onClick={onBookTour}
          >
            Book a tour
          </Button>
          <Sheet>
            <SheetTrigger
              className={buttonVariants({ variant: "ghost" })}
              aria-label="Open menu"
            >
              Menu
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <SheetHeader>
                <SheetTitle className="font-display">{wordmark}</SheetTitle>
              </SheetHeader>
              <nav className="grid gap-2 px-4 pb-6" aria-label="Mobile">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="py-2 text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                <Separator />
                <CommunitiesNav
                  communities={communities}
                  getHref={getCommunityHref}
                  className="py-2"
                />
                <Separator />
                <a href={telHref(phone)} className="py-2 text-foreground">
                  Call {phone}
                </a>
                <Button type="button" onClick={onBookTour}>
                  Book a tour
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
