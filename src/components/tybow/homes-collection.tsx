"use client"

import { useMemo, useState } from "react"

import "./tybow-collection.css"

import { HomeCard, type HomeCardPhoto } from "@/components/tybow/home-card"
import { cn } from "@/lib/utils"

export type CollectionHome = {
  slug: string
  name: string
  href?: string
  beds: string
  baths: string
  garage: string
  sqft: number
  price?: number
  kind?: string
  modelHome?: boolean
  photos: HomeCardPhoto[]
}

export type HomesCollectionProps = {
  id?: string
  eyebrow?: string
  title?: string
  homes: CollectionHome[]
  limit?: number
  compareMax?: number
}

type FilterGroup = {
  key: "beds" | "garage" | "sqft"
  label: string
  options: { value: string; label: string; match: (home: CollectionHome) => boolean }[]
}

function bedBase(beds: string) {
  return parseInt(beds, 10)
}

function fmtPrice(n?: number) {
  if (n == null) return ""
  return `$${n.toLocaleString("en-CA")}`
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    key: "beds",
    label: "Bedrooms",
    options: [
      { value: "3", label: "3 Bedrooms", match: (home) => bedBase(home.beds) === 3 },
      { value: "4", label: "4 Bedrooms", match: (home) => bedBase(home.beds) === 4 },
    ],
  },
  {
    key: "garage",
    label: "Garage",
    options: [
      { value: "2-Car", label: "2-Car", match: (home) => home.garage === "2-Car" },
      { value: "2.5-Car", label: "2.5-Car", match: (home) => home.garage === "2.5-Car" },
      { value: "3-Car", label: "3-Car", match: (home) => home.garage === "3-Car" },
    ],
  },
  {
    key: "sqft",
    label: "Square footage",
    options: [
      { value: "under-2300", label: "Under 2,300", match: (home) => home.sqft < 2300 },
      { value: "2300-2800", label: "2,300 – 2,800", match: (home) => home.sqft >= 2300 && home.sqft <= 2800 },
      { value: "over-2800", label: "Over 2,800", match: (home) => home.sqft > 2800 },
    ],
  },
]

