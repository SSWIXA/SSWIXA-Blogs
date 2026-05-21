<template>
  <div class="blur_mask">
    <div class="category-container">
      <div class="category-header">
        <h2 class="category-title">📁 {{ categoryName }}</h2>
        <p v-if="total" class="category-count">共 {{ total }} 篇文章</p>
      </div>

      <div v-if="loading" class="loading-state">加载中...</div>

      <div v-else-if="articles.length > 0" class="category-list">
        <PagePart v-for="item in articles" :key="item._id" :msg="item" />
      </div>

      <div v-else class="empty-state">
        <p>该分类下暂无文章</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PagePart from '@/components/PagePart.vue'
import { getArticlesByPage } from '@/api/articleService'

interface Article {
  _id: string
  title: string
  [key: string]: any
}

const route = useRoute()
const categoryName = ref('')
const articles = ref<Article[]>([])
const total = ref(0)
const loading = ref(false)

const fetchArticles = async (category: string) => {
  if (!category) return
  loading.value = true
  try {
    const result: any = await getArticlesByPage({ category, limit: 50 })
    articles.value = result.items || result || []
    total.value = result.pagination?.total || articles.value.length
  } catch (err) {
    console.error('获取分类文章失败:', err)
    articles.value = []
  } finally {
    loading.value = false
  }
}

watch(
  () => route.params.name,
  (name) => {
    if (name) {
      categoryName.value = name as string
      fetchArticles(name as string)
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

.category-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 80px 20px 40px;
}

.category-header {
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(135, 206, 250, 0.3);

  .category-title {
    font-size: 24px;
    font-weight: 600;
    color: #333;
    margin: 0 0 8px 0;
  }

  .category-count {
    font-size: 14px;
    color: #999;
    margin: 0;
  }
}

.loading-state {
  text-align: center;
  padding: 60px 0;
  color: #999;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.empty-state {
  text-align: center;
  padding: 80px 0;
  color: #999;
}

// 暗黑模式
.dark-mode {
  .blur_mask {
    background-color: rgba(26, 26, 26, 0.8) !important;
  }

  .category-header {
    border-bottom-color: rgba(135, 206, 250, 0.15);

    .category-title {
      color: #e2e8f0;
    }
    .category-count {
      color: #888;
    }
  }

  .loading-state {
    color: #888;
  }
  .empty-state {
    color: #888;
  }
}
</style>
