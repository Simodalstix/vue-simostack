<template>
  <div class="relative w-full h-full">
    <div
      ref="container"
      class="w-full h-full rounded-[8px] overflow-hidden"
      role="application"
      :aria-label="ariaLabel"
    ></div>
    <slot name="overlay" />
  </div>
</template>

<script setup>
// DwellingMap: PURE PRESENTATION. It renders our own local geometry on a blank
// dark canvas (no basemap tiles, no third-party network calls) and reports
// hover/select back up. It holds no ranking logic and fetches nothing.
//
// Colour, fill opacity and status per area arrive via `areaState` (the parent
// derives them from the live ranking). Selection, shortlist and hover ride on
// MapLibre feature-state, so changing weights only pushes new state into an
// existing map — the instance is never torn down and rebuilt.
//
// Every catchment circle and station marker belonging to one ranking record
// shares a single integer feature id, so one setFeatureState call recolours the
// whole record at once. The stable record id lives in properties.areaId.

import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps({
  catchments: { type: Object, required: true },
  points: { type: Object, required: true },
  bounds: { type: Array, required: true },
  // { [areaId]: { fid, color, fillOpacity, status } }
  areaState: { type: Object, default: () => ({}) },
  selectedAreaId: { type: String, default: null },
  shortlistIds: { type: Array, default: () => [] },
  ariaLabel: {
    type: String,
    default: 'Map of Melbourne suburb station-catchments, coloured by fit score',
  },
  // (areaId) => small sanitised HTML string for the on-map hover popup, or null.
  getPopupHtml: { type: Function, default: null },
  theme: { type: Object, default: () => ({}) },
})

const emit = defineEmits(['select', 'hover'])

const T = {
  bg: '#111418',
  faintFill: '#2A3138',
  markerDim: '#7A8A99',
  ink: '#0C0F12',
  selected: '#FAF8F3',
  shortlist: '#D4903A',
  hover: '#4FCBB3',
  outline: '#3A434B',
  reject: '#D4903A',
  ...props.theme,
}

const container = ref(null)
let map = null
let popup = null
let loaded = false
let hoveredId = null

const CATCH_SRC = 'catchments'
const POINT_SRC = 'points'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

// Outline colour/width priority: selected > shortlisted > hovered > status base.
function outlineColor() {
  return [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    T.selected,
    ['boolean', ['feature-state', 'shortlisted'], false],
    T.shortlist,
    ['boolean', ['feature-state', 'hovered'], false],
    T.hover,
    T.outline,
  ]
}
function outlineWidth() {
  return [
    'case',
    ['boolean', ['feature-state', 'selected'], false],
    3,
    ['boolean', ['feature-state', 'shortlisted'], false],
    2.4,
    ['boolean', ['feature-state', 'hovered'], false],
    2,
    1,
  ]
}

function buildStyle() {
  return {
    version: 8,
    // No glyphs or sprite: we render no map text/icons, keeping the route
    // network-silent. Suburb names surface in the popup and the side list.
    sources: {},
    layers: [{ id: 'bg', type: 'background', paint: { 'background-color': T.bg } }],
  }
}

function addLayers() {
  map.addSource(CATCH_SRC, { type: 'geojson', data: props.catchments })
  map.addSource(POINT_SRC, { type: 'geojson', data: props.points })

  // Catchment fill: hue = score (feature-state.color), opacity = confidence.
  map.addLayer({
    id: 'catchment-fill',
    type: 'fill',
    source: CATCH_SRC,
    paint: {
      'fill-color': ['coalesce', ['feature-state', 'color'], T.faintFill],
      'fill-opacity': [
        'case',
        ['boolean', ['feature-state', 'hovered'], false],
        ['+', ['coalesce', ['feature-state', 'fillOpacity'], 0.16], 0.12],
        ['coalesce', ['feature-state', 'fillOpacity'], 0.16],
      ],
    },
  })

  // Solid outline: selection / shortlist / hover / status.
  map.addLayer({
    id: 'catchment-outline',
    type: 'line',
    source: CATCH_SRC,
    paint: { 'line-color': outlineColor(), 'line-width': outlineWidth() },
  })

  // Dashed amber ring layered on top for rejected records only — a texture cue
  // that survives independently of the score hue and the selection ring.
  map.addLayer({
    id: 'catchment-reject-dash',
    type: 'line',
    source: CATCH_SRC,
    paint: {
      'line-color': T.reject,
      'line-width': 1.2,
      'line-dasharray': [1.5, 1.5],
      'line-opacity': ['case', ['==', ['feature-state', 'status'], 'reject'], 0.85, 0],
    },
  })

  // Station markers.
  map.addLayer({
    id: 'station-core',
    type: 'circle',
    source: POINT_SRC,
    paint: {
      'circle-radius': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        6,
        ['boolean', ['feature-state', 'hovered'], false],
        5.5,
        4.5,
      ],
      'circle-color': ['coalesce', ['feature-state', 'color'], T.markerDim],
      'circle-stroke-color': outlineColor(),
      'circle-stroke-width': outlineWidth(),
    },
  })

  loaded = true
  applyAllState()
}

