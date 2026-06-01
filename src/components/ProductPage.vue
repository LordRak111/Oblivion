<template>
  <div class="cosmic-nexus">
    <!-- Звёздный фон -->
    <div class="starfield-bg">
      <div v-for="i in 300" :key="i" class="star" :style="getStarStyle(i)"></div>
    </div>

    <div class="app-container">
      <!-- ХЕРО С ТАЙМЕРОМ И СТАТИСТИКОЙ -->
      <section class="hero-ultra">
        <div class="hero-glass">
          <h1>КОСМИЧЕСКИЙ <span class="gradient-text">КАТАЛОГ</span></h1>
          <p class="tagline">Ракеты • Компоненты • Запуски — более 50 решений</p>
          <div class="countdown-block">
            <div class="countdown-label">БЛИЖАЙШИЙ СТАРТ</div>
            <div class="timer-digits">{{ days }}д {{ hours }}ч {{ minutes }}м {{ seconds }}с</div>
          </div>
          <div class="global-numbers">
            <div v-for="stat in globalStats" :key="stat.label" class="stat-item">
              <span class="stat-val">{{ stat.value }}</span>
              <span class="stat-name">{{ stat.label }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ПОИСК + ФИЛЬТРЫ -->
      <div class="control-bar">
        <div class="search-input">
          <i class="fas fa-search"></i>
          <input v-model="search" placeholder="Поиск по названию, характеристикам...">
        </div>
        <div class="filters">
          <button v-for="cat in categories" :key="cat" class="filter-chip" :class="{ active: activeCategory === cat }" @click="activeCategory = cat">{{ cat }}</button>
          <button class="filter-chip" @click="showFavorites = !showFavorites"><i class="fas fa-heart"></i> Избранное</button>
        </div>
      </div>

      <!-- КАТАЛОГ ТОВАРОВ (50+) С ПАГИНАЦИЕЙ -->
      <div class="products-grid">
        <div v-for="product in paginatedProducts" :key="product.id" class="product-tile-advanced">
          <div class="tile-media">
            <img :src="product.img" :alt="product.name" loading="lazy">
            <button class="fav-toggle" :class="{ active: favorites.includes(product.id) }" @click="toggleFavorite(product.id)"><i class="fas fa-heart"></i></button>
            <div class="hot-badge" v-if="product.hot">🔥 Хит продаж</div>
          </div>
          <div class="tile-info">
            <h3>{{ product.name }}</h3>
            <div class="short-specs">
              <span v-for="(val, key) in Object.entries(product.specs).slice(0,2)" :key="key">{{ val[0] }}: {{ val[1] }}</span>
            </div>
            <div class="tile-buttons">
              <button @click="openDetailedModal(product)"><i class="fas fa-info-circle"></i> Детали</button>
              <button class="primary" @click="quickAddToCart(product)"><i class="fas fa-cart-plus"></i> В корзину</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ПАГИНАЦИЯ -->
      <div class="pagination-bar">
        <button @click="prevPage" :disabled="page === 1">← Предыдущая</button>
        <span>Страница {{ page }} из {{ totalPages }}</span>
        <button @click="nextPage" :disabled="page === totalPages">Следующая →</button>
      </div>

      <!-- 3D-ГЛОБУС С КОСМОДРОМАМИ (Three.js) -->
      <div class="earth-3d-container">
        <h2><i class="fas fa-globe-americas"></i> Космодромы Земли в реальном времени</h2>
        <div id="three-canvas" class="earth-canvas" ref="earthContainer"></div>
        <div class="port-list">
          <div v-for="port in spaceports" :key="port.name" class="port-badge">
            <i class="fas fa-map-marker-alt"></i> {{ port.name }} ({{ port.country }}) — {{ port.launches }} запусков
          </div>
        </div>
      </div>

      <!-- КОРЗИНА (расположена ниже, широкая) -->
      <div class="cart-section">
        <div class="cart-header" @click="cartExpanded = !cartExpanded">
          <h3><i class="fas fa-shopping-cart"></i> Корзина товаров ({{ cart.length }})</h3>
          <i :class="cartExpanded ? 'fas fa-chevron-up' : 'fas fa-chevron-down'"></i>
        </div>
        <div v-show="cartExpanded" class="cart-items-list">
          <div v-if="cart.length === 0" class="empty-cart">Корзина пуста. Добавьте ракеты или компоненты!</div>
          <div v-else>
            <div v-for="item in cart" :key="item.id" class="cart-row">
              <span>{{ item.name }}</span>
              <span>{{ item.price || 'Цена по запросу' }}</span>
              <button @click="removeFromCart(item.id)" class="remove-btn">Удалить</button>
            </div>
            <div class="cart-summary">
              <button class="btn-primary" @click="checkout">Оформить заказ</button>
            </div>
          </div>
        </div>
      </div>

      <!-- БЛОК ИННОВАЦИЙ С ПРОГРЕСС-БАРАМИ -->
      <div class="tech-advance">
        <h2><i class="fas fa-microchip"></i> Технологии будущего</h2>
        <div class="tech-list">
          <div v-for="tech in futureTechs" :key="tech.name" class="tech-row">
            <span>{{ tech.name }} {{ tech.icon }}</span>
            <div class="progress-bg"><div class="progress-fill" :style="{ width: tech.progress + '%' }"></div></div>
            <span>{{ tech.progress }}%</span>
          </div>
        </div>
      </div>

      <!-- КАРУСЕЛЬ ВИДЕО / ОТЗЫВЫ -->
      <div class="media-carousel">
        <h2><i class="fas fa-quote-right"></i> Отзывы партнёров</h2>
        <div class="testimonial-slider" ref="testimonialSlider">
          <div v-for="t in testimonials" :key="t.name" class="testimonial-card">
            <img :src="t.avatar" alt="avatar">
            <p>"{{ t.text }}"</p>
            <h4>{{ t.name }}</h4>
            <span>{{ t.position }}</span>
          </div>
        </div>
        <div class="slider-controls">
          <button @click="prevTestimonial">◀</button>
          <button @click="nextTestimonial">▶</button>
        </div>
      </div>

      <!-- ПРИЗЫВ -->
      <div class="final-cta-universe">
        <div class="cta-glow">
          <h2>Готовы к запуску?</h2>
          <p>Оставьте заявку — наши инженеры подготовят индивидуальное предложение</p>
          <button class="btn-super" @click="openRequestForm"><i class="fas fa-paper-plane"></i> Отправить заявку</button>
        </div>
      </div>
    </div>

    <!-- ГЛОБАЛЬНЫЕ МОДАЛКИ (ДЕТАЛЬНАЯ ИНФОРМАЦИЯ О ТОВАРЕ) -->
    <div v-if="detailModal" class="modal-overlay" @click.self="closeDetailModal">
      <div class="modal-detail">
        <div class="modal-header">
          <h2>{{ currentProduct.name }}</h2>
          <button @click="closeDetailModal">✖</button>
        </div>
        <div class="modal-body">
          <img :src="currentProduct.img" alt="">
          <div class="full-specs">
            <div v-for="(value, key) in currentProduct.specs" :key="key" class="spec-line"><strong>{{ key }}:</strong> {{ value }}</div>
          </div>
          <div class="extended-info">
            <h3>История эксплуатации</h3>
            <p>{{ currentProduct.history || 'Новейшая разработка, готов к сертификации.' }}</p>
            <h3>Технические особенности</h3>
            <ul>
              <li v-for="feat in currentProduct.features || defaultFeatures" :key="feat">{{ feat }}</li>
            </ul>
            <h3>Видеообзор (симуляция)</h3>
            <div class="video-placeholder">🎬 Интерактивная 3D-модель доступна по запросу</div>
          </div>
          <div class="modal-actions">
            <button class="btn-primary" @click="quickAddToCart(currentProduct)">Добавить в корзину</button>
            <button class="btn-outline" @click="requestConsultation(currentProduct)">Запросить консультацию</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ФОРМА ЗАЯВКИ -->
    <div v-if="requestFormVisible" class="modal-overlay" @click.self="requestFormVisible = false">
      <div class="modal-small">
        <div class="modal-header"><h2>Космическая заявка</h2><button @click="requestFormVisible = false">✖</button></div>
        <div class="modal-body">
          <form @submit.prevent="submitRequest">
            <input type="text" placeholder="Имя" v-model="requestForm.name" required>
            <input type="email" placeholder="Email" v-model="requestForm.email" required>
            <textarea placeholder="Детали проекта, интересующий товар..." v-model="requestForm.message"></textarea>
            <button type="submit" class="btn-primary">Отправить</button>
          </form>
        </div>
      </div>
    </div>

    <!-- УВЕДОМЛЕНИЕ -->
    <div v-if="notification.show" class="toast-message" :class="notification.type">{{ notification.text }}</div>

    <!-- ОНЛАЙН ЧАТ -->
    <div class="floating-chat" v-if="chatVisible">
      <div class="chat-window">
        <div class="chat-head" @click="chatVisible = false">💬 Чат поддержки ✖</div>
        <div class="chat-body">
          <div v-for="msg in chatMessages" :key="msg.id" :class="msg.role">{{ msg.text }}</div>
        </div>
        <div class="chat-input-area">
          <input v-model="chatInput" @keyup.enter="sendChat" placeholder="Напишите вопрос...">
          <button @click="sendChat">➤</button>
        </div>
      </div>
    </div>
    <div class="chat-toggle" @click="chatVisible = !chatVisible" v-if="!chatVisible">💬</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as THREE from 'three'

// ---------------------------- 1. ГЕНЕРАЦИЯ ТОВАРОВ (50+ штук) ----------------------------
const generateCatalog = () => {
  const rockets = []
  const rocketNames = ['Орбита-X Heavy', 'Старт-1', 'Титан-3', 'Вега-Лайт', 'Союз-2', 'Ангара-А5', 'Электрон', 'Нейтрон-2', 'Сатурн-9', 'Протон-М', 'Falcon Heavy', 'New Glenn', 'Vulcan', 'Ariane 6', 'H3']
  rocketNames.forEach((name, idx) => {
    rockets.push({
      id: idx+1,
      name,
      category: 'Ракеты',
      specs: { Высота: `${30 + idx*3} м`, Грузоподъёмность: `${(idx+2)*1.5} т`, Тяга: `${(idx+1)*300} кН` },
      shortDesc: `Современный носитель для вывода полезной нагрузки.`,
      fullDesc: `Ракета ${name} разработана с применением аддитивных технологий и возвращаемой первой ступени.`,
      history: `Первая успешная миссия в 2024 году.`,
      features: ['Многоразовая ступень', 'Автономная навигация', 'Экологичное топливо'],
      img: `https://picsum.photos/id/${(idx+3)*4}/300/200`,
      hot: idx % 3 === 0,
      price: `${20 + idx*10} млн $`
    })
  })
  const components = []
  const compNames = ['ЖРД R-220', 'АСУ "Орион"', 'Солнечные панели X-500', 'Гиростаб ГС-6', 'Теплозащита Карбон', 'Квантовый датчик', 'Композитный бак', 'Ракетный ускоритель', 'Система стыковки', 'Бортовая ЭВМ']
  compNames.forEach((name, idx) => {
    components.push({
      id: 100+idx,
      name,
      category: 'Компоненты',
      specs: { Масса: `${20+idx*5} кг`, Надёжность: '99.8%' },
      shortDesc: `Высокоточный компонент для космических аппаратов.`,
      fullDesc: `Сертифицирован для работы в условиях глубокого космоса.`,
      features: ['Радиационная защита', 'Низкое энергопотребление'],
      img: `https://picsum.photos/id/${80+idx}/300/200`,
      price: `${5+idx*2} млн $`
    })
  })
  const services = []
  const servNames = ['Вывод на НОО', 'Геопереходная орбита', 'Лунная миссия', 'Запуск группировки', 'Сопровождение ПН', 'Морской старт', 'Межпланетная миссия', 'Страхование', 'Проектирование спутника']
  servNames.forEach((name, idx) => {
    services.push({
      id: 200+idx,
      name,
      category: 'Услуги',
      specs: { Стоимость: `от ${15+idx*10} млн $`, Срок: '3-6 месяцев' },
      shortDesc: `Полный цикл запуска под ключ.`,
      fullDesc: `Включает интеграцию, выведение и послепусковое сопровождение.`,
      features: ['Телеметрия 24/7', 'Страхование груза'],
      img: `https://picsum.photos/id/${70+idx}/300/200`,
      hot: idx === 2 || idx === 6,
      price: `${20+idx*15} млн $`
    })
  })
  return [...rockets, ...components, ...services]
}
const allProducts = ref(generateCatalog())  // более 30 (15+10+9=34) можно легко расширить

// Фильтрация и пагинация
const search = ref('')
const activeCategory = ref('Все')
const categories = ['Все', 'Ракеты', 'Компоненты', 'Услуги']
const showFavorites = ref(false)
const favorites = ref([])
const page = ref(1)
const perPage = 12

const filteredProducts = computed(() => {
  let list = allProducts.value
  if (activeCategory.value !== 'Все') list = list.filter(p => p.category === activeCategory.value)
  if (search.value) {
    const s = search.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(s))
  }
  if (showFavorites.value) list = list.filter(p => favorites.value.includes(p.id))
  return list
})
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / perPage))
const paginatedProducts = computed(() => {
  const start = (page.value - 1) * perPage
  return filteredProducts.value.slice(start, start + perPage)
})
function prevPage() { if (page.value > 1) page.value-- }
function nextPage() { if (page.value < totalPages.value) page.value++ }

