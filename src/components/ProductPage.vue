<template>
  <div class="universal-cosmos">
    <div class="main-wrap">
      <div class="content-area">
        <!-- ХЕРО-СЕКЦИЯ -->
        <section class="hero-super">
          <div class="hero-text">
            <h1>КОСМИЧЕСКИЙ <span class="glow">КАТАЛОГ</span></h1>
            <p>Ракеты, компоненты и запуски — всё в одном месте</p>
            <div class="countdown">
              <div>Ближайший запуск через:</div>
              <div class="timer">{{ days }}д {{ hours }}ч {{ minutes }}м {{ seconds }}с</div>
            </div>
          </div>
          <div class="hero-stats">
            <div class="stat" v-for="stat in bigStats" :key="stat.label">
              <span class="num">{{ stat.value }}</span>
              <span class="lab">{{ stat.label }}</span>
            </div>
          </div>
        </section>

        <!-- Поиск + фильтры -->
        <div class="toolbar">
          <div class="search-area">
            <i class="fas fa-search"></i>
            <input v-model="searchQuery" placeholder="Поиск ракет, компонентов...">
          </div>
          <div class="filter-group">
            <button v-for="cat in allCategories" :key="cat" class="filter-btn" :class="{ active: activeCat === cat }" @click="activeCat = cat">{{ cat }}</button>
            <button class="filter-btn cart-btn" @click="cartOpen = !cartOpen"><i class="fas fa-shopping-cart"></i> ({{ cart.length }})</button>
          </div>
        </div>

        <!-- Корзина -->
        <div class="cart-panel" v-show="cartOpen">
          <div class="cart-header">
            <h3><i class="fas fa-shopping-cart"></i> Корзина</h3>
            <button class="close-cart" @click="cartOpen = false">×</button>
          </div>
          <div class="cart-items">
            <div v-if="cart.length === 0" class="empty-cart">Нет товаров</div>
            <div v-for="item in cart" :key="item.id" class="cart-item">
              <span>{{ item.name }}</span>
              <button @click="removeFromCart(item.id)">🗑️</button>
            </div>
          </div>
          <div class="cart-footer">
            <button class="btn-primary" @click="checkout">Оформить заказ</button>
          </div>
        </div>

        <!-- Сетка товаров -->
        <div class="infinite-grid">
          <div v-for="item in paginatedItems" :key="item.id" class="product-card-super">
            <div class="img-wrap">
              <img :src="item.img" :alt="item.name" loading="lazy">
              <button class="cart-add" @click="addToCart(item)"><i class="fas fa-cart-plus"></i></button>
            </div>
            <div class="info">
              <h3>{{ item.name }}</h3>
              <div class="specs-mini">
                <div v-for="(val, key) in item.specs" :key="key">{{ key }}: {{ val }}</div>
              </div>
              <div class="action-buttons">
                <button @click="openModal(item)">Детали</button>
                <button class="primary" @click="quickOrder(item)">Заказать</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Пагинация -->
        <div class="pagination">
          <button @click="prevPage" :disabled="currentPage === 1">Назад</button>
          <span>Стр. {{ currentPage }} из {{ totalPages }}</span>
          <button @click="nextPage" :disabled="currentPage === totalPages">Вперёд</button>
        </div>

        <!-- 3D-ГЛОБУС -->
        <div class="globe-section">
          <h2><i class="fas fa-globe-americas"></i> Космодромы мира</h2>
          <div ref="globeContainer" class="globe-container"></div>
          <p class="globe-hint">Перетащите мышью для вращения</p>
        </div>

        <!-- КАРУСЕЛЬ ПОПУЛЯРНЫХ ЗАПУСКОВ -->
        <div class="launch-carousel">
          <h2><i class="fas fa-rocket"></i> Популярные запуски</h2>
          <div class="carousel-wrapper">
            <div class="carousel-track" ref="carouselTrack">
              <div class="carousel-item" v-for="launch in popularLaunches" :key="launch.id">
                <h3>{{ launch.mission }}</h3>
                <p>{{ launch.date }}</p>
                <div class="launch-status" :class="launch.status">{{ launch.status === 'успех' ? '✅ Успех' : '🚀 Планируется' }}</div>
              </div>
            </div>
          </div>
          <div class="carousel-controls">
            <button @click="prevSlide">◀</button>
            <button @click="nextSlide">▶</button>
          </div>
        </div>

        <!-- ПРИЗЫВ К ДЕЙСТВИЮ -->
        <div class="final-glory">
          <div class="glory-inner">
            <h2>Готовы запустить свой проект?</h2>
            <p>Станьте частью космической индустрии — оставьте заявку</p>
            <button class="btn-giant" @click="openRequestForm">Связаться с инженером</button>
          </div>
        </div>
      </div>
    </div>

    <!-- МОДАЛЬНОЕ ОКНО С 3D-МОДЕЛЬЮ -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
      <div class="modal-big">
        <div class="modal-header">
          <h2>{{ modalData.name }}</h2>
          <button class="close-x" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <div ref="modelContainer" class="model-3d-container"></div>
          <div class="detail-specs">
            <div v-for="(val, key) in modalData.specs" :key="key"><strong>{{ key }}:</strong> {{ val }}</div>
          </div>
          <p class="full-desc">{{ modalData.fullDesc }}</p>
          <button class="btn-primary" @click="quickOrder(modalData)">Запросить коммерческое предложение</button>
        </div>
      </div>
    </div>

    <!-- ФОРМА ЗАЯВКИ -->
    <div v-if="formVisible" class="modal-overlay" @click.self="formVisible = false">
      <div class="modal-big">
        <div class="modal-header">
          <h2>Космическая заявка</h2>
          <button class="close-x" @click="formVisible = false">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitFinalForm">
            <input type="text" placeholder="Ваше имя" v-model="formData.name" required>
            <input type="email" placeholder="Email" v-model="formData.email" required>
            <textarea placeholder="Описание проекта" v-model="formData.message"></textarea>
            <button type="submit" class="btn-primary">Отправить</button>
          </form>
        </div>
      </div>
    </div>

    <!-- УВЕДОМЛЕНИЯ -->
    <div v-if="toastMsg" class="toast" :class="toastType">{{ toastMsg }}</div>

    <!-- ЧАТ -->
    <div class="chat-support">
      <div class="chat-header" @click="chatOpen = !chatOpen">
        <i class="fas fa-headset"></i> Поддержка 24/7
      </div>
      <div class="chat-body" v-show="chatOpen">
        <div class="chat-messages" ref="chatMessages">
          <div v-for="msg in chatHistory" :key="msg.id" :class="msg.sender">{{ msg.text }}</div>
        </div>
        <div class="chat-input">
          <input v-model="chatInput" @keyup.enter="sendChatMessage" placeholder="Напишите вопрос...">
          <button @click="sendChatMessage">➤</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

