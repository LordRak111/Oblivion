<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="site-header__container">
      <a href="#top" class="site-header__logo" @click="closeMenu">
        <img
          class="site-header__logo-image"
          src="/images/logo.png"
          alt="Oblivione Space"
        />

        <span class="site-header__logo-text">
          Oblivione Space
        </span>
      </a>

      <button
        class="site-header__burger"
        type="button"
        aria-label="Открыть меню"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        class="site-header__nav"
        :class="{ 'site-header__nav--open': isMenuOpen }"
      >
        <a href="#top" @click="closeMenu">Главная</a>
        <a href="#mission" @click="closeMenu">Миссия</a>
        <a href="#stats" @click="closeMenu">Показатели</a>
        <a href="#directions" @click="closeMenu">Направления</a>
        <a href="#partners" @click="closeMenu">Партнёры</a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: fixed;
  z-index: 50;
  top: 18px;
  left: 0;
  width: 100%;
  pointer-events: none;
}

.site-header__container {
  width: min(1180px, calc(100% - 40px));
  min-height: 68px;
  margin: 0 auto;
  padding: 10px 14px 10px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(132, 179, 255, 0.24);
  border-radius: 999px;
  background: rgba(5, 8, 20, 0.72);
  backdrop-filter: blur(18px);
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.28);
  pointer-events: auto;
}

.site-header__logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #ffffff;
  text-decoration: none;
}

.site-header__logo-image {
  width: auto;
  height: 42px;
  display: block;
  object-fit: contain;
}

.site-header__logo-text {
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.site-header__nav {
  display: flex;
  align-items: center;
  gap: 8px;
}

.site-header__nav a {
  padding: 12px 16px;
  border-radius: 999px;
  color: #b8c7df;
  font-size: 14px;
  font-weight: 700;
  text-decoration: none;
  transition:
    color 0.25s ease,
    background 0.25s ease;
}

.site-header__nav a:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.site-header__burger {
  display: none;
  width: 44px;
  height: 44px;
  border: 1px solid rgba(132, 179, 255, 0.28);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  cursor: pointer;
}

.site-header__burger span {
  display: block;
  width: 18px;
  height: 2px;
  margin: 4px auto;
  border-radius: 999px;
  background: #ffffff;
}

@media (max-width: 900px) {
  .site-header__nav a {
    padding: 10px 12px;
    font-size: 13px;
  }

  .site-header__logo-text {
    font-size: 12px;
  }
}

@media (max-width: 820px) {
  .site-header {
    top: 12px;
  }

  .site-header__container {
    border-radius: 28px;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .site-header__logo-image {
    height: 38px;
  }

  .site-header__burger {
    display: block;
  }

  .site-header__nav {
    width: 100%;
    display: none;
    flex-direction: column;
    align-items: stretch;
    gap: 4px;
    padding-top: 12px;
  }

  .site-header__nav--open {
    display: flex;
  }

  .site-header__nav a {
    padding: 14px 16px;
  }
}

@media (max-width: 480px) {
  .site-header__logo-image {
    height: 34px;
  }

  .site-header__logo-text {
    font-size: 11px;
    letter-spacing: 0.08em;
  }
}
</style>