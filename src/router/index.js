import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/HomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import ProductPage from '../components/ProductPage.vue'
import ProjectsPage from '../pages/ProjectsPage.vue'
import TechnologiesPage from '../pages/TechnologiesPage.vue'
import CareerPage from '../pages/CareerPage.vue'
import NewsPage from '../pages/NewsPage.vue'
import ContactsPage from '../pages/ContactsPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/about', name: 'about', component: AboutPage },
  { path: '/products', name: 'products', component: ProductPage },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/technologies', name: 'technologies', component: TechnologiesPage },
  { path: '/career', name: 'career', component: CareerPage },
  { path: '/news', name: 'news', component: NewsPage },
  { path: '/contacts', name: 'contacts', component: ContactsPage },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router