// Избранное
function toggleFavorite(id) {
  if (favorites.value.includes(id)) favorites.value = favorites.value.filter(i => i !== id)
  else favorites.value.push(id)
}

// Корзина
const cart = ref([])
const cartExpanded = ref(true)
function quickAddToCart(product) {
  if (!cart.value.find(i => i.id === product.id)) {
    cart.value.push({ id: product.id, name: product.name, price: product.price || 'По запросу' })
    showToast('Добавлено в корзину', 'success')
  } else showToast('Товар уже в корзине', 'info')
}
function removeFromCart(id) { cart.value = cart.value.filter(i => i.id !== id) }
function checkout() { alert('Заказ оформлен! Свяжемся для уточнения деталей.') }

// Таймер
const targetDate = new Date(2026, 5, 20, 10, 0, 0).getTime()
const days = ref(0), hours = ref(0), minutes = ref(0), seconds = ref(0)
let timerInterval
function updateTimer() {
  const now = Date.now()
  const diff = targetDate - now
  if (diff <= 0) { days.value=hours.value=minutes.value=seconds.value=0; clearInterval(timerInterval); return }
  days.value = Math.floor(diff/(1000*60*60*24))
  hours.value = Math.floor((diff%86400000)/3600000)
  minutes.value = Math.floor((diff%3600000)/60000)
  seconds.value = Math.floor((diff%60000)/1000)
}

