"use client"

import { useEffect, type ReactNode } from "react"

import { DirectoryShell } from "@/components/directory/directory-shell"
import type { TybowTheme } from "@/lib/themes"

export function DirectoryFrame({
  theme,
  children,
}: {
  theme: TybowTheme
  children: ReactNode
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  return <DirectoryShell theme={theme}>{children}</DirectoryShell>
}
