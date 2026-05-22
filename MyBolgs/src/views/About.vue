<template>
  <div class="blur_mask">
    <div class="about-container">
      <div class="about-hero">
        <el-avatar shape="circle" :size="90" src="src/assets/bg.jpg" class="hero-avatar" />
        <h1 class="hero-name">SSWIXA</h1>
        <p class="hero-bio">🚀 全栈开发工程师 · 技术写作者 · 终身学习者</p>
      </div>

      <div class="about-cards">
        <!-- 个人介绍 -->
        <el-card class="about-card" shadow="hover">
          <template #header><span class="card-title">👤 关于我</span></template>
          <p>你好！我是一名热爱技术的全栈开发者，专注于 Web 前端和 Node.js 后端开发。</p>
          <p>工作之余喜欢写技术博客，记录学习心得和项目经验，希望能帮助更多开发者少走弯路。</p>
          <p>相信技术的力量可以改变生活，持续学习是成长的唯一途径。</p>
        </el-card>

        <!-- 技术栈 -->
        <el-card class="about-card" shadow="hover">
          <template #header><span class="card-title">🛠️ 技术栈</span></template>
          <div class="skill-groups">
            <div class="skill-group">
              <h4>前端开发</h4>
              <div class="skill-tags">
                <el-tag effect="dark" color="#42b883">Vue.js</el-tag>
                <el-tag effect="dark" color="#61dafb">React</el-tag>
                <el-tag effect="dark" color="#3178c6">TypeScript</el-tag>
                <el-tag effect="dark" color="#e6a23c">JavaScript</el-tag>
                <el-tag effect="dark" color="#563d7c">HTML/CSS</el-tag>
                <el-tag effect="dark" color="#06b6d4">Tailwind CSS</el-tag>
              </div>
            </div>
            <div class="skill-group">
              <h4>后端开发</h4>
              <div class="skill-tags">
                <el-tag effect="dark" color="#339933">Node.js</el-tag>
                <el-tag effect="dark" color="#000">Express</el-tag>
                <el-tag effect="dark" color="#4db33d">MongoDB</el-tag>
                <el-tag effect="dark" color="#ffc069">Python</el-tag>
                <el-tag effect="dark" color="#f56c6c">RESTful API</el-tag>
              </div>
            </div>
            <div class="skill-group">
              <h4>工具与生态</h4>
              <div class="skill-tags">
                <el-tag effect="dark" color="#646cff">Vite</el-tag>
                <el-tag effect="dark" color="#f05032">Git</el-tag>
                <el-tag effect="dark" color="#2496ed">Docker</el-tag>
                <el-tag effect="dark" color="#fc6d26">GitLab CI</el-tag>
                <el-tag effect="dark" color="#000">VS Code</el-tag>
              </div>
            </div>
          </div>
        </el-card>

        <!-- 这个博客 -->
        <el-card class="about-card" shadow="hover">
          <template #header><span class="card-title">📝 关于这个博客</span></template>
          <p>这是一个前后端分离的个人技术博客系统，使用以下技术构建：</p>
          <div class="blog-stack">
            <el-tag type="success" size="large">Vue 3</el-tag>
            <span class="stack-plus">+</span>
            <el-tag type="primary" size="large">Express</el-tag>
            <span class="stack-plus">+</span>
            <el-tag type="danger" size="large">MongoDB</el-tag>
          </div>
          <p style="margin-top: 16px">支持文章发布、分类浏览、全文搜索、图片上传、暗黑模式等功能。</p>
          <p>如果觉得不错欢迎给个 Star ⭐</p>
        </el-card>

        <!-- 联系 -->
        <el-card class="about-card" shadow="hover">
          <template #header><span class="card-title">📬 联系方式</span></template>
          <div class="contact-list">
            <div class="contact-item">
              <span class="contact-icon">🐙</span>
              <span>GitHub: </span>
              <a href="https://github.com/SSWIXA" target="_blank">SSWIXA</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🦊</span>
              <span>Gitee: </span>
              <a href="https://gitee.com/sswixa" target="_blank">sswixa</a>
            </div>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>邮箱: sswixa@example.com</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.blur_mask {
  min-height: 100vh;
  backdrop-filter: blur(150px);
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 20px 40px;
}

.about-hero {
  text-align: center;
  margin-bottom: 36px;

  .hero-avatar {
    border: 3px solid rgba(64, 158, 255, 0.3);
    box-shadow: 0 0 0 6px rgba(64, 158, 255, 0.1);
    margin-bottom: 16px;
  }

  .hero-name {
    font-size: 28px;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 8px;
  }

  .hero-bio {
    color: #909399;
    font-size: 15px;
    margin: 0;
  }
}

.about-cards {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-card {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);

  .card-title { font-size: 16px; font-weight: 600; }

  p { color: #606266; line-height: 1.8; margin: 6px 0; font-size: 14px; }
}

.skill-groups {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .skill-group {
    h4 { font-size: 14px; font-weight: 600; color: #303133; margin: 0 0 8px; }

    .skill-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  }
}

.blog-stack {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;

  .stack-plus { color: #bbb; font-size: 18px; }
}

.contact-list {
  .contact-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 0;
    font-size: 14px;
    color: #606266;

    .contact-icon { font-size: 18px; }

    a { color: #409eff; text-decoration: none;
      &:hover { text-decoration: underline; }
    }
  }
}

// 暗黑模式
.dark-mode {
  .blur_mask { background-color: rgba(26, 26, 26, 0.8) !important; }

  .hero-name { color: #e2e8f0 !important; }
  .hero-bio { color: #888 !important; }

  .about-card {
    background: rgba(40, 40, 40, 0.85) !important;
    p { color: #bbb !important; }
  }

  .skill-group h4 { color: #e2e8f0 !important; }

  .contact-item {
    color: #bbb !important;
    a { color: #64a5e5 !important; }
  }
}
</style>
