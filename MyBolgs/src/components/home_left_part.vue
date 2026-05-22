<template>
  <div class="showlist">
    <div class="list" v-if="showList">
      <PagePart v-for="item in itemMessage" :key="item._id" :msg="item" />
    </div>
    <div v-if="loading" class="loading-more">
      <div class="loading-spinner">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <span class="loading-text">正在加载更多文章...</span>
    </div>
    <div v-if="!hasMore && showList" class="no-more">— 已经到底了 —</div>
    <div ref="sentinelRef" class="scroll-sentinel"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import PagePart from '@/components/PagePart.vue'
import { getArticlesByPage } from '@/api/articleService'

interface Article {
  _id: string
  title: string
  contentBlocks?: any[]
  views: number
  likes: number
  dislikes: number
  createdAt: string
  [key: string]: any
}

const showList = ref(false)
const itemMessage = ref<Article[]>([])
const loading = ref(false)
const hasMore = ref(true)
const currentPage = ref(1)
const pageSize = 10
const sentinelRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

async function loadMore() {
  if (loading.value || !hasMore.value) return
  loading.value = true
  try {
    const result: any = await getArticlesByPage({ page: currentPage.value, limit: pageSize })
    // 延迟 1 秒展示转圈效果
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const items = result.items || result || []
    itemMessage.value.push(...items)
    showList.value = true
    const total = result.pagination?.total ?? 999
    hasMore.value = itemMessage.value.length < total
    if (hasMore.value) currentPage.value++
  } catch (err) {
    console.error('加载文章失败:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadMore() // 首页加载 10 篇

  // 监听滚动到底部
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && hasMore.value) {
        loadMore()
      }
    },
    { rootMargin: '100px' }
  )
  if (sentinelRef.value) observer.observe(sentinelRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped lang="scss">
.showlist {
  min-height: 200px;
}

.loading-more {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 36px 20px;

  .loading-spinner {
    display: flex;
    gap: 10px;

    .dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: linear-gradient(135deg, #409eff, #36cfc9);
      animation: bounce 1.2s infinite ease-in-out;

      &:nth-child(1) {
        animation-delay: 0s;
      }
      &:nth-child(2) {
        animation-delay: 0.15s;
      }
      &:nth-child(3) {
        animation-delay: 0.3s;
      }
    }
  }

  .loading-text {
    color: #909399;
    font-size: 14px;
    letter-spacing: 1px;
  }
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0.6);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.no-more {
  text-align: center;
  padding: 20px;
  color: #bbb;
  font-size: 13px;
}

.scroll-sentinel {
  height: 1px;
}
</style>
