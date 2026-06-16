<template>
  <header class="site-header">
    <div class="site-header__inner">
      <a href="#home" class="site-header__logo" @click="closeMenu">
        <span>OBLIVIONE SPACE</span>
      </a>

      <button class="site-header__burger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span><span></span><span></span>
      </button>

      <nav class="site-header__nav" :class="{ active: isMenuOpen }">
        <a v-for="item in navItems" :key="item.href" :href="item.href" :class="{ active: activeHash === item.href }" @click="closeMenu">
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const isMenuOpen = ref(false)
const activeHash = ref(window.location.hash || '#home')
const navItems = [
  { label: 'Главная', href: '#home' },
  { label: 'О компании', href: '#about' },
  { label: 'Продукты', href: '#products' },
  { label: 'Проекты', href: '#projects' }
]
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value
const closeMenu = () => isMenuOpen.value = false
const updateHash = () => activeHash.value = window.location.hash || '#home'
onMounted(() => {
  window.addEventListener('hashchange', updateHash)
})
</script>

<style scoped>
/* Твои исходные стили сохраняются здесь */
.site-header { width: 100%; padding: 26px 7vw; background: #050812; position: relative; z-index: 100; }
.site-header__inner { display: flex; align-items: center; justify-content: space-between; border: 1px solid rgba(71, 184, 255, 0.22); border-radius: 999px; background: rgba(8, 14, 29, 0.86); padding: 16px 22px; }
.site-header__nav { display: flex; gap: 10px; }
.site-header__nav a { color: #fff; text-decoration: none; padding: 12px 18px; }
.site-header__nav a.active { color: #ff6b35; }
</style>