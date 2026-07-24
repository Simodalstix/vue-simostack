# Settle safety audit pipeline — start here

This pipeline reads the Crime Statistics Agency (CSA) LGA recorded-offences
workbook and produces an audit candidate Safety model. After explicit owner
approval, its checked-in audit can be promoted into the compact runtime context
used by the Settle Safety criterion.

## Source

Use the official `Recorded offences by LGA - Year Ending Mar 2026` workbook:

- dataset page:
  <https://discover.data.vic.gov.au/dataset/data-tables-recorded-offences>
- official filename:
  `Data_Tables_LGA_Recorded_Offences_Year_Ending_March_2026.xlsx`
- expected SHA-256:
  `0841a888162d93fad9adbe53530a9322abb3786a779af17afdb3a9f8ad98592b`

The owner-supplied local copy may have a browser-added suffix such as `_0`.
The pipeline validates content by SHA-256 and records both the official and
local filenames. Keep the raw workbook outside the repository; do not copy or
rename it into `tools/`.

## Candidate model

The config in `dwelling-safety-config.json` is a reviewable hypothesis, not an
approved live formula:

- 2024, 2025 and 2026 annual periods;
- person harm 50%, residential burglary 30%, vehicle crime 15%, criminal
  damage 5%;
- per-person-year rates;
- comparison of fixed 2021 SAL Census population with LGA-growth-adjusted SAL
  exposure inferred from CSA Table 01;
- 10,000 person-years of cohort-rate empirical-Bayes smoothing;
- average-tie risk percentiles, inverted to a 0–10 candidate Safety score.

Retail theft, fare evasion, deception, drug, public-order, justice-procedure
and commercial-burglary offences are excluded to limit activity-centre and
policing-intensity bias. The limitations remain material: recorded offences
are not all crime, suburb counts have no publisher-supplied suburb rate, and
resident population does not measure visitors to hospitals, stations,
shopping strips or nightlife.

## Run

From the repository root:

```bash
python3 tools/dwelling-safety/build-dwelling-safety.py \
  --source /absolute/path/to/Data_Tables_LGA_Recorded_Offences_Year_Ending_March_2026.xlsx \
  --retrieved-at YYYY-MM-DD
```

The builder uses only the Python standard library. It streams the large XLSX
worksheets rather than loading them into memory. Every record/basket aggregate
retains its contributing Table 03 row numbers and cell rule; the manifest
retains the source workbook SHA-256 and Table 01/Table 03 field mapping.

Generated, tracked review artifacts:

- `generated/dwelling-safety-audit.json`
- `generated/dwelling-safety-qa.csv`
- `generated/dwelling-safety-outliers.md`
- `generated/dwelling-safety-source-manifest.json`

Review `dwelling-safety-outliers.md` and the largest rank deltas in the QA CSV
before considering any runtime adapter.

## Promote the reviewed audit

After the owner has approved the candidate model, generate the browser runtime
context from the checked-in audit and source manifest:

```bash
python3 tools/dwelling-safety/promote-safety-context.py
```

This is intentionally a projection, not a second scoring formula: it preserves
the audit score, basket percentiles, source period and SHA-256 provenance while
omitting the large row-level evidence lists from the web bundle.

## Test

```bash
python3 tools/dwelling-safety/test-dwelling-safety.py
```

The tests cover source-sheet parsing, basket inclusion/exclusion, smoothing,
percentile ties, split-LGA population growth, bounded scoring and checked-in
audit coverage.

## Promotion boundary

Promoting this audit into live Settle scoring is a separate owner-approved
scoring-layer change. It needs:

1. explicit approval of basket definitions, weights, smoothing and population
   adjustment;
2. a generated runtime context dataset and score adapter (now supplied by the
   promotion script above);
3. `decideStrategies.js` and preset changes;
4. UI copy that says `Safety`, explains that 10 means lower relative recorded
   risk, and does not present the score as a probability of victimisation;
5. ranking, null-handling, adapter and regression tests.
