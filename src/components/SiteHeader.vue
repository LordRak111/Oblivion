<template>
  <header class="site-header">
    <div class="site-header__container">
      <router-link to="/" class="site-header__logo" @click="closeMenu">
        <img
          class="site-header__logo-image"
          src="/images/logo.png"
          alt="Oblivione Space"
        />
        <span class="site-header__logo-text">Oblivione Space</span>
      </router-link>

      <!-- Кнопка созвездия -->
      <button
        class="constellation-btn"
        type="button"
        aria-label="Открыть меню"
        :aria-expanded="isOpen"
        @click="toggleMenu"
        :class="{ active: isOpen }"
      >
        <div class="constellation-icon">
          <svg viewBox="0 0 40 40" class="icon-svg">
            <circle cx="8" cy="8" r="2" fill="currentColor" />
            <circle cx="20" cy="12" r="2" fill="currentColor" />
            <circle cx="32" cy="6" r="2" fill="currentColor" />
            <circle cx="16" cy="24" r="2" fill="currentColor" />
            <circle cx="28" cy="28" r="2" fill="currentColor" />
            <circle cx="10" cy="34" r="2" fill="currentColor" />
            <line x1="8" y1="8" x2="20" y2="12" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="20" y1="12" x2="32" y2="6" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="20" y1="12" x2="16" y2="24" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="16" y1="24" x2="28" y2="28" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="28" y1="28" x2="10" y2="34" stroke="currentColor" stroke-width="1" opacity="0.5" />
            <line x1="16" y1="24" x2="10" y2="34" stroke="currentColor" stroke-width="1" opacity="0.5" />
          </svg>
        </div>
        <span class="btn-text">Меню</span>
      </button>
    </div>
  </header>

  <!-- Созвездие-навигация (Overlay) -->
  <Teleport to="body">
    <transition name="constellation">
      <div v-if="isOpen" class="constellation-overlay" @click.self="closeMenu">
        <!-- Фоновое затемнение -->
        <div class="overlay-bg"></div>

        <!-- SVG созвездия -->
        <svg class="constellation-svg" viewBox="0 0 1000 700" preserveAspectRatio="xMidYMid meet">
          <!-- Линии связи (соединяют все 9 звёзд для красоты) -->
          <g class="constellation-lines" stroke-linecap="round">
            <line x1="820" y1="120" x2="700" y2="80" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="700" y1="80" x2="580" y2="160" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="580" y1="160" x2="580" y2="280" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="580" y1="280" x2="300" y2="320" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="580" y1="280" x2="780" y2="340" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="580" y1="280" x2="350" y2="500" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="780" y1="340" x2="750" y2="500" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="350" y1="500" x2="150" y2="580" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
            <line x1="350" y1="500" x2="750" y2="500" stroke="rgba(255,255,255,0.2)" stroke-width="2" />
          </g>

          <!-- Анимированные звёзды (точки) -->
          <g class="constellation-stars">
            <circle cx="820" cy="120" r="6" fill="#ff6b35" class="star-main">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="700" cy="80" r="5" fill="#ffffff" class="star-normal">
              <animate attributeName="r" values="5;6;5" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="580" cy="160" r="5" fill="#ffffff" class="star-normal">
              <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="580" cy="280" r="6" fill="#00d4ff" class="star-main">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="300" cy="320" r="4" fill="#ffffff" class="star-normal">
              <animate attributeName="r" values="4;5;4" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="780" cy="340" r="5" fill="#ffffff" class="star-normal">
              <animate attributeName="r" values="5;6;5" dur="2.2s" repeatCount="indefinite" />
            </circle>
            <circle cx="350" cy="500" r="4" fill="#ffffff" class="star-normal">
              <animate attributeName="r" values="4;5;4" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="750" cy="500" r="6" fill="#00d4ff" class="star-main">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
            <circle cx="150" cy="580" r="6" fill="#ff6b35" class="star-main">
              <animate attributeName="r" values="6;8;6" dur="2s" repeatCount="indefinite" />
            </circle>
          </g>

          <!-- Свечение вокруг главных звёзд -->
          <circle cx="820" cy="120" r="20" fill="rgba(255,107,53,0.15)" class="star-glow" />
          <circle cx="580" cy="280" r="20" fill="rgba(0,212,255,0.15)" class="star-glow" />
          <circle cx="750" cy="500" r="20" fill="rgba(0,212,255,0.15)" class="star-glow" />
          <circle cx="150" cy="580" r="20" fill="rgba(255,107,53,0.15)" class="star-glow" />

          <!-- Кликабельные зоны для навигации (8 активных + 1 декоративная) -->
          <g class="nav-stars">
            <!-- Главная -->
            <g class="nav-node" @click="navigate('/')">
              <circle cx="820" cy="120" r="30" fill="transparent" class="nav-hitbox" />
              <text x="820" y="115" text-anchor="middle" class="nav-label">Главная</text>
            </g>

            <!-- О компании -->
            <g class="nav-node" @click="navigate('/about')">
              <circle cx="700" cy="80" r="30" fill="transparent" class="nav-hitbox" />
              <text x="700" y="75" text-anchor="middle" class="nav-label">О компании</text>
            </g>

            <!-- Проекты -->
            <g class="nav-node" @click="navigate('/projects')">
              <circle cx="580" cy="160" r="30" fill="transparent" class="nav-hitbox" />
              <text x="580" y="155" text-anchor="middle" class="nav-label">Проекты</text>
            </g>

            <!-- Технологии -->
            <g class="nav-node" @click="navigate('/technologies')">
              <circle cx="580" cy="280" r="30" fill="transparent" class="nav-hitbox" />
              <text x="580" y="275" text-anchor="middle" class="nav-label">Технологии</text>
            </g>

            <!-- Карьера -->
            <g class="nav-node" @click="navigate('/career')">
              <circle cx="300" cy="320" r="30" fill="transparent" class="nav-hitbox" />
              <text x="300" y="315" text-anchor="middle" class="nav-label">Карьера</text>
            </g>

            <!-- Продукты и услуги (ваш готовый каталог из components/ProductsPage.vue) -->
            <g class="nav-node" @click="navigate('/products')">
              <circle cx="780" cy="340" r="30" fill="transparent" class="nav-hitbox" />
              <text x="780" y="335" text-anchor="middle" class="nav-label">Продукты и услуги</text>
            </g>

            <!-- Контакты -->
            <g class="nav-node" @click="navigate('/contacts')">
              <circle cx="350" cy="500" r="30" fill="transparent" class="nav-hitbox" />
              <text x="350" y="495" text-anchor="middle" class="nav-label">Контакты</text>
            </g>

            <!-- Новости -->
            <g class="nav-node" @click="navigate('/news')">
              <circle cx="750" cy="500" r="30" fill="transparent" class="nav-hitbox" />
              <text x="750" y="530" text-anchor="middle" class="nav-label">Новости</text>
            </g>

            <!-- Декоративная звезда (без действия, для красоты созвездия) -->
            <g class="nav-node decorative">
              <circle cx="150" cy="580" r="30" fill="transparent" class="nav-hitbox" />
              <text x="150" y="610" text-anchor="middle" class="nav-label">✦</text>
            </g>
          </g>
        </svg>

        <nav class="mobile-nav" aria-label="Основная навигация">
          <router-link v-for="item in navigation" :key="item.path" :to="item.path" @click="closeMenu">
            <span aria-hidden="true">✦</span>
            {{ item.label }}
          </router-link>
        </nav>

        <!-- Кнопка закрытия -->
        <button class="close-btn" type="button" aria-label="Закрыть меню" @click="closeMenu">✕</button>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)
