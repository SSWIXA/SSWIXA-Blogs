<template>
  <div class="blur_mask">
    <div class="search-results-container">
      <div class="search-header">
        <h2 class="search-title">
          搜索"<span class="keyword">{{ keyword }}</span
          >"的结果
        </h2>
        <p v-if="articles.length > 0" class="search-count">共找到 {{ total }} 篇文章</p>
      </div>

      <div v-if="loading" class="loading-state">
        <el-icon class="is-loading"><i class="el-icon-loading"></i></el-icon>
        <span>搜索中...</span>
      </div>

      <div v-else-if="articles.length > 0" class="search-list">
        <PagePart v-for="item in articles" :key="item._id" :msg="item" />
      </div>

      <div v-else class="empty-state">
        <p class="empty-text">未找到相关文章</p>
        <p class="empty-hint">请尝试其他关键词</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PagePart from '@/components/PagePart.vue'
import { searchArticlesByTitle } from '@/api/articleService'

interface Article {
  _id: string
  title: string
  summary?: string
  views: number
  likes: number
  dislikes: number
  createdAt: string
  tags?: string[]
  author?: string
  [key: string]: any
}

const route = useRoute()
const keyword = ref('')
const articles = ref<Article[]>([])
const total = ref(0)
const loading = ref(false)

const doSearch = async (kw: string) => {
  if (!kw.trim()) return
  loading.value = true
  try {
    const result = (await searchArticlesByTitle(kw.trim())) as any
    // 后端 ApiResponse.paginate 返回 { items, pagination } 结构
    // 经 axios 拦截器后 data 就是 { items, pagination }
    articles.value = result.items || result || []
    total.value = result.pagination?.total || articles.value.length
  } catch (err) {
    console.error('搜索失败:', err)
    articles.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 监听路由 query 变化
watch(
  () => route.query.keyword,
  (newKw) => {
    if (newKw) {
      keyword.value = newKw as string
      doSearch(newKw as string)
    }
  },
  { immediate: true }
)
</script>

<style scoped lang="scss">
.blur_mask {
  backdrop-filter: blur(150px);
  min-height: 100vh;
}

.search-results-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 40px;
}

.search-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(135, 206, 250, 0.3);

  .search-title {
    font-size: 22px;
    font-weight: 500;
    color: #333;
    margin: 0 0 8px 0;

    .keyword {
      color: rgb(2, 102, 252);
    }
  }

  .search-count {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

.loading-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
  font-size: 16px;
}

.search-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 0;

  .empty-text {
    font-size: 18px;
    color: #666;
    margin: 0 0 10px 0;
  }

  .empty-hint {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

// 暗黑模式
.dark-mode {
  .blur_mask {
    background-color: rgba(26, 26, 26, 0.8) !important;
  }

  .search-header {
    border-bottom-color: rgba(135, 206, 250, 0.15);

    .search-title {
      color: #e2e8f0;

      .keyword {
        color: rgb(100, 165, 229);
      }
    }
  }

  .loading-state {
    color: #888;
  }

  .empty-state {
    .empty-text {
      color: #aaa;
    }
    .empty-hint {
      color: #777;
    }
  }
}
</style>
