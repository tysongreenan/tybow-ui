import type { ComponentType } from "react"

import ArrowButtonDemo from "@/demos/arrow-button"
import ChapterDemo from "@/demos/chapter"
import CollectionStoryDemo from "@/demos/collection-story"
import CommunitiesNavDemo from "@/demos/communities-nav"
import CtaBandDemo from "@/demos/cta-band"
import EditorialBlockDemo from "@/demos/editorial-block"
import FactsStripDemo from "@/demos/facts-strip"
import FlushPhotoDemo from "@/demos/flush-photo"
import HomeCardDemo from "@/demos/home-card"
import HomesCollectionDemo from "@/demos/homes-collection"
import HomesExplorerDemo from "@/demos/homes-explorer"
import HomeStoryDemo from "@/demos/home-story"
import LooksCarouselDemo from "@/demos/looks-carousel"
import LooksRowDemo from "@/demos/looks-row"
import PreviewStepsDemo from "@/demos/preview-steps"
import SiteFooterDemo from "@/demos/site-footer"
import SiteHeaderDemo from "@/demos/site-header"
import SitePlanDemo from "@/demos/site-plan"
import TourDialogDemo from "@/demos/tour-dialog"
import TourFormDemo from "@/demos/tour-form"

export const demos: Record<string, ComponentType> = {
  "arrow-button": ArrowButtonDemo,
  chapter: ChapterDemo,
  "collection-story": CollectionStoryDemo,
  "communities-nav": CommunitiesNavDemo,
  "cta-band": CtaBandDemo,
  "editorial-block": EditorialBlockDemo,
  "facts-strip": FactsStripDemo,
  "flush-photo": FlushPhotoDemo,
  "home-card": HomeCardDemo,
  "homes-collection": HomesCollectionDemo,
  "homes-explorer": HomesExplorerDemo,
  "home-story": HomeStoryDemo,
  "looks-carousel": LooksCarouselDemo,
  "looks-row": LooksRowDemo,
  "preview-steps": PreviewStepsDemo,
  "site-footer": SiteFooterDemo,
  "site-header": SiteHeaderDemo,
  "site-plan": SitePlanDemo,
  "tour-dialog": TourDialogDemo,
  "tour-form": TourFormDemo,
}

export { default as ChapterDemo } from "@/demos/chapter"
export { default as CollectionStoryDemo } from "@/demos/collection-story"
export { default as ContactDemo } from "@/demos/contact"
export { default as EditorialBlockDemo } from "@/demos/editorial-block"
export { default as HomeCardDemo } from "@/demos/home-card"
export { default as HomesCollectionDemo } from "@/demos/homes-collection"
export { default as HomesExplorerDemo } from "@/demos/homes-explorer"
export { default as HomeStoryDemo } from "@/demos/home-story"
export { default as LooksCarouselDemo } from "@/demos/looks-carousel"
export { default as LooksRowDemo } from "@/demos/looks-row"
export { default as PreviewStepsDemo } from "@/demos/preview-steps"
export { default as SiteFooterDemo } from "@/demos/site-footer"
export { default as SiteHeaderDemo } from "@/demos/site-header"
export { default as SitePlanDemo } from "@/demos/site-plan"
