<template>
  <div class="universal-cosmos">
    <div class="main-wrap">
      <div class="content-area">
        <!-- Hero секция (без таймера) -->
        <section class="hero-super">
          <div class="hero-text">
            <h1>КОСМИЧЕСКИЙ <span class="glow">КАТАЛОГ</span></h1>
            <p>Ракеты, компоненты и запуски — всё в одном месте</p>
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
            <button class="filter-btn cart-btn" @click="cartOpen = !cartOpen">
              <i class="fas fa-shopping-cart"></i> Корзина ({{ cart.length }})
            </button>
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
            <button class="checkout-btn" @click="openPaymentModal">Оформить заказ</button>
          </div>
        </div>

        <!-- Сетка товаров (6 карточек на страницу) -->
        <div class="infinite-grid">
          <div v-for="item in paginatedItems" :key="item.id" class="product-card-super">
            <div class="img-wrap">
              <img :src="item.img" :alt="item.name" loading="lazy">
              <button class="cart-add-sticker" @click="addToCart(item)">
                <i class="fas fa-cart-plus"></i>
              </button>
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

        <!-- 3D-глобус -->
        <div class="globe-section">
          <h2><i class="fas fa-globe-americas"></i> Космодромы мира</h2>
          <div ref="globeContainer" class="globe-container"></div>
          <p class="globe-hint">Перетащите мышью для вращения</p>
        </div>

        <!-- Отзывы клиентов -->
        <div class="testimonials-section">
          <h2><i class="fas fa-quote-left"></i> Отзывы наших клиентов</h2>
          <div class="testimonials-grid">
            <div class="testimonial-card" v-for="review in reviews" :key="review.id">
              <img :src="review.avatar" alt="avatar" class="testimonial-avatar">
              <p class="testimonial-text">"{{ review.text }}"</p>
              <h4 class="testimonial-name">{{ review.name }}</h4>
              <span class="testimonial-title">{{ review.title }}</span>
            </div>
          </div>
        </div>

        <!-- Призыв к действию -->
        <div class="final-glory">
          <div class="glory-inner">
            <h2>Готовы запустить свой проект?</h2>
            <p>Станьте частью космической индустрии — оставьте заявку</p>
            <button class="btn-giant" @click="openRequestForm">Связаться с нами</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно деталей товара (без кнопки "Запросить коммерческое предложение") -->
    <div v-if="modalOpen" class="modal-overlay" @click.self="modalOpen = false">
      <div class="modal-big">
        <div class="modal-header">
          <h2>{{ modalData.name }}</h2>
          <button class="close-x" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <img :src="modalData.img" :alt="modalData.name" class="modal-img">
          <div class="detail-specs">
            <div v-for="(val, key) in modalData.specs" :key="key"><strong>{{ key }}:</strong> {{ val }}</div>
          </div>
          <p class="full-desc">{{ modalData.fullDesc }}</p>
          <!-- Кнопка удалена -->
        </div>
      </div>
    </div>

    <!-- Модальное окно оплаты -->
    <div v-if="paymentModalOpen" class="modal-overlay" @click.self="closePaymentModal">
      <div class="modal-big payment-modal">
        <div class="modal-header">
          <h2>Оплата заказа</h2>
          <button class="close-x" @click="closePaymentModal">×</button>
        </div>
        <div class="modal-body">
          <form novalidate @submit.prevent="processPayment">
            <input type="text" v-model="payment.cardNumber" placeholder="Номер карты (16 цифр)" maxlength="19" @input="formatCardNumber">
            <div class="row">
              <input type="text" v-model="payment.expiry" placeholder="ММ/ГГ" maxlength="5" @input="formatExpiry">
              <input type="text" v-model="payment.cvv" placeholder="CVV" maxlength="3">
            </div>
            <button type="submit" class="btn-primary pay-btn">Оплатить</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Форма заявки -->
    <div v-if="formVisible" class="modal-overlay" @click.self="formVisible = false">
      <div class="modal-big">
        <div class="modal-header">
          <h2>Космическая заявка</h2>
          <button class="close-x" @click="formVisible = false">×</button>
        </div>
        <div class="modal-body">
          <form novalidate @submit.prevent="submitFinalForm">
            <input type="text" placeholder="Ваше имя" v-model="formData.name">
            <input type="email" placeholder="Email" v-model="formData.email">
            <textarea placeholder="Описание проекта" v-model="formData.message"></textarea>
            <button type="submit" class="btn-primary form-submit">Отправить</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Уведомления -->
    <div v-if="toastMsg" class="toast" :class="toastType">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

