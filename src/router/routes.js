import RaspBlog from '../views/RaspBlog.vue'

export const SETTLE_PATHS = {
  root: '/tool/settle',
  overview: '/tool/settle/overview',
  workspace: '/tool/settle/decide',
}

// Reserved for the future property-listing benchmarking tool. There is
// deliberately no route or component for Gauge yet.
export const RESERVED_TOOL_PATHS = ['/tool/gauge']

export const MAIN_NAV_LINKS = [
  { name: 'Home', label: 'Home', exact: true },
  { name: 'About', label: 'About', exact: false },
  { name: 'Projects', label: 'Projects', exact: false },
  { name: 'Settle', label: 'Settle', exact: false, tool: 'settle' },
]

const redirectPreservingLocation = (path) => (to) => ({
  path,
  query: to.query,
  hash: to.hash,
})

export const appRoutes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Simon Parker' },
  },
  {
    path: '/blog',
    name: 'Blog',
    component: RaspBlog,
    meta: { title: 'Blog · Simon Parker' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'About · Simon Parker' },
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
    meta: { title: 'Projects · Simon Parker' },
  },
  {
    path: '/prep',
    name: 'Prep',
    component: () => import('../views/PrepView.vue'),
    meta: { title: 'Prep · Simon Parker' },
  },
  {
    path: '/clearance',
    name: 'Clearance',
    component: () => import('../views/ClearanceView.vue'),
    meta: { title: 'Clearance · Simon Parker' },
  },
  {
    path: SETTLE_PATHS.root,
    component: () => import('../views/dwelling/DwellingShell.vue'),
    redirect: redirectPreservingLocation(SETTLE_PATHS.workspace),
    meta: {
      section: 'tool',
      tool: 'settle',
      productName: 'Settle',
      title: 'Settle · Simon Parker',
    },
    children: [
      {
        path: 'overview',
        name: 'SettleOverview',
        component: () => import('../components/dwelling/OverviewPage.vue'),
      },
      {
        path: 'decide',
        name: 'Settle',
        component: () => import('../views/dwelling/DwellingDecideView.vue'),
      },
    ],
  },
  {
    path: '/dwelling',
    redirect: redirectPreservingLocation(SETTLE_PATHS.root),
  },
  {
    path: '/dwelling/overview',
    redirect: redirectPreservingLocation(SETTLE_PATHS.overview),
  },
  {
    path: '/dwelling/decide',
    redirect: redirectPreservingLocation(SETTLE_PATHS.workspace),
  },
]
