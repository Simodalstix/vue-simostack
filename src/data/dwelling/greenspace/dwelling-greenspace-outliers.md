# Settle Greenspace Outliers

Methodology version: `greenspace-access-v1`  
Build retrieved at: `2026-07-16`

## Automated QA flags

- `gardenvale-house` (20-record Wednesday batch, built 2026-07-22)
  Status: accepted
  Reason: `highComponentSpread` is structural, not a data bug. Local access is maxed (`10.0`, coverage `100.0%`) while nature-corridor access is `2.8329`: the population-weighted median eligible nature-corridor distance is `1,842 m`. The very small Gardenvale SAL is inland from the foreshore and has no river or creek corridor, matching the accepted inland pattern for St Kilda East, Windsor/Prahran and Armadale.

- `st-kilda-east-2br` (24-record batch, built 2026-07-21)
  Status: accepted
  Reason: `highComponentSpread` is structural, not a data bug. Local access is strong (`9.5493`, coverage `90.7%`) while nature-corridor access is `1.8991`: the nearest eligible corridor is the Elwood Canal reserve at a population-weighted median of `2,046 m`. St Kilda East is inland with no river, creek or foreshore corridor of its own, consistent with the same pattern accepted for `inner-windsor-prahran-2br` and `armadale-2br`.

- `cremorne-2br`  
  Status: retained with a caveat  
  Reason: represented residential population is `1,540` versus target `2,158` (`71.4%`). Cremorne is a small mixed-use SAL and still has `17` residential mesh-block samples, so the score is usable but should not be treated as population-complete.

- `inner-windsor-prahran-2br`  
  Status: accepted  
  Reason: `highComponentSpread` is structural, not a data bug. Local access is effectively maxed, while nature-corridor access is materially weaker because the closest foreshore/river corridors are much farther away.

- `armadale-2br`  
  Status: accepted  
  Reason: `highComponentSpread` is structural. Armadale has strong nearby parks but weak nature-corridor proximity, which is consistent with the geography after excluding golf courses and other non-eligible land.

## Manual review set

- `clifton-hill-2br`: accepted. Result: `9.9123` overall; represented population coverage `98.9%`.
  Notes: Darling Gardens, Yarra Bend and the Merri/Yarra corridor support the near-ceiling result. The generated record has no automated review flag.

- `doncaster-villa`: accepted. Result: `9.6298` overall; represented population coverage `98.2%`.
  Notes: Ruffey Lake Park, Koonung Creek and the suburb's distributed local reserves support the result. The generated record has no automated review flag.

- `donnybrook-house-land`  
  Status: retained with a caveat  
  Result: `4.0` overall; local access `2.7858`  
  Notes: score is directionally plausible for an outer growth edge, but the 2019 VPA base layer likely undercounts newer local parks. PARKRES already contributes the larger reserve context; local-open-space coverage remains conservative.

- `craigieburn-townhouse`  
  Status: accepted  
  Result: `9.4502` overall  
  Notes: high result is driven by large eligible reserves and corridors (`Craigieburn Grassland`, `Mount Ridley`, `Malcolm Creek`), not by excluded transport buffers or private land.

- `growth-corridor-stress-test`  
  Status: retained with a caveat  
  Result: `8.7294` overall; local coverage `78.4%`  
  Notes: major/nature access is strong via large reserve systems, but local-open-space coverage may still be undercounted by the stale VPA layer in newer estates.

- `st-kilda-2br`  
  Status: accepted  
  Result: `9.5566` overall  
  Notes: near-max local and major-park access is justified by Albert Park and foreshore access. Nature is strong but not as extreme as Elwood/Middle Park because the median corridor distance is still materially longer.

- `elwood-2br`  
  Status: accepted  
  Result: `9.8636` overall  
  Notes: foreshore + Elsternwick/Elwood park access support the score.

- `middle-park-2br`  
  Status: accepted  
  Result: `9.9742` overall  
  Notes: Albert Park plus immediate foreshore access justify a near-ceiling result.

- `chelsea-2br`  
  Status: accepted  
  Result: `9.5369` overall  
  Notes: wetlands + foreshore access are strong; local coverage is lower than Bonbeach, which explains the split.

- `bonbeach-2br`  
  Status: accepted  
  Result: `9.9764` overall  
  Notes: the score is extremely high but consistent with foreshore, wetlands and Patterson River frontage access.

- `burnley-2br`  
  Status: accepted  
  Result: `10.0` overall  
  Notes: Burnley Park, Kooyong Park and the Yarra corridor produce genuine maxed access after exclusions.

- `inner-richmond-2br`  
  Status: accepted  
  Result: `9.0544` overall  
  Notes: high but not extreme; local coverage is only `87.3%`, which keeps Richmond below the coastal and river-edge leaders.

- `footscray-station-2br`  
  Status: accepted  
  Result: `9.3249` overall  
  Notes: strong Maribyrnong corridor access survives the transport-reservation exclusions, so the score remains credible.

- `spotswood-2br`  
  Status: accepted  
  Result: `9.8398` overall  
  Notes: nearby access to Westgate Park, Newport Lakes, the Yarra and the Maribyrnong legitimately pushes this toward the top tier.

- `albert-park-2br`  
  Status: accepted  
  Result: `9.6537` overall  
  Notes: Albert Park, Albert Park Lake and foreshore access support the result.

## Highest five

- `inner-abbotsford-2br` at `9.9773`  
  Status: accepted  
  Notes: Yarra Bend + Yarra frontage access justify the near-max score.

- `bonbeach-2br` at `9.9764`  
  Status: accepted

- `burnley-2br` at `10.0`  
  Status: accepted

- `middle-park-2br` at `9.9742`  
  Status: accepted

- `clifton-hill-2br` at `9.9123`
  Status: accepted

## Lowest five

- `inner-se-apartment-corridor` at `7.9774`  
  Status: accepted  
  Notes: respectable park access, but materially weaker nature-corridor access than the leading suburbs.

- `malvern-2br` at `8.0047`  
  Status: accepted

- `toorak-2br` at `7.5852`  
  Status: accepted  
  Notes: lower public local-open-space coverage is plausible in a large-lot, private-garden suburb.

- `armadale-2br` at `6.4139`  
  Status: accepted

- `donnybrook-house-land` at `3.9739`  
  Status: retained with a caveat

## Classification corrections applied before review

- Excluded `Golf course`, `Race course`, `Median park`, `Green buffer`, transport reservations, private land, restricted land, and water-only non-coastal polygons from the local-access layer.
- Filtered PARKRES supplementation to reserve/park types only, excluding marine sanctuaries, port/coastal facilities, education areas, proposed reserves, and generic `OTHER` records.
- No suburb required a hand-edited score after these classification changes.
