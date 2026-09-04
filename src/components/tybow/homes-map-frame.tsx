"use client"

import { useEffect, useState, type ComponentType } from "react"

import type { HomesMapProps } from "@/components/tybow/homes-map"

export function HomesMapFrame(props: HomesMapProps) {
  const [MapView, setMapView] = useState<ComponentType<HomesMapProps> | null>(
    null,
  )
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let on = true
    import("@/components/tybow/homes-map")
      .then((mod) => {
        if (on) setMapView(() => mod.HomesMap)
      })
      .catch(() => {
        if (on) setFailed(true)
      })
    return () => {
      on = false
    }
  }, [])

  if (failed) {
    return (
      <div className="flex h-full min-h-[22rem] items-center justify-center bg-muted px-6 text-center text-sm text-foreground">
        <p>Map didn’t load here.</p>
      </div>
    )
  }

  if (!MapView) {
    return (
      <div
        className="h-full min-h-[22rem] w-full bg-muted"
        aria-busy="true"
        aria-label="Map"
      />
    )
  }

  return <MapView {...props} />
}
