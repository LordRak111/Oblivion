<template>
  <div class="support-chat" :class="{ 'support-chat--open': isOpen }">
    <button
      class="support-chat__launcher"
      type="button"
      :aria-expanded="isOpen"
      aria-controls="support-chat-panel"
      @click="isOpen = !isOpen"
    >
      <span class="support-chat__launcher-icon" aria-hidden="true">✦</span>
      <span class="support-chat__launcher-label">Поддержка</span>
    </button>

    <Transition name="support-panel">
      <section v-if="isOpen" id="support-chat-panel" class="support-chat__panel" aria-label="Чат поддержки">
        <header class="support-chat__header">
          <div>
            <strong>Поддержка Oblivione</strong>
            <span><i></i> Обычно отвечаем сразу</span>
          </div>
          <button type="button" aria-label="Закрыть чат" @click="isOpen = false">×</button>
        </header>

        <div ref="messagesElement" class="support-chat__messages" aria-live="polite">
          <div
            v-for="message in messages"
            :key="message.id"
            class="support-chat__message"
            :class="`support-chat__message--${message.sender}`"
          >
            {{ message.text }}
          </div>
        </div>

        <form class="support-chat__form" @submit.prevent="sendMessage">
          <label class="sr-only" for="support-message">Ваш вопрос</label>
          <input
            id="support-message"
            v-model="draft"
            autocomplete="off"
            maxlength="500"
            placeholder="Напишите вопрос…"
          />
          <button type="submit" :disabled="!draft.trim()" aria-label="Отправить сообщение">➤</button>
        </form>
      </section>
    </Transition>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

const isOpen = ref(false)
const draft = ref('')
const messagesElement = ref(null)
const messages = ref([
  { id: 1, sender: 'bot', text: 'Здравствуйте! Я помогу с продуктами, проектами и контактами компании.' },
])
let messageId = 2

const getReply = (text) => {
  const normalized = text.toLowerCase()

  if (normalized.includes('цен') || normalized.includes('стоим')) {
    return 'Стоимость зависит от задачи. Оставьте контакты на странице «Контакты», и команда подготовит расчёт.'
  }
  if (normalized.includes('ваканс') || normalized.includes('работ')) {
    return 'Актуальные направления собраны на странице «Карьера». Там же можно выбрать подходящую вакансию.'
  }
  if (normalized.includes('проект')) {
    return 'Наши завершённые и текущие миссии находятся в разделе «Проекты».'
  }

  return 'Спасибо за вопрос! Передам его специалисту. Для обратной связи можно также открыть раздел «Контакты».'
}

const scrollToLatest = async () => {
  await nextTick()
  if (messagesElement.value) {
    messagesElement.value.scrollTop = messagesElement.value.scrollHeight
  }
}

const sendMessage = () => {
  const text = draft.value.trim()
  if (!text) return

  messages.value.push({ id: messageId++, sender: 'user', text })
  draft.value = ''
  scrollToLatest()

  window.setTimeout(() => {
    messages.value.push({ id: messageId++, sender: 'bot', text: getReply(text) })
    scrollToLatest()
  }, 450)
}
</script>

<style scoped>
.support-chat {
  position: fixed;
  right: max(20px, env(safe-area-inset-right));
  bottom: max(20px, env(safe-area-inset-bottom));
  z-index: 900;
  display: grid;
  justify-items: end;
  gap: 12px;
  font-family: Inter, Montserrat, Arial, sans-serif;
}

.support-chat__launcher {
  min-height: 56px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 0 20px 0 10px;
  border: 1px solid rgba(99, 230, 255, 0.58);
  border-radius: 999px;
  color: #fff;
  background: linear-gradient(135deg, rgba(7, 25, 52, 0.98), rgba(12, 74, 115, 0.98));
  box-shadow: 0 16px 50px rgba(0, 0, 0, 0.45), 0 0 28px rgba(0, 212, 255, 0.24);
  cursor: pointer;
}

.support-chat__launcher-icon {
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  color: #071323;
  background: #62efff;
  box-shadow: 0 0 18px rgba(98, 239, 255, 0.75);
}

.support-chat__launcher-label { font-weight: 800; }

.support-chat__panel {
  position: absolute;
  right: 0;
  bottom: 68px;
  width: min(380px, calc(100vw - 28px));
  height: min(540px, calc(100dvh - 120px));
  min-height: 360px;
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  border: 1px solid rgba(99, 230, 255, 0.38);
  border-radius: 24px;
  color: #fff;
  background: rgba(4, 11, 29, 0.98);
  box-shadow: 0 30px 90px rgba(0, 0, 0, 0.62), 0 0 38px rgba(0, 212, 255, 0.16);
}

.support-chat__header {
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(132, 179, 255, 0.18);
  background: linear-gradient(135deg, rgba(14, 75, 120, 0.9), rgba(8, 27, 58, 0.9));
}

.support-chat__header div { display: grid; gap: 5px; }
.support-chat__header strong { font-size: 15px; }
.support-chat__header span { color: #b8d7df; font-size: 12px; }
.support-chat__header i {
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 5px;
  border-radius: 50%;
  background: #4dff9a;
  box-shadow: 0 0 10px rgba(77, 255, 154, 0.8);
}
.support-chat__header button {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border-radius: 50%;
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
  font-size: 24px;
}

.support-chat__messages {
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px;
}

.support-chat__message {
  max-width: 86%;
  padding: 11px 13px;
  border-radius: 15px;
  font-size: 14px;
  line-height: 1.45;
  overflow-wrap: anywhere;
}
.support-chat__message--bot {
  align-self: flex-start;
  color: #eaf7ff;
  background: #152541;
  border-bottom-left-radius: 4px;
}
.support-chat__message--user {
  align-self: flex-end;
  background: linear-gradient(135deg, #087db6, #00b8d4);
  border-bottom-right-radius: 4px;
}

.support-chat__form {
  display: grid;
  grid-template-columns: 1fr 44px;
  gap: 9px;
  padding: 12px;
  border-top: 1px solid rgba(132, 179, 255, 0.16);
}
.support-chat__form input {
  min-width: 0;
  height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(132, 179, 255, 0.25);
  border-radius: 14px;
  outline: none;
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}
.support-chat__form input:focus { border-color: #62efff; }
.support-chat__form button {
  border-radius: 14px;
  color: #071323;
  background: #62efff;
  font-size: 18px;
  font-weight: 900;
}
.support-chat__form button:disabled { opacity: 0.42; cursor: default; }

.support-panel-enter-active,
.support-panel-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.support-panel-enter-from,
.support-panel-leave-to { opacity: 0; transform: translateY(12px) scale(0.97); }

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (max-width: 600px) {
  .support-chat {
    right: max(10px, env(safe-area-inset-right));
    bottom: max(10px, env(safe-area-inset-bottom));
  }
  .support-chat__panel {
    position: fixed;
    inset: max(10px, env(safe-area-inset-top)) 10px 78px;
    width: auto;
    height: auto;
    min-height: 0;
    border-radius: 20px;
  }
  .support-chat__launcher { min-height: 52px; padding-right: 16px; }
  .support-chat__launcher-icon { width: 34px; height: 34px; }
}

@media (prefers-reduced-motion: reduce) {
  .support-panel-enter-active,
  .support-panel-leave-active { transition: none; }
}
</style>
