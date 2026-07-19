# `/dwelling` greenspace access methodology

## Status

This package establishes the reproducible version-one greenspace pipeline for
the canonical Decide-page target registry (currently 60 suburb records).

It does not contain fabricated scores. The final JSON and TypeScript datasets
are generated only after the official spatial source files have been downloaded
and the QA output reviewed.

## Source decision

There is no single maintained official polygon layer covering every local park
across metropolitan Melbourne.

The Victorian Planning Authority's **Open Space** dataset is the official
comprehensive metropolitan layer, but its data was last updated in July 2019
and its publisher states that it is not currently maintained. It remains useful
because it records open-space function, access, status, water/coastal context
and ownership consistently across metropolitan councils.

Version one therefore uses:

1. VPA Open Space as the comprehensive metropolitan base.
2. ABS 2021 SAL boundaries.
3. ABS 2021 residential Mesh Blocks and usual-resident population counts.
4. An optional current PARKRES layer to supplement major parks and
   nature/conservation reserves.
5. Manual outlier review, particularly for growth suburbs and parks created
   or materially changed after 2019.

PARKRES is supplemental. It does not replace council-level local parks.

## What the score measures

The criterion measures **population-weighted access to usable greenspace**.

It does not measure the raw number of parks or the proportion of the suburb
polygon covered by green land. Those measures can over-reward very large,
industrial or sparsely populated suburbs.

```text
greenspace =
  localOpenSpaceAccess × 0.50 +
  majorParkAccess      × 0.30 +
  natureCorridorAccess × 0.20
```

Every component and diagnostic is retained.

## Residential sampling points

ABS 2021 Mesh Blocks classified as `Residential` and containing at least one
usual resident are used as sampling units.

For each residential Mesh Block:

- a representative point is placed inside its polygon;
- the point is assigned to its 2021 SAL;
- its weight is the Mesh Block's usual-resident population.

This represents where residents live more honestly than a suburb centroid.

For combined Decide records such as `Brunswick/Coburg`, all residential points
and weights from both SALs are pooled before calculation. Component scores are
not averaged.

## Component 1: local open-space access

Eligible local features must be:

- existing;
- recorded as open access;
- not private open space;
- at least 0.05 hectares; and
- categorised as a park, garden, sportsfield, conservation area, recreation
  corridor, waterway, foreshore, coastal area, wetland, bushland or similar
  usable green feature.

The component starts with the population-weighted percentage of residents
within 400 metres straight-line distance.

The VPA planning objective is 400-metre walkable access for 95% of residents,
so:

```text
localOpenSpaceAccess =
  min(10, 10 × coverageWithin400m / 95)
```

The pipeline calls this straight-line coverage. It must not be displayed as a
walking-route calculation.

## Component 2: major-park access

Adjacent eligible open-space parcels are dissolved into contiguous features.
Features of at least 5 hectares are treated as major parks or reserves.

The 5-hectare threshold is a `/dwelling` project definition, not an official
ABS or Victorian Government classification.

Each residential sampling point receives a distance score:

| Straight-line distance | Score |
| ---------------------: | ----: |
|                0–400 m |    10 |
|                  800 m |     8 |
|                1,200 m |     6 |
|                1,600 m |     4 |
|        2,400 m or more |     0 |

Values between thresholds are linearly interpolated. The suburb component is
the population-weighted mean.

## Component 3: nature-corridor access

Nature-corridor polygons are identified from source attributes including:

- coastal or foreshore status;
- named water bodies;
- rivers, creeks, canals, wetlands and lakes;
- conservation reserves and bushland;
- recreation corridors and linear parks;
- named shared river, creek or bay trails.

The same distance curve as major parks is used.

The classification is deliberately inspectable. The pipeline outputs distinct
source categories and a list of nearby named features for manual review.

## Explicit exclusions

Version one does not include:

- private golf courses or private school grounds;
- restricted campuses merely because they look green;
- private gardens;
- park maintenance or facility quality;
- perceived safety inside a park;
- tree-canopy coverage;
- pedestrian barriers or actual walking routes.

These can become separate future measures. They should not be silently folded
into this score.

## QA and manual review

`dwelling-greenspace-qa.csv` includes:

- all three components;
- final score;
- residential sample count;
- residential population represented;
- comparison with 2021 Census population;
- weighted median distances;
- component spread;
- review flags.

Review at minimum:

1. the top and bottom five final scores;
2. every record with `highComponentSpread`;
3. every low-sample or low-population-coverage record;
4. coastal suburbs;
5. growth suburbs such as Donnybrook, Tarneit/Wyndham Vale and Craigieburn;
6. obvious river-corridor suburbs such as Burnley, Richmond and
   Collingwood/Abbotsford;
7. known large-park suburbs such as South Melbourne/Middle Park and Hawthorn.

Do not change individual scores manually. If an outlier is wrong, correct the
source classification or method and regenerate every record.

## Runtime output

The generated runtime record is:

```ts
{
  id: 'windsor-prahran',
  suburb: 'Windsor/Prahran',
  salSuburbs: ['Windsor', 'Prahran'],
  salCodes: ['SAL22805', 'SAL22118'],
  greenspace: 8.1,
  greenspaceComponents: {
    localOpenSpaceAccess: 8.8,
    majorParkAccess: 7.0,
    natureCorridorAccess: 7.5
  },
  context: {
    localCoverageWithin400mPct: 83.6,
    populationWeightedMedianDistanceM: {
      localOpenSpace: 174,
      majorPark: 710,
      natureCorridor: 980
    },
    nearbyOpenSpaces: [],
    nearbyNatureCorridors: []
  },
  sourceMetadata: {
    methodVersion: 'greenspace-access-v1',
    retrievedAt: '2026-07-15',
    distanceMethod: 'Straight-line distance ...',
    analysisCrs: 'EPSG:7855',
    reviewRequired: false,
    reviewFlags: []
  }
}
```

The numeric example above illustrates the schema only. It is not a score for
Windsor/Prahran.

## Running

```bash
python -m pip install -r requirements-greenspace.txt

python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --config dwelling-greenspace-config.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace
```

To inspect source categories before calculating:

```bash
python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --inspect-only
```

To supplement major and nature layers with a current PARKRES file:

```bash
python build-dwelling-greenspace.py \
  --targets dwelling-greenspace-targets.json \
  --cache .cache/dwelling-greenspace \
  --out generated/dwelling-greenspace \
  --parkres /path/to/PARKRES.shp
```

## Source URLs

- VPA Open Space metadata:
  `https://discover.data.vic.gov.au/dataset/open-space`
- ABS ASGS digital boundaries:
  `https://www.abs.gov.au/statistics/standards/australian-statistical-geography-standard-asgs/edition-3-july-2021-june-2026/access-and-downloads/digital-boundary-files`
- ABS Census Mesh Block counts:
  `https://www.abs.gov.au/census/guide-census-data/mesh-block-counts/latest-release`
- PARKRES metadata:
  `https://discover.data.vic.gov.au/dataset/parks-and-conservation-reserves-parkres`
