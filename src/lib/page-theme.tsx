import { isTybowTheme, type TybowTheme } from "@/lib/themes"

export function themeFromParams(theme?: string): TybowTheme {
  return isTybowTheme(theme) ? theme : "editorial"
}

export function ThemeBoot({ theme }: { theme: TybowTheme }) {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.setAttribute("data-theme", ${JSON.stringify(theme)});`,
      }}
    />
  )
}
