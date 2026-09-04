import { notFound } from "next/navigation"
import Link from "next/link"

import { DirectoryFrame } from "@/components/directory/directory-frame"
import { DemoProviders } from "@/demos/tour"
import { demos } from "@/demos"
import { getCatalogItem, installCommand, catalogItems } from "@/lib/catalog"
import { ThemeBoot, themeFromParams } from "@/lib/page-theme"
import { cn } from "@/lib/utils"

type ComponentPageProps = {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ theme?: string }>
}

export function generateStaticParams() {
  return catalogItems()
    .filter((item) => item.kind !== "template")
    .map((item) => ({ slug: item.slug }))
}

export default async function ComponentPage({
  params,
  searchParams,
}: ComponentPageProps) {
  const { slug } = await params
  const { theme: themeParam } = await searchParams
  const theme = themeFromParams(themeParam)
  const item = getCatalogItem(slug)
  const Demo = demos[slug]

  if (!item || item.kind === "template" || !Demo) {
    notFound()
  }

  return (
    <>
      <ThemeBoot theme={theme} />
      <DirectoryFrame theme={theme}>
        <div className="border-b border-border px-6 py-8">
          <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            {item.kind}
          </p>
          <h1 className="mt-2 font-display text-[length:clamp(2rem,4vw,3.25rem)] font-medium text-foreground">
            {item.title}
          </h1>
          <p className="mt-3 max-w-[40rem] text-pretty text-foreground">
            {item.description}
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <code className="border border-border bg-muted px-3 py-2 text-[0.75rem]">
              {installCommand(item.slug)}
            </code>
            <Link
              href={`/kitchen-sink?theme=${theme}`}
              className="text-sm underline-offset-4 hover:underline"
            >
              See it in the page template
            </Link>
          </div>
        </div>
        <div
          className={cn(
            "min-h-[50vh] bg-background",
            item.preview === "padded" && "py-4",
          )}
        >
          <DemoProviders>
            <Demo />
          </DemoProviders>
        </div>
      </DirectoryFrame>
    </>
  )
}
