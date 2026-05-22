<template>
  <div class="article-detail-wrapper">
    <!-- 侧边栏 -->
    <Asider v-if="showAside"></Asider>
    <!-- 主内容区 -->
    <div class="blur_mask" v-if="article">
      <el-container style="padding-top: 60px">
        <MainCon :article="article" />
      </el-container>
    </div>
    <div v-else class="loading">
      <el-skeleton v-if="loading" :rows="10" animated />
      <el-empty v-else description="文章未找到" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import MainCon from './MainCon.vue'
import Asider from './Aside.vue'
import axios from '@/axios/axios'
import { View, Calendar, Pointer, Minus } from '@element-plus/icons-vue'

// 定义内容块类型
interface ContentBlock {
  type: string
  [key: string]: any
}

// 定义文章数据类型
interface Article {
  _id: string
  id?: number
  title: string
  author: string
  createdAt: string
  category: string
  tags: string[]
  contentBlocks: ContentBlock[]
  summary?: string
  views?: number
  likes?: number
  dislikes?: number
  updatedAt?: string
}

const route = useRoute()
const article = ref<any>(null)
const loading = ref(true)
const userLiked = ref(false)
const userDisliked = ref(false)

// 计算是否应该显示侧边栏
const showAside = computed(() => {
  return true // 总是显示侧边栏
})

// 标签类型映射
const getTagType = (tag: string) => {
  const typeMap: Record<string, string> = {
    'Vue.js': 'success',
    React: 'success',
    JavaScript: 'warning',
    TypeScript: 'warning',
    'Node.js': 'primary',
    CSS: 'primary',
    HTML: 'primary',
    Webpack: '',
    Vite: '',
    Git: '',
    MongoDB: 'info',
    Express: 'info'
  }

  return typeMap[tag] || ''
}

// 格式化日期
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 点赞处理
const handleLike = () => {
  // TODO: 实现点赞逻辑
  if (article.value) {
    console.log('点赞:', article.value._id)
  }
}

// 点踩处理
const handleDislike = () => {
  // TODO: 实现点踩逻辑
  if (article.value) {
    console.log('点踩:', article.value._id)
  }
}

const fetchArticle = async () => {
  try {
    const response: any = await axios.get(`/articles/${route.params.id}`)
    article.value = response

    // 增加浏览量
    if (article.value?.views !== undefined) {
      article.value.views += 1
    }
  } catch (error) {
    console.error('获取文章失败:', error)
  } finally {
    loading.value = false
  }
}

fetchArticle()

// 侧边栏点击切换文章时重新加载
watch(() => route.params.id, () => {
  loading.value = true
  article.value = null
  fetchArticle()
})
</script>

<style scoped lang="scss">
.blur_mask {
  min-height: 100vh;
  backdrop-filter: blur(50px);
  transition: margin-left 0.4s ease-in-out;
  margin-left: 0;
}

// 暗黑模式样式
.dark-mode .blur_mask {
  background-color: rgba(26, 26, 26, 0.8) !important;
  backdrop-filter: blur(50px);
}

.loading {
  padding: 40px;
  text-align: center;
}

// 暗黑模式样式
.dark-mode {
  .article-detail {
    &::before {
      background-color: rgba(0, 0, 0, 0.5) !important; // 半透明昏暗背景
      backdrop-filter: blur(150px);
    }
  }
}
</style>