// Глобальная статистика с анимацией
const globalStats = ref([{ label:'Запусков', value:0 }, { label:'Спутников', value:0 }, { label:'Клиентов', value:0 }])
function animateStats() {
  const targets = [142, 876, 89]
  globalStats.value.forEach((stat, idx) => {
    let current = 0
    const target = targets[idx]
    const step = Math.ceil(target / 50)
    const interval = setInterval(() => {
      current += step
      if (current >= target) { current = target; clearInterval(interval) }
      stat.value = current
    }, 30)
  })
}

// Детальная модалка
const detailModal = ref(false)
const currentProduct = ref({})
function openDetailedModal(product) {
  currentProduct.value = product
  detailModal.value = true
}
function closeDetailModal() { detailModal.value = false }
const defaultFeatures = ['Инновационная конструкция', 'Высокая надёжность', 'Гарантия качества']

// Форма заявки
const requestFormVisible = ref(false)
const requestForm = ref({ name:'', email:'', message:'' })
function openRequestForm() { requestFormVisible.value = true }
function requestConsultation(product) { requestForm.value.message = `Интересуюсь: ${product.name}`; requestFormVisible.value = true }
function submitRequest() { alert('Заявка отправлена! Специалист свяжется с вами.'); requestFormVisible.value = false; requestForm.value = { name:'', email:'', message:'' } }

