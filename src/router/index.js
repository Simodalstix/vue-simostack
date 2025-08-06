import { createRouter, createWebHistory } from 'vue-router'
import RaspBlog from '../views/RaspBlog.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/NewHomeView.vue'),
  },
  {
    path: '/certifications',
    name: 'Certifications',
    component: () => import('../views/CertificationsView.vue'),
  },
  { path: '/blog', name: 'Blog', component: RaspBlog },

  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue'),
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('../views/SkillsView.vue'),
  },
  {
    path: '/projects',
    name: 'Projects',
    component: () => import('../views/ProjectsView.vue'),
  },

  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue'),
  },
  {
    path: '/elephant',
    name: 'Elephant',
    component: () => import('../views/ElephantRoom.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
