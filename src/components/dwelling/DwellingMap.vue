<template>
  <div class="relative w-full h-full">
    <div
      ref="container"
      class="w-full h-full rounded-[8px] overflow-hidden"
      role="application"
      :aria-label="ariaLabel"
      @keydown.esc="onEscapeKey"
    ></div>
    <slot name="overlay" />
  </div>
</template>

<script setup>
// DwellingMap: PURE PRESENTATION. It renders our own local geometry on a blank
// dark canvas (no basemap tiles, no third-party network calls) and reports
// hover/select back up. It holds no ranking logic and fetches nothing.
//
// COLOUR CHANNELS (kept strictly separate):
//   locality polygon fill  = suburb decision fit (score hue via areaState)
//   train line colour      = route identity only (official line-group hues)
//   purple points          = schools / community context
//   gold markers           = personal network anchors
//   solid ring             = selected / shortlisted / hovered (feature-state)
//   warm fill override     = less-favoured under the active purchase mode
//
// The locality polygon is the primary hover target. Where the vendored suburb
// polygon set does not cover a record yet, an enlarged invisible station hit
// target acts as a fallback so the area is still explorable.
// The old station-catchment circles survive only behind the `showDiagnostics`
// prop as a diagnostic overlay.
//
// Colour, fill opacity and status per record arrive via `areaState` (the
// parent derives them from the live ranking); everything rides on MapLibre
// feature-state so weight changes never rebuild the map instance.

import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