// ===================== КАТАЛОГ ТОВАРОВ (оставлен полным, но отображается по 6) =====================
const generateItems = () => {
  const rockets = [
    { name: 'SpaceX Falcon Heavy', height:'70m', payload:'63.8t', thrust:'22800kN', img:'/images/ракета4.PNG', fullDesc:'Сверхтяжёлый носитель для Луны и Марса.', modelType:'rocket' },
    { name: 'Рокот (Старт-1)', height:'28m', payload:'2.5t', thrust:'450kN', img:'/images/рак7.PNG', fullDesc:'Лёгкий носитель для малых спутников.', modelType:'rocket' },
    { name: 'Титан-3', height:'74m', payload:'36t', thrust:'4200kN', img:'/images/рак8.PNG', fullDesc:'Флагман для марсианских экспедиций.', modelType:'rocket' },
    { name: 'Союз-2', height:'46m', payload:'7.5t', thrust:'950kN', img:'/images/ракета3.PNG', fullDesc:'Классическая надёжность.', modelType:'rocket' },
    { name: 'Ангара-А5', height:'55m', payload:'24t', thrust:'2600kN', img:'/images/рак7.PNG', fullDesc:'Тяжёлый носитель нового поколения.', modelType:'rocket' },
    { name: 'Электрон', height:'17m', payload:'0.3t', thrust:'50kN', img:'/images/рак6.PNG', fullDesc:'Сверхлёгкий для малых спутников.', modelType:'rocket' },
    { name: 'Нейтрон (Neutron)', height:'40m', payload:'13t', thrust:'1450kN', img:'/images/ракета 2.PNG', fullDesc:'Средний класс с возвращаемой ступенью.', modelType:'rocket' },
    { name: 'Сатурн-5', height:'110m', payload:'140t', thrust:'35000kN', img:'/images/рак10.PNG', fullDesc:'Ультратяжёлый для пилотируемых экспедиций.', modelType:'rocket' },
    { name: 'Вега (Vega)', height:'30m', payload:'1.8t', thrust:'300kN', img:'/images/рак12.PNG', fullDesc:'Экономичный запуск малых аппаратов.', modelType:'rocket' },
    { name: 'Falcon 9', height:'70m', payload:'22.8t', thrust:'7600kN', img:'/images/рак11.PNG', fullDesc:'Многоразовый носитель среднего класса.', modelType:'rocket' },
    { name: 'CAS Space – Kinetica 2', height:'53 м', payload:'6.5 т', thrust:'1100 кН', img:'/рак6.PNG', fullDesc:'Китайская многоразовая ракета среднего класса.', modelType:'rocket' },
    { name: 'Великий поход-9 (CZ-9)', height:'103 м', payload:'140 т', thrust:'6000+ кН', img:'/рак11.PNG', fullDesc:'Сверхтяжёлая ракета Китая для Луны.', modelType:'rocket' },
    { name: 'SpaceX Starship', height:'120 м', payload:'100 т', thrust:'76000 кН', img:'/ракета1.PNG', fullDesc:'Полностью многоразовая ракета SpaceX.', modelType:'rocket' }
  ]
  const components = [
    { name: 'ЖРД RS-25', mass:'320kg', thrust:'190kN', img:'https://picsum.photos/id/33/300/200', fullDesc:'Кислородно-водородный двигатель.', modelType:'engine' },
    { name: 'АСУ "Орион"', mass:'45kg', power:'85W', img:'https://picsum.photos/id/77/300/200', fullDesc:'ИИ для автономной навигации.', modelType:'computer' },
    { name: 'Солнечные панели МКС', mass:'120kg', power:'12kW', img:'https://picsum.photos/id/106/300/200', fullDesc:'Высокоэффективные фотоэлементы.', modelType:'panel' },
    { name: 'Гиростабилизатор', precision:'0.001°', img:'https://picsum.photos/id/91/300/200', fullDesc:'Точнейшая ориентация.', modelType:'gyro' },
    { name: 'Теплозащита PICA', temp:'2200°C', img:'https://picsum.photos/id/51/300/200', fullDesc:'Многоразовая абляция.', modelType:'tps' },
    { name: 'Квантовый датчик', accuracy:'0.1″', img:'https://picsum.photos/id/62/300/200', fullDesc:'Абсолютная навигация.', modelType:'sensor' },
    { name: 'Композитный бак', volume:'12m³', img:'https://picsum.photos/id/85/300/200', fullDesc:'Облегчённый криобак.', modelType:'tank' },
    { name: 'Твердотопливный ускоритель', thrust:'1200kN', time:'120с', img:'https://picsum.photos/id/108/300/200', fullDesc:'Твердотопливный ускоритель.', modelType:'booster' }
  ]
  const services = [
    { name: 'Вывод на НОО', price:'$25 млн', payload:'до 8т', img:'https://picsum.photos/id/0/300/200', fullDesc:'Низкая опорная орбита.', modelType:'service' },
    { name: 'Геопереходная орбита', price:'$45 млн', payload:'до 5т', img:'https://picsum.photos/id/1/300/200', fullDesc:'Для спутников связи.', modelType:'service' },
    { name: 'Лунная миссия', price:'$120 млн', payload:'до 3т', img:'https://picsum.photos/id/2/300/200', fullDesc:'Доставка модулей на Луну.', modelType:'service' },
    { name: 'Запуск группировки', price:'договорная', satellites:'до 60', img:'https://picsum.photos/id/3/300/200', fullDesc:'Кластерный запуск.', modelType:'service' },
    { name: 'Сопровождение ПН', price:'$2 млн', img:'https://picsum.photos/id/5/300/200', fullDesc:'Интеграция и тестирование.', modelType:'service' },
    { name: 'Морской старт', price:'$35 млн', img:'https://picsum.photos/id/6/300/200', fullDesc:'Запуск с океанской платформы.', modelType:'service' },
    { name: 'Межпланетная миссия', price:'$180 млн', target:'Марс, Венера', img:'https://picsum.photos/id/7/300/200', fullDesc:'Полный цикл.', modelType:'service' },
    { name: 'Страхование', price:'от 5%', img:'https://picsum.photos/id/8/300/200', fullDesc:'Финансовая защита.', modelType:'service' }
  ]
  let id = 1
  const all = []
  rockets.forEach(r => { all.push({ id: id++, category: 'Ракеты', specs: { Высота: r.height, 'Грузоподъёмность': r.payload, Тяга: r.thrust }, shortDesc: r.name, fullDesc: r.fullDesc, img: r.img, name: r.name, modelType: r.modelType }) })
  components.forEach(c => { all.push({ id: id++, category: 'Компоненты', specs: { Масса: c.mass, Характеристика: c.thrust || c.power || c.precision || c.accuracy || c.volume || c.temp }, shortDesc: c.name, fullDesc: c.fullDesc, img: c.img, name: c.name, modelType: c.modelType }) })
  services.forEach(s => { all.push({ id: id++, category: 'Услуги', specs: { Цена: s.price, Масса: s.payload || s.satellites || s.target || '—' }, shortDesc: s.name, fullDesc: s.fullDesc, img: s.img, name: s.name, modelType: s.modelType }) })
  return all
}
const allItems = ref(generateItems())

