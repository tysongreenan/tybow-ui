import Link from "next/link"

import { Badge } from "@/components/ui/badge"
import {
  communityStatusLabel,
  type Community,
  type CommunityStatus,
} from "@/lib/schema"
import { cn } from "@/lib/utils"

export type CommunitiesNavProps = {
  communities: Community[]
  getHref?: (community: Community) => string
  className?: string
}

const statusOrder: CommunityStatus[] = [
  "available",
  "selling",
  "coming-soon",
  "sold-out",
]

export function CommunitiesNav({
  communities,
  getHref = (community) => `#${community.slug}`,
  className,
}: CommunitiesNavProps) {
  const grouped = statusOrder
    .map((status) => ({
      status,
      items: communities.filter((community) => community.status === status),
    }))
    .filter((group) => group.items.length > 0)

  return (
    <details className={cn("relative", className)}>
      <summary className="cursor-pointer list-none text-sm font-medium tracking-[0.08em] text-muted-foreground uppercase marker:content-none hover:text-foreground [&::-webkit-details-marker]:hidden">
        Communities
      </summary>
      <div className="absolute top-full left-0 z-40 mt-2 w-72 rounded-lg bg-popover p-2 text-popover-foreground shadow-md ring-1 ring-foreground/10">
        {grouped.map((group) => (
          <div key={group.status} className="px-2 py-2">
            <p className="mb-1 text-xs font-bold tracking-[0.04em] text-muted-foreground uppercase">
              {communityStatusLabel[group.status]}
            </p>
            <ul>
              {group.items.map((community) => (
                <li key={community.slug}>
                  <Link
                    href={getHref(community)}
                    className="flex items-baseline justify-between gap-3 rounded-lg px-2 py-2 hover:bg-muted"
                  >
                    <span>
                      <span className="block font-medium text-foreground">
                        {community.name}
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        {community.town}
                      </span>
                    </span>
                    <Badge variant="secondary">{communityStatusLabel[community.status]}</Badge>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  )
}
