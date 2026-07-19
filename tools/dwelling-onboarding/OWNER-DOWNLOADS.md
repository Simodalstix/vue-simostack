# Owner download and file-return guide

This is the escalation sheet for a suburb onboarding batch. Do not download
everything pre-emptively. The agent first resolves the requested suburbs and
checks the repository, local caches and official direct-download options.
The official source pages below were verified on 2026-07-19; the agent must
recheck for a newer edition when a later batch is run.

## Current repository snapshot

As of 2026-07-19:

- the VGV house and unit suburb workbooks are present;
- the ABS Mesh Block population workbook is present;
- the School Locations 2025 CSV and School Zones 2027 ZIP are present in the
  gitignored school source directory;
- the raw ABS General Community Profile workbooks are not retained;
- large greenspace geometry is expected to be downloaded or rebuilt into a
  local cache.

Therefore a new batch will normally need only one ABS workbook per newly
introduced SAL. The agent should still audit every reusable source before
asking the owner to fetch anything manually.

## What you will usually need to supply

### 1. School locations and zones — reusable pair already present

The school pipeline uses these under the gitignored
`tools/dwelling-schools/source/` directory:

1. `dv402-SchoolLocations2025.csv` from the official
   [School Locations 2025 dataset](https://discover.data.vic.gov.au/dataset/school-locations-2025).
2. The ZIP from the official
   [Victorian Government School Zones 2027 resource](https://discover.data.vic.gov.au/dataset/victorian-government-school-zones-2027/resource/5b2a9b83-5635-48d0-85cd-e674e8912c69).

These two files are already present, cover the whole batch and are reusable.
Do not unzip the zone archive. Keep the publisher filenames.

No owner action is required unless a future refresh is deliberate or either
file fails validation.

### 2. ABS General Community Profile workbooks — one per unique SAL

After resolving official SAL codes, the agent will produce a checklist such as:

```text
GCP_SAL21246.xlsx — Ivanhoe — SAL21246
```

Each workbook has this deterministic official URL:

```text
https://www.abs.gov.au/census/find-census-data/community-profiles/2021/SAL<code>/download/GCP_SAL<code>.xlsx
```

The agent should try the official URL first. If network access fails, download
only the listed files and attach them or provide their local paths. Do not
rename them; the importer validates the filename, sheet layout and recorded
SHA-256.

The ABS notes that Community Profile cells include small random adjustments
for confidentiality. Those published values are retained rather than “fixed.”

### 3. VGV house and unit workbooks — only for a refresh

The repository currently contains the owner-downloaded house and unit suburb
workbooks under `tools/dwelling-cost/source/`. No new download is required when
the requested suburbs are covered by those files.

If a refresh or missing suburb requires newer evidence, download the official
house and unit suburb spreadsheets from the
[Land Victoria publications/property sales statistics page](https://www.land.vic.gov.au/land-registration/publications)
and return the original `.xlsx` files. The cost builder parses files; it does
not scrape the publisher site.

Domain enrichment is optional. Never send credentials in a document or commit
them. If used, set `DOMAIN_CLIENT_ID` and `DOMAIN_CLIENT_SECRET` only in the
local shell environment.

## What you normally do not need to download

| Source                                  | Normal acquisition                                               | Owner action only when                                            |
| --------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------- |
| ABS SAL and Mesh Block geometry         | Greenspace pipeline download/cache                               | the pipeline cannot access ABS and no cache exists                |
| ABS Mesh Block population counts        | already vendored under `tools/dwelling-greenspace/source/`       | the checked hash fails                                            |
| VPA open-space polygons                 | pipeline direct download                                         | the official endpoint is unavailable                              |
| PARKRES                                 | agent fetches the official WFS/bounded GeoJSON                   | the WFS is blocked and a browser download is required             |
| Locality polygons                       | agent fetches the official Vicmap WFS and runs `add-locality.py` | the WFS is blocked                                                |
| School annual reports/strength evidence | agent researches official VRQA reports after zone resolution     | a report requires manual browser access                           |
| Commute observations                    | agent researches using the repository protocol                   | you want to replace a provisional result with your own timed trip |
| Safety/context sources                  | agent researches and cites the official source                   | a bulk source requires an owner-only download                     |

PARKRES is a continually updated official dataset. When manual supply is
needed, use the official
[PARKRES dataset page](https://discover.data.vic.gov.au/dataset/parks-and-conservation-reserves-parkres)
and prefer SHP, GDB or WFS/GeoJSON. The pipeline uses it only as a major-park
and nature-corridor supplement.

## How to return files

Use either method:

1. Attach the original files to the conversation and state which batch they
   belong to; or
2. Place them in a local directory and provide the absolute path.

For every file, preserve the original filename and include the publisher page
or download date if it is not obvious. The agent will inspect type, sheet/layer
names and hashes before using it.

Raw source files, caches, secrets and browser downloads are not committed
unless the repository already intentionally vendors that source. Generated
app outputs, QA reports and source manifests are committed according to the
existing pipeline pattern.

## Consolidated request format the agent should send you

```text
Owner download required for batch: <batch name>

Required now:
- <filename> — <publisher> — <official page> — <why the local copy is needed>

Already present or agent-fetchable:
- <source> — no owner action

Return by attaching the original files or giving their absolute local paths.
Do not rename or unzip them.
```
