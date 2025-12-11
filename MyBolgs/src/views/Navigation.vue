<template>
  <el-main class="catalogue">
    <div class="navigation-container">
      <div class="page-header">
        <h1 class="page-title">网站导航</h1>
        <p class="page-subtitle">探索我的博客和技术分享</p>
      </div>

      <div class="navigation-grid">
        <!-- 动态渲染导航卡片 -->
        <el-card 
          v-for="item in navigationItems" 
          :key="item.title" 
          class="nav-card" 
          shadow="hover"
        >
          <div class="card-content" @click="$router.push(item.route)">
            <div class="card-icon">{{ item.icon }}</div>
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
            <div v-if="item.tags && item.tags.length" class="card-tags">
              <el-tag 
                v-for="tag in item.tags" 
                :key="tag.text"
                size="small" 
                :type="tag.type"
              >
                {{ tag.text }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>

      <div class="featured-section">
        <h2 class="section-title">特色内容</h2>
        <div class="featured-grid">
          <el-card 
            v-for="feature in featuredItems" 
            :key="feature.title"
            class="featured-card" 
            shadow="never"
          >
            <div class="featured-content">
              <h4>{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 导航项数据
const navigationItems = ref([
  {
    icon: '🏠',
    title: '首页',
    description: '返回博客主页，查看最新文章和动态',
    route: '/',
    tags: []
  },
  {
    icon: '💻',
    title: '前端开发',
    description: 'Web技术、框架、工具等相关内容',
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
    description: '服务器端技术、数据库、API等内容',
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
    description: '机器学习、深度学习、AI应用等内容',
    route: '/AINote',
    tags: [
      { text: '机器学习', type: 'success' },
      { text: '深度学习', type: 'warning' },
      { text: 'Python', type: 'primary' }
    ]
  },
  {
    icon: '🔅',
    title: '关于',
    description: '了解更多关于我和这个博客的信息',
    route: '/',
    tags: []
  }
])

// 特色内容数据
const featuredItems = ref([
  {
    title: '📘 技术教程',
    description: '详细的编程教程和实践经验分享'
  },
  {
    title: '📝 开发笔记',
    description: '日常开发中的问题记录和解决方案'
  },
  {
    title: '🔧 工具推荐',
    description: '实用的开发工具和资源整理'
  }
])
</script>

<style scoped lang="scss">
.catalogue {
  padding: 80px 20px 40px;
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #f0f4f8 0%, #e6ecf3 100%);

  .navigation-container {
    max-width: 1200px;
    margin: 0 auto;

    .page-header {
      text-align: center;
      margin-bottom: 40px;

      .page-title {
        font-size: 2.5rem;
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 10px;
      }

      .page-subtitle {
        font-size: 1.1rem;
        color: #718096;
        margin: 0;
      }
    }

    .navigation-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 25px;
      margin-bottom: 50px;

      .nav-card {
        border-radius: 15px;
        border: none;
        transition: all 0.3s ease;
        cursor: pointer;
        background: rgba(255, 255, 255, 0.85);
        backdrop-filter: blur(10px);

        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08) !important;
        }

        .card-content {
          padding: 25px;
          text-align: center;

          .card-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            color: rgb(100, 165, 229);
          }

          .card-title {
            font-size: 1.4rem;
            font-weight: 600;
            margin: 15px 0;
            color: #4a5568;
          }

          .card-description {
            color: #718096;
            font-size: 0.95rem;
            line-height: 1.6;
            margin-bottom: 20px;
          }

          .card-tags {
            display: flex;
            justify-content: center;
            gap: 10px;
            flex-wrap: wrap;
          }
        }
      }
    }

    .featured-section {
      .section-title {
        font-size: 1.8rem;
        font-weight: 600;
        color: #4a5568;
        margin-bottom: 25px;
        text-align: center;
      }

      .featured-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;

        .featured-card {
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);

          .featured-content {
            padding: 20px;

            h4 {
              margin: 0 0 10px 0;
              color: #4a5568;
              font-size: 1.2rem;
            }

            p {
              margin: 0;
              color: #718096;
              font-size: 0.95rem;
              line-height: 1.5;
            }
          }
        }
      }
    }
  }
}

// 暗黑模式样式
.dark-mode .catalogue {
  background: linear-gradient(135deg, #1a1c26 0%, #161923 100%);

  .navigation-container {
    .page-header {
      .page-title {
        color: #e2e8f0;
      }

      .page-subtitle {
        color: #a0aec0;
      }
    }

    .navigation-grid {
      .nav-card {
        background: rgba(45, 55, 72, 0.7);

        &:hover {
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25) !important;
        }

        .card-content {
          .card-icon {
            color: rgb(100, 165, 229);
          }

          .card-title {
            color: #e2e8f0;
          }

          .card-description {
            color: #a0aec0;
          }
        }
      }
    }

    .featured-section {
      .section-title {
        color: #e2e8f0;
      }

      .featured-grid {
        .featured-card {
          background: rgba(45, 55, 72, 0.7);
          border-color: #2d3748;

          .featured-content {
            h4 {
              color: #e2e8f0;
            }

            p {
              color: #a0aec0;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .catalogue {
    padding: 80px 15px 20px;

    .navigation-container {
      .page-header {
        .page-title {
          font-size: 2rem;
        }

        .page-subtitle {
          font-size: 1rem;
        }
      }

      .navigation-grid {
        grid-template-columns: 1fr;
      }

      .featured-grid {
        grid-template-columns: 1fr;
      }
    }
  }
}
</style>