const props = defineProps({
  catchments: { type: Object, required: true },
  points: { type: Object, required: true },
  localities: { type: Object, default: null },
  bounds: { type: Array, required: true },
  // { [areaId]: { fid, color, fillOpacity, status } }
  areaState: { type: Object, default: () => ({}) },
  selectedAreaId: { type: String, default: null },
  shortlistIds: { type: Array, default: () => [] },
  ariaLabel: {
    type: String,
    default: 'Map of Melbourne suburbs, coloured by decision-fit score',
  },
  // (payload) => small sanitised HTML string for the on-map hover popup, or null.
  getPopupHtml: { type: Function, default: null },
  theme: { type: Object, default: () => ({}) },
  // Same-origin bundled orientation assets, not third-party tiles.
  basemap: { type: String, default: null },
  water: { type: String, default: null },
  river: { type: String, default: null },
  // Train-line FeatureCollection (properties: lineId, color) + the line ids to
  // highlight for the hovered and the selected suburb.
  trainLines: { type: Object, default: null },
  hoverLineIds: { type: Array, default: () => [] },
  selectedLineIds: { type: Array, default: () => [] },
  // School / facility point FeatureCollections (properties.areaIds arrays).
  schools: { type: Object, default: null },
  facilities: { type: Object, default: null },
  // Contextual visibility: points for the selected suburb always show; these
  // flags force the whole layer on.
  showAllSchools: { type: Boolean, default: false },
  showAllFacilities: { type: Boolean, default: false },
  // Personal network anchors [{ id, label, longitude, latitude, type }], gold layer.
  anchors: { type: Array, default: () => [] },
  showAnchors: { type: Boolean, default: true },
  // Diagnostic overlay: straight-line station-catchment circles.
  showDiagnostics: { type: Boolean, default: false },
  // When a full suburb card is covering the map, clear hover state and ignore
  // map interactivity until the card closes.
  suspendInteraction: { type: Boolean, default: false },
  // Fixed commute-destination anchor: compact diamond + short label, full name
  // in the native tooltip.
  destination: {
    type: Object,
    default: () => ({
      coordinates: [144.9575, -37.8183],
      label: 'Collins',
      title: '555 Collins St (Southern Cross end)',
    }),
  },
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
  purple: '#9B82E5',
  gold: '#E5C35A',
  ...props.theme,
}

const container = ref(null)
let map = null
let popup = null
let destinationMarker = null
let anchorMarkers = []
let loaded = false
let hoverContext = null
let containerLeaveHandler = null

const CATCH_SRC = 'catchments'
const POINT_SRC = 'points'
const LOCALITY_SRC = 'localities'
const WATER_SRC = 'water'
const RIVER_SRC = 'river'
const LINE_SRC = 'train-lines'
const SCHOOL_SRC = 'schools'
const FACILITY_SRC = 'facilities'
const STATION_HIT_LAYER = 'station-hit'
const GLYPHS_URL = `${import.meta.env.BASE_URL}glyphs/{fontstack}/{range}.pbf`
// The exact locality polygon is the primary hover/click target; the wide
// invisible train-line and station hit layers add route identification and a
// fallback interaction target where polygon coverage is missing.
const POINTER_QUERY_LAYERS = [
  'locality-label',
  'locality-focus-outline',
  'locality-fill',
  STATION_HIT_LAYER,
]
const LINE_HIT_LAYER = 'train-line-hit'

const prefersReducedMotion =
  typeof window !== 'undefined' && window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false
const PERSONAL_LABEL_ZOOM = 11.7

// Outline colour/width priority: selected > shortlisted > hovered > base.
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

function buildStyle() {
  return {
    version: 8,
    // Same-origin glyphs only; no third-party tiles, sprite or remote font
    // fetches leave the site.
    glyphs: GLYPHS_URL,
    sources: {},
    layers: [{ id: 'bg', type: 'background', paint: { 'background-color': T.bg } }],
  }
}

// Points show when the whole layer is on (null filter = everything), or when
// they belong to the selected suburb's record. NEVER_MATCH keeps types clean.
const NEVER_MATCH = ['in', '__none__', ['get', 'areaIds']]
function schoolFacilityFilter(showAll) {
  if (showAll) return null
  if (!props.selectedAreaId) return NEVER_MATCH
  return ['in', props.selectedAreaId, ['get', 'areaIds']]
}

function addLayers() {
  if (props.water) {
    map.addSource(WATER_SRC, { type: 'geojson', data: props.water })
    map.addLayer({
      id: 'bay-fill',
      type: 'fill',
      source: WATER_SRC,
      paint: { 'fill-color': '#163645', 'fill-opacity': 0.9 },
    })
  }

  if (props.river) {
    map.addSource(RIVER_SRC, { type: 'geojson', data: props.river })
    map.addLayer({
      id: 'yarra-line',
      type: 'line',
      source: RIVER_SRC,
      paint: { 'line-color': '#2F5A73', 'line-width': 1.2, 'line-opacity': 0.88 },
    })
  }

  // Faint coastline sits under the analytical layers as orientation context.
  if (props.basemap) {
    map.addSource('basemap', { type: 'geojson', data: props.basemap })
    map.addLayer({
      id: 'coastline',
      type: 'line',
      source: 'basemap',
      paint: { 'line-color': '#4A708C', 'line-width': 1.1, 'line-opacity': 0.72 },
    })
  }

  if (props.localities) {
    map.addSource(LOCALITY_SRC, { type: 'geojson', data: props.localities })

    // Polygon fill carries the DECISION FIT: hue = score for the active lens
    // (via feature-state colour pushed per locality), opacity = confidence,
    // with hover/selection lift. Unassessed context suburbs stay near-invisible.
    map.addLayer({
      id: 'locality-fill',
      type: 'fill',
      source: LOCALITY_SRC,
      paint: {
        'fill-color': ['coalesce', ['feature-state', 'color'], '#1A2229'],
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hovered'], false],
          ['+', ['coalesce', ['feature-state', 'fillOpacity'], 0.05], 0.16],
          ['boolean', ['feature-state', 'selected'], false],
          ['+', ['coalesce', ['feature-state', 'fillOpacity'], 0.05], 0.12],
          [
            'coalesce',
            ['feature-state', 'fillOpacity'],
            ['case', ['boolean', ['get', 'assessed'], false], 0.12, 0.05],
          ],
        ],
      },
    })
    map.addLayer({
      id: 'locality-boundary',
      type: 'line',
      source: LOCALITY_SRC,
      paint: {
        'line-color': ['case', ['boolean', ['get', 'assessed'], false], '#5F6F7B', '#3E4851'],
        'line-width': ['case', ['boolean', ['get', 'assessed'], false], 0.9, 0.7],
        'line-opacity': ['case', ['boolean', ['get', 'assessed'], false], 0.48, 0.3],
      },
    })
    map.addLayer({
      id: 'locality-focus-outline',
      type: 'line',
      source: LOCALITY_SRC,
      paint: {
        'line-color': [
          'case',
          ['boolean', ['feature-state', 'hovered'], false],
          T.hover,
          ['boolean', ['feature-state', 'selected'], false],
          T.selected,
          ['boolean', ['feature-state', 'shortlisted'], false],
          T.shortlist,
          'rgba(0,0,0,0)',
        ],
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'hovered'], false],
          2.2,
          ['boolean', ['feature-state', 'selected'], false],
          1.9,
          ['boolean', ['feature-state', 'shortlisted'], false],
          1.6,
          0.5,
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'hovered'], false],
          0.96,
          ['boolean', ['feature-state', 'selected'], false],
          0.85,
          ['boolean', ['feature-state', 'shortlisted'], false],
          0.72,
          0,
        ],
      },
    })
  }

  // Train lines: colour = route identity, thin and faint by default, lifted
  // for the hovered / selected suburb's useful lines.
  if (props.trainLines) {
    map.addSource(LINE_SRC, { type: 'geojson', data: props.trainLines })
    map.addLayer({
      id: 'train-line',
      type: 'line',
      source: LINE_SRC,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': ['get', 'color'],
        'line-width': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          2.4,
          ['boolean', ['feature-state', 'hovered'], false],
          2.2,
          1.2,
        ],
        'line-opacity': [
          'case',
          ['boolean', ['feature-state', 'selected'], false],
          0.85,
          ['boolean', ['feature-state', 'hovered'], false],
          0.9,
          0.28,
        ],
      },
    })
    // Wide, invisible companion layer so the thin lines are actually
    // hoverable; hovering identifies the route (there is no on-map legend).
    map.addLayer({
      id: LINE_HIT_LAYER,
      type: 'line',
      source: LINE_SRC,
      paint: { 'line-color': '#000000', 'line-width': 10, 'line-opacity': 0.01 },
    })
  }

  map.addSource(CATCH_SRC, { type: 'geojson', data: props.catchments })
  map.addSource(POINT_SRC, { type: 'geojson', data: props.points })

  // DIAGNOSTIC overlay only: the straight-line catchment circles. Hidden in
  // the normal map experience.
  map.addLayer({
    id: 'catchment-fill',
    type: 'fill',
    source: CATCH_SRC,
    layout: { visibility: props.showDiagnostics ? 'visible' : 'none' },
    paint: {
      'fill-color': ['coalesce', ['feature-state', 'color'], T.faintFill],
      'fill-opacity': ['*', ['coalesce', ['feature-state', 'fillOpacity'], 0.16], 0.6],
    },
  })
  map.addLayer({
    id: 'catchment-outline',
    type: 'line',
    source: CATCH_SRC,
    layout: { visibility: props.showDiagnostics ? 'visible' : 'none' },
    paint: { 'line-color': outlineColor(), 'line-width': 1 },
  })

  // Stations: small passive points. No hover behaviour; the selected suburb's
  // stations brighten and take a label.
  map.addLayer({
    id: 'station-core',
    type: 'circle',
    source: POINT_SRC,
    paint: {
      'circle-radius': ['case', ['boolean', ['feature-state', 'selected'], false], 4.2, 2.4],
      'circle-color': [
        'case',
        ['boolean', ['feature-state', 'selected'], false],
        T.selected,
        T.markerDim,
      ],
      'circle-opacity': ['case', ['boolean', ['feature-state', 'selected'], false], 1, 0.8],
      'circle-stroke-color': T.ink,
      'circle-stroke-width': 1,
    },
  })
  map.addLayer({
    id: STATION_HIT_LAYER,
    type: 'circle',
    source: POINT_SRC,
    paint: { 'circle-radius': 9, 'circle-color': '#000000', 'circle-opacity': 0.01 },
  })
  map.addLayer({
    id: 'station-label',
    type: 'symbol',
    source: POINT_SRC,
    layout: {
      'text-field': ['get', 'stationName'],
      'text-font': ['Noto Sans Regular'],
      'text-size': 10,
      'text-offset': [0, 1.1],
      'text-anchor': 'top',
      'text-allow-overlap': false,
    },
    paint: {
      'text-color': '#E6EBEF',
      'text-opacity': ['case', ['boolean', ['feature-state', 'selected'], false], 0.95, 0],
      'text-halo-color': 'rgba(17, 20, 24, 0.92)',
      'text-halo-width': 1,
    },
  })

  if (props.localities) {
    map.addLayer({
      id: 'locality-label',
      type: 'symbol',
      source: LOCALITY_SRC,
      minzoom: 9.6,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Regular'],
        'text-size': ['interpolate', ['linear'], ['zoom'], 9.6, 9, 12, 11, 14, 12.5],
        'text-max-width': 8,
        'text-letter-spacing': 0.02,
        'text-padding': 3,
      },
      paint: {
        'text-color': [
          'case',
          ['boolean', ['feature-state', 'hovered'], false],
          '#C6D2D9',
          ['boolean', ['feature-state', 'selected'], false],
          '#E6EBEF',
          ['boolean', ['get', 'assessed'], false],
          '#8A98A4',
          '#66737E',
        ],
        'text-opacity': ['interpolate', ['linear'], ['zoom'], 9.6, 0.58, 12, 0.8, 14, 0.9],
        'text-halo-color': 'rgba(17, 20, 24, 0.92)',
        'text-halo-width': 1,
        'text-halo-blur': 0.35,
      },
    })
  }

  // Schools: PURPLE context layer, contextual visibility (selected suburb or
  // explicit layer toggle). Small passive dots with labels.
  if (props.schools) {
    map.addSource(SCHOOL_SRC, { type: 'geojson', data: props.schools })
    map.addLayer({
      id: 'school-dot',
      type: 'circle',
      source: SCHOOL_SRC,
      filter: NEVER_MATCH,
      paint: {
        'circle-radius': 4,
        'circle-color': T.purple,
        'circle-opacity': 0.9,
        'circle-stroke-color': T.ink,
        'circle-stroke-width': 1.2,
      },
    })
    map.addLayer({
      id: 'school-label',
      type: 'symbol',
      source: SCHOOL_SRC,
      filter: NEVER_MATCH,
      layout: {
        'text-field': ['get', 'name'],
        'text-font': ['Noto Sans Regular'],
        'text-size': 10,
        'text-offset': [0, 1],
        'text-anchor': 'top',
        'text-max-width': 10,
      },
      paint: {
        'text-color': T.purple,
        'text-opacity': 0.9,
        'text-halo-color': 'rgba(17, 20, 24, 0.92)',
        'text-halo-width': 1,
      },
    })
  }

  // Facilities: purple family/recreation context, hollow ring to read apart
  // from the solid school dots.
  if (props.facilities) {
    map.addSource(FACILITY_SRC, { type: 'geojson', data: props.facilities })
    map.addLayer({
      id: 'facility-ring',
      type: 'circle',
      source: FACILITY_SRC,
      filter: NEVER_MATCH,
      paint: {
        'circle-radius': 4.5,
        'circle-color': 'rgba(0,0,0,0)',
        'circle-stroke-color': T.purple,
        'circle-stroke-width': 1.6,
        'circle-stroke-opacity': 0.75,
      },
    })
  }

  loaded = true
  applyAllState()
  applyLineState()
  applyContextFilters()
}

