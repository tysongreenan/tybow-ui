import type { ReactNode } from "react"
import Link from "next/link"

import type { Community } from "@/lib/schema"

export type SiteFooterProps = {
  builderName: string
  phone: string
  email: string
  communities: Community[]
  legal?: ReactNode
  getCommunityHref?: (community: Community) => string
}

function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`
}

export function SiteFooter({
  builderName,
  phone,
  email,
  communities,
  legal,
  getCommunityHref = (community) => `#${community.slug}`,
}: SiteFooterProps) {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-[7vw] py-section md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-lg text-foreground">{builderName}</p>
          <p className="mt-6 text-sm text-foreground">
            <a className="hover:underline" href={telHref(phone)}>
              {phone}
            </a>
            <br />
            <a className="hover:underline" href={`mailto:${email}`}>
              {email}
            </a>
          </p>
        </div>
        <div>
          <p className="text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
            Communities
          </p>
          <ul className="mt-4 space-y-3 text-sm">
            {communities.map((community) => (
              <li key={community.slug}>
                <Link
                  href={getCommunityHref(community)}
                  className="text-foreground hover:underline"
                >
                  {community.name}
                </Link>
                <span className="block text-xs text-muted-foreground">
                  {community.town}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          {legal ? (
            <div className="text-sm text-muted-foreground">{legal}</div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