const navigation = [
  { path: '/', label: 'Главная' },
  { path: '/about', label: 'О компании' },
  { path: '/products', label: 'Продукты и услуги' },
  { path: '/projects', label: 'Проекты' },
  { path: '/technologies', label: 'Технологии' },
  { path: '/career', label: 'Карьера' },
  { path: '/news', label: 'Новости' },
  { path: '/contacts', label: 'Контакты' },
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
}

const closeMenu = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const navigate = (path) => {
  router.push(path)
  closeMenu()
}

const closeOnEscape = (event) => {
  if (event.key === 'Escape') closeMenu()
}

onMounted(() => window.addEventListener('keydown', closeOnEscape))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', closeOnEscape)
  document.body.style.overflow = ''
})
</script>

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
  min-height: 66px;
  margin: 0 auto;
  padding: 9px 14px 9px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(132, 179, 255, 0.24);
  border-radius: 999px;
  background: rgba(5, 8, 20, 0.74);
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
  height: 40px;
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

/* Кнопка созвездия */
.constellation-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(132, 179, 255, 0.28);
  border-radius: 999px;
  color: #ffffff;
  cursor: pointer;
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.constellation-btn:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 159, 67, 0.5);
  box-shadow: 0 0 22px rgba(255, 159, 67, 0.16);
}

