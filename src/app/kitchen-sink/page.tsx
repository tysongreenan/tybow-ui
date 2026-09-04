import { KitchenSinkView } from "@/app/kitchen-sink/kitchen-sink-view"
import { ThemeBoot, themeFromParams } from "@/lib/page-theme"

type KitchenSinkPageProps = {
  searchParams: Promise<{ theme?: string }>
}

export default async function KitchenSinkPage({
  searchParams,
}: KitchenSinkPageProps) {
  const params = await searchParams
  const theme = themeFromParams(params.theme)

  return (
    <>
      <ThemeBoot theme={theme} />
      <KitchenSinkView theme={theme} />
    </>
  )
}