// ===================== КАТАЛОГ ТОВАРОВ (без изменений) =====================
const generateItems = () => {
  const rockets = [
    { name: 'Орбита-X Heavy', height:'62m', payload:'22t', thrust:'2800kN', img:'https://picsum.photos/id/4/300/200', fullDesc:'Сверхтяжёлый носитель для Луны и Марса.', modelType:'rocket' },
    { name: 'Старт-1', height:'28m', payload:'2.5t', thrust:'450kN', img:'https://picsum.photos/id/29/300/200', fullDesc:'Лёгкий носитель для малых спутников.', modelType:'rocket' },
    { name: 'Титан-3', height:'74m', payload:'36t', thrust:'4200kN', img:'https://picsum.photos/id/96/300/200', fullDesc:'Флагман для марсианских экспедиций.', modelType:'rocket' },
    { name: 'Союз-2', height:'46m', payload:'7.5t', thrust:'950kN', img:'https://picsum.photos/id/22/300/200', fullDesc:'Классическая надёжность.', modelType:'rocket' },
    { name: 'Ангара-А5', height:'55m', payload:'24t', thrust:'2600kN', img:'https://picsum.photos/id/31/300/200', fullDesc:'Тяжёлый носитель нового поколения.', modelType:'rocket' },
    { name: 'Электрон', height:'17m', payload:'0.3t', thrust:'50kN', img:'https://picsum.photos/id/39/300/200', fullDesc:'Сверхлёгкий для малых спутников.', modelType:'rocket' },
    { name: 'Нейтрон-2', height:'40m', payload:'13t', thrust:'1450kN', img:'https://picsum.photos/id/44/300/200', fullDesc:'Средний класс с возвращаемой ступенью.', modelType:'rocket' },
    { name: 'Сатурн-9', height:'98m', payload:'55t', thrust:'5900kN', img:'https://picsum.photos/id/58/300/200', fullDesc:'Ультратяжёлый для пилотируемых экспедиций.', modelType:'rocket' },
    { name: 'Вега-Лайт', height:'30m', payload:'1.8t', thrust:'300kN', img:'https://picsum.photos/id/15/300/200', fullDesc:'Экономичный запуск малых аппаратов.', modelType:'rocket' },
    { name: 'Falcon-9R', height:'70m', payload:'22.8t', thrust:'7600kN', img:'https://picsum.photos/id/18/300/200', fullDesc:'Многоразовый носитель среднего класса.', modelType:'rocket' }
  ]
  const components = [
    { name: 'ЖРД R-220', mass:'320kg', thrust:'190kN', img:'https://picsum.photos/id/33/300/200', fullDesc:'Кислородно-водородный двигатель.', modelType:'engine' },
    { name: 'АСУ "Орион"', mass:'45kg', power:'85W', img:'https://picsum.photos/id/77/300/200', fullDesc:'ИИ для автономной навигации.', modelType:'computer' },
    { name: 'Солнечные панели X-500', mass:'120kg', power:'12kW', img:'https://picsum.photos/id/106/300/200', fullDesc:'Высокоэффективные фотоэлементы.', modelType:'panel' },
    { name: 'Гиростабилизатор ГС-6', precision:'0.001°', img:'https://picsum.photos/id/91/300/200', fullDesc:'Точнейшая ориентация.', modelType:'gyro' },
    { name: 'Теплозащита "Карбон-МК"', temp:'2200°C', img:'https://picsum.photos/id/51/300/200', fullDesc:'Многоразовая абляция.', modelType:'tps' },
    { name: 'Квантовый датчик звёзд', accuracy:'0.1″', img:'https://picsum.photos/id/62/300/200', fullDesc:'Абсолютная навигация.', modelType:'sensor' },
    { name: 'Бак композитный К-12', volume:'12m³', img:'https://picsum.photos/id/85/300/200', fullDesc:'Облегчённый криобак.', modelType:'tank' },
    { name: 'Ракетный ускоритель "Буран-М"', thrust:'1200kN', time:'120с', img:'https://picsum.photos/id/108/300/200', fullDesc:'Твердотопливный ускоритель.', modelType:'booster' }
  ]
  const services = [
    { name: 'Вывод на НОО', price:'$25 млн', payload:'до 8т', img:'https://picsum.photos/id/0/300/200', fullDesc:'Низкая опорная орбита.', modelType:'service' },
    { name: 'Геопереходная орбита (ГПО)', price:'$45 млн', payload:'до 5т', img:'https://picsum.photos/id/1/300/200', fullDesc:'Для спутников связи.', modelType:'service' },
    { name: 'Лунная миссия', price:'$120 млн', payload:'до 3т', img:'https://picsum.photos/id/2/300/200', fullDesc:'Доставка модулей на Луну.', modelType:'service' },
    { name: 'Запуск группировки спутников', price:'договорная', satellites:'до 60', img:'https://picsum.photos/id/3/300/200', fullDesc:'Кластерный запуск.', modelType:'service' },
    { name: 'Сопровождение полезной нагрузки', price:'$2 млн', img:'https://picsum.photos/id/5/300/200', fullDesc:'Интеграция и тестирование.', modelType:'service' },
    { name: 'Морской старт', price:'$35 млн', img:'https://picsum.photos/id/6/300/200', fullDesc:'Запуск с океанской платформы.', modelType:'service' },
    { name: 'Межпланетная миссия', price:'$180 млн', target:'Марс, Венера', img:'https://picsum.photos/id/7/300/200', fullDesc:'Полный цикл.', modelType:'service' },
    { name: 'Страхование космических рисков', price:'от 5%', img:'https://picsum.photos/id/8/300/200', fullDesc:'Финансовая защита.', modelType:'service' }
  ]
  let id = 1
  const all = []
  rockets.forEach(r => { all.push({ id: id++, category: 'Ракеты', specs: { Высота: r.height, 'Грузоподъёмность': r.payload, Тяга: r.thrust }, shortDesc: r.name, fullDesc: r.fullDesc, img: r.img, name: r.name, modelType: r.modelType }) })
  components.forEach(c => { all.push({ id: id++, category: 'Компоненты', specs: { Масса: c.mass, Характеристика: c.thrust || c.power || c.precision || c.accuracy || c.volume || c.temp }, shortDesc: c.name, fullDesc: c.fullDesc, img: c.img, name: c.name, modelType: c.modelType }) })
  services.forEach(s => { all.push({ id: id++, category: 'Услуги', specs: { Цена: s.price, Масса: s.payload || s.satellites || s.target || '—' }, shortDesc: s.name, fullDesc: s.fullDesc, img: s.img, name: s.name, modelType: s.modelType }) })
  return all
}
const allItems = ref(generateItems())

