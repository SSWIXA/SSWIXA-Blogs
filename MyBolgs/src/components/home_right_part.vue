<template>
  <div class="intro_blogers">
    <div class="profile-card">
      <div class="favator">
        <el-avatar shape="circle" :size="100" src="src/assets/bg.jpg" />
      </div>
      <div class="blogers_name">
        <el-text class="username">SSWIXA</el-text>
      </div>
      <div class="profile-info">
        <p class="bio">前端开发工程师 | 技术爱好者</p>
        <div class="stats">
          <div class="stat-item">
            <el-text class="stat-number">25</el-text>
            <el-text class="stat-label">文章</el-text>
          </div>
          <div class="stat-item">
            <el-text class="stat-number">0.2k</el-text>
            <el-text class="stat-label">粉丝</el-text>
          </div>
          <div class="stat-item">
            <el-text class="stat-number">15</el-text>
            <el-text class="stat-label">标签</el-text>
          </div>
        </div>
      </div>
    </div>

    <div class="recent-posts">
      <div class="section-title">
        <h3>最近文章</h3>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="post-list">
        <div class="post-item" v-for="post in recentPosts" :key="post.title">
          <div class="post-title">{{ post.title }}</div>
          <div class="post-date">{{ formatDate(post.date) }}</div>
        </div>
      </div>
    </div>

    <div class="hot_tags">
      <div class="hot_tags_title">
        <el-icon :size="24" class="hot_tags_logo">
          <svg
            t="1715243864949"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="1146"
            width="200"
            height="200"
          >
            <path
              d="M715.02 843.67c-1.03 0-2.07-0.07-3.12-0.22l-383.76-53.31c-41.23-5.73-77.78-30.87-97.78-67.27-40.81-74.28-51.43-171.04-31.56-287.61 16.45-96.47 49.8-179.92 63.37-211.31 9.27-21.43 31.15-34.95 54.45-33.62l370.29 21.01c14.15 0.8 26.72 8.05 34.49 19.9 7.77 11.84 9.43 26.26 4.54 39.55-12.24 33.31-29.75 86.29-43.65 149.54-2.67 12.14-14.67 19.81-26.81 17.15-12.14-2.67-19.81-14.67-17.15-26.81 14.31-65.12 32.31-119.78 45.02-154.46l-369.29-20.95c-4.54-0.27-8.8 2.38-10.6 6.55-12.93 29.9-44.69 109.35-60.32 201.02-18.12 106.3-9.16 193.23 26.64 258.38 13.19 24 37.31 40.58 64.53 44.36l383.76 53.31c12.31 1.71 20.9 13.07 19.19 25.38-1.56 11.26-11.21 19.41-22.26 19.41z"
              fill="#333333"
              p-id="1147"
            ></path>
            <path
              d="M722.9 843.32c-6.2 0-10.89-1.02-13.17-1.64-41.47-10.96-61.53-62.63-64.3-70.28-17.77-45.41-27.55-98.29-29.04-157.16-0.32-12.42 9.5-22.75 21.92-23.07 12.41-0.32 22.75 9.5 23.07 21.92 1.37 53.75 10.14 101.59 26.07 142.18 0.09 0.23 0.18 0.47 0.26 0.71 4.32 11.99 18.24 38.16 33.53 42.19l0.42 0.12c0.94 0.15 5.44 0.58 11.27-3.99 26.5-20.75 32.26-93.25 33.5-123.46a11.14 11.14 0 0 0-9.49-11.48l-50.77-7.62c-12.29-1.84-20.76-13.3-18.91-25.59 1.84-12.29 13.3-20.76 25.59-18.91l50.77 7.62c28.42 4.26 48.96 29.12 47.78 57.83-1.84 44.63-7.89 80.99-17.99 108.08-8.84 23.69-20.99 41.01-36.13 51.47-12.86 8.88-25.25 11.08-34.36 11.08z m-0.33-44.75h0z m-0.02 0h0z m-1.03-0.3zM564.52 357c-0.51 0-1.02-0.02-1.53-0.05l-208-14c-12.4-0.83-21.77-11.56-20.94-23.96 0.83-12.4 11.56-21.76 23.96-20.94l208 14c12.4 0.83 21.77 11.56 20.94 23.96-0.8 11.88-10.69 20.99-22.43 20.99zM545.52 454c-0.56 0-1.12-0.02-1.69-0.06l-215-16c-12.39-0.92-21.69-11.71-20.77-24.11 0.92-12.39 11.72-21.7 24.11-20.77l215 16c12.39 0.92 21.69 11.71 20.77 24.11-0.88 11.82-10.75 20.83-22.41 20.83zM405.52 539c-0.59 0-1.19-0.02-1.79-0.07l-89-7c-12.39-0.97-21.64-11.81-20.67-24.2 0.97-12.39 11.8-21.64 24.19-20.67l89 7c12.39 0.97 21.64 11.81 20.67 24.2-0.93 11.79-10.78 20.74-22.41 20.74zM525.51 645c-6.09 0-12.17-2.46-16.6-7.31-8.39-9.17-7.76-23.4 1.41-31.79l297.77-272.5c9.17-8.39 23.4-7.76 31.79 1.41s7.76 23.4-1.41 31.79L540.7 639.1c-4.32 3.95-9.76 5.9-15.18 5.9z"
              fill="#333333"
              p-id="1148"
            ></path>
          </svg>
        </el-icon>
        <h2>热门标签</h2>
      </div>
      <el-divider class="divider"></el-divider>
      <div class="tags-container">
        <el-tag v-for="tag in tags" :key="tag" class="tag-item" :type="getTagType(tag)">
          {{ tag }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 个人标签数据
const tags = ref([
  'Vue.js',
  'React',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'CSS',
  'HTML',
  'Webpack',
  'Vite',
  'Git',
  'MongoDB',
  'Express',
  '前端框架',
  '性能优化',
  '工程化',
  '响应式设计'
])

// 最近文章数据
const recentPosts = ref([
  {
    title: 'Vue.js 入门指南',
    date: '2023-10-15'
  },
  {
    title: 'React Hooks 完全指南',
    date: '2023-10-10'
  },
  {
    title: 'TypeScript 入门教程',
    date: '2023-10-05'
  },
  {
    title: 'CSS Grid 布局详解',
    date: '2023-09-28'
  },
  {
    title: '前端性能优化技巧',
    date: '2023-09-20'
  }
])

// 标签类型（颜色）
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
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return new Date(dateString).toLocaleDateString('zh-CN', options)
}
</script>