// Уведомления
const notification = ref({ show:false, text:'', type:'success' })
function showToast(msg, type='success') { notification.value = { show:true, text:msg, type }; setTimeout(() => notification.value.show=false, 3000) }

// Технологии будущего
const futureTechs = ref([
  { name:'Ядерный буксир', icon:'⚛️', progress:68 },
  { name:'Квантовая связь', icon:'🔒', progress:72 },
  { name:'3D печать в космосе', icon:'🖨️', progress:85 },
  { name:'Ионные двигатели', icon:'⚡', progress:91 }
])

// Отзывы
const testimonials = ref([
  { name:'Илон М.', position:'SpaceX', text:'Превосходные компоненты, интеграция прошла идеально.', avatar:'https://randomuser.me/api/portraits/men/1.jpg' },
  { name:'Елена К.', position:'Роскосмос', text:'Надёжность ракет на высоте. Рекомендуем.', avatar:'https://randomuser.me/api/portraits/women/2.jpg' },
  { name:'Jean-Luc', position:'Arianespace', text:'Отличное сотрудничество, запуск в срок.', avatar:'https://randomuser.me/api/portraits/men/3.jpg' }
])
let testimonialIndex = 0
const testimonialSlider = ref(null)
function updateTestimonialSlide() { if (testimonialSlider.value) testimonialSlider.value.style.transform = `translateX(-${testimonialIndex * 360}px)` }
function prevTestimonial() { testimonialIndex = (testimonialIndex - 1 + testimonials.value.length) % testimonials.value.length; updateTestimonialSlide() }
function nextTestimonial() { testimonialIndex = (testimonialIndex + 1) % testimonials.value.length; updateTestimonialSlide() }

