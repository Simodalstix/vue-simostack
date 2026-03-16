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
    path: '/projects-v2',
    name: 'ProjectsV2',
    component: () => import('../views/ProjectsV2.vue'),
  },

  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