// Push data styling + selection/shortlist into feature-state on the record
// sources (catchments + stations) and the locality polygons.
function applyAllState() {
  if (!loaded || !map) return
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
  applyLocalityState(selected, shortSet)
}

// Locality polygons carry the score hue. Hover is per-polygon: only the exact
// feature under the pointer lifts, even when several polygons share a grouped
// ranking record.
function applyLocalityState(
  selected = props.selectedAreaId,
  shortSet = new Set(props.shortlistIds),
) {
  if (!loaded || !map || !props.localities?.features?.length) return
  const hoveredLocalityId = hoverContext?.localityFeatureId ?? null
  for (const feature of props.localities.features) {
    const areaIds = Array.isArray(feature.properties?.areaIds) ? feature.properties.areaIds : []
    const primary = feature.properties?.primaryAreaId
    const st = primary ? props.areaState[primary] : null
    map.setFeatureState(
      { source: LOCALITY_SRC, id: feature.id },
      {
        color: st?.color ?? null,
        fillOpacity: st?.fillOpacity ?? null,
        status: st?.status ?? null,
        selected: selected != null && areaIds.includes(selected),
        shortlisted: areaIds.some((areaId) => shortSet.has(areaId)),
        hovered: feature.id === hoveredLocalityId,
      },
    )
  }
}

