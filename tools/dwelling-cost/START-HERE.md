# `/dwelling` cost pipeline — start here

1. Download the current VGV unit and house suburb workbooks from the official
   Property sales statistics page into `source/`.
2. Install the isolated requirements:

   `python -m pip install -r requirements-cost.txt`

3. From this directory run:

   `python build-dwelling-cost.py`

The default build reuses the app's canonical 70-record suburb target file and
writes `src/data/dwelling/cost/dwelling-cost-context.ts` plus
`generated/dwelling-cost-outliers.md`. Override paths with `--help` options.

Domain is optional. To enrich current one- and two-bedroom unit listing counts
and disclosed asking-price medians, set
`DOMAIN_CLIENT_ID` and `DOMAIN_CLIENT_SECRET` in the shell before running.
Secrets are read only from the environment and are never written to output.

With no VGV workbook present, the command still writes a valid empty dataset;
the app then retains its hand-score fallback.
