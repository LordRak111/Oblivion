<template>
  <div class="app-shell">
    <SiteHeader />
    <main class="app-shell__content">
      <RouterView />
    </main>
    <SiteFooter />
    <SupportChat />
  </div>
</template>

<script setup>
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import SupportChat from './components/SupportChat.vue'
</script>

<style>
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-shell__content {
  flex: 1;
  min-width: 0;
}
</style>
