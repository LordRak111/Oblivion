<template>
  <main class="projects-page">
    <section class="projects-hero">
      <div class="projects-hero__content">
        <nav class="breadcrumbs" aria-label="Навигация">
          <a href="/">Главная</a>
          <span>/</span>
          <span>Проекты</span>
        </nav>

        <p class="projects-hero__label">OBLIVIONE RAGE</p>

        <h1>Проекты компании</h1>

        <p class="projects-hero__text">
          В этом разделе представлены реализованные, текущие и перспективные
          проекты компании в области частного ракетостроения, спутниковых
          платформ и испытательных систем.
        </p>

        <div class="projects-stats">
          <div class="projects-stat">
            <span>{{ projects.length }}</span>
            <p>проектов</p>
          </div>

          <div class="projects-stat">
            <span>{{ completedCount }}</span>
            <p>реализовано</p>
          </div>

          <div class="projects-stat">
            <span>{{ currentCount }}</span>
            <p>в разработке</p>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-section">
      <div class="projects-section__top">
        <div>
          <p class="section-label">портфель проектов</p>
          <h2>Космические разработки</h2>
        </div>

        <div class="projects-controls">
          <label class="projects-search">
            <span>Поиск проекта</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Например: спутник, двигатель, ORBITA"
            />
          </label>

          <div class="projects-filters">
            <button
              v-for="filter in filters"
              :key="filter.value"
              class="projects-filter"
              :class="{ active: activeFilter === filter.value }"
              @click="activeFilter = filter.value"
            >
              {{ filter.label }}
            </button>
          </div>
        </div>
      </div>

      <div v-if="filteredProjects.length" class="projects-grid">
        <article
          v-for="project in filteredProjects"
          :key="project.id"
          class="project-card"
        >
          <div class="project-card__image">
            <img :src="project.image" :alt="project.title" />

            <span class="project-card__status" :class="project.statusClass">
              {{ project.statusText }}
            </span>
          </div>

          <div class="project-card__content">
            <div class="project-card__date">
              {{ project.date }}
            </div>

            <h3>{{ project.title }}</h3>

            <p class="project-card__description">
              {{ project.description }}
            </p>

            <div class="project-card__result">
              <span>Результат:</span>
              <p>{{ project.result }}</p>
            </div>

            <button class="project-card__button" @click="openProject(project)">
              Подробнее
            </button>
          </div>
        </article>
      </div>

      <div v-else class="projects-empty">
        <h3>Проекты не найдены</h3>
        <p>Попробуйте изменить запрос поиска или выбрать другой статус.</p>
      </div>
    </section>

    <section class="projects-results">
      <div class="projects-results__content">
        <p class="section-label">результаты</p>

        <h2>Что уже достигнуто</h2>

        <div class="results-list">
          <div class="result-item">
            <span>01</span>
            <p>Проведены стендовые испытания ракетных двигателей.</p>
          </div>

          <div class="result-item">
            <span>02</span>
            <p>Разработаны прототипы спутниковых платформ.</p>
          </div>

          <div class="result-item">
            <span>03</span>
            <p>Получены данные телеметрии для модернизации систем управления.</p>
          </div>

          <div class="result-item">
            <span>04</span>
            <p>Подготовлена база для сотрудничества с инвесторами и партнёрами.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="projects-gallery">
      <div class="projects-gallery__top">
        <p class="section-label">галерея</p>
        <h2>Фото и визуализации проектов</h2>
      </div>

      <div class="gallery-grid">
        <div
          v-for="image in galleryImages"
          :key="image.id"
          class="gallery-card"
        >
          <img :src="image.src" :alt="image.alt" />
          <span>{{ image.title }}</span>
        </div>
      </div>
    </section>

    <div
      v-if="selectedProject"
      class="project-modal"
      @click.self="closeModal"
    >
      <div class="project-modal__window">
        <button class="project-modal__close" @click="closeModal">
          ×
        </button>

        <div class="project-modal__image">
          <img :src="selectedProject.image" :alt="selectedProject.title" />
        </div>

        <div class="project-modal__content">
          <span
            class="project-modal__status"
            :class="selectedProject.statusClass"
          >
            {{ selectedProject.statusText }}
          </span>

          <h2>{{ selectedProject.title }}</h2>

          <p class="project-modal__date">
            Срок реализации: {{ selectedProject.date }}
          </p>

          <div class="project-modal__block">
            <h3>Цель проекта</h3>
            <p>{{ selectedProject.goal }}</p>
          </div>

          <div class="project-modal__block">
            <h3>Описание</h3>
            <p>{{ selectedProject.description }}</p>
          </div>

          <div class="project-modal__block">
            <h3>Технологии</h3>
            <ul>
              <li
                v-for="technology in selectedProject.technologies"
                :key="technology"
              >
                {{ technology }}
              </li>
            </ul>
          </div>

          <div class="project-modal__block">
            <h3>Этапы работы</h3>
            <ul>
              <li
                v-for="stage in selectedProject.stages"
                :key="stage"
              >
                {{ stage }}
              </li>
            </ul>
          </div>

          <div class="project-modal__block">
            <h3>Итоговый результат</h3>
            <p>{{ selectedProject.result }}</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import '../styles/projects.css'