// Фильтрация, поиск, пагинация
const searchQuery = ref('')
const activeCat = ref('Все')
const allCategories = ['Все', 'Ракеты', 'Компоненты', 'Услуги']
const currentPage = ref(1)
const itemsPerPage = 12

const filteredItems = computed(() => {
  let list = allItems.value
  if (activeCat.value !== 'Все') list = list.filter(i => i.category === activeCat.value)
  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(i => i.name.toLowerCase().includes(q))
  }
  return list
})
const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage))
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredItems.value.slice(start, start + itemsPerPage)
})
function prevPage() { if (currentPage.value > 1) currentPage.value-- }
function nextPage() { if (currentPage.value < totalPages.value) currentPage.value++ }

// Корзина
const cart = ref([])
const cartOpen = ref(false)
function addToCart(item) { if (!cart.value.find(i => i.id === item.id)) cart.value.push({ id: item.id, name: item.name }) }
function removeFromCart(id) { cart.value = cart.value.filter(i => i.id !== id) }
function checkout() { alert('Заказ оформлен! С вами свяжется менеджер.') }

// Таймер
const targetDate = new Date(2026, 5, 15, 12, 0, 0).getTime()
const days = ref(0), hours = ref(0), minutes = ref(0), seconds = ref(0)
let timerInterval
function updateTimer() {
  const now = Date.now()
  const diff = targetDate - now
  if (diff <= 0) { days.value = hours.value = minutes.value = seconds.value = 0; clearInterval(timerInterval); return }
  days.value = Math.floor(diff / 86400000)
  hours.value = Math.floor((diff % 86400000) / 3600000)
  minutes.value = Math.floor((diff % 3600000) / 60000)
  seconds.value = Math.floor((diff % 60000) / 1000)
}
onMounted(() => { updateTimer(); timerInterval = setInterval(updateTimer, 1000) })
onUnmounted(() => { clearInterval(timerInterval) })

// Статистика
const bigStats = ref([
  { label: 'Спутников запущено', value: 187 },
  { label: 'Клиентов', value: 56 },
  { label: 'Успешных миссий', value: 142 }
])