export function HomesCollection({
  id,
  eyebrow = "The collection",
  title = "The homes",
  homes,
  limit = 6,
  compareMax = 4,
}: HomesCollectionProps) {
  const [selected, setSelected] = useState<Record<string, string[]>>({
    beds: [],
    garage: [],
    sqft: [],
  })
  const [sortMode, setSortMode] = useState<"sqft-desc" | "alpha">("sqft-desc")
  const [expanded, setExpanded] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [compared, setCompared] = useState<string[]>([])
  const [fullSlug, setFullSlug] = useState<string | null>(null)

  const groups = useMemo(
    () =>
      FILTER_GROUPS.map((group) => ({
        ...group,
        options: group.options.filter((option) => homes.some(option.match)),
      })).filter((group) => group.options.length > 0),
    [homes],
  )

  const visible = useMemo(() => {
    const list = homes.filter((home) =>
      groups.every((group) => {
        const picks = selected[group.key]
        if (!picks.length) return true
        return group.options.some((option) => picks.includes(option.value) && option.match(home))
      }),
    )
    const sorted =
      sortMode === "alpha"
        ? [...list].sort((a, b) => a.name.localeCompare(b.name))
        : [...list].sort((a, b) => b.sqft - a.sqft)
    const pinned = sorted.filter((home) => home.modelHome)
    const rest = sorted.filter((home) => !home.modelHome)
    return [...pinned, ...rest]
  }, [groups, homes, selected, sortMode])

  const activeCount = groups.reduce((n, group) => n + selected[group.key].length, 0)
  const limited = !expanded && activeCount === 0 && visible.length > limit
  const rendered = limited ? visible.slice(0, limit) : visible
  const countText = limited
    ? `Showing ${rendered.length} of ${visible.length} homes`
    : `${visible.length} ${visible.length === 1 ? "home found" : "homes found"}`

  function toggleFilter(key: string, value: string) {
    setSelected((current) => {
      const picks = current[key] ?? []
      return {
        ...current,
        [key]: picks.includes(value) ? picks.filter((item) => item !== value) : [...picks, value],
      }
    })
  }

  function clearFilters() {
    setSelected({ beds: [], garage: [], sqft: [] })
  }

  function toggleCompare(slug: string) {
    setCompared((current) => {
      if (current.includes(slug)) {
        setFullSlug(null)
        return current.filter((item) => item !== slug)
      }
      if (current.length >= compareMax) {
        setFullSlug(slug)
        window.setTimeout(() => setFullSlug(null), 320)
        return current
      }
      setFullSlug(null)
      return [...current, slug]
    })
  }

  const filters = (
    <aside
      className={cn(
        "tybow-collection-filters w-[232px] shrink-0 border border-border bg-muted p-5 max-[880px]:bg-card",
        filtersOpen && "is-open",
      )}
      aria-label="Filter homes"
    >
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-display text-base font-medium tracking-[0.14em] text-foreground uppercase">
          Filter homes
        </h3>
        <button
          type="button"
          className="hidden px-2 text-2xl leading-none text-muted-foreground max-[880px]:block"
          aria-label="Close filters"
          onClick={() => setFiltersOpen(false)}
        >
          ×
        </button>
      </div>
      <p className="mb-4 text-[0.75rem] tracking-[0.08em] text-muted-foreground uppercase">
        {countText}
      </p>

      <div>
        <p className="mb-2.5 text-[0.68rem] tracking-[0.14em] text-primary uppercase">Sort by</p>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Sort homes">
          {(
            [
              ["sqft-desc", "Largest first"],
              ["alpha", "Name A–Z"],
            ] as const
          ).map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={sortMode === value}
              className={cn(
                "border px-4 py-2 text-[0.75rem] tracking-[0.1em] uppercase",
                sortMode === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground hover:border-primary",
              )}
              onClick={() => setSortMode(value)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {groups.map((group) => (
        <fieldset key={group.key} className="mt-4 border-t border-border pt-4">
          <legend className="mb-2.5 px-0 text-[0.68rem] tracking-[0.14em] text-primary uppercase">
            {group.label}
          </legend>
          {group.options.map((option) => {
            const checked = selected[group.key].includes(option.value)
            const n = homes.filter(option.match).length
            return (
              <label
                key={option.value}
                className="tybow-collection-check flex cursor-pointer items-center gap-2.5 py-1.5 text-[0.8125rem] text-muted-foreground hover:text-foreground"
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggleFilter(group.key, option.value)}
                />
                <span className="tybow-collection-check-box relative size-4 shrink-0 border border-border" />
                <span className={cn(checked && "text-foreground")}>{option.label}</span>
                <span className="ml-auto text-[0.68rem] text-muted-foreground/70">{n}</span>
              </label>
            )
          })}
        </fieldset>
      ))}

      <button
        type="button"
        className={cn(
          "mt-4 w-full border border-border py-2 text-[0.75rem] tracking-[0.08em] text-muted-foreground uppercase hover:border-primary hover:text-foreground",
          activeCount > 0 ? "visible" : "invisible",
        )}
        onClick={clearFilters}
      >
        Clear all filters
      </button>
    </aside>
  )

  return (
    <section id={id} className="bg-background px-[7vw] py-section">
      <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-[length:clamp(1.85rem,3.2vw,3rem)] font-light tracking-[0.055em] text-foreground uppercase">
        {title}
      </h2>

      <div className="mt-8 hidden items-center gap-3 max-[880px]:flex">
        <p className="mr-auto text-[0.8125rem] tracking-[0.08em] text-muted-foreground uppercase">
          {countText}
        </p>
        <button
          type="button"
          className="inline-flex items-center gap-2 border border-border px-4 py-2 text-[0.75rem] tracking-[0.1em] uppercase"
          aria-expanded={filtersOpen}
          aria-label={activeCount ? `Filters, ${activeCount} active` : "Filter homes"}
          onClick={() => setFiltersOpen(true)}
        >
          Filters
          {activeCount > 0 ? (
            <span className="grid min-w-[18px] place-items-center bg-primary px-1.5 text-[0.68rem] font-semibold text-primary-foreground">
              {activeCount}
            </span>
          ) : null}
        </button>
      </div>

      {filtersOpen ? (
        <button
          type="button"
          className="tybow-collection-scrim fixed inset-0 z-40 bg-foreground/55 max-[880px]:block min-[881px]:hidden"
          aria-label="Close filters"
          onClick={() => setFiltersOpen(false)}
        />
      ) : null}

      <div className="mt-8 flex items-start gap-8">
        {filters}
        {visible.length === 0 ? (
          <div className="flex-1 border border-dashed border-border px-6 py-16 text-center text-muted-foreground">
            <p>No homes match those filters.</p>
            <button
              type="button"
              className="mt-4 border border-border px-4 py-2 text-[0.75rem] tracking-[0.08em] uppercase"
              onClick={clearFilters}
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid min-w-0 flex-1 grid-cols-1 gap-6 md:grid-cols-2" role="list">
            {rendered.map((home) => (
              <div key={home.slug} role="listitem">
                <HomeCard
                  title={home.name}
                  href={home.href ?? `#${home.slug}`}
                  price={fmtPrice(home.price)}
                  sqft={home.sqft}
                  beds={home.beds}
                  baths={home.baths}
                  garage={home.garage}
                  kind={home.kind}
                  modelHome={home.modelHome}
                  photos={home.photos}
                  compared={compared.includes(home.slug)}
                  compareFull={fullSlug === home.slug}
                  onCompare={() => toggleCompare(home.slug)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {limited ? (
        <button
          type="button"
          className="mx-auto mt-8 block border border-border px-[22px] py-3 text-[0.68rem] font-semibold tracking-[0.14em] text-foreground uppercase hover:border-primary hover:text-primary"
          aria-expanded={false}
          onClick={() => setExpanded(true)}
        >
          View all home models
        </button>
      ) : null}
    </section>
  )
}