// Фильтрация, поиск, пагинация (6 товаров на страницу)
const searchQuery = ref('')
const activeCat = ref('Все')
const allCategories = ['Все', 'Ракеты', 'Компоненты', 'Услуги']
const currentPage = ref(1)
const itemsPerPage = 6     // уменьшено в 2 раза

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

// Корзина и оплата
const cart = ref([])
const cartOpen = ref(false)
const paymentModalOpen = ref(false)
const payment = ref({ cardNumber: '', expiry: '', cvv: '' })

function addToCart(item) {
  if (!cart.value.find(i => i.id === item.id)) {
    cart.value.push({ id: item.id, name: item.name })
    showToast('Товар добавлен в корзину', 'success')
  } else {
    showToast('Товар уже в корзине', 'info')
  }
}
function removeFromCart(id) { cart.value = cart.value.filter(i => i.id !== id) }
function openPaymentModal() {
  if (cart.value.length === 0) {
    showToast('Корзина пуста. Добавьте товары перед оформлением.', 'error')
    return
  }
  paymentModalOpen.value = true
}
function closePaymentModal() { paymentModalOpen.value = false; payment.value = { cardNumber: '', expiry: '', cvv: '' } }
function formatCardNumber(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 16)
  val = val.replace(/(\d{4})(?=\d)/g, '$1 ')
  payment.value.cardNumber = val
}
function formatExpiry(e) {
  let val = e.target.value.replace(/\D/g, '').substring(0, 4)
  if (val.length >= 3) val = val.substring(0,2) + '/' + val.substring(2)
  payment.value.expiry = val
}
function processPayment() {
  const cardNum = payment.value.cardNumber.replace(/\s/g, '')
  if (cardNum.length !== 16) { showToast('Введите корректный номер карты (16 цифр)', 'error'); return }
  if (!payment.value.expiry.match(/^\d{2}\/\d{2}$/)) { showToast('Введите срок в формате ММ/ГГ', 'error'); return }
  if (payment.value.cvv.length !== 3) { showToast('CVV должен содержать 3 цифры', 'error'); return }
  showToast('✅ Спасибо за заказ! Ваш заказ успешно оформлен.', 'success')
  cart.value = []
  closePaymentModal()
}

