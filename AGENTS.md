# Tybow UI rules

This repo is the source of truth for Tybow UI.

- Use @tybow blocks. Do not invent a new chapter, tour form, or listing grid.
- New look = theme tokens or a CVA variant, not a forked file.
- Blocks never contain client names, phones, hex colors, or font family names.
- Page map is Home → Community → Plans → Ready now → Contact.
- Header always exposes Call + Book a tour.
- Site plans are published images. No fake sold/available map colors.
- After a client site ships a block that was used twice, promote it here before the next site starts.
- Max two layout variants per block (stacked | split).
- Themes: editorial, coastal, sharp. Do not add a fourth until one of these is deleted.
- Primitives stay on shadcn Base UI (`"style": "base-nova"`). Imports are `@base-ui/react/*`. Do not switch to Radix.
