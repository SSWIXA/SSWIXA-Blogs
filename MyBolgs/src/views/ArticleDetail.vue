<template>
  <div class="article-detail">
    <el-card class="article-card">
      <template #header>
        <div class="article-header">
          <h1 class="article-title">{{ article.title }}</h1>
          <div class="article-meta">
            <el-tag 
              v-for="tag in article.tags" 
              :key="tag" 
              :type="getTagType(tag)"
              size="small"
              class="article-tag"
            >
              {{ tag }}
            </el-tag>
            <div class="meta-info">
              <span class="meta-item">
                <el-icon><View /></el-icon>
                <span>{{ article.views }} 浏览</span>
              </span>
              <span class="meta-item">
                <el-icon><Calendar /></el-icon>
                <span>{{ formatDate(article.createdAt) }}</span>
              </span>
            </div>
          </div>
        </div>
      </template>
      
      <div class="article-content" v-html="article.content"></div>
      
      <div class="article-actions">
        <el-button 
          :type="userLiked ? 'primary' : 'default'" 
          plain
          @click="handleLike"
          class="action-button"
        >
          <el-icon><Pointer /></el-icon>
          <span>{{ article.likes }} 赞</span>
        </el-button>
        <el-button 
          :type="userDisliked ? 'danger' : 'default'"
          plain
          @click="handleDislike"
          class="action-button"
        >
          <el-icon><Minus /></el-icon>
          <span>{{ article.dislikes }} 踩</span>
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { View, Calendar, Pointer, Minus } from '@element-plus/icons-vue'
import axios from '@/axios/axios'

// 定义文章数据类型
interface Article {
  _id: string
  title: string
  content: string
  views: number
  likes: number
  dislikes: number
  createdAt: string
  tags: string[]
  userLiked?: boolean
  userDisliked?: boolean
}

const route = useRoute()
const article = ref<Article>({
  _id: '',
  title: '',
  content: '',
  views: 0,
  likes: 0,
  dislikes: 0,
  createdAt: '',
  tags: []
})

const userLiked = ref(false)
const userDisliked = ref(false)

// 获取文章详情
const fetchArticle = async (id: string) => {
  try {
    const response = await axios.get(`/articles/${id}`)
    article.value = response.data
    
    // 初始化用户点赞状态
    userLiked.value = response.data.userLiked || false
    userDisliked.value = response.data.userDisliked || false
    
    // 增加浏览量
    article.value.views += 1
  } catch (error) {
    console.error('获取文章详情失败:', error)
  }
}

