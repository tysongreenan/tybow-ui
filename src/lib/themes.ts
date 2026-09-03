export const tybowThemes = ["editorial", "coastal", "sharp"] as const
export type TybowTheme = (typeof tybowThemes)[number]

export function isTybowTheme(value: string | undefined): value is TybowTheme {
  return tybowThemes.includes(value as TybowTheme)
}
