---
name: verify
description: Build, launch and drive vue-simostack to observe a change working at runtime.
---

# Verifying vue-simostack changes

Vite + Vue 3 SPA. No auth needed for `/tool/settle` routes in dev; `/clearance` is gated.

## Launch

```bash
npm run dev -- --port 5199 &   # ready in ~2s; check: curl -s -o /dev/null -w "%{http_code}" http://localhost:5199/tool/settle/decide
```

## Drive (headless browser)

No playwright package in the repo, but `playwright-core` (transitive) is in
node_modules and matching browsers live in `~/.cache/ms-playwright/`.

Gotcha: the full `chromium-*/chrome-linux64/chrome` binary fails on this WSL2
box with `libnspr4.so: cannot open shared object file`. Use the
**chrome-headless-shell** binary instead, with NSS libs extracted locally
(no root needed):

```bash
cd <scratchpad> && mkdir -p libs && cd libs
curl -sO http://archive.ubuntu.com/ubuntu/pool/main/n/nspr/libnspr4_4.35-1.1build1_amd64.deb
curl -sO http://archive.ubuntu.com/ubuntu/pool/main/n/nss/libnss3_3.98-1ubuntu0.2_amd64.deb
for d in *.deb; do dpkg-deb -x $d extracted/; done
```

Script skeleton (ESM, run with `LD_LIBRARY_PATH=$PWD/libs/extracted/usr/lib/x86_64-linux-gnu node drive.mjs`):

```js
import { chromium } from '/home/simoda/projects/vue-simostack/node_modules/playwright-core/index.mjs'
const browser = await chromium.launch({
  executablePath:
    process.env.HOME +
    '/.cache/ms-playwright/chromium_headless_shell-1228/chrome-headless-shell-linux64/chrome-headless-shell',
  headless: true,
})
const page = await browser.newPage({ viewport: { width: 1600, height: 1100 } })
await page.goto('http://localhost:5199/tool/settle/decide', { waitUntil: 'networkidle' })
await page.waitForTimeout(2500) // async maplibre chunk + canvas settle
```

Check the `chromium_headless_shell-*` version in `~/.cache/ms-playwright/` and
match it to `node_modules/playwright-core/package.json` version if either moves.

## Flows worth driving in Settle

- Ranked suburb rows: `[role=listbox] li button`; suburb name in `.truncate`,
  score in `.text-right`.
- Strategy cards and criterion toggles are plain buttons matched by visible
  text (e.g. `3BR Family`, `Cost ×2`).
- Clicking a ranked row opens the suburb profile card over the map ("Suburb
  profile" header appears); "map view" closes it. Note "Fit score" matches
  ~3 elements on the page; assert on "Suburb profile" count instead.
- Collect `pageerror` and console errors; the page should produce none.
