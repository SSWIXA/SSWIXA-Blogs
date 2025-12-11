import './assets/main.css'
import '@/js/heartEffect.js'

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
import Antd from 'ant-design-vue'
import './scss/dark-mode.scss'


// import 'ant-design-vue/dist/reset.css';

// Use plugin with optional defaults
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
let antd: any = Antd
const pinia = createPinia()
app.config.globalProperties.$axios = axiosInstance
app.provide('$axios', axios)
app.provide('$router', router)
// app.config.productionTip = false;
app.use(router).use(ElementPlus).use(antd).use(pinia).mount('#app')