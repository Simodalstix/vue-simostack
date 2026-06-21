# Agent prompt — Travel Timeline Map (`/clearance`)

Build an interactive travel-timeline map for the private `/clearance` route of simostack.com. This is a PV-preparation tool: its job is to make my international flight history legible at a glance and make data gaps visually loud. It is not a public portfolio piece, so favour clarity and completeness-checking over spectacle.

## Stack constraints

- Vue 3 (Composition API, `<script setup>`), existing project at `~/projects/vue-simostack`.
- Tailwind CSS, matching the existing dark-navy site styling.
- D3 for geography only: `d3-geo` (projection + path) and `topojson-client` (decode topology). Do not pull in all of d3; import the submodules.
- Basemap: world-atlas `countries-110m.json`. Vendor it locally into the repo (`src/assets/geo/countries-110m.json`) rather than fetching from a CDN at runtime — this route sits behind auth and should not make third-party calls.
- No Leaflet, no map tiles, no external map services.

## Data

Single source of truth: `src/data/legs.json`. Hand-edited by me. Schema (document it in the file header comment or an adjacent `legs.schema.md`):

```json
{
  "date": "2017-08-28",        // ISO date, YYYY-MM-DD; approximate dates use the 1st and set "approx": true
  "from": "TLS",                // IATA code, must exist in airports.json
  "to": "ATH",
  "carrier": "Aegean A3641",    // display string
  "ref": "3PFHH9",              // booking reference, or null
  "pax": ["Simon"],             // array of names
  "tripId": "europe-2017",      // groups legs into a journey for highlight-as-unit
  "status": "confirmed"         // enum: "confirmed" | "gap" | "cancelled"
}
```

`status` semantics:
- `confirmed` — ticket on file, solid blue arc.
- `gap` — leg known to exist but undocumented, OR itinerary-image-only with no booking ref. Dashed amber arc. This is the PV worklist.
- `cancelled` — booked but did not fly (e.g. COVID 2020). Dashed grey arc, lower opacity. Visually distinct from gap.

Airport coordinates live in `src/data/airports.json` as `{ "TLS": { "lon": 1.4, "lat": 43.6, "name": "Toulouse" }, ... }`. Keep this separate from legs so coordinates aren't duplicated per leg.

Seed both files from the data in the current travel timeline (I will provide `legs.json` content, or extract from `Simon_Parker_Travel_Timeline_updated.docx`). Validate on load: any leg referencing an unknown IATA code should `console.warn` and be skipped, not crash.

## Component structure

- `TravelMap.vue` — owns the SVG. Props: `legs` (array), `selectedYear` (number | null), `selectedTripId` (string | null). Emits `legHover` and `legClick`. No data fetching inside; pure presentation.
- `TravelTimelineView.vue` — the route view. Owns state (year scrubber, all/filtered, hovered leg detail), loads `legs.json` and `airports.json`, passes props down, renders the trip list alongside the map.
- Keep the trip-list and scrubber as small sub-components if it helps, but don't over-decompose.

## Map rendering

- Projection: `geoNaturalEarth1`, fit to the viewBox via `projection.fitExtent`.
- Draw country fills from the vendored topology, muted (a single low-contrast fill that works on the dark-navy bg). Graticule optional; if it adds noise, drop it.
- Each leg is a quadratic-bezier arc between projected `from`/`to` points, curved by a consistent perpendicular offset (see prototype logic). Great-circle interpolation via `geoInterpolate` is a nice-to-have, not required — the bezier reads fine at this scale.
- Colour by `status`: confirmed `#378ADD` solid, gap `#EF9F27` dashed, cancelled grey dashed at ~0.5 opacity. Pull exact values into a small config object, don't scatter hex literals.
- Airport dots + IATA labels only for airports used in the currently shown set.
- Hover an arc: thicken it, raise opacity, surface leg detail (date, route, carrier, ref, pax, status) in a detail line or small panel. On dark bg, make sure hover state is clearly readable.

## Interactivity (keep it light)

- Year scrubber (range input 2011–2025) filters both map and list. Plus a "Show all" reset.
- Hovering a trip-list entry highlights that leg's arc(s) on the map, and vice versa, keyed on a stable leg id (index is fine if legs.json order is stable; prefer `${date}-${from}-${to}`).
- `tripId` grouping: hovering any leg of a trip can optionally highlight the whole journey. Wire the plumbing even if the default is single-leg highlight.
- No animation beyond cheap CSS/SVG transitions on hover. No fly-to camera, no scroll-jacking.

## Gating

This route is already behind the site's `/clearance` auth gate. Do not fetch `legs.json` until after auth resolves — bundle it as an import that only the lazy-loaded route chunk pulls in, so it isn't in the main bundle. Confirm the existing route guard covers this view; match the pattern used by the existing dossier route.

## Accessibility & quality

- SVG gets `role="img"` and a `<title>`/`<desc>`. Provide a text fallback summarising the timeline.
- Respect `prefers-reduced-motion`: disable hover transitions when set.
- Round any displayed numbers. No console errors. Type the data with a TS interface or JSDoc if the project uses it.

## Deliverables

1. `TravelMap.vue`, `TravelTimelineView.vue` (+ any small sub-components).
2. `src/data/legs.json`, `src/data/airports.json`, seeded from the timeline.
3. `legs.schema.md` documenting the schema and the `status` enum.
4. Route wired into the router behind the existing `/clearance` guard.
5. Vendored `countries-110m.json` in assets.

Build one leg-rendering path and one trip card first, show me that against real data, then scale to the full set. Plan the file layout and confirm the D3 import surface before writing the component body.
