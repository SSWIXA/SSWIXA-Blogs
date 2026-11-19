import './assets/main.css'
import '@/js/particleEffect.js'
// 注意：Monaco 配置不再在入口静态引入。
// 它会把约 2.6MB 的编辑器代码并入首屏（Vite 还会注入 modulepreload）。
// 现在改为在渲染代码块时按需加载，见 src/views/MainCon.vue 的 loadMonaco()。

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
