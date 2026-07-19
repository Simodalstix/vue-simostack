import { createRouter, createWebHistory } from 'vue-router'
import { appRoutes } from './routes.js'

export { appRoutes } from './routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes,
})

router.afterEach((to) => {
  if (typeof document !== 'undefined') document.title = to.meta.title || 'Simon Parker'
})

export default router
