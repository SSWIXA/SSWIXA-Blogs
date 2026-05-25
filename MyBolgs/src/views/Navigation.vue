<template>
  <div class="blur_mask nav-page">
    <div class="navigation-container">
      <!-- 头部 -->
      <div class="page-hero">
        <h1 class="hero-title">
          <span class="gradient-text">探索导航</span>
        </h1>
        <p class="hero-sub">技术博客 · 知识分享 · 成长记录</p>
      </div>

      <!-- 主卡片区 -->
      <div class="nav-cards">
        <div
          v-for="(item, index) in navigationItems"
          :key="item.title"
          class="nav-card"
          :class="`card-${index}`"
          @click="$router.push(item.route)"
        >
          <div class="card-bg" :style="{ background: cardGradients[index] }"></div>
          <div class="card-inner">
            <div class="card-icon-wrap">
              <span class="card-icon">{{ item.icon }}</span>
            </div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-desc">{{ item.description }}</p>
            <div v-if="item.tags.length" class="card-tags">
              <el-tag
                v-for="tag in item.tags"
                :key="tag.text"
                size="small"
                :type="tag.type as any"
                effect="plain"
              >
                {{ tag.text }}
              </el-tag>
            </div>
            <div class="card-arrow">→</div>
          </div>
        </div>
      </div>

      <!-- 快捷入口 -->
      <div class="quick-links">
        <h2 class="section-heading">
          <span class="heading-dot"></span>
          快捷入口
        </h2>
        <div class="quick-grid">
          <div
            v-for="link in quickLinks"
            :key="link.label"
            class="quick-item"
            @click="$router.push(link.route)"
          >
            <span class="quick-icon">{{ link.icon }}</span>
            <span class="quick-label">{{ link.label }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cardGradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
]

const navigationItems = ref([
  {
    icon: '🏠',
    title: '首页',
    description: '返回博客主页，查看最新文章和动态',
    route: '/',
    tags: [] as { text: string; type: string }[]
  },
  {
    icon: '💻',
    title: '前端开发',
    description: 'Web 技术、前端框架、工程化实践',
    route: '/WebNote',
    tags: [
      { text: 'Vue.js', type: 'success' },
      { text: 'React', type: 'warning' },
      { text: 'CSS', type: 'primary' }
    ]
  },
  {
    icon: '📦',
    title: '后端开发',
    description: 'Node.js、数据库、API 设计与部署',
    route: '/ServerNote',
    tags: [
      { text: 'Node.js', type: 'primary' },
      { text: 'MongoDB', type: 'info' },
      { text: 'Python', type: '' }
    ]
  },
  {
    icon: '🤖',
    title: '人工智能',
    description: '机器学习、深度学习与 AI 应用探索',
    route: '/AINote',
    tags: [
      { text: 'ML', type: 'success' },
      { text: 'DL', type: 'warning' },
      { text: 'NLP', type: 'primary' }
    ]
  },
  {
    icon: '🔅',
    title: '关于',
    description: '了解更多关于我和这个博客的故事',
    route: '/about',
    tags: []
  }
])

const quickLinks = ref([
  { icon: '📝', label: '最新文章', route: '/' },
  { icon: '🏷️', label: '前端开发', route: '/WebNote' },
  { icon: '🔧', label: '后端开发', route: '/ServerNote' },
  { icon: '🧠', label: '人工智能', route: '/AINote' },
  { icon: '👤', label: '关于我', route: '/about' },
  { icon: '🔐', label: '管理后台', route: '/admin' }
])
</script>

<style scoped lang="scss">
.nav-page {
  min-height: 100vh;
  backdrop-filter: blur(150px);
  padding: 80px 20px 60px;
}

.navigation-container {
  max-width: 1100px;
  margin: 0 auto;
}

// 头部
.page-hero {
  text-align: center;
  margin-bottom: 48px;

  .hero-title {
    font-size: 2.8rem;
    font-weight: 800;
    margin: 0 0 12px;

    .gradient-text {
      background: linear-gradient(135deg, #667eea 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  .hero-sub {
    font-size: 1.1rem;
    color: #909399;
    margin: 0;
    letter-spacing: 2px;
  }
}

// 卡片
.nav-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin-bottom: 56px;
}

.nav-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  min-height: 200px;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12);

    .card-bg { opacity: 0.12; }
    .card-arrow { opacity: 1; transform: translateX(0); }
  }

  .card-bg {
    position: absolute;
    inset: 0;
    opacity: 0.06;
    transition: opacity 0.35s;
  }

  .card-inner {
    position: relative;
    padding: 28px 24px 24px;
    z-index: 1;
  }

  .card-icon-wrap {
    width: 56px;
    height: 56px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  .card-icon { font-size: 28px; }

  .card-title {
    font-size: 1.3rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px;
  }

  .card-desc {
    font-size: 0.9rem;
    color: #909399;
    line-height: 1.6;
    margin: 0 0 16px;
  }

  .card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .card-arrow {
    position: absolute;
    bottom: 20px;
    right: 24px;
    font-size: 20px;
    color: #909399;
    opacity: 0;
    transform: translateX(-8px);
    transition: all 0.3s;
  }
}

// 快捷入口
.section-heading {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.4rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 0 24px;

  .heading-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea, #f5576c);
  }
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 16px;
}

.quick-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  &:hover {
    background: rgba(102, 126, 234, 0.1);
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  }

  .quick-icon { font-size: 22px; }
  .quick-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #4a5568;
  }
}

// 暗黑模式
.dark-mode .nav-page {
  background-color: rgba(26, 26, 26, 0.8) !important;

  .hero-sub { color: #888 !important; }

  .nav-card {
    background: rgba(40, 40, 40, 0.85) !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;

    &:hover { box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4) !important; }

    .card-icon-wrap {
      background: rgba(255, 255, 255, 0.06);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }
    .card-title { color: #e2e8f0 !important; }
    .card-desc { color: #888 !important; }
    .card-arrow { color: #888 !important; }
  }

  .section-heading { color: #e2e8f0 !important; }

  .quick-item {
    background: rgba(40, 40, 40, 0.75) !important;

    &:hover { background: rgba(102, 126, 234, 0.15) !important; }

    .quick-label { color: #ccc !important; }
  }
}

@media (max-width: 768px) {
  .nav-page { padding: 60px 12px 40px; }
  .hero-title { font-size: 2rem !important; }
  .nav-cards { grid-template-columns: 1fr; }
  .quick-grid { grid-template-columns: repeat(3, 1fr); }
}
</style>
