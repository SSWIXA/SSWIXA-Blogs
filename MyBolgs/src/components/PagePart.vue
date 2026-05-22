<template>
  <div
    class="page_container"
    @click="goToArticle"
    :style="{ borderLeft: '4px solid ' + categoryColor }"
  >
    <div class="card_top">
      <el-tag :color="categoryColor" effect="dark" size="small" class="category-tag">
        {{ category }}
      </el-tag>
    </div>
    <div class="show_list_title">
      <h2>{{ title }}</h2>
    </div>
    <div class="show_list_msg">
      <p class="content-preview" v-if="content">{{ contentPreview }}</p>
      <div class="tag-row" v-if="tags.length">
        <el-tag v-for="tag in tags.slice(0, 4)" :key="tag" size="small" class="article-tag">
          {{ tag }}
        </el-tag>
      </div>
    </div>
    <el-divider style="margin: 0 10px; width: auto; border-top: 1px solid #eee; opacity: 0.5" />
    <div class="item_information">
      <div class="info-item">
        <el-icon><View /></el-icon>
        <span class="info-text">{{ views }} 浏览</span>
      </div>
      <div class="info-item">
        <el-icon><Calendar /></el-icon>
        <span class="info-text">{{ formatDate(createdAt) }}</span>
      </div>
      <div class="info-item like-item" @click.stop="handleLike">
        <el-icon :class="{ liked: userLiked }"><Pointer /></el-icon>
        <span class="info-text">{{ likes }}</span>
      </div>
      <div class="info-item dislike-item" @click.stop="handleDislike">
        <el-icon :class="{ disliked: userDisliked }"><Minus /></el-icon>
        <span class="info-text">{{ dislikes }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { View, Calendar, Pointer, Minus } from '@element-plus/icons-vue'
import axios from '@/axios/axios'
import { useRouter } from 'vue-router'

interface ArticleResponse {
  likes: number
  dislikes: number
  [key: string]: any
}

const props = defineProps(['msg'])

const title = ref<string>('')
const category = ref<string>('未分类')
const tags = ref<string[]>([])
const content = ref<string>('')
const views = ref<number>(0)
const likes = ref<number>(0)
const dislikes = ref<number>(0)
const createdAt = ref<string>('')
const articleId = ref<string>('')
const userLiked = ref<boolean>(false)
const userDisliked = ref<boolean>(false)
const router = useRouter()

// 分类颜色映射
const categoryColorMap: Record<string, string> = {
  前端开发: '#409eff',
  后端开发: '#67c23a',
  编程语言: '#e6a23c',
  数据库: '#f56c6c',
  运维: '#909399',
  开发工具: '#b37feb',
  前端工程化: '#36cfc9',
  个人日记: '#ff7875',
  人工智能: '#597ef7',
  嵌入式开发: '#ffc069',
  其他: '#5cdbd3'
}
const categoryColor = computed(() => categoryColorMap[category.value] || '#409eff')

// 跳转到文章详情页
const goToArticle = () => {
  router.push(`/article/${articleId.value}`)
}

// 处理点赞
const handleLike = async () => {
  try {
    if (userLiked.value) {
      // 用户已经点赞，执行取消点赞
      const response = (await axios.delete(`/articles/${articleId.value}/like`)) as ArticleResponse
      console.log('取消点赞响应:', response)
      likes.value = response?.likes ?? likes.value - 1
      userLiked.value = false
    } else {
      // 用户未点赞，执行点赞
      const response = (await axios.put(`/articles/${articleId.value}/like`)) as ArticleResponse
      console.log('点赞响应:', response)
      likes.value = response?.likes ?? likes.value + 1
      userLiked.value = true

      // 如果用户之前点过踩，需要同时取消点踩状态
      if (userDisliked.value) {
        const responseDislike = (await axios.delete(
          `/articles/${articleId.value}/dislike`
        )) as ArticleResponse
        dislikes.value = responseDislike?.dislikes ?? dislikes.value - 1
        userDisliked.value = false
      }
    }
    console.log('更新后的likes:', likes.value)
  } catch (error) {
    console.error('点赞操作失败:', error)
  }
}

// 处理点踩
const handleDislike = async () => {
  try {
    if (userDisliked.value) {
      // 用户已经点踩，执行取消点踩
      const response = (await axios.delete(
        `/articles/${articleId.value}/dislike`
      )) as ArticleResponse
      dislikes.value = response?.dislikes || dislikes.value
      userDisliked.value = false
    } else {
      // 用户未点赞，执行点踩
      const response = (await axios.put(`/articles/${articleId.value}/dislike`)) as ArticleResponse
      dislikes.value = response?.dislikes || dislikes.value
      userDisliked.value = true

      // 如果用户之前点过赞，需要同时取消点赞状态
      if (userLiked.value) {
        const responseLike = (await axios.delete(
          `/articles/${articleId.value}/like`
        )) as ArticleResponse
        likes.value = responseLike?.likes || likes.value
        userLiked.value = false
      }
    }
  } catch (error) {
    console.error('点踩操作失败:', error)
  }
}

onMounted(async () => {
  title.value = props.msg.title
  category.value = props.msg.category || '未分类'
  tags.value = props.msg.tags || []
  // 从contentBlocks中提取文本内容作为预览
  if (props.msg.contentBlocks && props.msg.contentBlocks.length > 0) {
    const paragraphs = props.msg.contentBlocks
      .filter((block: any) => block.type === 'paragraph')
      .map((block: any) => block.data)
      .join(' ')
    content.value = paragraphs
  }
  views.value = props.msg.views || 0
  // 从数据库获取最新的likes和dislikes数据
  try {
    const article = (await axios.get(`/articles/${props.msg._id}`)) as ArticleResponse
    likes.value = article?.likes ?? 0
    dislikes.value = article?.dislikes ?? 0
  } catch (error) {
    // 如果获取失败，则使用props中的数据
    likes.value = props.msg.likes || 0
    dislikes.value = props.msg.dislikes || 0
    console.error('获取文章点赞数据失败:', error)
  }
  createdAt.value = props.msg.createdAt || ''
  articleId.value = props.msg._id || ''
})

const contentPreview = computed(() => {
  if (!content.value) return ''
  // 提取纯文本并截取前100个字符作为预览
  const text = content.value.replace(/<[^>]*>/g, '')
  return text.length > 100 ? text.substring(0, 100) + '...' : text
})

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
<style scoped lang="scss">
.page_container {
  margin: 0 0 15px 0;
  width: 100%;
  background-color: rgba($color: #ffffff, $alpha: 1);
  box-shadow:
    rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 10px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      rgba(50, 50, 105, 0.25) 0px 4px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;
  }

  .card_top {
    padding: 12px 15px 0 15px;
  }

  .category-tag {
    font-size: 12px;
    border-radius: 3px;
  }

  .tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 8px;

    .article-tag {
      font-size: 11px;
      height: 20px;
      line-height: 18px;
    }
  }

  .show_list_title {
    padding: 8px 15px 5px 15px;

    h2 {
      margin: 0;
      font-size: 1.4rem;
      color: #333;
      font-weight: 600;
      line-height: 1.3;
    }
  }

  .show_list_msg {
    padding: 5px 15px 10px 15px;
    min-height: 50px;

    .content-preview {
      margin: 0;
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }

  .item_information {
    padding: 10px 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;

    .info-item {
      display: flex;
      align-items: center;
      gap: 5px;

      .info-text {
        font-size: 0.85rem;
        color: #888;
      }

      .el-icon {
        font-size: 0.9rem;
        color: #999;
      }
    }

    .like-item {
      cursor: pointer;

      .liked {
        color: #409eff;
      }
    }

    .dislike-item {
      cursor: pointer;

      .disliked {
        color: #f56c6c;
      }
    }
  }
}

// 暗黑模式样式
.dark-mode {
  .page_container {
    background-color: #2d2d2d !important;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 2px 5px 0px,
      rgba(0, 0, 0, 0.1) 0px 1px 1px 0px !important;

    &:hover {
      box-shadow:
        rgba(0, 0, 0, 0.5) 0px 4px 10px 0px,
        rgba(0, 0, 0, 0.2) 0px 2px 2px 0px !important;
    }

    .tag-row .article-tag {
      background-color: #3a3a3a !important;
      border-color: #555 !important;
      color: #ccc !important;
    }

    .show_list_title {
      h2 {
        color: #f0f0f0 !important;
      }
    }

    .show_list_msg {
      .content-preview {
        color: #aaa !important;
      }
    }

    .item_information {
      .info-item {
        .info-text {
          color: #aaa !important;
        }

        .el-icon {
          color: #aaa !important;
        }

        .like-item {
          .liked {
            color: #409eff !important;
          }
        }

        .dislike-item {
          .disliked {
            color: #f56c6c !important;
          }
        }
      }
    }
  }
}
</style>
