<template>
  <header class="site-header">
    <div class="site-header__inner">
      <a href="#home" class="site-header__logo" @click="closeMenu">
        <img src="/images/logo.png" alt="Oblivione Space" />
        <span>OBLIVIONE SPACE</span>
      </a>

      <button
        class="site-header__burger"
        type="button"
        :class="{ active: isMenuOpen }"
        @click="toggleMenu"
        aria-label="Открыть меню"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="site-header__nav" :class="{ active: isMenuOpen }">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          :class="{ active: activeHash === item.href }"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMenuOpen = ref(false)
const activeHash = ref(window.location.hash || '#home')

const navItems = [
  {
    label: 'Главная',
    href: '#home'
  },
  {
    label: 'О компании',
    href: '#home'
  },
  {
    label: 'Продукты',
    href: '#products'
  },
  {
    label: 'Проекты',
    href: '#projects'
  }
]

const updateActiveHash = () => {
  activeHash.value = window.location.hash || '#home'
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

onMounted(() => {
  updateActiveHash()
  window.addEventListener('hashchange', updateActiveHash)
})

onBeforeUnmount(() => {
  window.removeEventListener('hashchange', updateActiveHash)
})
</script>

<style scoped>
.site-header {
  width: 100%;
  padding: 26px 7vw;
  position: relative;
  z-index: 100;
  background: #050812;
}

.site-header__inner {
  width: min(1320px, 100%);
  margin: 0 auto;
  padding: 16px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border: 1px solid rgba(71, 184, 255, 0.22);
  border-radius: 999px;
  background: rgba(8, 14, 29, 0.86);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.24);
}

.site-header__logo {
  display: flex;
  align-items: center;
  gap: 14px;
  color: #ffffff;
  text-decoration: none;
  flex-shrink: 0;
}

.site-header__logo img {
  width: 46px;
  height: 46px;
  object-fit: contain;
}

.site-header__logo span {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.12em;
  white-space: nowrap;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 10px;
}

.site-header__nav a {
  padding: 12px 18px;
  border: 1px solid transparent;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.76);
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  transition: 0.25s ease;
}

.site-header__nav a:hover {
  color: #ffffff;
  border-color: rgba(71, 184, 255, 0.35);
  background: rgba(71, 184, 255, 0.08);
}

.site-header__nav a.active {
  color: #ffffff;
  border-color: rgba(71, 184, 255, 0.65);
  background: linear-gradient(135deg, rgba(0, 119, 255, 0.32), rgba(255, 122, 24, 0.18));
}

.site-header__burger {
  width: 46px;
  height: 46px;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5px;
  border: 1px solid rgba(71, 184, 255, 0.32);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.045);
  cursor: pointer;
}

.site-header__burger span {
  width: 18px;
  height: 2px;
  border-radius: 999px;
  background: #ffffff;
  transition: 0.25s ease;
}

.site-header__burger.active span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.site-header__burger.active span:nth-child(2) {
  opacity: 0;
}

.site-header__burger.active span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 980px) {
  .site-header {
    padding: 18px 24px;
  }

  .site-header__inner {
    position: relative;
    border-radius: 28px;
  }

  .site-header__burger {
    display: flex;
  }

  .site-header__nav {
    width: 100%;
    padding: 16px;
    display: none;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    top: calc(100% + 12px);
    left: 0;
    border: 1px solid rgba(71, 184, 255, 0.22);
    border-radius: 24px;
    background: rgba(8, 14, 29, 0.96);
    backdrop-filter: blur(14px);
  }

  .site-header__nav.active {
    display: flex;
  }

  .site-header__nav a {
    width: 100%;
    text-align: center;
  }
}

@media (max-width: 520px) {
  .site-header {
    padding: 14px;
  }

  .site-header__inner {
    padding: 12px 14px;
  }

  .site-header__logo img {
    width: 38px;
    height: 38px;
  }

  .site-header__logo span {
    font-size: 12px;
    letter-spacing: 0.08em;
  }
}
</style>