// 标签类型映射
const getTagType = (tag: string) => {
  const typeMap: Record<string, string> = {
    'Vue.js': 'success',
    'React': 'success',
    'JavaScript': 'warning',
    'TypeScript': 'warning',
    'Node.js': 'primary',
    'CSS': 'primary',
    'HTML': 'primary',
    'Webpack': '',
    'Vite': '',
    'Git': '',
    'MongoDB': 'info',
    'Express': 'info'
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
const handleLike = async () => {
  if (userDisliked.value) {
    await cancelDislike()
  }
  
  try {
    if (userLiked.value) {
      // 取消点赞
      await axios.post(`/articles/${article.value._id}/unlike`)
      article.value.likes -= 1
      userLiked.value = false
    } else {
      // 点赞
      await axios.post(`/articles/${article.value._id}/like`)
      article.value.likes += 1
      userLiked.value = true
    }
  } catch (error) {
    console.error('点赞操作失败:', error)
  }
}

// 点踩处理
const handleDislike = async () => {
  if (userLiked.value) {
    await cancelLike()
  }
  
  try {
    if (userDisliked.value) {
      // 取消点踩
      await axios.post(`/articles/${article.value._id}/undislike`)
      article.value.dislikes -= 1
      userDisliked.value = false
    } else {
      // 点踩
      await axios.post(`/articles/${article.value._id}/dislike`)
      article.value.dislikes += 1
      userDisliked.value = true
    }
  } catch (error) {
    console.error('点踩操作失败:', error)
  }
}

// 取消点赞
const cancelLike = async () => {
  try {
    await axios.post(`/articles/${article.value._id}/unlike`)
    article.value.likes -= 1
    userLiked.value = false
  } catch (error) {
    console.error('取消点赞失败:', error)
  }
}

// 取消点踩
const cancelDislike = async () => {
  try {
    await axios.post(`/articles/${article.value._id}/undislike`)
    article.value.dislikes -= 1
    userDisliked.value = false
  } catch (error) {
    console.error('取消点踩失败:', error)
  }
}

onMounted(() => {
  const articleId = route.params.id as string
  if (articleId) {
    fetchArticle(articleId)
  }
})
</script>

<style scoped lang="scss">
.article-detail {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
  
  .article-card {
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    
    :deep(.el-card__header) {
      padding: 20px;
      border-bottom: 1px solid #ebeef5;
    }
    
    :deep(.el-card__body) {
      padding: 30px 20px;
    }
  }
  
  .article-header {
    .article-title {
      margin: 0 0 15px 0;
      font-size: 2rem;
      font-weight: 600;
      color: #333;
      line-height: 1.3;
    }
    
    .article-meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 10px;
      
      .article-tag {
        margin-right: 8px;
      }
      
      .meta-info {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-left: auto;
        
        .meta-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.9rem;
          color: #888;
          
          .el-icon {
            font-size: 1rem;
          }
        }
      }
    }
  }
  
  .article-content {
    font-size: 1rem;
    line-height: 1.8;
    color: #333;
    
    // 基本的富文本样式
    h1, h2, h3, h4, h5, h6 {
      margin: 24px 0 16px 0;
      font-weight: 600;
      line-height: 1.25;
    }
    
    h1 {
      font-size: 2em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
    }
    
    h2 {
      font-size: 1.5em;
      border-bottom: 1px solid #eaecef;
      padding-bottom: 0.3em;
    }
    
    p {
      margin: 16px 0;
    }
    
    ul, ol {
      padding-left: 2em;
      margin: 16px 0;
    }
    
    li {
      margin: 8px 0;
    }
    
    pre {
      background-color: #f6f8fa;
      border-radius: 6px;
      padding: 16px;
      overflow: auto;
      margin: 16px 0;
      font-size: 0.9rem;
      line-height: 1.45;
    }
    
    code {
      background-color: rgba(27, 31, 35, 0.05);
      border-radius: 3px;
      padding: 0.2em 0.4em;
      font-size: 0.9em;
      font-family: monospace;
    }
    
    blockquote {
      margin: 16px 0;
      padding: 0 1em;
      color: #6a737d;
      border-left: 0.25em solid #dfe2e5;
    }
    
    img {
      max-width: 100%;
      height: auto;
      border-radius: 6px;
    }
    
    a {
      color: #0366d6;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      
      th, td {
        padding: 6px 13px;
        border: 1px solid #dfe2e5;
      }
      
      tr:nth-child(2n) {
        background-color: #f6f8fa;
      }
    }
  }
  
  .article-actions {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid #ebeef5;
    
    .action-button {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 12px 20px;
      
      &:hover {
        transform: scale(1.05);
        transition: transform 0.2s ease;
      }
    }
  }
}

// 暗黑模式样式
.dark-mode .article-detail {
  .article-card {
    background-color: #2d2d2d;
    border-color: #444;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.3);
    
    :deep(.el-card__header) {
      border-bottom-color: #444;
    }
  }
  
  .article-header {
    .article-title {
      color: #f0f0f0;
    }
    
    .article-meta {
      .meta-info {
        .meta-item {
          color: #aaa;
          
          .el-icon {
            color: #aaa;
          }
        }
      }
    }
  }
  
  .article-content {
    color: #ddd;
    
    h1, h2, h3, h4, h5, h6 {
      color: #f0f0f0;
    }
    
    h1, h2 {
      border-bottom-color: #444;
    }
    
    code {
      background-color: rgba(255, 255, 255, 0.1);
    }
    
    pre {
      background-color: #1e1e1e;
      color: #d4d4d4;
    }
    
    blockquote {
      color: #aaa;
      border-left-color: #444;
    }
  }
}
</style>