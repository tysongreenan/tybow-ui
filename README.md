# Tybow UI

A shadcn registry for community-builder marketing sites. Namespace `@tybow`. Same blocks across clients. Different look via theme packs.

Kitchen sink: [/kitchen-sink](/kitchen-sink) — titled **Tybow UI**, with `?theme=editorial|coastal|sharp`.

Primitives are Tailwind v4 + Base UI (`base-nova`). Do not flip the primitive base silently.

## Themes

| Pack | Use |
|---|---|
| `theme-editorial` | Boutique builder magazine. Serif display, warm paper, generous space. |
| `theme-coastal` | Quiet land / lake / place. Moss, birch, sand. Photo bands. |
| `theme-sharp` | Modern infill. Sans only, high contrast, tight density. |

Do not add a fourth theme until one of these is deleted.

## Start a client site

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest registry add @tybow=https://YOURDOMAIN/r/{name}.json
pnpm dlx shadcn@latest add @tybow/theme-coastal \
  @tybow/site-header @tybow/chapter @tybow/editorial-block \
  @tybow/facts-strip @tybow/site-plan @tybow/cta-band \
  @tybow/tour-dialog @tybow/collection-story @tybow/site-footer
```

Local registry (this app on port 3000):

```bash
pnpm dlx shadcn@latest registry add @tybow=http://localhost:3000/r/{name}.json
pnpm dlx shadcn@latest add @tybow/theme-editorial @tybow/chapter @tybow/tour-dialog
```

Then drop the wordmark and photos, fill content from `src/lib/schema.ts`, and tweak three or four tokens if the brand book requires it.

## Build the registry JSON

```bash
pnpm dlx shadcn@latest build
```

Writes `public/r/*.json`, including `public/r/registry.json`.

## Blocks

`chapter` (stacked \| split), `editorial-block`, `facts-strip`, `flush-photo`, `site-plan`, `cta-band`, `tour-form`, `tour-dialog`, `collection-story`, `home-story`, `communities-nav`, `site-header`, `site-footer`.

Do not invent a realtor listing-card grid.

## Harvest sources

Structure only — never wordmarks, photos, or client copy.

| Site | What we took | What we left |
|---|---|---|
| Trevalli Homes | Magazine chapters, editorial + facts + published site plan, tour dialog, collection story | Listing pages, maps, brand hex, fonts |
| Wright Haven | Alternating split chapters (`photoSide`), photo CTA band, communities as stacked rows | Mega-menu price cards, gold/olive hex, award hero |

A future client site picks a theme pack, then these same blocks.

## Develop

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000/kitchen-sink](http://localhost:3000/kitchen-sink).