<style scoped lang="scss">
.intro_blogers {
  .profile-card {
    border-radius: 15px;
    background: inherit;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    min-height: 320px;
    margin-bottom: 20px;
    padding: 20px;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .favator {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 120px;

      .el-avatar {
        width: 100px;
        height: 100px;
        border: 3px solid #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
    }

    .username {
      font-size: 24px;
      font-weight: 700;
      color: #2c3e50;
      margin: 10px 0;
      display: block;
    }

    .profile-info {
      .bio {
        color: #7f8c8d;
        font-size: 14px;
        margin: 15px 0;
        line-height: 1.5;
      }

      .stats {
        display: flex;
        justify-content: space-around;
        margin-top: 20px;

        .stat-item {
          display: flex;
          flex-direction: column;

          .stat-number {
            font-size: 20px;
            font-weight: 700;
            color: #3498db;
          }

          .stat-label {
            font-size: 12px;
            color: #95a5a6;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .recent-posts {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: all 0.3s ease;
    margin-bottom: 20px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .section-title {
      h3 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #2c3e50;
        margin: 0 0 15px 0;
      }
    }

    .divider {
      margin: 15px 0;
    }

    .post-list {
      .post-item {
        padding: 10px 0;
        border-bottom: 1px solid #eee;

        &:last-child {
          border-bottom: none;
        }

        .post-title {
          font-size: 0.95rem;
          color: #34495e;
          margin-bottom: 5px;
          cursor: pointer;

          &:hover {
            color: #3498db;
          }
        }

        .post-date {
          font-size: 0.8rem;
          color: #95a5a6;
        }
      }
    }
  }

  .hot_tags {
    margin-top: 20px;
    min-height: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 20px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
    }

    .hot_tags_title {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .hot_tags_logo {
        margin-right: 10px;
        color: #3498db;
      }

      h2 {
        font-size: 1.4rem;
        font-weight: 600;
        color: #2c3e50;
        margin: 0;
      }
    }

    .divider {
      margin: 15px 0;
    }

    .tags-container {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .tag-item {
        margin: 0;
        border-radius: 20px;
        padding: 8px 15px;
        font-size: 13px;
        transition: all 0.2s;

        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
}

// 暗黑模式样式
.dark-mode {
  .intro_blogers {
    .profile-card {
      background-color: rgba(45, 45, 45, 0.9) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      color: #e0e0e0 !important;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5) !important;
      }

      .username {
        color: #f0f0f0 !important;
      }

      .bio {
        color: #aaa !important;
      }

      .stat-number {
        color: #64a5e5 !important;
      }

      .stat-label {
        color: #aaa !important;
      }
    }

    .recent-posts {
      background-color: rgba(45, 45, 45, 0.9) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      color: #e0e0e0 !important;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5) !important;
      }

      .section-title {
        h3 {
          color: #f0f0f0 !important;
        }
      }

      .post-item {
        border-bottom: 1px solid #444 !important;

        .post-title {
          color: #e0e0e0 !important;

          &:hover {
            color: #64a5e5 !important;
          }
        }

        .post-date {
          color: #aaa !important;
        }
      }
    }

    .hot_tags {
      background-color: rgba(45, 45, 45, 0.9) !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
      color: #e0e0e0 !important;

      &:hover {
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.5) !important;
      }

      .hot_tags_title {
        h2 {
          color: #f0f0f0 !important;
        }
      }

      .tag-item {
        background-color: #3a3a3a !important;
        border-color: #555 !important;
        color: #e0e0e0 !important;
      }
    }
  }
}
</style>