// Brighten the useful train lines for the hovered / selected suburb, plus any
// line directly under the pointer.
function applyLineState() {
  if (!loaded || !map || !props.trainLines?.features?.length) return
  const hoverSet = new Set(props.hoverLineIds)
  for (const l of hoverContext?.lineHits || []) hoverSet.add(l.id)
  const selectedSet = new Set(props.selectedLineIds)
  for (const f of props.trainLines.features) {
    const lineId = f.properties?.lineId
    map.setFeatureState(
      { source: LINE_SRC, id: f.id },
      { hovered: hoverSet.has(lineId), selected: selectedSet.has(lineId) },
    )
  }
}

// Contextual school/facility visibility follows the selection and the toggles.
function applyContextFilters() {
  if (!loaded || !map) return
  if (props.schools) {
    const f = schoolFacilityFilter(props.showAllSchools)
    for (const id of ['school-dot', 'school-label']) map.setFilter(id, f)
  }
  if (props.facilities) {
    map.setFilter('facility-ring', schoolFacilityFilter(props.showAllFacilities))
  }
}

function applyDiagnostics() {
  if (!loaded || !map) return
  const vis = props.showDiagnostics ? 'visible' : 'none'
  for (const id of ['catchment-fill', 'catchment-outline'])
    map.setLayoutProperty(id, 'visibility', vis)
}

