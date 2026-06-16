<template>
  <div class="about-page">
    <section class="about-hero">
      <div class="hero-text">
        <h1>О проекте <span class="glow">Oblivione Space</span></h1>
        <p class="subtitle">Открываем новые горизонты вселенной. Мы создаем надежные решения для исследования космоса.</p>
      </div>

      <div class="timeline">
        <div class="timeline-item">
          <span class="year glow">2024</span>
          <h3>Основание</h3>
          <p>Запуск первых прототипов двигателей и формирование инженерного ядра проекта.</p>
        </div>
        <div class="timeline-item">
          <span class="year glow">2025</span>
          <h3>Тестовые запуски</h3>
          <p>Успешные суборбитальные полеты и тестирование систем возврата ступеней.</p>
        </div>
        <div class="timeline-item">
          <span class="year glow">2026</span>
          <h3>Орбитальная интеграция</h3>
          <p>Полноценный вывод коммерческих спутников на НОО.</p>
        </div>
      </div>
    </section>

    <section class="vacancies-section">
      <h2><i class="fas fa-briefcase"></i> Открытые вакансии</h2>
      <div v-if="vacancies.length === 0" class="no-data">
        <p>Загрузка вакансий...</p>
      </div>
      <div class="vacancies-list">
        <div v-for="job in vacancies" :key="job.id" class="job-card">
          <h3>{{ job.title }}</h3>
          <p class="job-info" v-if="job.salary">Зарплата: {{ job.salary }}</p>
          <p class="job-info" v-if="job.description">{{ job.description }}</p>
        </div>
      </div>
    </section>

    <section class="contact-section">
      <h2>Связаться с нами</h2>
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input v-model="formData.name" type="text" placeholder="Ваше Имя" required />
        </div>
        <div class="form-group">
          <input v-model="formData.email" type="email" placeholder="Ваш Email" required />
        </div>
        <div class="form-group">
          <textarea v-model="formData.message" placeholder="Ваше сообщение" rows="4" required></textarea>
        </div>
        <button type="submit" class="btn-submit">Отправить сообщение</button>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const vacancies = ref([]);
const formData = ref({ name: '', email: '', message: '' });

// Получение вакансий с бэкенда
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vacancies');
    const result = await res.json();
    if (result.success) vacancies.value = result.data;
  } catch (error) {
    console.error('Ошибка при загрузке вакансий:', error);
  }
});

// Отправка формы на бэкенд
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
      formData.value = { name: '', email: '', message: '' }; // Очистка формы
    } else {
      alert('Ошибка при отправке: ' + (result.error || 'Неизвестная ошибка'));
    }
  } catch (error) {
    console.error('Ошибка при отправке формы:', error);
    alert('Не удалось отправить сообщение. Проверьте подключение к серверу.');
  }
};
</script>

<style src="../styles/about.css"></style>