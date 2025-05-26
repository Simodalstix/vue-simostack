import { createRouter, createWebHistory } from 'vue-router'
import RaspBlog from '../views/RaspBlog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },
  { path: '/blog', name: 'Blog', component: RaspBlog },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
