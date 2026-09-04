"use client"

import { useEffect, useRef } from "react"
import {
  LngLatBounds,
  Map as MapLibreMap,
  Marker,
  NavigationControl,
  Popup,
  setWorkerUrl,
} from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"

import "./tybow-map.css"

import { attachTileFallback, MAP_STYLE } from "@/components/tybow/map-style"

export type MapHome = {
  slug: string
  name: string
  href: string
  community?: string
  city?: string
  price?: string
  lat: number
  lng: number
  photos: { src?: string; alt: string }[]
}

export type HomesMapProps = {
  homes: readonly MapHome[]
  activeSlug?: string
  onSelect?: (slug: string | undefined) => void
}

if (typeof window !== "undefined") {
  try {
    setWorkerUrl("/maplibre/maplibre-gl-worker.mjs")
  } catch {
    /* Demo copies the worker into /public/maplibre. */
  }
}

const SALE_TAG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.5 5a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"/><path d="M2.774 11.144c-1.003 1.12-1.024 2.81-.104 4a34 34 0 0 0 6.186 6.186c1.19.92 2.88.899 4-.104a92 92 0 0 0 8.516-8.698a1.95 1.95 0 0 0 .47-1.094c.164-1.796.503-6.97-.902-8.374s-6.578-1.066-8.374-.901a1.95 1.95 0 0 0-1.094.47a92 92 0 0 0-8.698 8.515Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M13.788 12.367c.022-.401.134-1.135-.476-1.693m0 0a2.3 2.3 0 0 0-.797-.451c-1.257-.443-2.8 1.039-1.708 2.396c.587.73 1.04.954.996 1.782c-.03.582-.602 1.191-1.356 1.423c-.655.202-1.378-.065-1.835-.576c-.559-.624-.502-1.212-.507-1.468m5.208-3.105L14 9.986m-5.34 5.34l-.653.653"/></g></svg>`

const CHEVRON_LEFT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`
const CHEVRON_RIGHT = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`
const CLOSE_X = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6 6 18M6 6l12 12"/></svg>`

function pinStyles(active: boolean) {
  return [
    "width:34px",
    "height:34px",
    "padding:0",
    "border-radius:999px",
    "border:2px solid var(--background)",
    "box-shadow:0 6px 16px color-mix(in oklch, var(--foreground) 28%, transparent)",
    "cursor:pointer",
    "display:flex",
    "align-items:center",
    "justify-content:center",
    "line-height:0",
    "color:var(--primary-foreground)",
    "overflow:hidden",
    "transition-property:background-color",
    "transition-duration:150ms",
    `background:${active ? "var(--primary)" : "var(--foreground)"}`,
  ].join(";")
}

function paintPin(el: HTMLElement, active: boolean) {
  el.style.background = active ? "var(--primary)" : "var(--foreground)"
}

function makePin(label: string, active: boolean) {
  const el = document.createElement("button")
  el.type = "button"
  el.setAttribute("aria-label", label)
  el.style.cssText = pinStyles(active)
  el.innerHTML = SALE_TAG
  return el
}

function esc(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll('"', "&quot;")
}

function directionsHref(home: MapHome) {
  return `https://www.google.com/maps/dir/?api=1&destination=${home.lat},${home.lng}`
}

function popupHtml(home: MapHome) {
  const photos = home.photos.filter((photo) => photo.src).slice(0, 8)
  const slides = photos
    .map(
      (photo, index) =>
        `<img src="${esc(photo.src ?? "")}" alt="${esc(home.name)}, photo ${index + 1}" draggable="false" />`,
    )
    .join("")
  const count = photos.length
  const note = [home.city, home.price].filter(Boolean).join(" · ")

  return `<div class="tybow-home-popup">
    <div class="tybow-home-popup-carousel" data-carousel data-total="${count}" data-listing="${esc(home.href)}">
      <button type="button" class="tybow-home-popup-close" data-close aria-label="Close">${CLOSE_X}</button>
      <a class="tybow-home-popup-photos" data-link href="${esc(home.href)}" aria-label="View ${esc(home.name)}">
        <div class="tybow-home-popup-track" data-track>${slides}</div>
      </a>
      ${
        count > 1
          ? `<button type="button" class="tybow-home-popup-nav tybow-home-popup-prev" data-prev aria-label="Previous photo">${CHEVRON_LEFT}</button>
      <button type="button" class="tybow-home-popup-nav tybow-home-popup-next" data-next aria-label="Next photo">${CHEVRON_RIGHT}</button>
      <p class="tybow-home-popup-count" data-count>1 / ${count}</p>`
          : ""
      }
    </div>
    <div class="tybow-home-popup-body">
      <p class="tybow-home-popup-cat">${esc(home.community ?? "")}</p>
      <p class="tybow-home-popup-name">${esc(home.name)}</p>
      ${note ? `<p class="tybow-home-popup-note">${esc(note)}</p>` : ""}
      <div class="tybow-home-popup-actions">
        <a class="tybow-home-popup-primary" href="${esc(home.href)}">See this home</a>
        <a class="tybow-home-popup-secondary" href="${esc(directionsHref(home))}" target="_blank" rel="noreferrer">Directions</a>
      </div>
    </div>
  </div>`
}

function bindPopup(root: HTMLElement, popup: Popup, onClose: () => void) {
  bindCarousel(root)
  const close = root.querySelector<HTMLButtonElement>("[data-close]")
  if (!close || close.dataset.bound === "true") return
  close.dataset.bound = "true"
  close.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    popup.remove()
    onClose()
  })
}

