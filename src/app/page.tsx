import Link from "next/link"

import { DirectoryFrame } from "@/components/directory/directory-frame"
import { catalog, installCommand } from "@/lib/catalog"
import { ThemeBoot, themeFromParams } from "@/lib/page-theme"

type HomePageProps = {
  searchParams: Promise<{ theme?: string }>
}

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams
  const theme = themeFromParams(params.theme)

  return (
    <>
      <ThemeBoot theme={theme} />
      <DirectoryFrame theme={theme}>
        <main className="px-6 py-10">
          <p className="text-[0.7rem] font-medium tracking-[0.26em] text-primary uppercase">
            Registry
          </p>
          <h1 className="mt-3 max-w-[16ch] font-display text-[length:clamp(2.25rem,5vw,4rem)] font-medium tracking-[-0.04em] text-foreground">
            Tybow UI
          </h1>
          <p className="mt-4 max-w-[40rem] text-pretty text-foreground">
            Builder-site blocks, one at a time. The page template is the
            composed community page. Everything else is a component you can
            preview and install.
          </p>
          <p className="mt-6">
            <Link
              href={`/kitchen-sink?theme=${theme}`}
              className="inline-flex min-h-10 items-center bg-primary px-4 text-sm font-semibold tracking-[0.04em] text-primary-foreground uppercase"
            >
              Open page template
            </Link>
          </p>

          <div className="mt-14 space-y-12">
            {catalog.map((group) => (
              <section key={group.id}>
                <div className="flex items-baseline justify-between gap-3 border-b border-border pb-3">
                  <h2 className="font-display text-2xl text-foreground">
                    {group.label}
                  </h2>
                  <p className="text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
                    {group.items.length}
                  </p>
                </div>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {group.items.map((item) => {
                    const href =
                      item.kind === "template"
                        ? `/kitchen-sink?theme=${theme}`
                        : `/components/${item.slug}?theme=${theme}`
                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          className="flex h-full flex-col border border-border bg-card p-5 hover:border-primary"
                        >
                          <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
                            {item.kind}
                          </p>
                          <h3 className="mt-2 font-display text-xl text-foreground">
                            {item.title}
                          </h3>
                          <p className="mt-2 flex-1 text-sm text-pretty text-muted-foreground">
                            {item.description}
                          </p>
                          {item.kind !== "template" ? (
                            <code className="mt-4 block truncate text-[0.7rem] text-foreground">
                              {installCommand(item.slug)}
                            </code>
                          ) : null}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </section>
            ))}
          </div>
        </main>
      </DirectoryFrame>
    </>
  )
}
