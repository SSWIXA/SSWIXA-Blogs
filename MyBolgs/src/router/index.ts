import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import Note from '@/views/mainContent.vue'
import Navigation from '@/views/Navigation.vue'


const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: '/',
      component: HomeView
    }
    ,{
      path: '/WebNote',
      component: Note
    },{
      path: '/ServerNote',
      component: Note
    },{
      path: '/Navigation',
      component: Navigation
    },
  ]
})

export default router
