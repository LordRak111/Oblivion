<template>
  <div class="about-page">
    <section class="about-hero">
      <h1>Наша история</h1>
      <div class="timeline">
        <div class="timeline-item"><span class="year">2010</span><h3>Основание компании</h3></div>
        <div class="timeline-item"><span class="year">2015</span><h3>Первый успешный запуск</h3></div>
      </div>
    </section>

    <section class="vacancies-section">
      <h2>Открытые вакансии</h2>
      <div class="vacancies-list">
        <div v-for="job in vacancies" :key="job.id" class="job-card">
          <h3>{{ job.title }}</h3>
          <p class="job-info" v-if="job.department">Отдел: {{ job.department }}</p>
        </div>
        <p v-if="vacancies.length === 0" style="text-align: center; color: #8fa3c7;">
          На данный момент нет активных вакансий.
        </p>
      </div>
    </section>

    <section class="contact-section" style="margin-top: 50px;">
      <h2>Обратная связь</h2>
      <p class="subtitle">Оставьте заявку, и наш менеджер свяжется с вами</p>
      
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <input v-model="formData.name" placeholder="Ваше имя" required />
        </div>
        
        <div class="form-group">
          <input v-model="formData.email" type="email" placeholder="Ваш Email" required />
        </div>
        
        <div class="form-group">
          <textarea v-model="formData.message" placeholder="Текст сообщения" rows="5" required></textarea>
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

// Получение списка вакансий при загрузке страницы
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/vacancies');
    const result = await res.json();
    if (result.success) {
      vacancies.value = result.data;
    }
  } catch (err) {
    console.error('Не удалось загрузить вакансии:', err);
  }
});

// Отправка формы обратной связи на бэкенд API
const submitForm = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    });
    
    const result = await res.json();
    
    if (res.ok && result.success) {
      alert('Отлично! Ваше сообщение успешно отправлено.');
      // Очищаем форму после успешной отправки
      formData.value = { name: '', email: '', message: '' };
    } else {
      alert('Ошибка сервера: ' + (result.error || 'Не удалось отправить данные.'));
    }
  } catch (err) {
    console.error('Ошибка отправки формы:', err);
    alert('Ошибка соединения! Убедитесь, что бэкенд-сервер на порту 3000 запущен.');
  }
};
</script>