<template>
  <div class="about-page">
    <!-- Секция Истории компании -->
    <section class="about-hero">
      <h1>Наша история</h1>
      <p class="subtitle">Мы создаем технологии будущего для доступа в космос</p>

      <div class="timeline">
        <div class="timeline-item">
          <span class="year">2010</span>
          <h3>Основание компании</h3>
          <p>Начало пути в аэрокосмической индустрии.</p>
        </div>
        <div class="timeline-item">
          <span class="year">2015</span>
          <h3>Первый успешный запуск</h3>
          <p>Запуск первой ракеты-носителя собственного производства.</p>
        </div>
      </div>
    </section>

    <!-- Секция Миссии -->
    <section class="mission-section">
      <h2>Миссия и ценности</h2>
      <div class="values-grid">
        <div class="value-card">
          <h4>Инновации</h4>
          <p>Постоянное развитие и внедрение передовых технологий.</p>
        </div>
        <div class="value-card">
          <h4>Надёжность</h4>
          <p>99% успешных запусков за всю историю компании.</p>
        </div>
      </div>
    </section>

    <!-- Динамический блок вакансий -->
    <section class="vacancies-section">
      <h2>Открытые вакансии</h2>
      <div v-if="vacancies.length === 0" class="empty-note">
        База вакансий временно пуста. Пожалуйста, зайдите позже.
      </div>
      <div v-else class="vacancies-list">
        <div v-for="job in vacancies" :key="job.id" class="job-card">
          <h3>{{ job.title }}</h3>
          <p>Оклад: {{ job.salary }} | Опыт: {{ job.experience }}</p>
        </div>
      </div>
    </section>

    <!-- Форма отправки сообщений в бэкенд -->
    <section class="contact-form-section">
      <h2>Связаться с нами</h2>
      <form @submit.prevent="submitForm">
        <input v-model="formData.name" type="text" placeholder="Ваше имя" required />
        <input v-model="formData.email" type="email" placeholder="Ваш Email" required />
        <textarea v-model="formData.message" placeholder="Сообщение" required></textarea>
        <button type="submit" class="btn-primary">Отправить сообщение</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const vacancies = ref([]);
const formData = ref({ name: '', email: '', message: '' });

// Загрузка вакансий с бэкенда при монтировании страницы
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vacancies');
    const result = await res.json();
    if (result.success) {
      vacancies.value = result.data;
    }
  } catch (err) {
    console.error('Ошибка загрузки вакансий:', err);
  }
});

// Отправка формы в бэкенд
const submitForm = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData.value)
    });
    const result = await res.json();
    if (result.success) {
      alert('Сообщение успешно отправлено!');
      formData.value = { name: '', email: '', message: '' };
    }
  } catch (err) {
    alert('Произошла ошибка при отправке');
  }
};
</script>

<style scoped>
@import '../styles/about.css';
</style>