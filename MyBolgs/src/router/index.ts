import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import note from '@/views/mainContent.vue'

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: '/',
      component: HomeView
    }
    ,{
      path: '/note',
      component: note
    },
  ]
})

export default router
