<template>
  <main class="home-page">
    <section class="hero">
      <video
        class="hero__video"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
      >
        <source src="/videos/rocket-hero.mp4" type="video/mp4" />
      </video>

      <div class="hero__overlay"></div>

      <div class="hero__stars"></div>

      <div class="hero__content">
        <h1 class="hero__title">
          <span>Покоряем космос</span>
          <span>вместе</span>
        </h1>

        <p class="hero__subtitle">
          Инновационные решения для запусков и исследований
        </p>

        <a href="#mission" class="hero__button">
          Узнать больше
        </a>
      </div>
    </section>

    <section id="mission" class="home-section">
      <div class="home-container">
        <p class="section-label">Миссия компании</p>

        <h2 class="section-title">
          Развивать частное ракетостроение и делать космические технологии доступнее
        </h2>

        <p class="section-text">
          Компания занимается разработкой современных решений для коммерческих запусков,
          спутниковых проектов и инженерных исследований в сфере космоса.
        </p>
      </div>
    </section>

    <section class="home-section home-section--dark">
      <div class="home-container">
        <p class="section-label">Ключевые показатели</p>

        <h2 class="section-title">
          Достижения в цифрах
        </h2>

        <div class="stats-grid">
          <article class="stat-card">
            <span class="stat-card__number">12+</span>
            <span class="stat-card__text">проектных направлений</span>
          </article>

          <article class="stat-card">
            <span class="stat-card__number">30+</span>
            <span class="stat-card__text">инженерных решений</span>
          </article>

          <article class="stat-card">
            <span class="stat-card__number">5</span>
            <span class="stat-card__text">технологических блоков</span>
          </article>

          <article class="stat-card">
            <span class="stat-card__number">24/7</span>
            <span class="stat-card__text">мониторинг систем</span>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<style src="../styles/home.css"></style>