// Push data styling + selection/shortlist into feature-state on both sources.
function applyAllState() {
  if (!loaded) return
  const selected = props.selectedAreaId
  const shortSet = new Set(props.shortlistIds)
  for (const [areaId, st] of Object.entries(props.areaState)) {
    const state = {
      color: st.color,
      fillOpacity: st.fillOpacity,
      status: st.status,
      selected: areaId === selected,
      shortlisted: shortSet.has(areaId),
    }
    for (const src of [CATCH_SRC, POINT_SRC])
      map.setFeatureState({ source: src, id: st.fid }, state)
  }
}

function setHover(fid, on) {
  if (fid == null) return
  for (const src of [CATCH_SRC, POINT_SRC])
    map.setFeatureState({ source: src, id: fid }, { hovered: on })
}

function fidFor(areaId) {
  return props.areaState[areaId]?.fid
}

function onEnterFeature(e) {
  if (!e.features?.length) return
  map.getCanvas().style.cursor = 'pointer'
  const f = e.features[0]
  const areaId = f.properties.areaId
  if (hoveredId !== areaId) {
    if (hoveredId != null) setHover(fidFor(hoveredId), false)
    hoveredId = areaId
    setHover(f.id, true)
    emit('hover', areaId)
  }
  if (props.getPopupHtml) {
    const html = props.getPopupHtml(areaId)
    if (html) {
      if (!popup)
        popup = new maplibregl.Popup({
          closeButton: false,
          closeOnClick: false,
          className: 'dwelling-map-popup',
          offset: 10,
        })
      popup.setLngLat(e.lngLat).setHTML(html).addTo(map)
    }
  }
}

function clearHover() {
  map.getCanvas().style.cursor = ''
  if (hoveredId != null) {
    setHover(fidFor(hoveredId), false)
    hoveredId = null
    emit('hover', null)
  }
  if (popup) {
    popup.remove()
  }
}

function onClickFeature(e) {
  if (!e.features?.length) return
  emit('select', e.features[0].properties.areaId)
}

onMounted(() => {
  map = new maplibregl.Map({
    container: container.value,
    style: buildStyle(),
    bounds: props.bounds,
    fitBoundsOptions: { padding: 48, duration: 0 },
    attributionControl: false,
    dragRotate: false,
    pitchWithRotate: false,
    maxZoom: 15,
    minZoom: 8,
  })
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
  map.keyboard.enable()

  map.on('load', () => {
    addLayers()
    for (const layer of ['catchment-fill', 'station-core']) {
      map.on('mousemove', layer, onEnterFeature)
      map.on('mouseleave', layer, clearHover)
      map.on('click', layer, onClickFeature)
    }
  })
})

onBeforeUnmount(() => {
  if (popup) popup.remove()
  if (map) map.remove()
  map = null
})

// Weight changes flow in as new areaState -> feature-state only, no re-init.
watch(
  () => props.areaState,
  () => applyAllState(),
  { deep: true },
)
watch(
  () => [props.selectedAreaId, props.shortlistIds],
  () => applyAllState(),
  { deep: true },
)

// Re-fit when the geometry set itself changes (rare).
watch(
  () => props.bounds,
  (b) => {
    if (map && loaded) map.fitBounds(b, { padding: 48, duration: prefersReducedMotion ? 0 : 400 })
  },
)

defineExpose({
  flyToArea(areaId) {
    const st = props.areaState[areaId]
    if (!map || !st) return
    const f = props.points.features.find((p) => p.id === st.fid)
    if (f) map.easeTo({ center: f.geometry.coordinates, duration: prefersReducedMotion ? 0 : 500 })
  },
})
</script>

<style>
/* Popup chrome kept minimal and on-palette; scoped-out of <style scoped> so it
   reaches the MapLibre-injected popup DOM. */
.dwelling-map-popup .maplibregl-popup-content {
  background: #14181c;
  color: #f5f2ec;
  border: 1px solid rgba(212, 144, 58, 0.25);
  border-radius: 6px;
  padding: 8px 10px;
  font-size: 12px;
  line-height: 1.35;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);
}
.dwelling-map-popup .maplibregl-popup-tip {
  border-top-color: #14181c;
  border-bottom-color: #14181c;
}
.maplibregl-ctrl-group {
  background: #181c21;
  border: 1px solid rgba(212, 144, 58, 0.14);
}
.maplibregl-ctrl-group button + button {
  border-top: 1px solid rgba(212, 144, 58, 0.14);
}
.maplibregl-ctrl-group button .maplibregl-ctrl-icon {
  filter: invert(0.85);
}
</style>
