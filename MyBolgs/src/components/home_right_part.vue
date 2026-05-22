<template>
  <div class="intro_blogers">
    <div class="profile-card">
      <div class="profile-bg"></div>
      <div class="favator">
        <el-avatar shape="circle" :size="90" src="src/assets/bg.jpg" />
      </div>
      <div class="blogers_name">
        <span class="username">SSWIXA</span>
      </div>
      <p class="bio">🚀 前端开发工程师 | 技术爱好者</p>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-number">{{ totalArticles }}</span>
          <span class="stat-label">文章</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ formatViews(totalViews) }}</span>
          <span class="stat-label">浏览</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-number">{{ totalLikes }}</span>
          <span class="stat-label">点赞</span>
        </div>
      </div>
    </div>

    <div class="recent-posts">
      <div class="section-header">
        <span class="section-icon">📝</span>
        <h3>最近文章</h3>
      </div>
      <div class="post-list">
        <div
          class="post-item"
          v-for="(post, index) in recentPosts"
          :key="post._id"
          @click="$router.push(`/article/${post._id}`)"
        >
          <span class="post-dot" :style="{ background: dotColors[index] }"></span>
          <div class="post-content">
            <div class="post-title">{{ post.title }}</div>
            <div class="post-date">{{ formatDate(post.date) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="hot_tags">
      <div class="section-header">
        <span class="section-icon">🏷️</span>
        <h3>热门标签</h3>
      </div>
      <div class="tags-cloud">
        <el-tag
          v-for="(tag, index) in tags"
          :key="tag"
          class="tag-bubble"
          :color="tagBubbleColors[index % tagBubbleColors.length]"
          effect="dark"
          size="small"
        >
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllArticles, getArticleStats } from '@/api/articleService'

const totalArticles = ref(0)
const totalViews = ref(0)
const totalLikes = ref(0)

interface RecentPost {
  title: string
  date: string
  _id: string
}
const recentPosts = ref<RecentPost[]>([])
const tags = ref<string[]>([])

// 彩色圆点
const dotColors = ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']
// 标签气泡色
const tagBubbleColors = [
  '#409eff', '#67c23a', '#e6a23c', '#f56c6c',
  '#909399', '#b37feb', '#36cfc9', '#ff7875', '#597ef7'
]

onMounted(async () => {
  try {
    const stats: any = await getArticleStats()
    totalArticles.value = stats.totalArticles || 0
    totalViews.value = stats.totalViews || 0
    totalLikes.value = stats.totalLikes || 0
  } catch (err) {
    console.error('获取统计信息失败:', err)
  }

  try {
    const articles: any = await getAllArticles()
    const latest = articles.slice(0, 5)
    recentPosts.value = latest.map((a: any) => ({
      title: a.title,
      date: a.createdAt,
      _id: a._id
    }))
    const allTags = new Set<string>()
    articles.forEach((a: any) => {
      if (a.tags && Array.isArray(a.tags)) {
        a.tags.forEach((t: string) => allTags.add(t))
      }
    })
    tags.value = Array.from(allTags)
  } catch (err) {
    console.error('获取文章列表失败:', err)
  }
})

const formatViews = (count: number) => {
  if (count >= 10000) return (count / 1000).toFixed(1) + 'k'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'k'
  return count.toString()
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}
</script>

<style scoped lang="scss">
.intro_blogers {
  .profile-card {
    position: relative;
    border-radius: 16px;
    background-color: rgba(255, 255, 255, 0.92);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    margin-bottom: 20px;
    padding: 24px 20px 20px;
    text-align: center;
    overflow: hidden;

    .profile-bg {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 80px;
      background: linear-gradient(135deg, #409eff 0%, #36cfc9 100%);
      opacity: 0.15;
    }

    .favator {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100px;
      margin-top: 10px;

      .el-avatar {
        border: 3px solid rgba(64, 158, 255, 0.3);
        box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s;
        &:hover { transform: scale(1.05); }
      }
    }

    .username {
      font-size: 22px;
      font-weight: 700;
      color: #2c3e50;
      display: inline-block;
      margin: 12px 0 4px;
    }

    .bio {
      color: #909399;
      font-size: 13px;
      margin: 6px 0 18px;
    }

    .stats {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      background: rgba(64, 158, 255, 0.05);
      border-radius: 12px;
      padding: 14px 0;

      .stat-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .stat-number {
          font-size: 20px;
          font-weight: 700;
          color: #409eff;
          line-height: 1.2;
        }
        .stat-label {
          font-size: 11px;
          color: #909399;
          margin-top: 3px;
        }
      }

      .stat-divider {
        width: 1px;
        height: 28px;
        background: rgba(64, 158, 255, 0.2);
      }
    }
  }

  .recent-posts, .hot_tags {
    background-color: rgba(255, 255, 255, 0.92);
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    padding: 20px;
    margin-bottom: 20px;
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 14px;

    .section-icon { font-size: 20px; }
    h3 {
      font-size: 1.1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0;
    }
  }

  .post-list {
    .post-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 8px;
      border-radius: 8px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: rgba(64, 158, 255, 0.06);
      }

      .post-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
      }

      .post-content {
        flex: 1;
        min-width: 0;
      }

      .post-title {
        font-size: 0.9rem;
        color: #34495e;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .post-date {
        font-size: 0.75rem;
        color: #95a5a6;
        margin-top: 2px;
      }
    }
  }

  .tags-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-bubble {
      border-radius: 6px;
      padding: 4px 12px;
      font-size: 12px;
      font-weight: 500;
      transition: transform 0.15s;
      cursor: pointer;
      &:hover {
        transform: scale(1.05);
      }
    }
  }
}

// 暗黑模式
.dark-mode .intro_blogers {
  .profile-card {
    background-color: rgba(40, 40, 40, 0.92) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;

    .username { color: #e2e8f0 !important; }
    .bio { color: #888 !important; }
    .stats {
      background: rgba(64, 158, 255, 0.06);
      .stat-number { color: #64a5e5 !important; }
      .stat-label { color: #888 !important; }
      .stat-divider { background: rgba(100, 165, 229, 0.2); }
    }
  }
  .recent-posts, .hot_tags {
    background-color: rgba(40, 40, 40, 0.92) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
  }
  .section-header h3 { color: #e2e8f0 !important; }
  .post-item {
    &:hover { background: rgba(64, 158, 255, 0.08) !important; }
    .post-title { color: #ccc !important; }
    .post-date { color: #888 !important; }
  }
  .tag-bubble {
    color: #e0e0e0 !important;
  }
}
</style>