function sameHoverContext(a, b) {
  return (
    a?.areaId === b?.areaId &&
    a?.localityName === b?.localityName &&
    a?.localityFeatureId === b?.localityFeatureId &&
    a?.lineKey === b?.lineKey
  )
}

function popupHtml(payload, lngLat) {
  if (!props.getPopupHtml) return
  const html = props.getPopupHtml(payload)
  if (!html) {
    if (popup) popup.remove()
    return
  }
  if (!popup) {
    popup = new maplibregl.Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'dwelling-map-popup',
      offset: 10,
    })
  }
  popup.setLngLat(lngLat).setHTML(html).addTo(map)
}

function setHoverContext(next, lngLat = null) {
  if (sameHoverContext(hoverContext, next)) {
    if (next && lngLat) popupHtml(next, lngLat)
    return
  }
  hoverContext = next
  applyLocalityState()
  applyLineState()
  emit('hover', next)
  if (next && lngLat) popupHtml(next, lngLat)
  else if (popup) {
    popup.remove()
  }
}

function clearHover() {
  if (!map) return
  map.getCanvas().style.cursor = ''
  setHoverContext(null)
}

// Hover payload: the exact locality polygon plus the ranking record it maps
// to. Grouped records stay grouped for ranking, but the polygon identity is
// preserved so the pane can say "Windsor, sharing assumptions with Prahran".
// NOTE: queryRenderedFeatures JSON-stringifies array properties, so
// properties.areaIds is NOT usable here; primaryAreaId (a plain string, null
// for unassessed context suburbs) is the only reliable interactivity key.
function hoverPayloadFromFeature(feature) {
  const areaId = feature.properties?.primaryAreaId
  if (!areaId) return null
  return {
    areaId,
    source: 'locality',
    localityName: feature.properties?.name || null,
    localityFeatureId: feature.id ?? null,
  }
}

