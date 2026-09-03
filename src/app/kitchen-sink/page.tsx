import { KitchenSinkView } from "@/app/kitchen-sink/kitchen-sink-view"
import { isTybowTheme, type TybowTheme } from "@/lib/themes"

type KitchenSinkPageProps = {
  searchParams: Promise<{ theme?: string }>
}

export default async function KitchenSinkPage({
  searchParams,
}: KitchenSinkPageProps) {
  const params = await searchParams
  const theme: TybowTheme = isTybowTheme(params.theme)
    ? params.theme
    : "editorial"

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute("data-theme", ${JSON.stringify(theme)});`,
        }}
      />
      <KitchenSinkView theme={theme} />
    </>
  )
}
