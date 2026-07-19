# Copy/paste request for a new suburb batch

## Minimal request

```text
Please onboard these suburbs into /dwelling:

1. [Suburb]
2. [Suburb]
3. [Suburb]
4. [Suburb]
5. [Suburb]
6. [Suburb]
7. [Suburb]
8. [Suburb]
9. [Suburb]
10. [Suburb]

Use the current onboarding contract in tools/dwelling-onboarding/START-HERE.md.
Keep the existing scoring formulas, weights, strategies and gates. Treat each
suburb as a separate record unless a combined catchment is clearly justified.
Choose a credible recurring dwelling product where I have not specified one.
Run a source audit first, then give me one consolidated owner-download list if
anything cannot be fetched or is not already present. Continue autonomously
through integration, QA, tests and build after the required files are available.
The School Locations 2025 CSV and School Zones 2027 ZIP are already present in
tools/dwelling-schools/source/.
```

## Optional detailed request

Add any useful details in this table. Blank cells explicitly delegate the
choice to the onboarding evidence.

| Suburb | Intended product | Preferred station/pocket | Candidate or benchmark | Combine with | Personal context |
| ------ | ---------------- | ------------------------ | ---------------------- | ------------ | ---------------- |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |
|        |                  |                          |                        |              |                  |

## Defaults when details are omitted

- Existing strategies and target address remain unchanged.
- Catchment follows the current app convention, normally station-centred.
- Each suburb receives its own ID and profile unless aggregation is required
  by the product/corridor thesis.
- The agent chooses a product only after checking recurring stock and price
  evidence.
- Expensive suburbs may remain honest benchmarks; they are not discarded just
  because existing gates reject them.
- Thin or non-recurring products produce `BLOCKED_PRODUCT`, not invented data.
- Personal-network, beach, sport and facilities fields remain null/absent when
  they are not applicable or have not been evidenced.
