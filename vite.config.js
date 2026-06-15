import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/Oblivion/', // ← название вашего репозитория
  plugins: [vue()]
})