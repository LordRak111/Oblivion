<template>
  <main class="news-page">
    <section class="news-hero">
      <div class="container">
        <h1>Новости</h1>
        <p class="subtitle">Последние события из жизни компании</p>
      </div>
    </section>

    <section class="news-section">
      <div class="container">
        <div class="news-grid">
          <article class="news-card" v-for="news in newsList" :key="news.id">
            <div class="news-image"></div>
            <div class="news-content">
              <div class="news-meta">
                <span class="news-date">{{ news.date }}</span>
                <span class="news-category">{{ news.category }}</span>
              </div>
              <h2>{{ news.title }}</h2>
              <p>{{ news.excerpt }}</p>
              <a href="#" class="read-more">Читать далее →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const newsList = ref([
  {
    id: 1,
    date: '15 июня 2026',
    category: 'Запуски',
    title: 'Успешный запуск спутника связи "Орбита-7"',
    excerpt: 'Ракета-носитель "Сокол-9" успешно вывела на орбиту телекоммуникационный спутник нового поколения.',
  },
  {
    id: 2,
    date: '10 июня 2026',
    category: 'Технологии',
    title: 'Представлен прототип многоразового двигателя R-25',
    excerpt: 'Новый двигатель обеспечивает тягу 850 кН и может использоваться до 10 раз без капитального ремонта.',
  },
  {
    id: 3,
    date: '5 июня 2026',
    category: 'Партнёрства',
    title: 'Подписано соглашение с Европейским космическим агентством',
    excerpt: 'Соглашение предусматривает совместную разработку спутниковых платформ для научных миссий.',
  },
  {
    id: 4,
    date: '1 июня 2026',
    category: 'Достижения',
    title: 'Компания получила премию "Инновация года"',
    excerpt: 'Жюри отметило разработку композитных материалов нового поколения для космической отрасли.',
  },
  {
    id: 5,
    date: '25 мая 2026',
    category: 'События',
    title: 'Открыт новый испытательный центр в Казани',
    excerpt: 'Центр оснащён современным оборудованием для тестирования ракетных двигателей и компонентов.',
  },
  {
    id: 6,
    date: '20 мая 2026',
    category: 'Карьера',
    title: 'Стартовала программа стажировок для студентов',
    excerpt: 'Приглашаем студентов технических вузов пройти стажировку в ведущих подразделениях компании.',
  },
])
</script>

<style scoped>
.news-page {
  min-height: 100vh;
  color: #ffffff;
  background: linear-gradient(180deg, #050814 0%, #091020 100%);
  padding: 120px 0 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.news-hero {
  text-align: center;
  margin-bottom: 80px;
}

.news-hero h1 {
  font-size: 56px;
  font-weight: 800;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #4da3ff, #ff9f43);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.subtitle {
  font-size: 20px;
  color: #b8c7df;
}

.news-section {
  margin-bottom: 80px;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.news-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.news-card:hover {
  transform: translateY(-8px);
  border-color: rgba(77, 163, 255, 0.5);
}

.news-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #4da3ff, #ff9f43);
}

.news-content {
  padding: 25px;
}

.news-meta {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  flex-wrap: wrap;
}

.news-date,
.news-category {
  font-size: 14px;
  color: #b8c7df;
}

.news-category {
  background: rgba(77, 163, 255, 0.15);
  padding: 4px 12px;
  border-radius: 12px;
  color: #4da3ff;
}

.news-content h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #ffffff;
  line-height: 1.3;
}

.news-content p {
  font-size: 16px;
  line-height: 1.6;
  color: #b8c7df;
  margin-bottom: 20px;
}

.read-more {
  color: #4da3ff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #ff9f43;
}

@media (max-width: 768px) {
  .news-hero h1 {
    font-size: 36px;
  }

  .news-grid {
    grid-template-columns: 1fr;
  }
}
</style>
