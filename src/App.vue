<template>
  <div>
    <SiteHeader />

    <HomePage v-if="currentPage === 'home'" />
    <ProductPage v-if="currentPage === 'products'" />
    <ProjectsPage v-if="currentPage === 'projects'" />
    <AboutPage v-if="currentPage === 'about'" />

    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import ProductPage from './components/ProductPage.vue'
import HomePage from './pages/HomePage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'
import AboutPage from './pages/AboutPage.vue'

const currentPage = ref('home')

const updatePage = () => {
  const hash = window.location.hash.replace('#', '')

  if (hash === 'products') {
    currentPage.value = 'products'
  } else if (hash === 'projects') {
    currentPage.value = 'projects'
  } else if (hash === 'about') {
    currentPage.value = 'about'
  } else {
    currentPage.value = 'home'
  }
}

onMounted(() => {
  updatePage()
  window.addEventListener('hashchange', updatePage)
})
</script>