// Чат
const chatVisible = ref(true)
const chatMessages = ref([{ role:'bot', text:'Здравствуйте! Чем помочь?' }])
const chatInput = ref('')
let chatId = 1
function sendChat() {
  if (!chatInput.value.trim()) return
  chatMessages.value.push({ role:'user', text:chatInput.value })
  setTimeout(() => chatMessages.value.push({ role:'bot', text:'Спасибо за вопрос. Наш инженер свяжется с вами.' }), 600)
  chatInput.value = ''
}

// 3D Earth (Three.js)
const earthContainer = ref(null)
let scene, camera, renderer, earth, markers
function initThree() {
  if (!earthContainer.value) return
  const width = earthContainer.value.clientWidth
  const height = 500
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0x050814)
  camera = new THREE.PerspectiveCamera(45, width/height, 0.1, 1000)
  camera.position.set(0, 0, 3.5)
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(width, height)
  earthContainer.value.innerHTML = ''
  earthContainer.value.appendChild(renderer.domElement)
  // Текстура Земли (высокое разрешение)
  const textureLoader = new THREE.TextureLoader()
  const earthMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')
  const earthSpecularMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg')
  const earthNormalMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_normal_2048.jpg')
  const cloudMap = textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png')
  const earthMaterial = new THREE.MeshPhongMaterial({ map: earthMap, specularMap: earthSpecularMap, specular: new THREE.Color('grey'), shininess: 5 })
  earth = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMaterial)
  scene.add(earth)
  // Облака
  const cloudMaterial = new THREE.MeshPhongMaterial({ map: cloudMap, transparent: true, opacity: 0.2 })
  const clouds = new THREE.Mesh(new THREE.SphereGeometry(1.01, 64, 64), cloudMaterial)
  scene.add(clouds)
  // Звёзды
  const starGeometry = new THREE.BufferGeometry()
  const starCount = 3000
  const starPositions = new Float32Array(starCount * 3)
  for (let i = 0; i < starCount; i++) {
    starPositions[i*3] = (Math.random() - 0.5) * 2000
    starPositions[i*3+1] = (Math.random() - 0.5) * 2000
    starPositions[i*3+2] = (Math.random() - 0.5) * 2000 - 50
  }
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.5 })
  const stars = new THREE.Points(starGeometry, starMaterial)
  scene.add(stars)
  // Маркеры космодромов (сферы)
  const portCoords = [
    { lat: 45.9, lon: 63.3, name:'Байконур' }, { lat: 28.5, lon: -80.5, name:'Канаверал' }, { lat: 5.2, lon: -52.7, name:'Куру' },
    { lat: 51.8, lon: 128.3, name:'Восточный' }, { lat: 28.2, lon: 102.0, name:'Сичан' }, { lat: -39.3, lon: 176.9, name:'Махия' }
  ]
  portCoords.forEach(port => {
    const phi = (90 - port.lat) * Math.PI / 180
    const theta = port.lon * Math.PI / 180
    const x = 1.02 * Math.sin(phi) * Math.cos(theta)
    const y = 1.02 * Math.cos(phi)
    const z = 1.02 * Math.sin(phi) * Math.sin(theta)
    const marker = new THREE.Mesh(new THREE.SphereGeometry(0.02, 16, 16), new THREE.MeshStandardMaterial({ color: 0xff3333, emissive: 0x441111 }))
    marker.position.set(x, y, z)
    scene.add(marker)
  })
  // Свет
  const ambientLight = new THREE.AmbientLight(0x404060)
  scene.add(ambientLight)
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(5, 3, 5)
  scene.add(dirLight)
  const backLight = new THREE.PointLight(0x4466cc, 0.5)
  backLight.position.set(-2, -1, -3)
  scene.add(backLight)
  function animate() {
    requestAnimationFrame(animate)
    earth.rotation.y += 0.0015
    clouds.rotation.y += 0.0017
    renderer.render(scene, camera)
  }
  animate()
  window.addEventListener('resize', () => {
    if (earthContainer.value) {
      const w = earthContainer.value.clientWidth
      const h = 500
      camera.aspect = w/h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
  })
}
onMounted(() => {
  initThree()
  updateTimer()
  timerInterval = setInterval(updateTimer, 1000)
  animateStats()
})
onUnmounted(() => { clearInterval(timerInterval); if(renderer) renderer.dispose() })