function hoverPayloadFromStation(feature) {
  const areaId = feature.properties?.areaId
  if (!areaId) return null
  return {
    areaId,
    source: 'station',
    localityName: null,
    localityFeatureId: null,
    stationName: feature.properties?.stationName || null,
  }
}

function interactiveTargetAt(point) {
  const layers = [...POINTER_QUERY_LAYERS]
  if (props.trainLines) layers.push(LINE_HIT_LAYER)
  const features = map.queryRenderedFeatures(point, { layers })

  // Any train line under the pointer: identification rides along in the popup
  // (there is no on-map line legend) and the line itself brightens.
  const lineHits = []
  const seenLines = new Set()
  for (const f of features) {
    if (f.layer.id !== LINE_HIT_LAYER) continue
    const p = f.properties || {}
    if (p.lineId && !seenLines.has(p.lineId)) {
      seenLines.add(p.lineId)
      lineHits.push({ id: p.lineId, name: p.name, color: p.color })
    }
  }
  const lineKey = lineHits.map((l) => l.id).join(',')

  const locality = features.find(
    (f) => f.layer.id !== LINE_HIT_LAYER && f.properties?.primaryAreaId,
  )
  if (locality) {
    const payload = hoverPayloadFromFeature(locality)
    return payload ? { ...payload, lineHits, lineKey } : null
  }
  const station = features.find((f) => f.layer.id === STATION_HIT_LAYER && f.properties?.areaId)
  if (station) {
    const payload = hoverPayloadFromStation(station)
    return payload ? { ...payload, lineHits, lineKey } : null
  }
  if (lineHits.length) {
    return {
      areaId: null,
      source: 'line',
      localityName: null,
      localityFeatureId: null,
      lineHits,
      lineKey,
    }
  }
  return null
}

function onMapPointerMove(e) {
  if (!loaded || props.suspendInteraction) return
  const target = interactiveTargetAt(e.point)
  // Pointer cursor only for clickable suburbs; a bare line hover just informs.
  map.getCanvas().style.cursor = target?.areaId ? 'pointer' : ''
  if (!target) {
    clearHover()
    return
  }
  setHoverContext(target, e.lngLat)
}

function onMapClick(e) {
  if (!loaded || props.suspendInteraction) return
  const target = interactiveTargetAt(e.point)
  if (target?.areaId) emit('select', target)
}

// Escape closes the hover popup without touching the pinned selection.
function onEscapeKey() {
  if (map) clearHover()
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
    addDestination()
    syncAnchorMarkers()
    applyAnchorLabelVisibility()
    map.on('mousemove', onMapPointerMove)
    map.on('click', onMapClick)
    map.on('zoom', applyAnchorLabelVisibility)
    containerLeaveHandler = () => clearHover()
    container.value?.addEventListener('mouseleave', containerLeaveHandler)
  })
})

// The commute destination: a compact diamond with a one-word label; the full
// destination name lives in the native tooltip and the pane, not on the map.
function addDestination() {
  if (!props.destination) return
  const el = document.createElement('div')
  el.className = 'dwelling-map-anchor'
  el.title = props.destination.title || ''
  el.innerHTML = `<span class="dot"></span><span class="lbl">${props.destination.label}</span>`
  destinationMarker = new maplibregl.Marker({ element: el, anchor: 'left' })
    .setLngLat(props.destination.coordinates)
    .addTo(map)
}

