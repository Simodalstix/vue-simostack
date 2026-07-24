# simostack.com

A Vue 3 single-page site that started as a portfolio and has become the shell
for **Settle**, a data-backed tool for deciding where to buy a house in
Melbourne. The portfolio still exists; the interesting engineering is the data
pipeline behind Settle.

- **Live:** [simostack.com](https://simostack.com)
- **Stack:** Vue 3, Vite, Vue Router, Tailwind, MapLibre GL. Statically built,
  deployed to AWS S3 + CloudFront via GitHub Actions.
- **Agent/contributor entry point:** [`AGENTS.md`](./AGENTS.md).

## Settle

`/tool/settle` ranks around 120 Melbourne suburbs against ten weighted criteria
(cost, commute, safety, schools, recreation, beach access, friends nearby, two
community-fit measures, and a partner-pool "Mingle" score). You pick a strategy
preset or tune the weights; it ranks and explains.

The point of the tool is not the ranking widget, it is that every number is
traceable back to an official source. The data moves in one direction:

```
official publisher files          Python builders            runtime data layer            UI
(VGV sales, ABS 2021 Census,  ->  (tools/, offline,      ->  (src/data/dwelling/,      ->  Vue +
 school points/zones, mesh-        SHA-256 verified,          generated datasets +          MapLibre
 block population + open            QA + provenance)          cited records + scoring)
 space, CSA offences)
```

### How raw data becomes a score

1. **Sources are official and pinned.** Raw workbooks (Valuer-General sales
   medians, ABS Census GCP, school zones, mesh-block open-space) are validated
   by SHA-256 before anything reads them. Nothing is fetched at site build or
   runtime.
2. **Offline pipelines do the transform.** The Python builders under
   [`tools/`](./tools/README.md) extract, compute, and emit generated
   TypeScript/JSON datasets plus QA, outlier, and source-manifest artifacts.
   Generated datasets are never hand-edited; you change the source or config and
   rerun the builder.
3. **The runtime layer carries provenance.** Hand-maintained suburb records in
   `src/data/dwelling/` cite a source ID from a central registry; generated
   records carry source table, cell, hash, and retrieval date.
4. **Scoring is a protected layer.** `useAreaRanking.js` applies hard gates
   first, then a weighted mean across the ten criteria. Missing evidence stays
   `null` and drops out of the mean; it is never coerced to zero or guessed.
   Strategy presets are weight vectors; some criteria (safety, Mingle) use
   cohort-percentile scoring rather than absolute bands.

The disciplines that keep it honest: **one source many views, provenance
mandatory, generated files regenerated not edited, missing evidence is null not
zero, and scoring changes are their own reviewed change class** (separate from
UI work and from adding a suburb). The full contract is in
[`AGENTS.md`](./AGENTS.md) and the per-layer READMEs under `tools/` and
`src/data/dwelling/`.

## The rest of the site

- **Portfolio** (`/`, `/about`, `/projects`): the original purpose.
- **Blog** (`/blog`): content served from a self-hosted API on a Raspberry Pi.
  A serverless visitor counter runs on Lambda + API Gateway + DynamoDB.
- **Prep** (`/prep`): private interview-prep reference pages.

## Develop

```bash
npm install
npm run dev      # vite dev server
npm run test     # vitest: data-layer + router tests
npm run build    # production build
npm run lint     # eslint --fix
```

Python pipeline tests live beside each builder under `tools/` (see
[`tools/README.md`](./tools/README.md)).

## Author

**Simon Parker** · [simostack.com](https://simostack.com) ·
[github.com/Simodalstix](https://github.com/Simodalstix)
