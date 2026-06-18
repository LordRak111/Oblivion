<template>
  <div class="about-page-container">
    <section
      class="hero-banner"
      :style="{
        backgroundImage: `linear-gradient(90deg, rgba(5, 8, 18, 0.95), rgba(5, 8, 18, 0.75)), url('${baseUrl}images/bg-stats.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }"
    >
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <span class="badge">О корпорации</span>
        <h1>OBLIVIONE <span class="text-glow">SPACE</span></h1>
        <p class="hero-subtitle">Мы создаем технологическую экосистему для освоения ближнего и глубокого космоса, раздвигая границы возможного.</p>
      </div>
    </section>

    <section class="stats-section">
      <div class="section-grid">
        <div class="stat-card" v-for="item in stats" :key="item.label">
          <div class="stat-num">{{ item.value }}</div>
          <div class="stat-name">{{ item.label }}</div>
        </div>
      </div>
    </section>

    <section class="info-block-section">
      <div class="info-wrapper">
        <div class="info-text-side">
          <h2>Опережая <span class="text-glow">время</span></h2>
          <p>Проект Oblivione Space зародился как инициатива ведущих инженеров и программистов, стремящихся кардинально снизить стоимость вывода полезной нагрузки на орбиту.</p>
          <p>Сегодня мы проектируем полностью возвращаемые ступени ракет-носителей, разрабатываем автономные спутниковые платформы и пишем отказоустойчивое программное обеспечение для управления полетами в реальном времени.</p>
        </div>
        <div class="info-image-side">
          <div class="image-frame">
            <img src="/images/direction-rocket.jpg" alt="Space Technology" class="tech-img"/>
            <div class="frame-glow"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="timeline-section">
      <h2 class="section-title">Хронология миссий</h2>
      <div class="timeline-container">
        <div class="timeline-path"></div>
        <div class="timeline-block" v-for="(event, idx) in timeline" :key="idx">
          <div class="timeline-dot"></div>
          <div class="timeline-card">
            <span class="timeline-year">{{ event.year }}</span>
            <h3>{{ event.title }}</h3>
            <p>{{ event.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="api-section">
      <h2 class="section-title">Карьера в Oblivione</h2>
      <p class="section-subtitle">Ищете вызов? Присоединяйтесь к разработке сложнейших космических систем.</p>
      
      <div class="vacancies-grid">
        <div v-for="job in vacancies" :key="job.id" class="vacancy-card">
          <div class="card-accent"></div>
          <h3>{{ job.title }}</h3>
          <div class="vacancy-meta">
            <span v-if="job.department" class="meta-tag">{{ job.department }}</span>
            <span v-if="job.salary" class="meta-tag salary">{{ job.salary }}</span>
          </div>
          <p v-if="job.description" class="vacancy-desc">{{ job.description }}</p>
        </div>
      </div>
      <div v-if="vacancies.length === 0" class="empty-state">
        <p>В данный момент активных вакансий нет. Сервер вернул пустой список или бэкенд отключен.</p>
      </div>
    </section>

    <section class="feedback-section">
      <div class="feedback-container">
        <div class="feedback-info">
          <h2>Остались <span class="text-glow">вопросы?</span></h2>
          <p>Свяжитесь с нашей пресс-службой или отправьте резюме напрямую через форму. Мы обрабатываем входящие заявки в течение 24 часов.</p>
        </div>
        
        <form @submit.prevent="submitForm" class="glass-form">
          <div class="input-wrapper">
            <label>Ваше имя</label>
            <input v-model="formData.name" type="text" placeholder="Константин Эдуардович" required />
          </div>
          <div class="input-wrapper">
            <label>Контактный Email</label>
            <input v-model="formData.email" type="email" placeholder="name@domain.com" required />
          </div>
          <div class="input-wrapper">
            <label>Сообщение</label>
            <textarea v-model="formData.message" placeholder="Опишите ваше предложение или укажите интересующую должность..." rows="4" required></textarea>
          </div>
          <button type="submit" class="submit-glow-btn">Отправить запрос</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const baseUrl = import.meta.env.BASE_URL;
const vacancies = ref([]);
const formData = ref({ name: '', email: '', message: '' });

const stats = ref([
  { value: '24/7', label: 'Мониторинг телеметрии' },
  { value: '100%', label: 'Безопасность ПО' },
  { value: '40+', label: 'Спутников выведено' },
  { value: '3', label: 'Собственных узла связи' }
]);

const timeline = ref([
  { year: '2024', title: 'Старт проектирования архитектуры', desc: 'Развертывание базовой кодовой базы проекта и проектирование интерфейсных модулей.' },
  { year: '2025', title: 'Интеграция серверных решений', desc: 'Успешное подключение баз данных и написание гибкого API для обработки входящей информации.' },
  { year: '2026', title: 'Финальный релиз интерфейса', desc: 'Полноценное развертывание SPA-приложения с адаптивной сеткой и бесшовной навигацией.' }
]);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vacancies');
    const result = await res.json();
    if (result.success) vacancies.value = result.data;
  } catch (error) {
    console.error('Ошибка получения списка вакансий:', error);
  }
});

const submitForm = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
    const result = await res.json();
    if (res.ok && result.success) {
      alert('Данные успешно переданы на сервер!');
      formData.value = { name: '', email: '', message: '' };
    } else {
      alert('Ошибка при обработке сервером: ' + (result.error || 'Попробуйте позже.'));
    }
  } catch (error) {
    console.error('Ошибка отправки формы:', error);
    alert('Не удалось связаться с сервером. Проверьте, запущен ли бэкенд.');
  }
};
</script>

<style scoped>
/* ГЛОБАЛЬНЫЕ НАСТРОЙКИ СТРАНИЦЫ */
.about-page-container {
  background-color: #030712;
  color: #f3f4f6;
  font-family: system-ui, -apple-system, sans-serif;
  padding-bottom: 100px;
  overflow-x: hidden;
  box-sizing: border-box;
}

/* ХЕРО-БАННЕР */
.hero-banner {
  position: relative;
  height: 60vh;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
  padding-top: 80px;
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(3,7,18,0.4), #030712);
}
.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
}
.badge {
  background: rgba(59, 130, 246, 0.15);
  border: 1px solid rgba(59, 130, 246, 0.4);
  color: #60a5fa;
  padding: 6px 16px;
  border-radius: 99px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 900;
  margin: 20px 0;
  letter-spacing: -0.02em;
}
.text-glow {
  color: #3b82f6;
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.6);
}
.hero-subtitle {
  font-size: 1.25rem;
  color: #9ca3af;
  line-height: 1.6;
}

/* СТАТИСТИКА */
.stats-section {
  max-width: 1200px;
  margin: -60px auto 60px;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}
.section-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}
.stat-card {
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 30px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}
.stat-num {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f3f4f6;
  margin-bottom: 5px;
}
.stat-name {
  color: #6b7280;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ДВУХКОЛОНОЧНЫЙ ИНФО-БЛОК */
.info-block-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}
.info-wrapper {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  gap: 60px;
  align-items: center;
}
@media (max-width: 500px) {
  .info-wrapper { grid-template-columns: 1fr; }
}
.info-text-side h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 25px;
}
.info-text-side p {
  color: #9ca3af;
  font-size: 1.1rem;
  line-height: 1.7;
  margin-bottom: 20px;
}
.image-frame {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #111827;
  aspect-ratio: 16/10;
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.tech-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.frame-glow {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 40px rgba(0,0,0,0.8);
}

/* СТРОГИЙ ТАЙМЛАЙН */
.timeline-section {
  max-width: 900px;
  margin: 0 auto 100px;
  padding: 0 20px;
}
.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 50px;
}
.timeline-container {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.timeline-path {
  position: absolute;
  left: 31px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(to bottom, #3b82f6, rgba(59, 130, 246, 0.1));
}
.timeline-block {
  position: relative;
  display: flex;
  gap: 30px;
  align-items: flex-start;
}
.timeline-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #3b82f6;
  border: 4px solid #030712;
  margin-left: 21px;
  z-index: 2;
  box-shadow: 0 0 10px #3b82f6;
}
.timeline-card {
  background: #0f172a;
  border: 1px solid rgba(255, 255, 255, 0.03);
  padding: 25px;
  border-radius: 16px;
  flex: 1;
}
.timeline-year {
  font-weight: 800;
  color: #60a5fa;
  font-size: 1.1rem;
}
.timeline-card h3 {
  margin: 5px 0 10px;
  font-size: 1.3rem;
}
.timeline-card p {
  color: #9ca3af;
  margin: 0;
  line-height: 1.5;
}

/* ВАКАНСИИ */
.api-section {
  max-width: 1200px;
  margin: 0 auto 100px;
  padding: 0 20px;
}
.section-subtitle {
  text-align: center;
  color: #6b7280;
  margin: -40px 0 40px;
  font-size: 1.1rem;
}
.vacancies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
}
.vacancy-card {
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.vacancy-card:hover {
  transform: translateY(-4px);
  border-color: rgba(59, 130, 246, 0.3);
}
.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6, transparent);
}
.vacancy-card h3 {
  margin: 0 0 15px;
  font-size: 1.3rem;
}
.vacancy-meta {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}
.meta-tag {
  background: rgba(255, 255, 255, 0.05);
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #9ca3af;
}
.meta-tag.salary {
  color: #34d399;
  background: rgba(52, 211, 153, 0.1);
}
.vacancy-desc {
  color: #9ca3af;
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.5;
}
.empty-state {
  text-align: center;
  color: #4b5563;
  padding: 40px;
  background: rgba(255,255,255,0.01);
  border-radius: 16px;
  border: 1px dashed rgba(255,255,255,0.05);
}

/* ФОРМА ОБРАТНОЙ СВЯЗИ */
.feedback-section {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 20px;
}
.feedback-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 50px;
  align-items: center;
  background: linear-gradient(135deg, #0f172a 0%, #070a13 100%);
  padding: 50px;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.03);
}
@media (max-width: 850px) {
  .feedback-container { grid-template-columns: 1fr; padding: 30px; }
}
.feedback-info h2 {
  font-size: 2.25rem;
  font-weight: 800;
  margin-bottom: 20px;
}
.feedback-info p {
  color: #9ca3af;
  line-height: 1.6;
}
.glass-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.input-wrapper label {
  font-size: 0.85rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.input-wrapper input, .input-wrapper textarea {
  background: #030712;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 14px;
  border-radius: 10px;
  color: #ffffff;
  font-family: inherit;
  font-size: 1rem;
}
.input-wrapper input:focus, .input-wrapper textarea:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.25);
}
.submit-glow-btn {
  background: #3b82f6;
  color: #ffffff;
  border: none;
  padding: 16px;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.submit-glow-btn:hover {
  background: #2563eb;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}
</style>