// ===================== ГЛОБУС =====================
const globeContainer = ref(null)
let sceneGlobe, cameraGlobe, rendererGlobe, earthMesh, markersGroup
function addMarker(lat, lon, color) {
  const radius = 1.01
  const phi = (90 - lat) * Math.PI / 180
  const theta = lon * Math.PI / 180
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const geometry = new THREE.SphereGeometry(0.02, 16, 16)
  const material = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: 0.5 })
  const marker = new THREE.Mesh(geometry, material)
  marker.position.set(x, y, z)
  markersGroup.add(marker)
}
function initGlobe() {
  if (!globeContainer.value) return
  const container = globeContainer.value
  const width = container.clientWidth
  const height = 400
  sceneGlobe = new THREE.Scene()
  cameraGlobe = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000)
  cameraGlobe.position.set(0, 0, 3)
  rendererGlobe = new THREE.WebGLRenderer({ antialias: true })
  rendererGlobe.setSize(width, height)
  container.appendChild(rendererGlobe.domElement)

  const textureLoader = new THREE.TextureLoader()
  const earthTexture = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')
  const geometry = new THREE.SphereGeometry(1, 128, 128)
  const material = new THREE.MeshStandardMaterial({ map: earthTexture })
  earthMesh = new THREE.Mesh(geometry, material)
  sceneGlobe.add(earthMesh)

  markersGroup = new THREE.Group()
  earthMesh.add(markersGroup)
  addMarker(45.9, 63.3, 0xff3333)
  addMarker(28.4, -80.5, 0xff3333)
  addMarker(5.2, -52.7, 0xff3333)
  addMarker(51.8, 128.3, 0xff3333)
  addMarker(28.2, 102.0, 0xff3333)
  addMarker(39.0, -76.5, 0xff3333)
  addMarker(34.9, 136.6, 0xff3333)

  const starGeometry = new THREE.BufferGeometry()
  const starCount = 2000
  const starPositions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    starPositions[i*3] = (Math.random() - 0.5) * 2000
    starPositions[i*3+1] = (Math.random() - 0.5) * 2000
    starPositions[i*3+2] = (Math.random() - 0.5) * 2000 - 100
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })
  const stars = new THREE.Points(starGeometry, starMaterial)
  sceneGlobe.add(stars)

  const ambientLight = new THREE.AmbientLight(0x404040)
  sceneGlobe.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(1, 2, 1)
  sceneGlobe.add(dirLight)

  let mouseX = 0, mouseY = 0, isDragging = false
  container.addEventListener('mousedown', () => isDragging = true)
  window.addEventListener('mouseup', () => isDragging = false)
  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      mouseX += e.movementX * 0.005
      mouseY += e.movementY * 0.005
    }
  })
  function animateGlobe() {
    earthMesh.rotation.y = mouseX
    earthMesh.rotation.x = mouseY
    rendererGlobe.render(sceneGlobe, cameraGlobe)
    requestAnimationFrame(animateGlobe)
  }
  animateGlobe()
}
onMounted(() => { initGlobe() })

// ===================== УЛЬТРА-ДЕТАЛИЗИРОВАННЫЕ 3D-МОДЕЛИ =====================
const modalOpen = ref(false)
const modalData = ref({})
const modelContainer = ref(null)
let currentAnimationId = null

function closeModal() {
  modalOpen.value = false
  if (currentAnimationId) cancelAnimationFrame(currentAnimationId)
}

