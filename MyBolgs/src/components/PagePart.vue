<template>
  <div class="page_container">
    <div class="show_list_title">
      <h2>{{ title }}</h2>
    </div>
    <div class="show_list_msg">
      <p class="content-preview" v-if="content">{{ contentPreview }}</p>
    </div>
    <el-divider style="margin: 0 10px; width: auto; border-top: 1px blue solid; opacity: 0.2" />
    <div class="item_information">
      <div class="info-item">
        <el-icon><View /></el-icon>
        <span class="info-text">{{ views }} 浏览</span>
      </div>
      <div class="info-item">
        <el-icon><Calendar /></el-icon>
        <span class="info-text">{{ formatDate(createdAt) }}</span>
      </div>
      <div class="info-item">
        <div class="like" @click="handleLike">{{ likes }}</div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { View, Calendar } from '@element-plus/icons-vue'
import axios from '@/axios/axios'
const props = defineProps(['msg'])

const title = ref<string>('')
const content = ref<string>('')
const views = ref<number>(0)
const likes = ref<number>(0)
const dislikes = ref<number>(0)
const createdAt = ref<string>('')
const articleId = ref<string>('')
const userLiked = ref<boolean>(false)
const userDisliked = ref<boolean>(false)

// 处理点赞
const handleLike = async () => {
  // 如果用户已经点踩，则先取消点踩
  if (userDisliked.value) {
    await handleDislike()
  }

  // 如果用户已经点赞，则取消点赞；否则点赞
  try {
    if (userLiked.value) {
      // 这里可以实现取消点赞的逻辑，但根据需求我们暂时不实现
      return
    } else {
      const response = await axios.post(`/articles/${articleId.value}/like`)
      likes.value = response.data.likes
      userLiked.value = true
    }
  } catch (error) {
    console.error('点赞失败:', error)
  }
}

// 处理点踩
const handleDislike = async () => {
  // 如果用户已经点赞，则先取消点赞
  if (userLiked.value) {
    await handleLike()
  }

  // 如果用户已经点踩，则取消点踩；否则点踩
  try {
    if (userDisliked.value) {
      // 这里可以实现取消点踩的逻辑，但根据需求我们暂时不实现
      return
    } else {
      const response = await axios.post(`/articles/${articleId.value}/dislike`)
      dislikes.value = response.data.dislikes
      userDisliked.value = true
    }
  } catch (error) {
    console.error('点踩失败:', error)
  }
}

onMounted(async () => {
  title.value = props.msg.title
  content.value = props.msg.content || ''
  views.value = props.msg.views || 0
  // 从数据库获取最新的likes和dislikes数据
  try {
    const response = await axios.get(`/articles/${props.msg._id}`)
    likes.value = response.data.likes || 0
    dislikes.value = response.data.dislikes || 0
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

  &:hover {
    transform: translateY(-3px);
    box-shadow:
      rgba(50, 50, 105, 0.25) 0px 4px 10px 0px,
      rgba(0, 0, 0, 0.1) 0px 2px 2px 0px;
  }

  .show_list_title {
    padding: 15px 15px 5px 15px;

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

      .like,
      .dislike {
        display: flex;
        align-items: center;
        gap: 5px;
        color: #888;
        &:hover {
          cursor: pointer;
        }
      }

      .like {
        &::before {
          content: '';
          background-image: url('@/assets/good.png');
          width: 20px;
          height: 20px;
          background-size: cover;
          display: inline-block;
        }
      }

      .dislike {
        &::before {
          content: '';
          background-image: url('@/assets/bad.png');
          width: 20px;
          height: 20px;
          background-size: cover;
          display: inline-block;
        }
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

        .like,
        .dislike {
          color: #aaa !important;
        }
      }
    }
  }
}
</style>