// Статистика
const bigStats = ref([
  { label: 'Спутников запущено', value: 187 },
  { label: 'Клиентов', value: 56 },
  { label: 'Успешных миссий', value: 142 }
])

// ===================== 3D-ГЛОБУС =====================
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
  const starCount = 1500
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

// Отзывы
const reviews = ref([
  {
    id: 1,
    name: 'Илья Маслов',
    title: 'Главный инженер Роскосмос',
    text: 'Технологии SpaceTech позволили сократить время подготовки запуска на 40%. Надёжность компонентов впечатляет.',
    avatar: '/images/businessman-with-a-goatee-beard_480x480.webp'
  },
  {
    id: 2,
    name: 'Екатерина Ветрова',
    title: 'Руководитель отдела спутниковой связи',
    text: 'Отличный каталог, удобная фильтрация и быстрая корзина. 3D-глобус помогает визуализировать космодромы.',
    avatar: '/images/positivo-feliz-caucasico-maduro-hombre-mediana-edad-sonriendo-sonrisa-dentada-usando-gafas-mostrando-bien-gesto-ambas-manos-aisladas-fondo-blanco_650366-6207.avif'
  },
  {
    id: 3,
    name: 'Дмитрий Орлов',
    title: 'Директор по развитию SpaceX Projects',
    text: 'Мы используем этот сервис для планирования миссий. Реалистичные модели и оперативная поддержка — на высоте.',
    avatar: '/images/i (12).webp'
  }
])

// Модальное окно товара (без кнопки "Запросить коммерческое предложение")
const modalOpen = ref(false)
const modalData = ref({})
function closeModal() { modalOpen.value = false }
function openModal(item) {
  modalData.value = item
  modalOpen.value = true
}

// Форма заявки
const formVisible = ref(false)
const formData = ref({ name:'', email:'', message:'' })
function quickOrder(item) { formData.value.message = `Интересуюсь: ${item.name}`; formVisible.value = true }
function openRequestForm() { formVisible.value = true }

function submitFinalForm() {
  if (!formData.value.name || !formData.value.email) {
    showToast('Пожалуйста, заполните имя и email', 'error')
    return
  }
  showToast('Заявка отправлена! Свяжемся с вами в ближайшее время.', 'success')
  formVisible.value = false
  formData.value = { name:'', email:'', message:'' }
}

async function submitFinalForm() {
  try {
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });

    if (response.ok) {
      alert('✅ Заявка успешно отправлена! Мы свяжемся с вами.');
      formVisible.value = false;
      formData.value = { name: '', email: '', message: '' };
    } else {
      const err = await response.json();
      alert('❌ Ошибка: ' + (err.error || 'Не удалось отправить'));
    }
  } catch (error) {
    console.error('Ошибка сети:', error);
    alert('️ Нет связи с сервером. Убедитесь, что бэкенд запущен на порту 3000.');
  }
}

// Карусель
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


// Уведомления
const toastMsg = ref('')
const toastType = ref('success')
function showToast(msg, type='success') { toastMsg.value = msg; toastType.value = type; setTimeout(() => toastMsg.value = '', 3000) }
</script>