.constellation-btn.active {
  background: rgba(255, 107, 53, 0.15);
  border-color: #ff6b35;
}

.constellation-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-svg {
  width: 100%;
  height: 100%;
  color: #ffffff;
}

.btn-text {
  letter-spacing: 0.05em;
}

/* Overlay созвездия */
.constellation-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay-bg {
  position: absolute;
  inset: 0;
  background: rgba(5, 8, 20, 0.95);
  backdrop-filter: blur(20px);
}

.constellation-svg {
  position: relative;
  z-index: 2;
  width: 90%;
  max-width: 1000px;
  height: auto;
  max-height: 90vh;
}

.mobile-nav {
  display: none;
}

.constellation-lines line {
  transition: stroke 0.3s ease;
}

.star-glow {
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

.nav-node {
  cursor: pointer;
  pointer-events: all;
}

/* Декоративная звезда — без hover-эффекта */
.nav-node.decorative {
  cursor: default;
}

.nav-hitbox {
  fill: transparent;
}

.nav-node:hover .nav-hitbox {
  fill: rgba(0, 212, 255, 0.16);
}

.nav-label {
  fill: #ffffff;
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 14px;
  font-weight: 700;
  pointer-events: all;
  cursor: pointer;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
}

.nav-node:hover .nav-label {
  fill: #62efff;
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(132, 179, 255, 0.3);
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
  z-index: 3;
  transition: all 0.3s ease;
}

.close-btn:hover {
  background: rgba(255, 107, 53, 0.2);
  border-color: #ff6b35;
  transform: rotate(90deg);
}

/* Анимация появления/скрытия */
.constellation-enter-active,
.constellation-leave-active {
  transition: opacity 0.4s ease;
}

.constellation-enter-active .constellation-svg,
.constellation-leave-active .constellation-svg {
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.constellation-enter-from,
.constellation-leave-to {
  opacity: 0;
}

.constellation-enter-from .constellation-svg,
.constellation-leave-to .constellation-svg {
  transform: scale(0.9);
  opacity: 0;
}

@media (max-width: 768px) {
  .site-header {
    top: 10px;
  }

  .site-header__container {
    width: calc(100% - 20px);
    min-height: 58px;
    padding: 7px 9px 7px 12px;
  }

  .site-header__logo-image {
    height: 34px;
  }

  .site-header__logo-text {
    font-size: 11px;
    letter-spacing: 0.07em;
  }

  .constellation-btn {
    gap: 6px;
    padding: 7px 12px 7px 7px;
  }

  .constellation-icon {
    width: 30px;
    height: 30px;
  }

  .constellation-svg {
    display: none;
  }

  .mobile-nav {
    position: relative;
    z-index: 2;
    width: min(520px, calc(100% - 28px));
    max-height: calc(100dvh - 110px);
    overflow-y: auto;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    padding: 72px 0 24px;
  }

  .mobile-nav a {
    min-height: 72px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px;
    border: 1px solid rgba(132, 179, 255, 0.24);
    border-radius: 18px;
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    font-weight: 750;
    text-decoration: none;
  }

  .mobile-nav a.router-link-active {
    border-color: rgba(0, 212, 255, 0.8);
    background: rgba(0, 212, 255, 0.13);
  }

  .mobile-nav span {
    color: #62efff;
    text-shadow: 0 0 12px rgba(98, 239, 255, 0.7);
  }

  .nav-label {
    font-size: 11px;
  }

  .close-btn {
    top: 18px;
    right: 14px;
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 430px) {
  .site-header__logo-text,
  .btn-text {
    display: none;
  }

  .constellation-btn {
    padding-right: 7px;
  }

  .mobile-nav {
    grid-template-columns: 1fr;
  }

  .mobile-nav a {
    min-height: 58px;
  }
}
</style>
