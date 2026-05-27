import './assets/main.css'
import '@/js/particleEffect.js'
import './utils/monacoConfig'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import axiosInstance from './axios/axios'
import '../src/scss/gobal.scss'
import 'swiper/css'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()

app.config.globalProperties.$axios = axiosInstance
app.provide('$axios', axios)
app.provide('$router', router)

app.use(router).use(ElementPlus).use(pinia).mount('#app')
