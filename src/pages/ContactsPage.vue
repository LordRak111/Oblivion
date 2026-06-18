<template>
  <main class="contacts-page">
    <section class="contacts-hero">
      <div class="container">
        <h1>Контакты</h1>
        <p class="subtitle">Свяжитесь с нами любым удобным способом</p>
      </div>
    </section>

    <section class="contacts-section">
      <div class="container">
        <div class="contacts-grid">
          <div class="contact-info">
            <h2>Наши контакты</h2>

            <div class="contact-item">
              <div class="contact-icon">📧</div>
              <div>
                <h3>Email</h3>
                <p>info@oblivion-space.ru</p>
                <p>support@oblivion-space.ru</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📞</div>
              <div>
                <h3>Телефон</h3>
                <p>+7 (495) 123-45-67</p>
                <p>+7 (800) 555-35-35 (бесплатно по РФ)</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">📍</div>
              <div>
                <h3>Адрес</h3>
                <p>123456, г. Москва</p>
                <p>ул. Космическая, д. 15</p>
                <p>Бизнес-центр "Орбита"</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">🕐</div>
              <div>
                <h3>Режим работы</h3>
                <p>Пн-Пт: 9:00 - 18:00</p>
                <p>Сб-Вс: выходной</p>
              </div>
            </div>

            <div class="social-links">
              <h3>Мы в соцсетях</h3>
              <div class="social-icons">
                <a href="#" class="social-icon">VK</a>
                <a href="#" class="social-icon">TG</a>
                <a href="#" class="social-icon">YT</a>
                <a href="#" class="social-icon">GH</a>
              </div>
            </div>
          </div>

          <div class="contact-form-wrapper">
            <h2>Напишите нам</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-group">
                <label for="name">Ваше имя</label>
                <input type="text" id="name" v-model="form.name" required>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="form.email" required>
              </div>

              <div class="form-group">
                <label for="subject">Тема</label>
                <input type="text" id="subject" v-model="form.subject" required>
              </div>

              <div class="form-group">
                <label for="message">Сообщение</label>
                <textarea id="message" v-model="form.message" rows="6" required></textarea>
              </div>

              <button type="submit" class="submit-btn">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="map-section">
      <div class="container">
        <h2>Как нас найти</h2>
        <div class="map-wrapper">
          <iframe
            src="https://yandex.ru/map-widget/v1/?ll=37.6173%2C55.7558&z=10"
            width="100%"
            height="450"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const submitForm = () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    alert('Пожалуйста, заполните все обязательные поля')
    return
  }
  alert('Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.')
  form.value = { name: '', email: '', subject: '', message: '' }
}
</script>

<style scoped>
.contacts-page {
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

.contacts-hero {
  text-align: center;
  margin-bottom: 80px;
}

.contacts-hero h1 {
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

.contacts-section {
  margin-bottom: 80px;
}

.contacts-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
}

.contact-info h2,
.contact-form-wrapper h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #ffffff;
}

.contact-item {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  align-items: flex-start;
}

.contact-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.contact-item h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #ffffff;
}

.contact-item p {
  font-size: 16px;
  color: #b8c7df;
  line-height: 1.5;
  margin: 0;
}

.social-links {
  margin-top: 40px;
}

.social-links h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #ffffff;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(77, 163, 255, 0.15);
  border: 1px solid rgba(132, 179, 255, 0.22);
  color: #4da3ff;
  text-decoration: none;
  font-weight: 700;
  font-size: 14px;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: #4da3ff;
  color: #ffffff;
  transform: translateY(-3px);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 14px;
  color: #b8c7df;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 12px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 16px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4da3ff;
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  background: linear-gradient(135deg, #4da3ff, #ff9f43);
  border: none;
  padding: 14px 30px;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  margin-top: 10px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(77, 163, 255, 0.4);
}

.map-section {
  margin-top: 80px;
}

.map-section h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #ffffff;
  text-align: center;
}

.map-wrapper {
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(132, 179, 255, 0.22);
}

.map-wrapper iframe {
  display: block;
}

@media (max-width: 768px) {
  .contacts-hero h1 {
    font-size: 36px;
  }

  .contacts-grid {
    grid-template-columns: 1fr;
  }

  .contact-info h2,
  .contact-form-wrapper h2 {
    font-size: 26px;
  }
}
</style>
