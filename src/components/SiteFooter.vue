<template>
  <footer class="site-footer">
    <div class="site-footer__container">
      <div class="site-footer__main">
        <div class="site-footer__brand">
          <a href="#top" class="site-footer__logo">
            <img
              class="site-footer__logo-image"
              src="/images/logo.png"
              alt="Oblivione Space"
            />

            <span class="site-footer__logo-text">
              Oblivione Space
            </span>
          </a>

          <p>
            Частная компания в сфере ракетостроения, спутниковых решений
            и инженерных исследований.
          </p>
        </div>

        <div class="site-footer__column">
          <h3>Навигация</h3>

          <a href="#top">Главная</a>
          <a href="#mission">Миссия</a>
          <a href="#stats">Показатели</a>
          <a href="#directions">Направления</a>
        </div>

        <div class="site-footer__column">
          <h3>Разделы</h3>

          <a href="#partners">Партнёры</a>
          <a href="#">О компании</a>
          <a href="#">Проекты</a>
          <a href="#">Контакты</a>
        </div>

        <div class="site-footer__column">
          <h3>Контакты</h3>

          <p>info@oblivione-space.ru</p>
          <p>+7 (900) 000-00-00</p>
          <p>Учебный проект</p>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p>© 2026 Oblivione Space</p>
        <p>Сайт компании в сфере частного ракетостроения</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  padding: 78px 0 28px;
  background:
    radial-gradient(circle at 20% 0%, rgba(77, 163, 255, 0.12), transparent 32%),
    #030611;
  border-top: 1px solid rgba(132, 179, 255, 0.16);
  color: #b8c7df;
}

.site-footer__container {
  width: min(1180px, calc(100% - 40px));
  margin: 0 auto;
}

.site-footer__main {
  display: grid;
  grid-template-columns: 1.4fr repeat(3, 1fr);
  gap: 42px;
}

.site-footer__logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  color: #ffffff;
  text-decoration: none;
}

.site-footer__logo-image {
  width: auto;
  height: 52px;
  display: block;
  object-fit: contain;
}

.site-footer__logo-text {
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.site-footer__brand p {
  max-width: 420px;
  margin: 0;
  font-size: 16px;
  line-height: 1.7;
}

.site-footer__column {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.site-footer__column h3 {
  margin: 0 0 8px;
  color: #ffffff;
  font-family: "Montserrat", Arial, sans-serif;
  font-size: 18px;
}

.site-footer__column a,
.site-footer__column p {
  margin: 0;
  color: #b8c7df;
  font-size: 15px;
  line-height: 1.6;
  text-decoration: none;
}

.site-footer__column a {
  transition: color 0.25s ease;
}

.site-footer__column a:hover {
  color: #ff9f43;
}

.site-footer__bottom {
  margin-top: 54px;
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid rgba(132, 179, 255, 0.16);
  font-size: 14px;
}

.site-footer__bottom p {
  margin: 0;
}

@media (max-width: 900px) {
  .site-footer__main {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 560px) {
  .site-footer {
    padding-top: 58px;
  }

  .site-footer__main {
    grid-template-columns: 1fr;
  }

  .site-footer__logo-image {
    height: 46px;
  }

  .site-footer__logo-text {
    font-size: 14px;
  }

  .site-footer__bottom {
    flex-direction: column;
  }
}
</style>