<template>
  <div id="app">
    <header class="header">
      <nav class="nav-menu">
        <a href="#" @click.prevent="currentTab = 'main'">Главная</a>
        <a href="#" @click.prevent="currentTab = 'about'">О компании</a>
        <a href="#">Продукты</a>
        <a href="#">Проекты</a>
      </nav>
    </header>

    <main>
      <section v-if="currentTab === 'main'" class="hero-section">
        <h1>Покоряем космос вместе</h1>
        <p>Инновационные решения для запусков и исследований</p>
        <button class="btn-primary">Узнать больше</button>
      </section>

      <section v-if="currentTab === 'about'" class="about-section">
        <h2>О компании</h2>
        <p>Раздел находится в разработке...</p>
      </section>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: 'main'
    }
  }
}
</script>