# VGV source workbooks

Place owner-downloaded Valuer-General Victoria annual house/unit suburb-sales
spreadsheets here. The build script reads `.xlsx`, `.xls`, and tidy
`.csv` files; it never scrapes the publisher site.

Do not place Domain credentials here. Optional Domain enrichment reads
`DOMAIN_CLIENT_ID` and `DOMAIN_CLIENT_SECRET` from the environment.

Bedroom-specific settled evidence can be added as a tidy `.csv` or `.xlsx`
table with these columns:

`Suburb, Property type, Bedrooms, Year, Median price, No. of sales`

Use `unit` or `house` for property type and an integer bedroom count. These
rows are stored separately from the VGV all-bedroom medians; never estimate a
1BR or 2BR value by silently relabelling the all-unit figure.
