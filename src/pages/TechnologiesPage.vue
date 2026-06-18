<template>
  <main class="technologies-page">
    <section class="tech-hero">
      <div class="container">
        <h1>Технологии</h1>
        <p class="subtitle">Уникальные разработки и инновации</p>
      </div>
    </section>

    <section class="tech-section">
      <div class="container">
        <h2>Наши технологии</h2>
        <div class="tech-grid">
          <div class="tech-card">
            <div class="tech-icon">🔥</div>
            <h3>Многоразовые двигатели</h3>
            <p>
              Разработали жидкостные ракетные двигатели с возможностью повторного использования
              до 10 раз. Снижение стоимости запуска на 60%.
            </p>
            <div class="tech-specs">
              <span>Тяга: 850 кН</span>
              <span>Ресурс: 10 запусков</span>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">🛰️</div>
            <h3>Спутниковые платформы</h3>
            <p>
              Универсальные платформы для малых и средних спутников с модульной архитектурой.
              Быстрая адаптация под задачи клиента.
            </p>
            <div class="tech-specs">
              <span>Масса: 50-500 кг</span>
              <span>Срок службы: 15 лет</span>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">🧪</div>
            <h3>Композитные материалы</h3>
            <p>
              Собственная разработка углепластиковых композитов для корпусов ракет.
              Снижение массы на 30% при сохранении прочности.
            </p>
            <div class="tech-specs">
              <span>Прочность: 2500 МПа</span>
              <span>Температура: -180°C до +200°C</span>
            </div>
          </div>

          <div class="tech-card">
            <div class="tech-icon">🤖</div>
            <h3>ИИ для навигации</h3>
            <p>
              Система автономной навигации на базе нейросетей. Точность позиционирования
              до 0.001° в космическом пространстве.
            </p>
            <div class="tech-specs">
              <span>Точность: 0.001°</span>
              <span>Время отклика: 10 мс</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="tech-section patents-section">
      <div class="container">
        <h2>Патенты</h2>
        <div class="patents-list">
          <div class="patent-item">
            <h3>Патент №RU2765432</h3>
            <p>Способ повторного использования первой ступени ракеты-носителя</p>
            <span class="patent-date">2021</span>
          </div>
          <div class="patent-item">
            <h3>Патент №RU2789012</h3>
            <p>Композитный материал для корпусов ракетных двигателей</p>
            <span class="patent-date">2022</span>
          </div>
          <div class="patent-item">
            <h3>Патент №RU2812345</h3>
            <p>Система автономной навигации космических аппаратов</p>
            <span class="patent-date">2023</span>
          </div>
        </div>
      </div>
    </section>

    <section class="tech-section publications-section">
      <div class="container">
        <h2>Научные публикации</h2>
        <div class="publications-list">
          <div class="publication-item">
            <h3>Оптимизация траектории вывода на геопереходную орбиту</h3>
            <p>Журнал "Космические исследования", 2023</p>
            <a href="#" class="pub-link">Читать →</a>
          </div>
          <div class="publication-item">
            <h3>Применение нейросетей для управления ракетой-носителем</h3>
            <p>Международная конференция IAC, 2023</p>
            <a href="#" class="pub-link">Читать →</a>
          </div>
          <div class="publication-item">
            <h3>Новые композитные материалы для космической отрасли</h3>
            <p>Журнал "Авиация и космонавтика", 2022</p>
            <a href="#" class="pub-link">Читать →</a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.technologies-page {
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

.tech-hero {
  text-align: center;
  margin-bottom: 80px;
}

.tech-hero h1 {
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

.tech-section {
  margin-bottom: 80px;
}

.tech-section h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #ffffff;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.tech-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 24px;
  padding: 30px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.tech-card:hover {
  transform: translateY(-8px);
  border-color: rgba(77, 163, 255, 0.5);
}

.tech-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.tech-card h3 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #ffffff;
}

.tech-card p {
  font-size: 16px;
  line-height: 1.6;
  color: #b8c7df;
  margin-bottom: 20px;
}

.tech-specs {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
}

.tech-specs span {
  background: rgba(77, 163, 255, 0.15);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  color: #4da3ff;
}

.patents-list,
.publications-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.patent-item,
.publication-item {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 16px;
  padding: 25px;
  transition: border-color 0.3s ease;
}

.patent-item:hover,
.publication-item:hover {
  border-color: rgba(77, 163, 255, 0.5);
}

.patent-item h3,
.publication-item h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #ffffff;
}

.patent-item p,
.publication-item p {
  font-size: 16px;
  color: #b8c7df;
  margin-bottom: 10px;
}

.patent-date {
  display: inline-block;
  background: rgba(255, 159, 67, 0.15);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
  color: #ff9f43;
}

.pub-link {
  color: #4da3ff;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.pub-link:hover {
  color: #ff9f43;
}

@media (max-width: 768px) {
  .tech-hero h1 {
    font-size: 36px;
  }

  .tech-section h2 {
    font-size: 28px;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
