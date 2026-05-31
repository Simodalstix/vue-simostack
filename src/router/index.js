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
    path: '/prep',
    name: 'Prep',
    component: () => import('../views/PrepView.vue'),
  },
  {
    path: '/clearance',
    name: 'Clearance',
    component: () => import('../views/ClearanceView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
