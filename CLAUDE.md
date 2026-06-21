# CLAUDE.md — Travel Timeline Map

Context for any agent working on the travel-timeline feature of simostack.com. Read this before touching `TravelMap.vue`, `TravelTimelineView.vue`, or the data files under `src/data/`.

## What this is

An interactive flight-history map living on the private `/clearance` route. It exists to support an Australian Positive Vetting (PV) preparation process: it visualises ~46 international flight legs from 2011 onward and makes undocumented gaps visually obvious so they can be chased down. It is a working tool for one person (the site owner), not a public showpiece. When trading off, choose legibility and correctness over visual flourish.

## Architecture (the important part)

Data flows one direction: **`legs.json` is upstream of everything.**

```
legs.json  ──►  TravelMap (visual)
   │
   └──────────►  (future) docx generator
```

The flight timeline is maintained as structured JSON, and presentations read from it. The map is the first consumer. A docx timeline generator may later become a second consumer of the same file — so keep `legs.json` presentation-agnostic: no styling hints, no doc-specific note strings, just normalised facts. Do not invert this by deriving `legs.json` from the docx or by hand-syncing two copies. One source, many views.

`airports.json` holds coordinates keyed by IATA code, separate from `legs.json` so coordinates aren't repeated on every leg.

## Component boundaries

- `TravelMap.vue` is pure presentation. It takes data via props, emits hover/click events, and fetches nothing. Keep it that way — it should be reusable against any leg set.
- `TravelTimelineView.vue` owns all state and data loading. Filtering, the year scrubber, hovered-leg detail, and gating all live here or above.
- Resist over-decomposition. A scrubber sub-component is fine; ten micro-components is not.

## The `status` enum is load-bearing

Three values, visually distinct, semantically different — do not collapse them:

- `confirmed` — ticket on file. Solid blue arc.
- `gap` — known-to-exist-but-undocumented, or itinerary-image-only with no booking ref. Dashed amber. **These are the entire point of the tool.** Amber means "PV follow-up."
- `cancelled` — booked but not flown (COVID 2020). Dashed grey, low opacity. Must not be confused with `gap` — a cancelled leg needs no follow-up; a gap does.

If a future change adds a status, update this file and the schema doc together.

## Conventions

- Colours and stroke styles live in one config object, not scattered hex literals.
- D3: import submodules (`d3-geo`, `topojson-client`), never the `d3` mega-bundle.
- Topology (`countries-110m.json`) is vendored into `src/assets/geo/` and imported, never fetched at runtime. This route is behind auth and must make no third-party network calls.
- `legs.json` must not enter the main bundle. It loads only inside the lazy route chunk for `/clearance`, after the auth gate resolves. Mirror the existing dossier route's gating pattern.
- Leg identity is `${date}-${from}-${to}` where a stable key is needed.
- Validate data on load: unknown IATA code → `console.warn` and skip, never crash.

## Owner's working style (from prior collaboration)

- Plan before executing. Confirm file layout and the D3 import surface before writing component bodies.
- Build one example first — a single arc, a single trip card — show it against real data, then scale. Do not generate the whole feature in one shot.
- No em-dashes in any generated prose or UI copy.
- Fundamentals-first, clean visual design without over-engineered interactivity. Light hover/filter/scrub only — no fly-to camera, no scroll-jacking, no animation beyond cheap hover transitions.
- Match the existing dark-navy site styling; don't introduce a new palette.

## Out of scope unless asked

- The PV personal-history dataset (education / employment / address swimlanes) is a separate future feature. Don't fold it into this map.
- Public sharing / un-gating. This stays behind `/clearance`.