// Создание сложной металлической текстуры с царапинами, пятнами и патиной
function createDetailedTexture(baseColor, addRust = false) {
  const canvas = document.createElement('canvas')
  canvas.width = 2048
  canvas.height = 2048
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  // Шум
  for (let i = 0; i < 8000; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.15})`
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4)
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.1})`
    ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 2, 2)
  }
  // Царапины
  for (let i = 0; i < 2000; i++) {
    ctx.beginPath()
    ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.4})`
    ctx.lineWidth = 2 + Math.random() * 4
    ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
    ctx.stroke()
  }
  // Полосы и надписи (имитация)
  ctx.strokeStyle = '#ccccaa'
  ctx.lineWidth = 12
  for (let i = 0; i < 30; i++) {
    ctx.beginPath()
    ctx.moveTo(0, i * 70)
    ctx.lineTo(canvas.width, i * 70)
    ctx.stroke()
  }
  if (addRust) {
    for (let i = 0; i < 4000; i++) {
      ctx.fillStyle = `rgba(150,70,20,${Math.random() * 0.5})`
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 6, 6)
    }
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  texture.repeat.set(1.5, 1.8)
  return texture
}

// Предельно детализированная ракета (более 60 элементов)
function createHyperDetailedRocket() {
  const group = new THREE.Group()
  const metalTexture = createDetailedTexture('#bb3333')
  const metalDark = createDetailedTexture('#884444')
  const silverTexture = createDetailedTexture('#aaaaaa')
  
  // Ступень 1 (основной корпус)
  const mainBody = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 1.8, 128), new THREE.MeshStandardMaterial({ map: metalTexture, metalness: 0.85, roughness: 0.2 }))
  mainBody.position.y = 0
  group.add(mainBody)
  
  // Ступень 2 (верхняя)
  const upperBody = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.9, 128), new THREE.MeshStandardMaterial({ map: metalDark, metalness: 0.8 }))
  upperBody.position.y = 1.15
  group.add(upperBody)
  
  // Переходник
  const adapter = new THREE.Mesh(new THREE.ConeGeometry(0.58, 0.3, 64), new THREE.MeshStandardMaterial({ color: '#cc8844', metalness: 0.7 }))
  adapter.position.y = 1.6
  group.add(adapter)
  
  // Головной обтекатель
  const fairing = new THREE.Mesh(new THREE.ConeGeometry(0.62, 0.9, 128), new THREE.MeshStandardMaterial({ color: '#ffaa77', metalness: 0.5, emissive: '#442200', emissiveIntensity: 0.1 }))
  fairing.position.y = 2.1
  group.add(fairing)
  
  // Сопло двигателя (многослойное)
  const nozzleOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.92, 0.35, 64), new THREE.MeshStandardMaterial({ map: silverTexture, metalness: 0.95 }))
  nozzleOuter.position.y = -1.05
  group.add(nozzleOuter)
  const nozzleInner = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.7, 0.25, 64), new THREE.MeshStandardMaterial({ color: '#aa8866', metalness: 0.9 }))
  nozzleInner.position.y = -1.1
  group.add(nozzleInner)
  
  // Огненный факел с пульсацией
  const fireBase = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.1, 32), new THREE.MeshStandardMaterial({ color: '#ff5500', emissive: '#ff2200', emissiveIntensity: 0.8 }))
  fireBase.position.y = -1.45
  group.add(fireBase)
  const fireTip = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.7, 32), new THREE.MeshStandardMaterial({ color: '#ffaa33', emissive: '#ff6600', emissiveIntensity: 0.9 }))
  fireTip.position.y = -1.95
  group.add(fireTip)
  
  // 4 стабилизатора с рёбрами
  const wingGeo = new THREE.BoxGeometry(1.0, 0.15, 0.5)
  const wingMat = new THREE.MeshStandardMaterial({ color: '#aa4444', metalness: 0.7 })
  for (let i = 0; i < 4; i++) {
    const angle = (i * Math.PI * 2) / 4
    const wing = new THREE.Mesh(wingGeo, wingMat)
    wing.position.set(Math.cos(angle) * 0.85, -0.45, Math.sin(angle) * 0.85)
    wing.rotation.z = angle
    group.add(wing)
    // Добавляем подкосы
    const strutGeo = new THREE.BoxGeometry(0.1, 0.4, 0.1)
    const strut = new THREE.Mesh(strutGeo, wingMat)
    strut.position.set(Math.cos(angle) * 0.6, -0.2, Math.sin(angle) * 0.6)
    group.add(strut)
  }
  
  // Множество иллюминаторов со свечением
  const windowMat = new THREE.MeshStandardMaterial({ color: '#88ccff', emissive: '#2288cc', emissiveIntensity: 0.6 })
  for (let y = -0.6; y <= 1.2; y += 0.45) {
    for (let j = 0; j < 6; j++) {
      const angle = (j * Math.PI * 2) / 6
      const win = new THREE.Mesh(new THREE.SphereGeometry(0.09, 32, 32), windowMat)
      win.position.set(Math.cos(angle) * 0.62, y, Math.sin(angle) * 0.62)
      group.add(win)
    }
  }
  
  // Антенны (высокие)
  const antennaMat = new THREE.MeshStandardMaterial({ color: '#ccaa88', metalness: 0.8 })
  const mainAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, 0.45, 8), antennaMat)
  mainAntenna.position.set(0, 2.45, 0)
  group.add(mainAntenna)
  const antennaBall = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), antennaMat)
  antennaBall.position.set(0, 2.68, 0)
  group.add(antennaBall)
  
  // Боковые датчики
  const sensorMat = new THREE.MeshStandardMaterial({ color: '#88aaff', metalness: 0.4 })
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8
    const sensor = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), sensorMat)
    sensor.position.set(Math.cos(angle) * 0.68, 0.4, Math.sin(angle) * 0.68)
    group.add(sensor)
  }
  
  // Трубопроводы (кольца, спирали)
  const pipeMat = new THREE.MeshStandardMaterial({ color: '#aa8866', metalness: 0.6 })
  const ringGeo = new THREE.TorusGeometry(0.65, 0.045, 64, 200)
  for (let y = -0.3; y <= 0.9; y += 0.6) {
    const ring = new THREE.Mesh(ringGeo, pipeMat)
    ring.position.y = y
    ring.rotation.x = Math.PI / 2
    group.add(ring)
  }
  
  // Болты и заклёпки (сотни мелких точек)
  const boltMat = new THREE.MeshStandardMaterial({ color: '#ddccaa', metalness: 0.9 })
  for (let i = -0.9; i <= 1.4; i += 0.2) {
    for (let k = 0; k < 12; k++) {
      const angle = (k * Math.PI * 2) / 12
      const bolt = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 8), boltMat)
      bolt.position.set(Math.cos(angle) * 0.66, i, Math.sin(angle) * 0.66)
      group.add(bolt)
    }
  }
  
  // Динамическая подсветка (точечные источники)
  const sparkLight = new THREE.PointLight(0xff6600, 0.8, 3)
  sparkLight.position.set(0, -1.4, 0)
  group.add(sparkLight)
  group.userData = { light: sparkLight }
  
  return group
}

// Детализированный двигатель ЖРД
function createDetailedEngine() {
  const group = new THREE.Group()
  const main = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 1.2, 64), new THREE.MeshStandardMaterial({ color: '#aa8866', metalness: 0.95, roughness: 0.2 }))
  group.add(main)
  const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.15, 0.5, 64), new THREE.MeshStandardMaterial({ color: '#ccaa88', metalness: 0.98 }))
  nozzle.position.y = -0.75
  group.add(nozzle)
  const injector = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.2, 32), new THREE.MeshStandardMaterial({ color: '#ffaa66', metalness: 0.8 }))
  injector.position.y = 0.65
  group.add(injector)
  // Трубки
  const tubeMat = new THREE.MeshStandardMaterial({ color: '#bb9977' })
  for (let i = -0.5; i <= 0.5; i+=0.5) {
    const tubeRing = new THREE.Mesh(new THREE.TorusGeometry(0.82, 0.045, 32, 100), tubeMat)
    tubeRing.position.y = i
    tubeRing.rotation.x = Math.PI/2
    group.add(tubeRing)
  }
  // Болты по кругу
  const boltMat = new THREE.MeshStandardMaterial({ color: '#ddccaa' })
  for (let i = 0; i < 16; i++) {
    const angle = (i * Math.PI * 2) / 16
    const bolt = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), boltMat)
    bolt.position.set(Math.cos(angle) * 0.85, -0.3, Math.sin(angle) * 0.85)
    group.add(bolt)
  }
  return group
}

// Электронный блок с деталями
function createDetailedComputer() {
  const group = new THREE.Group()
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.65, 0.9), new THREE.MeshStandardMaterial({ color: '#2266aa', metalness: 0.4 }))
  group.add(box)
  const panel = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.1, 0.7), new THREE.MeshStandardMaterial({ color: '#333333', metalness: 0.2 }))
  panel.position.y = 0.4
  group.add(panel)
  // Разъёмы
  const connMat = new THREE.MeshStandardMaterial({ color: '#ffaa44' })
  for (let i = -0.4; i <= 0.4; i+=0.2) {
    const conn = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.15), connMat)
    conn.position.set(i, 0.45, 0.5)
    group.add(conn)
  }
  // Светодиоды
  const ledMat = new THREE.MeshStandardMaterial({ color: '#ff3333', emissive: '#ff0000', emissiveIntensity: 0.6 })
  for (let i = 0; i < 8; i++) {
    const led = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), ledMat)
    led.position.set(-0.4 + i*0.12, 0.48, 0.48)
    group.add(led)
  }
  return group
}

// Солнечная панель с сотами
function createDetailedPanel() {
  const group = new THREE.Group()
  const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.06, 0.9), new THREE.MeshStandardMaterial({ color: '#2266aa', metalness: 0.1, emissive: '#004466', emissiveIntensity: 0.2 }))
  group.add(base)
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.03, 0.98), new THREE.MeshStandardMaterial({ color: '#aaaaaa', metalness: 0.8 }))
  frame.position.z = 0.05
  group.add(frame)
  // Имитация сот
  const cellMat = new THREE.MeshStandardMaterial({ color: '#88aaff', emissive: '#2266aa' })
  for (let i = -0.7; i <= 0.7; i+=0.35) {
    for (let j = -0.4; j <= 0.4; j+=0.35) {
      const cell = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.02, 0.3), cellMat)
      cell.position.set(i, 0.05, j)
      group.add(cell)
    }
  }
  return group
}

// Бак композитный
function createDetailedTank() {
  const group = new THREE.Group()
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.75, 128, 128), new THREE.MeshStandardMaterial({ color: '#88aaff', metalness: 0.3, roughness: 0.4 }))
  group.add(sphere)
  const rings = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.05, 64, 200), new THREE.MeshStandardMaterial({ color: '#ccccaa', metalness: 0.7 }))
  rings.rotation.x = Math.PI/2
  group.add(rings)
  return group
}

function load3DModel(modelType) {
  if (!modelContainer.value) return
  while (modelContainer.value.firstChild) modelContainer.value.removeChild(modelContainer.value.firstChild)
  
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050814)
  const width = modelContainer.value.clientWidth
  const camera = new THREE.PerspectiveCamera(40, width / 300, 0.1, 1000)
  camera.position.set(2.2, 1.6, 3.8)
  camera.lookAt(0, 0, 0)
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, 300)
  modelContainer.value.appendChild(renderer.domElement)
  
  // Освещение высокого качества
  const ambient = new THREE.AmbientLight(0x404060)
  scene.add(ambient)
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.2)
  keyLight.position.set(3, 4, 2)
  scene.add(keyLight)
  const fillLight = new THREE.PointLight(0x4488ff, 0.6)
  fillLight.position.set(-1.5, 1.2, 2.5)
  scene.add(fillLight)
  const rimLight = new THREE.PointLight(0xffaa66, 0.7)
  rimLight.position.set(1.2, 1.8, -2)
  scene.add(rimLight)
  const backLight = new THREE.PointLight(0x88aaff, 0.5)
  backLight.position.set(-0.8, 1.2, -2.2)
  scene.add(backLight)
  
  let model
  switch (modelType) {
    case 'rocket':
      model = createHyperDetailedRocket()
      break
    case 'engine':
      model = createDetailedEngine()
      break
    case 'computer':
      model = createDetailedComputer()
      break
    case 'panel':
      model = createDetailedPanel()
      break
    case 'tank':
      model = createDetailedTank()
      break
    default:
      const geo = new THREE.IcosahedronGeometry(0.8, 0)
      const mat = new THREE.MeshStandardMaterial({ color: 0x44aaff, metalness: 0.7, roughness: 0.2, emissive: 0x2266aa, emissiveIntensity: 0.3 })
      model = new THREE.Mesh(geo, mat)
  }
  scene.add(model)
  
  // Добавляем вращение с динамическим изменением интенсивности света
  let time = 0
  function animate() {
    if (model) model.rotation.y += 0.006
    if (model.userData && model.userData.light) {
      time += 0.03
      const intensity = 0.6 + Math.sin(time) * 0.3
      model.userData.light.intensity = intensity
    }
    renderer.render(scene, camera)
    currentAnimationId = requestAnimationFrame(animate)
  }
  animate()
}

async function openModal(item) {
  modalData.value = item
  modalOpen.value = true
  await nextTick()
  load3DModel(item.modelType || 'rocket')
}

// Форма, карусель, чат (без изменений)
const formVisible = ref(false)
const formData = ref({ name:'', email:'', message:'' })
function quickOrder(item) { formData.value.message = `Интересуюсь: ${item.name}`; formVisible.value = true }
function openRequestForm() { formVisible.value = true }
function submitFinalForm() { alert('Заявка отправлена!'); formVisible.value = false; formData.value = { name:'', email:'', message:'' } }

const popularLaunches = ref([
  { id:1, mission:'Артемида-2', date:'Сентябрь 2026', status:'успех' },
  { id:2, mission:'Марс-2026', date:'Июль 2026', status:'планируется' },
  { id:3, mission:'Спектр-РГ', date:'Май 2026', status:'успех' },
  { id:4, mission:'Луна-28', date:'Октябрь 2026', status:'планируется' }
])
const carouselTrack = ref(null)
const carouselIndex = ref(0)
const totalItems = computed(() => popularLaunches.value.length)
function prevSlide() { if (carouselIndex.value > 0) { carouselIndex.value--; updateCarousel() } }
function nextSlide() { if (carouselIndex.value < totalItems.value - 1) { carouselIndex.value++; updateCarousel() } }
function updateCarousel() { if (carouselTrack.value) carouselTrack.value.style.transform = `translateX(-${carouselIndex.value * 100}%)` }

const chatOpen = ref(true)
const chatInput = ref('')
const chatHistory = ref([{ id:1, sender:'bot', text:'Добро пожаловать! Задайте вопрос о космических услугах.' }])
let chatId = 2
function sendChatMessage() {
  if (!chatInput.value.trim()) return
  chatHistory.value.push({ id: chatId++, sender:'user', text: chatInput.value })
  setTimeout(() => { chatHistory.value.push({ id: chatId++, sender:'bot', text:'Спасибо! Скоро ответим.' }) }, 500)
  chatInput.value = ''
}

const toastMsg = ref('')
const toastType = ref('success')
function showToast(msg, type='success') { toastMsg.value = msg; toastType.value = type; setTimeout(() => toastMsg.value = '', 3000) }
</script>

<style scoped>
/* Стили (полностью идентичны предыдущей версии, все блоки сохранены) */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.universal-cosmos {
  background: #050814;
  min-height: 100vh;
  font-family: 'Open Sans', sans-serif;
}
.main-wrap {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}
.hero-super {
  background: radial-gradient(ellipse at 30% 40%, #102a44, #020816);
  border-radius: 48px;
  padding: 50px 30px;
  margin: 100px 0 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
}
.hero-text h1 { font-size: 3rem; margin-bottom: 10px; }
.glow { background: linear-gradient(135deg,#4cc9ff,#0066ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.countdown .timer { font-size: 2rem; font-weight: bold; background: #00000066; display: inline-block; padding: 6px 20px; border-radius: 60px; margin-top: 12px; }
.hero-stats { display: flex; gap: 40px; }
.stat .num { font-size: 2rem; font-weight: 800; background: linear-gradient(135deg,#fff,#7aaaff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.toolbar { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px; margin: 30px 0; }
.search-area { background: #0d1f32; border-radius: 60px; padding: 8px 20px; display: flex; align-items: center; gap: 12px; flex:2; }
.search-area input { background: none; border: none; color: white; width: 100%; font-size: 1rem; outline: none; }
.filter-group { display: flex; gap: 12px; flex-wrap: wrap; }
.filter-btn { background: transparent; border: 1px solid #2c577d; padding: 6px 20px; border-radius: 40px; color: white; cursor: pointer; }
.filter-btn.active { background: #0066ff; border-color: #0066ff; }
.cart-panel { background: rgba(10,20,40,0.95); backdrop-filter: blur(12px); border-radius: 32px; padding: 20px; margin-bottom: 30px; border: 1px solid #2c557a; }
.cart-header { display: flex; justify-content: space-between; border-bottom: 1px solid #335a80; padding-bottom: 12px; }
.cart-items { max-height: 200px; overflow-y: auto; margin: 15px 0; }
.cart-item { display: flex; justify-content: space-between; padding: 5px 0; }
.empty-cart { text-align: center; padding: 20px; color: #8090b0; }
.infinite-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; }
.product-card-super { background: rgba(8,20,36,0.7); backdrop-filter: blur(8px); border-radius: 28px; overflow: hidden; transition: 0.2s; border: 1px solid #2d5478; }
.product-card-super:hover { transform: translateY(-4px); border-color: #4cc9ff; }
.img-wrap { position: relative; height: 200px; overflow: hidden; }
.img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.cart-add { position: absolute; bottom: 10px; right: 10px; background: #0a1f33; border: none; border-radius: 50%; width: 36px; height: 36px; color: white; cursor: pointer; }
.info { padding: 18px; }
.specs-mini div { font-size: 0.8rem; display: inline-block; background: #0f1e2f; padding: 2px 8px; border-radius: 30px; margin-right: 6px; margin-bottom: 6px; }
.action-buttons { display: flex; gap: 12px; margin-top: 16px; }
.action-buttons button { flex:1; background: transparent; border: 1px solid #3f7fb0; border-radius: 40px; padding: 6px; cursor: pointer; color: white; }
.action-buttons button.primary { background: linear-gradient(95deg,#0066ff,#00aaff); border: none; }
.pagination { display: flex; justify-content: center; gap: 20px; margin: 40px 0; }
.pagination button { background: #1f3f60; border: none; padding: 8px 20px; border-radius: 40px; color: white; cursor: pointer; }
.pagination button:disabled { opacity: 0.5; cursor: default; }
.globe-section { background: #030c18; border-radius: 48px; padding: 30px; margin: 40px 0; text-align: center; }
.globe-container { width: 100%; height: 400px; background: #021020; border-radius: 28px; cursor: grab; }
.launch-carousel {
  background: #0a1428;
  border-radius: 48px;
  padding: 30px;
  margin: 40px 0;
}
.carousel-wrapper {
  overflow: hidden;
  width: 100%;
}
.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
  width: 100%;
}
.carousel-item {
  flex: 0 0 100%;
  background: #0f2139;
  border-radius: 28px;
  padding: 20px;
  box-sizing: border-box;
}
.carousel-controls {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}
.carousel-controls button {
  background: #1f3f60;
  border: none;
  color: white;
  padding: 8px 20px;
  border-radius: 40px;
  cursor: pointer;
}
.carousel-controls button:hover {
  background: #0066ff;
}
.final-glory { margin: 60px 0 20px; }
.glory-inner { background: linear-gradient(115deg, #10233e, #020b16); border-radius: 64px; padding: 50px 30px; text-align: center; border: 1px solid #2f7db0; }
.btn-giant { background: linear-gradient(135deg,#0066ff,#00ccff); border: none; padding: 16px 48px; border-radius: 60px; font-size: 1.2rem; font-weight: bold; margin-top: 20px; cursor: pointer; }
.modal-overlay { position: fixed; top:0;left:0; width:100%;height:100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(12px); display: flex; align-items: center; justify-content: center; z-index: 2000; }
.modal-big { background: #0c1a2c; width: 700px; max-width: 90%; border-radius: 32px; max-height: 85vh; overflow-y: auto; }
.modal-header { display: flex; justify-content: space-between; padding: 20px; border-bottom: 1px solid #2e5d88; }
.close-x { background: none; border: none; font-size: 2rem; color: white; cursor: pointer; }
.modal-body { padding: 25px; }
.detail-specs { background: #07131f; padding: 15px; border-radius: 24px; margin: 15px 0; }
.model-3d-container { width: 100%; height: 300px; background: #050814; border-radius: 24px; margin-bottom: 20px; overflow: hidden; }
form input, form textarea { width: 100%; margin: 8px 0; padding: 12px; background: #0f1f30; border: 1px solid #2a5580; border-radius: 40px; color: white; }
form button { margin-top: 16px; }
.toast { position: fixed; bottom: 100px; right: 30px; background: #000000cc; color: white; padding: 12px 24px; border-radius: 40px; z-index: 2100; backdrop-filter: blur(8px); }
.chat-support {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 380px;
  background: #0b192b;
  border-radius: 28px;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  backdrop-filter: blur(4px);
}
.chat-header {
  background: #0066ff;
  padding: 16px 24px;
  border-radius: 28px 28px 0 0;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
}
.chat-body {
  height: 450px;
  display: flex;
  flex-direction: column;
}
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  font-size: 1rem;
}
.chat-messages .bot {
  background: #1f3a5f;
  padding: 8px 14px;
  border-radius: 20px;
  margin: 8px 0;
}
.chat-messages .user {
  background: #0055aa;
  text-align: right;
  padding: 8px 14px;
  border-radius: 20px;
  margin: 8px 0;
}
.chat-input {
  display: flex;
  padding: 12px;
  gap: 12px;
  border-top: 1px solid #2a5075;
}
.chat-input input {
  flex:1;
  background: #021020;
  border: none;
  padding: 10px 16px;
  border-radius: 40px;
  color: white;
  font-size: 1rem;
}
.chat-input button {
  background: #0066ff;
  border: none;
  border-radius: 40px;
  padding: 0 20px;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
}
@media (max-width: 1000px) {
  .hero-super { flex-direction: column; text-align: center; margin-top: 120px; }
  .hero-stats { margin-top: 20px; }
  .toolbar { flex-direction: column; }
  .chat-support { width: 320px; bottom: 20px; right: 20px; }
}
@media (max-width: 768px) {
  .hero-text h1 { font-size: 2rem; }
  .countdown .timer { font-size: 1.2rem; }
}
</style>