import { createApp } from 'vue'
import './style.css'
import './styles/home.css'
import './styles/about.css'
import './styles/projects.css'
import './styles/responsive.css'
import App from './App.vue'
import router from './router/index.js'

createApp(App).use(router).mount('#app')
