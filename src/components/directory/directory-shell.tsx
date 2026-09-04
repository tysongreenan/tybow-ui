"use client"

import { useMemo, useState, type ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { catalog, catalogItems, type CatalogItem } from "@/lib/catalog"
import { tybowThemes, type TybowTheme } from "@/lib/themes"
import { cn } from "@/lib/utils"

function themeHref(pathname: string, theme: TybowTheme) {
  const params = new URLSearchParams()
  params.set("theme", theme)
  return `${pathname}?${params.toString()}`
}

function itemHref(item: CatalogItem, theme: TybowTheme) {
  const path = item.kind === "template" ? "/kitchen-sink" : `/components/${item.slug}`
  return themeHref(path, theme)
}

function NavList({
  query,
  theme,
  onNavigate,
}: {
  query: string
  theme: TybowTheme
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const needle = query.trim().toLowerCase()
  const groups = useMemo(() => {
    return catalog
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (!needle) return true
          return (
            item.title.toLowerCase().includes(needle) ||
            item.description.toLowerCase().includes(needle) ||
            item.slug.includes(needle)
          )
        }),
      }))
      .filter((group) => group.items.length > 0)
  }, [needle])

  return (
    <nav className="flex flex-col gap-6">
      {groups.map((group) => (
        <div key={group.id}>
          <p className="flex items-center justify-between px-3 text-[0.65rem] font-semibold tracking-[0.16em] text-muted-foreground uppercase">
            <span>{group.label}</span>
            <span>{group.items.length}</span>
          </p>
          <ul className="mt-2">
            {group.items.map((item) => {
              const href = itemHref(item, theme)
              const active =
                item.kind === "template"
                  ? pathname.startsWith("/kitchen-sink")
                  : pathname === `/components/${item.slug}`
              return (
                <li key={item.slug}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    className={cn(
                      "block px-3 py-1.5 text-sm",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted",
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </nav>
  )
}

function SidebarBody({
  theme,
  onNavigate,
}: {
  theme: TybowTheme
  onNavigate?: () => void
}) {
  const [query, setQuery] = useState("")
  const count = catalogItems().length

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border px-4 py-4">
        <Link
          href={themeHref("/", theme)}
          onClick={onNavigate}
          className="font-display text-xl text-foreground"
        >
          Tybow UI
        </Link>
        <p className="mt-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
          {count} components
        </p>
      </div>
      <label className="mx-3 mt-3 flex items-center gap-2 border border-border bg-background px-2 py-1.5">
        <Search className="size-3.5 text-muted-foreground" />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
      </label>
      <div className="mt-4 flex-1 overflow-y-auto px-1 pb-8">
        <NavList query={query} theme={theme} onNavigate={onNavigate} />
      </div>
    </div>
  )
}

export function DirectoryShell({
  theme,
  children,
}: {
  theme: TybowTheme
  children: ReactNode
}) {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-background md:block">
        <SidebarBody theme={theme} />
      </aside>
      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-2 backdrop-blur">
          <div className="flex items-center gap-2 md:hidden">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger
                className="grid size-9 place-items-center border border-border"
                aria-label="Open directory"
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="sr-only">
                  <SheetTitle>Tybow UI</SheetTitle>
                </SheetHeader>
                <SidebarBody theme={theme} onNavigate={() => setMenuOpen(false)} />
              </SheetContent>
            </Sheet>
            <Link href={themeHref("/", theme)} className="font-display text-lg">
              Tybow UI
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {tybowThemes.map((item) => (
              <Link
                key={item}
                href={themeHref(pathname, item)}
                aria-current={theme === item ? "page" : undefined}
                className={cn(
                  "px-2.5 py-1 text-xs capitalize",
                  theme === item
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {item}
              </Link>
            ))}
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}


