import { createMemoryHistory, createRouter } from 'vue-router'
import { describe, expect, it } from 'vitest'

import { appRoutes, MAIN_NAV_LINKS, RESERVED_TOOL_PATHS, SETTLE_PATHS } from '../routes.js'

function makeRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: appRoutes,
  })
}

describe('Settle routes', () => {
  it('defines the complete main navigation in the required order', () => {
    expect(MAIN_NAV_LINKS.map(({ label }) => label)).toEqual([
      'Home',
      'About',
      'Projects',
      'Settle',
    ])
  })

  it('uses the shared tool namespace and opens the ranking workspace by default', async () => {
    const router = makeRouter()
    await router.push(SETTLE_PATHS.root)

    expect(router.currentRoute.value.name).toBe('Settle')
    expect(router.currentRoute.value.path).toBe(SETTLE_PATHS.workspace)
    expect(router.currentRoute.value.meta).toMatchObject({
      section: 'tool',
      tool: 'settle',
      productName: 'Settle',
      title: 'Settle · Simon Parker',
    })
  })

  it.each([
    ['/dwelling', SETTLE_PATHS.workspace],
    ['/dwelling/overview', SETTLE_PATHS.overview],
    ['/dwelling/decide', SETTLE_PATHS.workspace],
  ])('redirects %s while preserving deep-link state', async (legacyPath, expectedPath) => {
    const router = makeRouter()
    await router.push(`${legacyPath}?area=melbourne-cbd-2br#ranking`)

    expect(router.currentRoute.value.path).toBe(expectedPath)
    expect(router.currentRoute.value.query).toEqual({ area: 'melbourne-cbd-2br' })
    expect(router.currentRoute.value.hash).toBe('#ranking')
  })

  it('reserves Gauge without shipping a route or component', () => {
    expect(RESERVED_TOOL_PATHS).toEqual(['/tool/gauge'])
    expect(appRoutes.some((route) => route.path === '/tool/gauge')).toBe(false)
  })
})