<style scoped>
/* ----- ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ (СОГЛАСНО ВАШЕМУ СТИЛЮ) ----- */
:root {
  --bg: #050814;
  --bg-soft: #091020;
  --text: #ffffff;
  --text-soft: #b8c7df;
  --blue: #4da3ff;
  --orange: #ff9f43;
  --orange-dark: #ff7a45;
  --border: rgba(132, 179, 255, 0.22);
  --card: rgba(255, 255, 255, 0.045);
  --shadow: 0 24px 80px rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.universal-cosmos {
  background: var(--bg);
  min-height: 100vh;
  font-family: 'Open Sans', 'Montserrat', Arial, sans-serif;
  color: var(--text);
}

.main-wrap {
  max-width: 1500px;
  margin: 0 auto;
  padding: 20px;
}

/* Hero секция (без таймера) */
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
.hero-text h1 {
  font-size: 3rem;
  margin-bottom: 10px;
}
.glow {
  background: linear-gradient(135deg, var(--blue), var(--orange));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-stats {
  display: flex;
  gap: 40px;
}
.stat .num {
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, var(--blue));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.stat .lab {
  font-size: 0.85rem;
  color: var(--text-soft);
}

/* Поиск и фильтры */
.toolbar {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  margin: 30px 0;
}
.search-area {
  background: var(--bg-soft);
  border-radius: 60px;
  padding: 8px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 2;
  border: 1px solid var(--border);
}
.search-area input {
  background: none;
  border: none;
  color: var(--text);
  width: 100%;
  font-size: 1rem;
  outline: none;
}
.filter-group {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
.filter-btn {
  background: transparent;
  border: 1px solid var(--border);
  padding: 6px 20px;
  border-radius: 40px;
  color: var(--text-soft);
  cursor: pointer;
  transition: all 0.2s;
}
.filter-btn.active {
  background: var(--blue);
  border-color: var(--blue);
  color: white;
}
.filter-btn:hover:not(.active) {
  border-color: var(--blue);
  color: var(--blue);
}

/* Корзина */
.cart-panel {
  background: var(--bg-soft);
  backdrop-filter: blur(12px);
  border-radius: 32px;
  padding: 20px;
  margin-bottom: 30px;
  border: 1px solid var(--border);
}
.cart-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  padding-bottom: 12px;
}
.cart-items {
  max-height: 200px;
  overflow-y: auto;
  margin: 15px 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  color: var(--text-soft);
}
.empty-cart {
  text-align: center;
  padding: 20px;
  color: var(--text-soft);
}
.cart-footer {
  margin-top: 15px;
  text-align: center;
}
.checkout-btn {
  background: transparent;
  border: 1px solid var(--border);
  padding: 8px 20px;
  border-radius: 40px;
  color: var(--text);
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}
.checkout-btn:hover {
  border-color: var(--blue);
  background: rgba(77, 163, 255, 0.1);
}

/* Сетка товаров (6 карточек) */
.infinite-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 32px;
}
.product-card-super {
  background: var(--card);
  backdrop-filter: blur(8px);
  border-radius: 32px;
  overflow: hidden;
  transition: 0.2s;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
}
.product-card-super:hover {
  transform: translateY(-4px);
  border-color: var(--blue);
}
.img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: #0a1a2a;
}
.img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
  transition: transform 0.3s ease;
}
.product-card-super:hover .img-wrap img {
  transform: scale(1.02);
}
/* Стикер корзины – круглая кнопка в углу */
.cart-add-sticker {
  position: absolute;
  bottom: 12px;
  right: 12px;
  background: var(--orange);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 2;
}
.cart-add-sticker:hover {
  background: var(--orange-dark);
  transform: scale(1.05);
}
.info {
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.info h3 {
  font-size: 1.6rem;
  margin-bottom: 12px;
  color: var(--text);
}
.specs-mini div {
  font-size: 0.9rem;
  display: inline-block;
  background: rgba(255,255,255,0.05);
  padding: 4px 12px;
  border-radius: 30px;
  margin-right: 8px;
  margin-bottom: 8px;
  color: var(--text-soft);
}
.action-buttons {
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
}
.action-buttons button {
  flex:1;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 40px;
  padding: 8px;
  cursor: pointer;
  color: var(--text);
  font-weight: 500;
  transition: all 0.2s;
}
.action-buttons button:hover {
  border-color: var(--blue);
  color: var(--blue);
}
.action-buttons button.primary {
  background: linear-gradient(135deg, var(--orange-dark), var(--orange));
  border: none;
  color: white;
}
.action-buttons button.primary:hover {
  background: linear-gradient(135deg, var(--orange), var(--orange-dark));
  transform: translateY(-2px);
}

/* Пагинация */
.pagination {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}
.pagination button {
  background: var(--bg-soft);
  border: 1px solid var(--border);
  padding: 8px 20px;
  border-radius: 40px;
  color: var(--text);
  cursor: pointer;
}
.pagination button:disabled {
  opacity: 0.5;
  cursor: default;
}
.pagination button:hover:not(:disabled) {
  border-color: var(--blue);
  color: var(--blue);
}

/* Глобус */
.globe-section {
  background: var(--bg-soft);
  border-radius: 48px;
  padding: 30px;
  margin: 40px 0;
  text-align: center;
}
.globe-container {
  width: 100%;
  height: 400px;
  background: #021020;
  border-radius: 28px;
  cursor: grab;
}

/* Отзывы */
.testimonials-section {
  background: var(--bg-soft);
  border-radius: 48px;
  padding: 40px;
  margin: 40px 0;
  text-align: center;
}
.testimonials-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}
.testimonial-card {
  background: var(--card);
  backdrop-filter: blur(8px);
  border-radius: 32px;
  padding: 30px;
  width: 320px;
  transition: transform 0.3s;
  border: 1px solid var(--border);
}
.testimonial-card:hover {
  transform: translateY(-8px);
  border-color: var(--blue);
}
.testimonial-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
  border: 3px solid var(--blue);
}
.testimonial-text {
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-soft);
  margin-bottom: 20px;
  font-style: italic;
}
.testimonial-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--text);
  margin-bottom: 5px;
}
.testimonial-title {
  font-size: 0.85rem;
  color: var(--blue);
}