// Personal network anchors: GOLD markers with a star (friends) or pin glyph.
// Rebuilt on toggle; six markers, so teardown cost is nil.
function syncAnchorMarkers() {
  for (const m of anchorMarkers) m.remove()
  anchorMarkers = []
  if (!map || !props.showAnchors) return
  for (const a of props.anchors) {
    const el = document.createElement('div')
    el.className = 'dwelling-map-personal'
    el.setAttribute('aria-hidden', 'true')
    el.title = a.detail || a.label
    el.style.setProperty('--label-x', `${a.labelOffset?.[0] ?? 8}px`)
    el.style.setProperty('--label-y', `${a.labelOffset?.[1] ?? -12}px`)
    const glyph = a.type === 'other' ? '★' : '●'
    el.innerHTML = `<span class="glyph">${glyph}</span><span class="lbl">${a.label}</span>`
    anchorMarkers.push(
      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([a.longitude, a.latitude])
        .addTo(map),
    )
  }
  applyAnchorLabelVisibility()
}

function applyAnchorLabelVisibility() {
  if (!map) return
  const showLabels = map.getZoom() >= PERSONAL_LABEL_ZOOM
  for (const marker of anchorMarkers) {
    marker.getElement().classList.toggle('labels-visible', showLabels)
  }
}

onBeforeUnmount(() => {
  if (popup) popup.remove()
  if (destinationMarker) destinationMarker.remove()
  for (const m of anchorMarkers) m.remove()
  if (containerLeaveHandler)
    container.value?.removeEventListener('mouseleave', containerLeaveHandler)
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
  () => {
    applyAllState()
    applyContextFilters()
  },
  { deep: true },
)
watch(
  () => [props.hoverLineIds, props.selectedLineIds],
  () => applyLineState(),
  { deep: true },
)
watch(
  () => [props.showAllSchools, props.showAllFacilities],
  () => applyContextFilters(),
)
watch(
  () => props.showDiagnostics,
  () => applyDiagnostics(),
)
watch(
  () => props.showAnchors,
  () => syncAnchorMarkers(),
)
watch(
  () => props.anchors,
  () => syncAnchorMarkers(),
  { deep: true },
)
watch(
  () => props.suspendInteraction,
  (suspended) => {
    if (suspended) clearHover()
  },
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
.dwelling-map-anchor {
  display: flex;
  align-items: center;
  gap: 5px;
  pointer-events: auto;
}
.dwelling-map-anchor .dot {
  width: 9px;
  height: 9px;
  border-radius: 2px;
  background: #f5f2ec;
  border: 1.5px solid #111418;
  transform: rotate(45deg);
}
.dwelling-map-anchor .lbl {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  font-size: 10px;
  letter-spacing: 0.04em;
  color: #f5f2ec;
  background: rgba(17, 20, 24, 0.7);
  padding: 1px 5px;
  border-radius: 3px;
  white-space: nowrap;
}
/* Personal network markers: gold, star for friends, pin-dot otherwise. */
.dwelling-map-personal {
  position: relative;
  width: 0;
  height: 0;
  pointer-events: none;
}
.dwelling-map-personal .glyph {
  position: absolute;
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  color: #e5c35a;
  font-size: 11px;
  line-height: 1;
  text-shadow: 0 0 3px rgba(12, 15, 18, 0.9);
}
.dwelling-map-personal .lbl {
  font-family: 'Space Grotesk', ui-monospace, monospace;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  font-size: 9px;
  letter-spacing: 0.03em;
  color: #e5c35a;
  background: rgba(58, 50, 24, 0.55);
  border: 1px solid rgba(168, 142, 60, 0.35);
  padding: 0 4px;
  border-radius: 3px;
  white-space: nowrap;
  transform: translate(var(--label-x, 8px), var(--label-y, -12px));
}
.dwelling-map-personal.labels-visible .lbl {
  display: inline-block;
}
</style>