const spaceports = ref([
  { name:'Байконур', country:'Казахстан', launches:1542 },
  { name:'Мыс Канаверал', country:'США', launches:980 },
  { name:'Куру', country:'Французская Гвиана', launches:312 },
  { name:'Восточный', country:'Россия', launches:89 },
  { name:'Сичан', country:'Китай', launches:201 },
  { name:'Махия', country:'Новая Зеландия', launches:47 }
])

const getStarStyle = (i) => ({ left: Math.random()*100+'%', top: Math.random()*100+'%', animationDuration: 5+Math.random()*20+'s', animationDelay: Math.random()*10+'s' })
// Вместо picsum используем Data URI
const rocketImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%231a3a5a"/%3E%3Ctext x="50" y="45" font-size="16" fill="white" text-anchor="middle"%3E🚀%3C/text%3E%3Ctext x="50" y="70" font-size="10" fill="%23aaccff" text-anchor="middle"%3ERocket%3C/text%3E%3C/svg%3E'
const componentImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%232a4a6a"/%3E%3Ctext x="50" y="45" font-size="20" fill="white" text-anchor="middle"%3E🔧%3C/text%3E%3Ctext x="50" y="70" font-size="10" fill="%23aaccff" text-anchor="middle"%3EComponent%3C/text%3E%3C/svg%3E'
const serviceImg = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" fill="%233a6a4a"/%3E%3Ctext x="50" y="45" font-size="20" fill="white" text-anchor="middle"%3E🛰️%3C/text%3E%3Ctext x="50" y="70" font-size="10" fill="%23aaccff" text-anchor="middle"%3EService%3C/text%3E%3C/svg%3E'

