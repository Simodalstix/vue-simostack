// src/data/dwelling/personalAnchors.js
//
// Personal network layer: the handful of places that anchor the decision to a
// real life. GOLD accent territory (star or pin glyph), never amber and never
// a score input.
//
// PRIVACY MODEL (this repository is public)
// - The coordinates below are deliberately APPROXIMATE: suburb-centre or
//   landmark-level points, never a street address. They are safe to commit
//   and safe to ship in the public bundle.
// - Exact local-only coordinates can be supplied by creating
//   `personalAnchors.local.js` NEXT TO THIS FILE, which is gitignored. It is
//   merged over the public defaults by id at build time on machines where it
//   exists, and simply absent everywhere else:
//
//     // src/data/dwelling/personalAnchors.local.js  (gitignored)
//     export const localAnchorOverrides = {
//       home: { longitude: 144.9xxx, latitude: -37.8xxx },
//       nathan: { longitude: 144.9xxx, latitude: -37.8xxx, note: 'exact' },
//     }
//
// - WARNING: the local file is compiled into any bundle built while it is
//   present. Never run a production/deploy build on a machine carrying the
//   local overrides. Vite env variables are NOT used for this on purpose:
//   client env values end up in the bundle and are not a privacy control.
//
// friendContext: contextual only, by design. There is no friend weighting
// slider and friendship never feeds the suburb score; nearby friends surface
// as a small gold badge or line in the pane.

export const publicAnchors = [
  // labelOffset is a [x, y] pixel nudge so the tightly clustered inner
  // anchors (Southbank / South Melbourne) stay readable at city zoom. The
  // offset moves only the label, never the geographic point.
  {
    id: 'home',
    label: 'Home',
    detail: 'Current Southbank home',
    type: 'home',
    longitude: 144.9623,
    latitude: -37.8265, // Southbank, suburb-level
    labelOffset: [6, -14],
    approximate: true,
  },
  {
    id: 'simon-work',
    label: 'Simon work',
    detail: 'Thomastown',
    type: 'work',
    longitude: 145.0128,
    latitude: -37.6811, // Thomastown, suburb-level
    approximate: true,
  },
  {
    id: 'jeanie-work',
    label: 'Jeanie work',
    detail: 'South Melbourne pharmacy',
    type: 'work',
    longitude: 144.9587,
    latitude: -37.8316, // South Melbourne, suburb-level
    labelOffset: [-70, 4],
    approximate: true,
  },
  {
    id: 'lulu-childcare',
    label: 'Lulu childcare',
    detail: 'South Melbourne',
    type: 'family',
    longitude: 144.9556,
    latitude: -37.8347, // South Melbourne, suburb-level
    labelOffset: [-80, 18],
    approximate: true,
  },
  {
    id: 'nathan',
    label: 'Nathan',
    detail: 'Inner south-east',
    type: 'other',
    longitude: 144.9968,
    latitude: -37.8437, // South Yarra area, suburb-level
    labelOffset: [6, 12],
    approximate: true,
  },
  {
    id: 'tama',
    label: 'Tama',
    detail: 'Sunbury',
    type: 'other',
    longitude: 144.7286,
    latitude: -37.5773, // Sunbury, town-level
    approximate: true,
  },
]

// Merge gitignored local overrides (exact coordinates) when the file exists.
// import.meta.glob resolves at build time: no file, no code, no request. The
// try/catch keeps this module importable outside Vite (node data checks),
// where the glob helper does not exist and the public defaults stand alone.
let localOverrides = {}
try {
  const localModules = import.meta.glob('./personalAnchors.local.js', { eager: true })
  localOverrides = Object.values(localModules)[0]?.localAnchorOverrides || {}
} catch {
  localOverrides = {}
}

export const personalAnchors = publicAnchors.map((a) =>
  normaliseAnchor(localOverrides[a.id] ? { ...a, ...localOverrides[a.id], approximate: false } : a),
)

function normaliseAnchor(anchor) {
  const longitude = anchor.longitude ?? anchor.coordinates?.[0]
  const latitude = anchor.latitude ?? anchor.coordinates?.[1]
  const type = anchor.type || anchor.kind || 'other'
  return {
    ...anchor,
    type,
    kind: type === 'other' ? 'friend' : type,
    longitude,
    latitude,
    coordinates: [longitude, latitude],
  }
}

// GeoJSON for the map layer.
export const anchorFeatures = {
  type: 'FeatureCollection',
  features: personalAnchors.map((a, i) => ({
    type: 'Feature',
    id: i,
    properties: { anchorId: a.id, label: a.label, type: a.type },
    geometry: { type: 'Point', coordinates: [a.longitude, a.latitude] },
  })),
}

// Contextual friend-nearby notes per ranking record. Text only, no fabricated
// travel times, no score contribution. `badge: true` earns the small gold
// star badge in the pane and list.
export const friendContextByArea = {
  'sunbury-house': { badge: true, text: 'Tama lives locally' },
  'inner-south-yarra-2br': { badge: false, text: 'Close to Nathan' },
  'inner-windsor-prahran-2br': { badge: false, text: 'Close to Nathan' },
  'toorak-2br': { badge: false, text: 'Close to Nathan' },
  'malvern-2br': { badge: false, text: 'Near Nathan' },
  'albert-park-2br': { badge: false, text: 'Easy reach of Nathan' },
  'st-kilda-2br': { badge: false, text: 'Easy reach of Nathan' },
  'inner-richmond-2br': { badge: false, text: 'Easy reach of Nathan' },
}

export function friendContextFor(areaId) {
  return friendContextByArea[areaId] || null
}
