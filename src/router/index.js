import { createRouter, createWebHistory } from 'vue-router'
import RaspBlog from '../views/RaspBlog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue'),
  },

  { path: '/blog', name: 'Blog', component: RaspBlog },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
  },
  {
    path: '/prep/stars',
    name: 'PrepStars',
    component: () => import('../views/prep/StarsView.vue'),
  },
  {
    path: '/prep/stars/:id',
    name: 'PrepStarDetail',
    component: () => import('../views/prep/StarDetailView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
