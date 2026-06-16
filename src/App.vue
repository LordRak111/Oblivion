<template>
  <div id="app">
    <SiteHeader />
    
    <component :is="currentPageComponent" />
    
    <SiteFooter />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
// Временно закомментировано, так как файл ProductPage.vue отсутствует локально:
// import ProductPage from './pages/ProductPage.vue'
import ProjectsPage from './pages/ProjectsPage.vue'

const hash = ref(window.location.hash.replace('#', '') || 'home')

const updateHash = () => {
  hash.value = window.location.hash.replace('#', '') || 'home'
}

onMounted(() => window.addEventListener('hashchange', updateHash))
onUnmounted(() => window.removeEventListener('hashchange', updateHash))

const currentPageComponent = computed(() => {
  const pages = {
    home: HomePage,
    about: AboutPage,
    // Временно исключено из роутинга, чтобы избежать ошибок сборщика:
    // products: ProductPage,
    projects: ProjectsPage
  }
  return pages[hash.value] || HomePage
})
</script>