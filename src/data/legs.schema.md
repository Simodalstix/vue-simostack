# legs.json — schema

Single source of truth for the travel-timeline map (`/clearance`). Hand-edited.
`legs.json` is upstream of every presentation (the map today, a possible docx
generator later), so it stays presentation-agnostic: normalised facts only, no
styling hints and no doc-specific note strings. Meaning that a view needs is
carried by the fields below, not by free text.

Source: `Simon_Parker_Travel_Timeline_updated` (Google Doc), the consolidated
ticket-sourced timeline. Air legs only — trains, coaches and ferries from the
trip records are intentionally excluded (no IATA endpoints).

## Leg fields

| field     | type              | notes |
|-----------|-------------------|-------|
| `date`    | string `YYYY-MM-DD` | ISO date. Approximate dates use a plausible day and set `approx: true`. |
| `from`    | string (IATA)     | Origin. Must exist as a key in `airports.json`. |
| `to`      | string (IATA)     | Destination. Must exist as a key in `airports.json`. |
| `carrier` | string \| null    | Display string, e.g. `"Aegean A3641"`. `null` when no carrier is on file (a gap). |
| `ref`     | string \| null    | Booking reference, or `null`. `"SCRN"` marks an itinerary-image-only source. |
| `pax`     | string[]          | Passenger names on the booking. |
| `tripId`  | string            | Groups legs into one journey for highlight-as-unit. |
| `status`  | enum              | See below. Load-bearing — do not collapse the values. |
| `approx`  | boolean (optional)| Present and `true` only when `date` is estimated. |

## `status` enum

Three values, visually distinct and semantically different:

- **`confirmed`** — ticket on file. Solid blue arc.
- **`gap`** — leg known to exist but undocumented, or itinerary-image-only with
  no booking ref. Dashed amber. These are the PV follow-up worklist — the point
  of the tool.
- **`cancelled`** — booked but not flown (e.g. COVID, April 2020). Dashed grey,
  low opacity. Must not be confused with `gap`: a cancelled leg needs no
  follow-up.

If a new status is ever added, update this file and `CLAUDE.md` together.

## Conventions

- Multi-segment bookings are split into one leg per flown sector so each draws
  its own arc (e.g. MEL→BCN "via SIN" becomes MEL→SIN and SIN→BCN, same `ref`).
- Leg identity, where a stable key is needed, is `${date}-${from}-${to}`.
- On load, a leg referencing an unknown IATA code is `console.warn`-ed and
  skipped, never fatal.
- `airports.json` holds `{ lon, lat, name }` keyed by IATA, kept separate so
  coordinates aren't repeated on every leg.