function bindCarousel(root: HTMLElement) {
  const carousel = root.querySelector<HTMLElement>("[data-carousel]")
  const track = carousel?.querySelector<HTMLElement>("[data-track]")
  const countEl = carousel?.querySelector<HTMLElement>("[data-count]")
  const prev = carousel?.querySelector<HTMLButtonElement>("[data-prev]")
  const next = carousel?.querySelector<HTMLButtonElement>("[data-next]")
  if (!carousel || !track || carousel.dataset.bound === "true") return
  carousel.dataset.bound = "true"

  const total = track.children.length
  let index = 0

  const go = (nextIndex: number) => {
    index = (nextIndex + total) % total
    track.style.transform = `translate3d(-${index * 100}%,0,0)`
    if (countEl) countEl.textContent = `${index + 1} / ${total}`
  }

  prev?.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    go(index - 1)
  })
  next?.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    go(index + 1)
  })
  carousel.addEventListener("pointerdown", (event) => event.stopPropagation())
}

function fitOverlayInView(map: MapLibreMap, marker: Marker, popup: Popup) {
  const mapEl = map.getContainer()
  const popupEl = popup.getElement()
  const pinEl = marker.getElement()
  if (!popupEl || !pinEl) return

  const mapRect = mapEl.getBoundingClientRect()
  const popupRect = popupEl.getBoundingClientRect()
  const pinRect = pinEl.getBoundingClientRect()
  const pad = { top: 14, right: 56, bottom: 36, left: 14 }
  const left = Math.min(popupRect.left, pinRect.left)
  const right = Math.max(popupRect.right, pinRect.right)
  const top = Math.min(popupRect.top, pinRect.top)
  const bottom = Math.max(popupRect.bottom, pinRect.bottom)
  const viewLeft = mapRect.left + pad.left
  const viewRight = mapRect.right - pad.right
  const viewTop = mapRect.top + pad.top
  const viewBottom = mapRect.bottom - pad.bottom
  const viewW = viewRight - viewLeft
  const viewH = viewBottom - viewTop
  let dx = (left + right) / 2 - (viewLeft + viewRight) / 2
  let dy = (top + bottom) / 2 - (viewTop + viewBottom) / 2
  if (bottom - top > viewH) dy = bottom - viewBottom
  if (right - left > viewW) dx = left - viewLeft
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) return
  map.panBy([dx, dy], { duration: 380 })
}

function afterPopupLayout(map: MapLibreMap, marker: Marker, popup: Popup) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      fitOverlayInView(map, marker, popup)
    })
  })
}

export function HomesMap({ homes, activeSlug, onSelect }: HomesMapProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MapLibreMap | null>(null)
  const markersRef = useRef<Map<string, Marker>>(new Map())
  const selectRef = useRef(onSelect)
  const activeSlugRef = useRef(activeSlug)

  useEffect(() => {
    selectRef.current = onSelect
  }, [onSelect])

  useEffect(() => {
    activeSlugRef.current = activeSlug
  }, [activeSlug])

  useEffect(() => {
    const el = rootRef.current
    if (!el || mapRef.current) return

    const map = new MapLibreMap({
      container: el,
      style: MAP_STYLE,
      attributionControl: { compact: true },
      cooperativeGestures: true,
      fadeDuration: 0,
    })
    attachTileFallback(map)
    map.addControl(new NavigationControl({ showCompass: false }), "top-right")

    const bounds = new LngLatBounds()

    for (const home of homes) {
      const pin = makePin(home.name, home.slug === activeSlug)
      pin.addEventListener("click", (event) => {
        event.stopImmediatePropagation()
        if (activeSlugRef.current === home.slug) {
          selectRef.current?.(undefined)
          return
        }
        selectRef.current?.(home.slug)
      })
      const popup = new Popup({
        offset: 22,
        maxWidth: "min(280px, 86vw)",
        closeButton: false,
        closeOnClick: false,
        anchor: "bottom",
        className: "tybow-home-popup-shell",
      }).setHTML(popupHtml(home))

      const marker = new Marker({ element: pin })
        .setLngLat([home.lng, home.lat])
        .setPopup(popup)
        .addTo(map)

      popup.on("open", () => {
        const popupEl = popup.getElement()
        if (popupEl) {
          bindPopup(popupEl, popup, () => selectRef.current?.(undefined))
        }
        const currentMap = mapRef.current
        if (currentMap) afterPopupLayout(currentMap, marker, popup)
      })
      markersRef.current.set(home.slug, marker)
      bounds.extend([home.lng, home.lat])
    }

    const fit = () => {
      map.resize()
      if (bounds.isEmpty()) {
        map.setCenter([-80.25, 43.55])
        map.setZoom(13)
        return
      }
      map.fitBounds(bounds, { padding: 56, maxZoom: 14, duration: 0 })
    }

    map.once("load", fit)
    window.setTimeout(fit, 120)
    window.setTimeout(fit, 600)

    const ro = new ResizeObserver(() => map.resize())
    ro.observe(el)
    mapRef.current = map
    const markers = markersRef.current

    return () => {
      ro.disconnect()
      map.remove()
      mapRef.current = null
      markers.clear()
    }
    // Mount once; selection updates happen in the effect below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    markersRef.current.forEach((marker, slug) => {
      paintPin(marker.getElement(), slug === activeSlug)
      const popup = marker.getPopup()
      if (popup?.isOpen() && slug !== activeSlug) popup.remove()
    })

    if (!activeSlug) return
    const home = homes.find((item) => item.slug === activeSlug)
    const marker = markersRef.current.get(activeSlug)
    if (!home || !marker) return
    const popup = marker.getPopup()
    if (!popup) return
    if (!popup.isOpen()) {
      marker.togglePopup()
      return
    }
    afterPopupLayout(map, marker, popup)
  }, [activeSlug, homes])

  return (
    <div
      ref={rootRef}
      className="tybow-homes-map h-full w-full"
      role="region"
      aria-label="Map"
    />
  )
}
