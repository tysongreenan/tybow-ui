import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl"

type MapStyle = string | StyleSpecification

function rasterStyle(
  name: string,
  tiles: string[],
  attribution: string,
): StyleSpecification {
  return {
    version: 8,
    name,
    sources: {
      base: {
        type: "raster",
        tiles,
        tileSize: 256,
        attribution,
        maxzoom: 19,
      },
    },
    layers: [{ id: "base", type: "raster", source: "base" }],
  }
}

export const OPENFREEMAP_POSITRON =
  "https://tiles.openfreemap.org/styles/positron"

export const OSM_MONO_STYLE = rasterStyle(
  "osm-mono",
  ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
  "© OpenStreetMap contributors",
)

const TILE_STYLES: MapStyle[] = [OPENFREEMAP_POSITRON, OSM_MONO_STYLE]

export const MAP_STYLE = TILE_STYLES[0]

export function attachTileFallback(map: MapLibreMap) {
  let index = 0
  let switching = false
  map.on("error", () => {
    if (switching || index >= TILE_STYLES.length - 1) return
    switching = true
    index += 1
    map.setStyle(TILE_STYLES[index])
    map.once("idle", () => {
      switching = false
    })
  })
}
