import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/homeView.vue'
import Note from '@/views/mainContent.vue'
import Navigation from '@/views/Navigation.vue'
import Admin from '@/views/Admin.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import SearchResults from '@/views/SearchResults.vue'
import CategoryView from '@/views/CategoryView.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'

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
  },
  {
    path: '/search',
    component: SearchResults
  },
  {
    path: '/category/:name',
    component: CategoryView
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/about',
    component: About
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
  // 访问 /admin 需要登录
  if (to.path === '/admin') {
    const token = localStorage.getItem('token')
    if (!token) {
      next('/login')
      return
    }
  }
  // 如果已登录，访问 /login 直接跳 admin
  if (to.path === '/login') {
    const token = localStorage.getItem('token')
    if (token) {
      next('/admin')
      return
    }
  }
  if (!to.matched.length) {
    next('/')
  } else {
    next()
  }
})

export default router
