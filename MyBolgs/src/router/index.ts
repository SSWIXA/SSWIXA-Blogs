import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import Note from '@/views/mainContent.vue'
import Navigation from '@/views/Navigation.vue'
import Admin from '@/views/Admin.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'

// 路由配置
const routes: Array<any> = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/WebNote',
    component: Note
  },
  {
    path: '/ServerNote',
    component: Note
  },
  {
    path: '/AINote',
    component: Note
  },
  {
    path: '/Navigation',
    component: Navigation
  },
  {
    path: '/admin',
    component: Admin
  },
  {
    path: '/article/:id',
    component: ArticleDetail,
    props: true
  }
  // {
  //   path: '/dist',
  //   redirect: to => {
  //     // 方法接收目标路由作为参数
  //     // return 重定向的字符串路径/路径对象
  //     return { path: '/'}
  //   },
  // }
]

// 创建路由器实例
const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (!to.matched.length) {
    // 如果没有匹配的路由
    next('/') // 重定向到/页面
  } else {
    next() // 否则继续导航
  }
})

export default router