/* Призыв */
.final-glory {
  margin: 60px 0 20px;
}
.glory-inner {
  background: linear-gradient(115deg, #10233e, #020b16);
  border-radius: 64px;
  padding: 50px 30px;
  text-align: center;
  border: 1px solid var(--border);
}
.btn-giant {
  background: linear-gradient(135deg, var(--orange-dark), var(--orange));
  border: none;
  padding: 16px 48px;
  border-radius: 60px;
  font-size: 1.2rem;
  font-weight: bold;
  margin-top: 20px;
  cursor: pointer;
  color: white;
}
.btn-giant:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 122, 69, 0.4);
}

/* Модальные окна */
.modal-overlay {
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-big {
  background: var(--bg-soft);
  width: 700px;
  max-width: 90%;
  border-radius: 32px;
  max-height: 85vh;
  overflow-y: auto;
  border: 1px solid var(--border);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--border);
}
.close-x {
  background: none;
  border: none;
  font-size: 2rem;
  color: var(--text);
  cursor: pointer;
}
.modal-body {
  padding: 25px;
}
.modal-img {
  width: 100%;
  border-radius: 24px;
  margin-bottom: 20px;
}
.detail-specs {
  background: rgba(0,0,0,0.3);
  padding: 15px;
  border-radius: 24px;
  margin: 15px 0;
}
.full-desc {
  margin: 15px 0;
  line-height: 1.5;
  color: var(--text-soft);
}
/* Форма оплаты */
.payment-modal .modal-big {
  max-width: 450px;
}
form input, form textarea {
  width: 100%;
  margin: 8px 0;
  padding: 12px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 40px;
  color: var(--text);
  outline: none;
}
form .row {
  display: flex;
  gap: 15px;
}
.form-submit, .pay-btn {
  background: var(--orange) !important;
  color: white !important;
  border: none !important;
  border-radius: 40px;
  padding: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
}
.form-submit:hover, .pay-btn:hover {
  background: var(--orange-dark) !important;
  transform: translateY(-2px);
}
.toast {
  position: fixed;
  bottom: 100px;
  right: 30px;
  background: #000000cc;
  color: white;
  padding: 12px 24px;
  border-radius: 40px;
  z-index: 2100;
  backdrop-filter: blur(8px);
}
.toast.success { border-left: 4px solid var(--blue); }
.toast.error { border-left: 4px solid #ff4444; }
.toast.info { border-left: 4px solid var(--orange); }

/* Адаптивность */
@media (max-width: 1000px) {
  .hero-super { flex-direction: column; text-align: center; margin-top: 120px; }
  .hero-stats { margin-top: 20px; }
  .toolbar { flex-direction: column; }
  .testimonials-grid { flex-direction: column; align-items: center; }
  .infinite-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
}
@media (max-width: 768px) {
  .hero-text h1 { font-size: 2rem; }
  .info h3 { font-size: 1.4rem; }
}
</style>