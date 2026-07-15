import { createRouter, createWebHistory } from 'vue-router'
import RaspBlog from '../views/RaspBlog.vue'

export const appRoutes = [
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
  {
    path: '/dwelling',
    component: () => import('../views/dwelling/DwellingShell.vue'),
    redirect: '/dwelling/overview',
    meta: {
      section: 'dwelling',
    },
    children: [
      {
        path: 'overview',
        name: 'DwellingOverview',
        component: () => import('../components/dwelling/OverviewPage.vue'),
      },
      {
        path: 'decide',
        name: 'DwellingDecide',
        component: () => import('../views/dwelling/DwellingDecideView.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: appRoutes,
})

export default router
