<template>
  <main class="career-page">
    <section class="career-hero">
      <div class="container">
        <h1>Карьера</h1>
        <p class="subtitle">Присоединяйтесь к команде покорителей космоса</p>
      </div>
    </section>

    <section class="career-section">
      <div class="container">
        <h2>Открытые вакансии</h2>
        <div class="vacancies-list">
          <div class="vacancy-card">
            <div class="vacancy-header">
              <h3>Инженер-конструктор ракетных двигателей</h3>
              <span class="vacancy-type">Полная занятость</span>
            </div>
            <p class="vacancy-desc">
              Разработка и тестирование жидкостных ракетных двигателей нового поколения.
            </p>
            <div class="vacancy-requirements">
              <h4>Требования:</h4>
              <ul>
                <li>Высшее техническое образование (машиностроение, аэрокосмическая техника)</li>
                <li>Опыт работы от 3 лет</li>
                <li>Знание CAD-систем (SolidWorks, AutoCAD)</li>
                <li>Опыт расчётов прочности</li>
              </ul>
            </div>
            <button class="apply-btn">Откликнуться</button>
          </div>

          <div class="vacancy-card">
            <div class="vacancy-header">
              <h3>Разработчик систем навигации</h3>
              <span class="vacancy-type">Полная занятость</span>
            </div>
            <p class="vacancy-desc">
              Разработка программного обеспечения для систем автономной навигации космических аппаратов.
            </p>
            <div class="vacancy-requirements">
              <h4>Требования:</h4>
              <ul>
                <li>Высшее образование (информатика, математика, физика)</li>
                <li>Опыт программирования на C++, Python</li>
                <li>Знание алгоритмов машинного обучения</li>
                <li>Опыт работы с системами реального времени</li>
              </ul>
            </div>
            <button class="apply-btn">Откликнуться</button>
          </div>

          <div class="vacancy-card">
            <div class="vacancy-header">
              <h3>Специалист по композитным материалам</h3>
              <span class="vacancy-type">Полная занятость</span>
            </div>
            <p class="vacancy-desc">
              Исследование и разработка новых композитных материалов для космической отрасли.
            </p>
            <div class="vacancy-requirements">
              <h4>Требования:</h4>
              <ul>
                <li>Высшее образование (материаловедение, химия)</li>
                <li>Опыт работы с полимерными композитами</li>
                <li>Знание методов испытания материалов</li>
                <li>Опыт научной работы</li>
              </ul>
            </div>
            <button class="apply-btn">Откликнуться</button>
          </div>
        </div>
      </div>
    </section>

    <section class="career-section internship-section">
      <div class="container">
        <h2>Стажировки для студентов</h2>
        <div class="internship-info">
          <p>
            Мы предлагаем стажировки для студентов технических вузов по направлениям:
          </p>
          <ul class="internship-directions">
            <li>🚀 Ракетостроение</li>
            <li>🛰️ Спутниковые системы</li>
            <li>💻 Программное обеспечение</li>
            <li>🔬 Материаловедение</li>
            <li>📊 Анализ данных</li>
          </ul>
          <p>
            Длительность стажировки: 3-6 месяцев. Возможность трудоустройства по окончании.
          </p>
          <button class="apply-btn">Подать заявку на стажировку</button>
        </div>
      </div>
    </section>

    <section class="career-section benefits-section">
      <div class="container">
        <h2>Что мы предлагаем</h2>
        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">💰</div>
            <h3>Конкурентная зарплата</h3>
            <p>Соответствует уровню ведущих компаний отрасли</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🏥</div>
            <h3>Медицинская страховка</h3>
            <p>ДМС для сотрудника и членов семьи</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">📚</div>
            <h3>Обучение и развитие</h3>
            <p>Оплата конференций, курсов, литературы</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">🏖️</div>
            <h3>Гибкий график</h3>
            <p>Возможность удалённой работы 2 дня в неделю</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.career-page {
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

.career-hero {
  text-align: center;
  margin-bottom: 80px;
}

.career-hero h1 {
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

.career-section {
  margin-bottom: 80px;
}

.career-section h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 40px;
  color: #ffffff;
}

.vacancies-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.vacancy-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 24px;
  padding: 30px;
  transition: border-color 0.3s ease;
}

.vacancy-card:hover {
  border-color: rgba(77, 163, 255, 0.5);
}

.vacancy-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  flex-wrap: wrap;
  gap: 15px;
}

.vacancy-header h3 {
  font-size: 24px;
  color: #ffffff;
}

.vacancy-type {
  background: rgba(77, 163, 255, 0.15);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 14px;
  color: #4da3ff;
}

.vacancy-desc {
  font-size: 16px;
  line-height: 1.6;
  color: #b8c7df;
  margin-bottom: 20px;
}

.vacancy-requirements h4 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #ffffff;
}

.vacancy-requirements ul {
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
}

.vacancy-requirements li {
  position: relative;
  padding-left: 25px;
  margin-bottom: 10px;
  color: #b8c7df;
}

.vacancy-requirements li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #4da3ff;
  font-weight: bold;
}

.apply-btn {
  background: linear-gradient(135deg, #4da3ff, #ff9f43);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.apply-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(77, 163, 255, 0.4);
}

.internship-info {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 24px;
  padding: 40px;
}

.internship-info p {
  font-size: 18px;
  line-height: 1.7;
  color: #b8c7df;
  margin-bottom: 20px;
}

.internship-directions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  list-style: none;
  padding: 0;
  margin: 30px 0;
}

.internship-directions li {
  font-size: 18px;
  color: #ffffff;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(132, 179, 255, 0.22);
  border-radius: 24px;
  padding: 30px;
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-8px);
  border-color: rgba(77, 163, 255, 0.5);
}

.benefit-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.benefit-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #ffffff;
}

.benefit-card p {
  font-size: 16px;
  color: #b8c7df;
}

@media (max-width: 768px) {
  .career-hero h1 {
    font-size: 36px;
  }

  .career-section h2 {
    font-size: 28px;
  }

  .vacancy-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>