const activeFilter = ref('all')
const searchQuery = ref('')
const selectedProject = ref(null)

const filters = [
  { label: 'Все', value: 'all' },
  { label: 'Реализованные', value: 'completed' },
  { label: 'Текущие', value: 'current' },
  { label: 'Перспективные', value: 'future' }
]

const projects = [
  {
    id: 1,
    title: 'ORBITA-1',
    status: 'completed',
    statusText: 'Реализован',
    statusClass: 'completed',
    date: '2024',
    image: '/images/rocket.jpg',
    description:
      'Испытательный запуск малой ракеты-носителя для проверки системы стабилизации и сбора телеметрии.',
    goal:
      'Проверить устойчивость ракеты на стартовом участке полёта и протестировать систему управления.',
    technologies: [
      'система стабилизации',
      'телеметрический модуль',
      'бортовой контроллер',
      'лёгкий композитный корпус'
    ],
    stages: [
      'подготовка проектной документации',
      'сборка испытательного образца',
      'проверка электроники',
      'лётное испытание',
      'анализ телеметрии'
    ],
    result:
      'Успешное прохождение лётных испытаний и подтверждение стабильной работы системы управления.'
  },
  {
    id: 2,
    title: 'SKYLINK SAT',
    status: 'current',
    statusText: 'Текущий',
    statusClass: 'current',
    date: '2025',
    image: '/images/direction-satellite.jpg',
    description:
      'Разработка малой спутниковой платформы для связи, мониторинга Земли и передачи технических данных.',
    goal:
      'Создать компактную спутниковую платформу для научных и коммерческих задач.',
    technologies: [
      'спутниковая связь',
      'солнечные панели',
      'система ориентации',
      'модуль передачи данных'
    ],
    stages: [
      'разработка архитектуры платформы',
      'создание инженерного образца',
      'тестирование питания',
      'проверка связи',
      'подготовка к интеграции'
    ],
    result:
      'Проект находится на этапе сборки инженерного образца и подготовки к испытаниям.'
  },
  {
    id: 3,
    title: 'VECTOR-M',
    status: 'completed',
    statusText: 'Реализован',
    statusClass: 'completed',
    date: '2023',
    image: '/images/direction-engineering.jpg',
    description:
      'Стендовые испытания жидкостного ракетного двигателя для проверки тяги, устойчивости и температурных режимов.',
    goal:
      'Проверить работу двигателя в контролируемых условиях и определить стабильность тяги.',
    technologies: [
      'жидкостный ракетный двигатель',
      'система охлаждения',
      'датчики давления',
      'стендовая диагностика'
    ],
    stages: [
      'подготовка испытательного стенда',
      'монтаж двигателя',
      'проверка подачи топлива',
      'стендовый запуск',
      'анализ температурных режимов'
    ],
    result:
      'Подтверждена стабильная работа двигателя в тестовом режиме.'
  },
  {
    id: 4,
    title: 'DEEP SPACE MODULE',
    status: 'future',
    statusText: 'Перспективный',
    statusClass: 'future',
    date: '2026',
    image: '/images/direction-rocket.jpg',
    description:
      'Концепт межпланетного исследовательского модуля для автономной работы в условиях дальнего космоса.',
    goal:
      'Сформировать техническую концепцию автономного модуля для дальних космических миссий.',
    technologies: [
      'автономная навигация',
      'энергетический модуль',
      'защита от радиации',
      'система дальней связи'
    ],
    stages: [
      'разработка концепции',
      'создание 3D-модели',
      'расчёт энергопотребления',
      'оценка рисков',
      'подготовка презентации для партнёров'
    ],
    result:
      'Подготовлена проектная документация, визуальная модель и техническая концепция.'
  },
  {
    id: 5,
    title: 'AURORA ENGINE',
    status: 'current',
    statusText: 'Текущий',
    statusClass: 'current',
    date: '2025',
    image: '/images/rocket.jpg',
    description:
      'Проектирование модернизированного двигателя с улучшенной системой охлаждения и повышенной надёжностью.',
    goal:
      'Повысить надёжность двигателя и снизить риск перегрева при длительной работе.',
    technologies: [
      'модернизированная камера сгорания',
      'охлаждающий контур',
      'цифровое моделирование',
      'контроль вибраций'
    ],
    stages: [
      'анализ прошлых испытаний',
      'проектирование новой схемы охлаждения',
      'моделирование нагрузки',
      'подготовка деталей',
      'планирование стендового теста'
    ],
    result:
      'Выполняется моделирование рабочих режимов и подготовка к стендовым испытаниям.'
  },
  {
    id: 6,
    title: 'LUNAR CARGO',
    status: 'future',
    statusText: 'Перспективный',
    statusClass: 'future',
    date: '2027',
    image: '/images/direction-satellite.jpg',
    description:
      'Перспективная транспортная система для доставки малых грузов на окололунную орбиту.',
    goal:
      'Разработать предварительную модель транспортной системы для будущих лунных миссий.',
    technologies: [
      'орбитальная логистика',
      'автоматическая стыковка',
      'грузовой отсек',
      'расчёт траектории'
    ],
    stages: [
      'формирование идеи проекта',
      'расчёт массы полезной нагрузки',
      'подготовка схемы полёта',
      'оценка стоимости',
      'создание визуального концепта'
    ],
    result:
      'Сформирована предварительная техническая идея и рассчитаны базовые параметры миссии.'
  }
]

const galleryImages = [
  {
    id: 1,
    src: '/images/rocket.jpg',
    alt: 'Ракета на стартовой площадке',
    title: 'Стартовая система'
  },
  {
    id: 2,
    src: '/images/direction-satellite.jpg',
    alt: 'Спутниковая платформа',
    title: 'Спутниковая платформа'
  },
  {
    id: 3,
    src: '/images/direction-engineering.jpg',
    alt: 'Инженерные испытания',
    title: 'Инженерные испытания'
  },
  {
    id: 4,
    src: '/images/direction-rocket.jpg',
    alt: 'Ракетная технология',
    title: 'Ракетные технологии'
  }
]

const filteredProjects = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return projects.filter(project => {
    const matchesStatus =
      activeFilter.value === 'all' || project.status === activeFilter.value

    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.result.toLowerCase().includes(query) ||
      project.technologies.some(technology =>
        technology.toLowerCase().includes(query)
      )

    return matchesStatus && matchesSearch
  })
})

const completedCount = computed(() => {
  return projects.filter(project => project.status === 'completed').length
})

const currentCount = computed(() => {
  return projects.filter(project => project.status === 'current').length
})

const openProject = project => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}
</script>