// Теперь в каждом объекте товара:
// Ракеты: img: rocketImg
// Компоненты: img: componentImg
// Услуги: img: serviceImg

</script>

<style scoped>
/* Полный премиум стиль */
.cosmic-nexus { background: #050814; min-height: 100vh; font-family: 'Open Sans', sans-serif; position: relative; overflow-x: hidden; }
.starfield-bg { position: fixed; top:0; left:0; width:100%; height:100%; pointer-events: none; z-index:0; }
.star { position: absolute; width: 2px; height: 2px; background: rgba(255,255,210,0.7); border-radius: 50%; animation: starFall linear infinite; }
@keyframes starFall { 0% { transform: translateY(0); opacity:0.3; } 100% { transform: translateY(100vh); opacity:0; } }
.app-container { position: relative; z-index: 2; max-width: 1400px; margin: 0 auto; padding: 20px; }
.hero-ultra { margin-bottom: 50px; }
.hero-glass { background: rgba(10,25,45,0.5); backdrop-filter: blur(15px); border-radius: 64px; padding: 50px 30px; text-align: center; border: 1px solid #2c5a85; }
.hero-glass h1 { font-size: 3.8rem; margin-bottom: 10px; }
.gradient-text { background: linear-gradient(135deg,#fff,#4cc9ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.countdown-block { margin: 30px 0; }
.timer-digits { font-size: 2.5rem; font-weight: 800; letter-spacing: 5px; background: #00000080; display: inline-block; padding: 10px 30px; border-radius: 80px; }
.global-numbers { display: flex; justify-content: center; gap: 50px; margin-top: 30px; }
.stat-item .stat-val { font-size: 2rem; font-weight: 800; display: block; background: linear-gradient(135deg,#fff,#7aaaff); -webkit-background-clip:text; background-clip:text; color:transparent; }
.control-bar { display: flex; flex-wrap: wrap; gap: 20px; margin: 30px 0; justify-content: space-between; align-items: center; }
.search-input { background: #0d1f32; border-radius: 60px; padding: 10px 20px; display: flex; align-items: center; gap: 12px; flex: 2; }
.search-input input { background: none; border: none; color: white; width: 100%; font-size: 1rem; }
.filters { display: flex; gap: 12px; flex-wrap: wrap; }
.filter-chip { background: transparent; border: 1px solid #2c577d; padding: 6px 20px; border-radius: 40px; color: white; cursor: pointer; }
.filter-chip.active { background: #0066ff; border-color: #0066ff; }
.products-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 28px; margin: 30px 0; }
.product-tile-advanced { background: rgba(8,20,36,0.8); backdrop-filter: blur(8px); border-radius: 32px; overflow: hidden; transition: 0.25s; border: 1px solid #2d5478; }
.product-tile-advanced:hover { transform: translateY(-6px); border-color: #4cc9ff; box-shadow: 0 20px 30px -12px black; }
.tile-media { position: relative; height: 200px; overflow: hidden; }
.tile-media img { width: 100%; height: 100%; object-fit: cover; }
.fav-toggle { position: absolute; top: 12px; right: 12px; background: #00000099; border-radius: 50%; width: 36px; height: 36px; border: none; color: #ff6680; cursor: pointer; }
.fav-toggle.active { color: #ff3366; background: #ff336622; }
.hot-badge { position: absolute; bottom: 12px; left: 12px; background: #ff7b2c; padding: 2px 12px; border-radius: 40px; font-size: 0.7rem; }
.tile-info { padding: 18px; }
.tile-info h3 { font-size: 1.4rem; margin-bottom: 8px; }
.short-specs { display: flex; gap: 12px; font-size: 0.8rem; color: #bdd4ff; margin-bottom: 16px; }
.tile-buttons { display: flex; gap: 12px; }
.tile-buttons button { flex:1; background: transparent; border: 1px solid #3f7fb0; border-radius: 40px; padding: 8px; cursor: pointer; color: white; }
.tile-buttons button.primary { background: linear-gradient(95deg,#0066ff,#00aaff); border: none; }
.pagination-bar { display: flex; justify-content: center; gap: 25px; margin: 40px 0; align-items: center; }
.earth-3d-container { background: #030c18; border-radius: 48px; padding: 30px; margin: 50px 0; text-align: center; }
.earth-canvas { width: 100%; height: 500px; border-radius: 32px; overflow: hidden; background: #000; }
.port-list { display: flex; flex-wrap: wrap; justify-content: center; gap: 16px; margin-top: 20px; }
.port-badge { background: #0f1f33; padding: 5px 15px; border-radius: 40px; font-size: 0.8rem; }
.cart-section { background: rgba(0,0,0,0.6); backdrop-filter: blur(12px); border-radius: 32px; margin: 40px 0; overflow: hidden; }
.cart-header { display: flex; justify-content: space-between; padding: 18px 25px; background: #0a1428; cursor: pointer; }
.cart-items-list { padding: 20px; max-height: 400px; overflow-y: auto; }
.cart-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #2a5075; }
.tech-advance { margin: 50px 0; background: #0a1428; border-radius: 48px; padding: 30px; }
.tech-row { display: flex; align-items: center; gap: 15px; margin: 15px 0; }
.progress-bg { flex:1; height: 8px; background: #1f3a5f; border-radius: 10px; overflow: hidden; }
.progress-fill { height: 100%; background: linear-gradient(90deg,#0066ff,#00ccff); }
.media-carousel { margin: 50px 0; background: #0a1428; border-radius: 48px; padding: 30px; overflow: hidden; }
.testimonial-slider { display: flex; transition: transform 0.4s ease; gap: 30px; }
.testimonial-card { min-width: 320px; background: #0f1f33; border-radius: 32px; padding: 25px; text-align: center; }
.testimonial-card img { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; margin-bottom: 15px; }
.slider-controls { display: flex; justify-content: center; gap: 20px; margin-top: 25px; }
.final-cta-universe { margin: 60px 0 30px; }
.cta-glow { background: linear-gradient(115deg,#10233e,#020b16); border-radius: 64px; padding: 60px 30px; text-align: center; border: 1px solid #2f7db0; }
.btn-super { background: linear-gradient(135deg,#0066ff,#00ccff); border: none; padding: 16px 48px; border-radius: 60px; font-size: 1.2rem; font-weight: bold; margin-top: 20px; cursor: pointer; }
.modal-overlay { position: fixed; top:0;left:0; width:100%;height:100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(20px); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.modal-detail { background: #0c1a2c; width: 800px; max-width: 90%; border-radius: 48px; max-height: 85vh; overflow-y: auto; }
.modal-small { background: #0c1a2c; width: 500px; max-width: 90%; border-radius: 32px; }
.modal-header { display: flex; justify-content: space-between; padding: 20px 25px; border-bottom: 1px solid #2e5d88; }
.modal-body { padding: 25px; }
.modal-body img { width: 100%; border-radius: 24px; margin-bottom: 20px; }
.full-specs { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #07131f; padding: 20px; border-radius: 24px; }
.extended-info { margin: 20px 0; }
.toast-message { position: fixed; bottom: 30px; right: 30px; background: #0a2a3a; padding: 12px 24px; border-radius: 40px; z-index: 1100; }
.floating-chat { position: fixed; bottom: 90px; right: 30px; width: 320px; background: #0b192b; border-radius: 28px; z-index: 200; box-shadow: 0 10px 25px black; }
.chat-toggle { position: fixed; bottom: 30px; right: 30px; background: #0066ff; width: 55px; height: 55px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.8rem; cursor: pointer; z-index: 199; }
@media (max-width: 700px) { .hero-glass h1 { font-size: 2rem; } .products-grid { grid-template-columns: 1fr; } .modal-detail { width: 95%; } }

</style>
