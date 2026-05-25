<template>
  <div class="article-container">
    <el-card class="article-card">
      <template #header>
        <div class="article-header">
          <h1 class="article-title">{{ currentArticle.title }}</h1>
          <div class="article-meta">
            <span class="meta-item">
              <i class="el-icon-user"></i>
              {{ currentArticle.author }}
            </span>
            <span class="meta-item">
              <i class="el-icon-date"></i>
              {{ formatDate(currentArticle.createdAt) }}
            </span>
            <span class="meta-item">
              <i class="el-icon-folder"></i>
              {{ currentArticle.category }}
            </span>
          </div>
        </div>
      </template>

      <div class="article-content">
        <div
          v-for="(block, index) in currentArticle.contentBlocks"
          :key="index"
          class="content-block"
        >
          <!-- 普通文本段落 -->
          <div v-if="block.type === 'paragraph'" class="block-paragraph">
            <p v-html="renderMarkdownText(block.data)"></p>
          </div>

          <!-- 标题 -->
          <div v-else-if="block.type === 'heading'" :class="`block-heading h${block.level || 2}`">
            <h2 v-if="block.level == 2" v-html="renderMarkdownText(block.data)"></h2>
            <h3 v-else-if="block.level == 3" v-html="renderMarkdownText(block.data)"></h3>
            <h4 v-else-if="block.level == 4" v-html="renderMarkdownText(block.data)"></h4>
            <h5 v-else v-html="renderMarkdownText(block.data)"></h5>
          </div>

          <!-- 代码块 -->
          <div v-else-if="block.type === 'code'" class="block-code">
            <div class="code-header" v-if="block.language">
              {{ getLanguageDisplayName(block.language) }}
            </div>
            <div
              class="code-editor"
              :ref="(el: any) => initMonaco(el, block.data, block.language, index)"
            ></div>
          </div>

          <!-- 图片 -->
          <div v-else-if="block.type === 'image'" class="block-image">
            <img
              :src="resolveImageUrl(block.url)"
              :alt="block.alt || ''"
              :title="block.title || ''"
              @click="previewImage(resolveImageUrl(block.url))"
            />
            <p v-if="block.caption" class="image-caption">{{ block.caption }}</p>
          </div>

          <!-- 引用 -->
          <div v-else-if="block.type === 'quote'" class="block-quote">
            <blockquote>
              <p v-html="renderMarkdownText(block.data)"></p>
              <cite v-if="block.author">— {{ block.author }}</cite>
            </blockquote>
          </div>

          <!-- 列表 -->
          <div v-else-if="block.type === 'list'" class="block-list">
            <ul v-if="block.style === 'unordered'">
              <li
                v-for="(item, itemIndex) in block.items"
                :key="itemIndex"
                v-html="renderMarkdownText(item)"
              ></li>
            </ul>
            <ol v-else>
              <li
                v-for="(item, itemIndex) in block.items"
                :key="itemIndex"
                v-html="renderMarkdownText(item)"
              ></li>
            </ol>
          </div>

          <!-- 分割线 -->
          <div v-else-if="block.type === 'divider'" class="block-divider">
            <hr />
          </div>
        </div>
      </div>

      <div class="article-footer" slot="footer">
        <div class="article-tags">
          <el-tag
            v-for="tag in currentArticle.tags"
            :key="tag"
            type="info"
            effect="dark"
            class="article-tag"
          >
            {{ tag }}
          </el-tag>
        </div>
      </div>
    </el-card>

    <!-- 图片预览对话框 -->
    <el-dialog
      v-model="imagePreviewVisible"
      :modal="false"
      width="80%"
      class="image-preview-dialog"
    >
      <img :src="previewImageUrl" alt="预览图片" class="preview-image" />
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
// 导入 Monaco 配置
import '../utils/monacoConfig'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'

// 定义文章内容块类型
interface ContentBlock {
  type: string
  [key: string]: any
}

// 定义文章数据类型
interface Article {
  id: number
  title: string
  author: string
  createdAt: string
  category: string
  tags: string[]
  contentBlocks: ContentBlock[]
  summary?: string
  views?: number
  likes?: number
  dislikes?: number
  updatedAt?: string
  _id?: string
}

// 暂时使用简单的文本处理函数替代markdown渲染
const renderMarkdown = (content: string): string => {
  // 简单的文本转HTML处理，实际使用中会被markdown-it替换
  if (!content) return ''

  return content
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // 粗体
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // 斜体
    .replace(/`(.*?)`/g, '<code>$1</code>') // 行内代码
}

const md = {
  render: renderMarkdown,
  renderInline: renderMarkdown
}

// Monaco Editor 实例映射
const editorInstances = new Map<number, monaco.editor.IStandaloneCodeEditor>()

// 假设从父组件或API获取文章数据
const props = defineProps<{
  article?: Article | null
}>()

// 计算当前显示的文章数据
const currentArticle = computed<Article>(() => {
  return props.article || sampleArticle
})

// 图片预览相关
const imagePreviewVisible = ref(false)
const previewImageUrl = ref('')

// 侧边栏状态
const isAsideVisible = ref(false)

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 渲染Markdown内容
const renderMarkdownText = (content: string): string => {
  return md.renderInline(content)
}

// 图片预览
// 解析图片 URL，相对路径补后端地址
const resolveImageUrl = (url: string): string => {
  if (!url) return ''
  if (url.startsWith('http')) return url
  return 'http://localhost:5000' + url
}

const previewImage = (url: string) => {
  previewImageUrl.value = url
  imagePreviewVisible.value = true
}

// 获取语言显示名称
const getLanguageDisplayName = (language: string): string => {
  const languageMap: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    html: 'HTML',
    css: 'CSS',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    csharp: 'C#',
    php: 'PHP',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    sql: 'SQL',
    json: 'JSON',
    yaml: 'YAML',
    markdown: 'Markdown',
    shell: 'Shell',
    powershell: 'PowerShell'
  }

  return languageMap[language] || language
}

// 初始化 Monaco Editor
const initMonaco = (
  el: HTMLElement | null,
  code: string,
  language = 'javascript',
  index: number
) => {
  if (!el || editorInstances.has(index)) return

  // 动态导入 Monaco Editor
  import('monaco-editor')
    .then((monacoModule) => {
      // 销毁已存在的实例
      if (editorInstances.has(index)) {
        const existingEditor = editorInstances.get(index)
        if (existingEditor && typeof existingEditor.dispose === 'function') {
          existingEditor.dispose()
        }
        editorInstances.delete(index)
      }

      // 创建编辑器实例
      const editor = monacoModule.editor.create(el, {
        value: code || '',
        language: language || 'javascript',
        theme: 'vs-dark', // 默认使用夜间模式
        readOnly: true,
        automaticLayout: true,
        minimap: {
          enabled: false
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineHeight: 24,
        folding: true,
        fontFamily: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace",
        fontWeight: 'normal',
        lineNumbers: 'on',
        scrollBeyondLastColumn: 0,
        smoothScrolling: true,
        wordWrap: 'on',
        renderLineHighlight: 'none',
        overviewRulerBorder: false,
        hideCursorInOverviewRuler: true
      })

      // 保存实例引用
      editorInstances.set(index, editor)

      // 监听主题变化
      const themeChangeListener = () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode')
        monacoModule.editor.setTheme(isDarkMode ? 'vs-dark' : 'vs')
      }

      // 添加主题变化监听器
      document.addEventListener('theme-change', themeChangeListener)
    })
    .catch((error) => {
      console.error('Failed to load Monaco Editor:', error)
      // 如果Monaco加载失败，显示代码为纯文本
      if (el) {
        el.innerHTML = `<pre><code>${escapeHtml(code || '')}</code></pre>`
      }
    })
}

// 转义HTML特殊字符
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 检查侧边栏状态
const checkAsideVisibility = () => {
  // 检查是否存在侧边栏元素并且是可见的
  const asideElement = document.querySelector('.el-aside')
  isAsideVisible.value =
    !!asideElement &&
    (!asideElement.classList.contains('hidden') ||
      !(asideElement as HTMLElement).style.transform ||
      !(asideElement as HTMLElement).style.transform?.includes('-300px'))
}

// 监听窗口变化和路由变化
const handleResize = () => {
  checkAsideVisibility()
}

const handleRouteChange = () => {
  // 延迟检查，确保DOM已经更新
  setTimeout(() => {
    checkAsideVisibility()
  }, 100)
}

// 监听主题变化
const handleThemeChange = () => {
  // 触发编辑器主题更新
  document.dispatchEvent(new CustomEvent('theme-change'))
}

onMounted(() => {
  checkAsideVisibility()
  window.addEventListener('resize', handleResize)
  window.addEventListener('hashchange', handleRouteChange)
  document.addEventListener('theme-change', handleThemeChange)
})

onUnmounted(() => {
  // 清理所有 Monaco Editor 实例
  editorInstances.forEach((editor, index) => {
    if (editor && typeof editor.dispose === 'function') {
      editor.dispose()
    }
  })
  editorInstances.clear()

  window.removeEventListener('resize', handleResize)
  window.removeEventListener('hashchange', handleRouteChange)
  document.removeEventListener('theme-change', handleThemeChange)
})

// 示例文章数据（实际应从API获取）
const sampleArticle: Article = {
  id: 1,
  title: '如何创建丰富多彩的博客文章',
  author: 'sswixa',
  createdAt: '2024-01-15T10:00:00Z',
  category: '前端开发',
  tags: ['Vue', 'Markdown', '博客'],
  contentBlocks: [
    {
      type: 'paragraph',
      data: '在这篇文章中，我们将探讨如何创建内容丰富、格式多样的博客文章。通过合理的数据结构设计和前端渲染，我们可以支持各种内容类型。'
    },
    {
      type: 'heading',
      level: 2,
      data: '支持的内容类型'
    },
    {
      type: 'list',
      style: 'unordered',
      items: ['普通文本段落', '各级标题', '代码块', '图片', '引用块', '列表', '分割线']
    },
    {
      type: 'heading',
      level: 3,
      data: '代码示例'
    },
    {
      type: 'code',
      language: 'javascript',
      data: `function helloWorld() {
  console.log("Hello, world!")
  return true
}

// 这是一个示例函数
const exampleFunction = (param) => {
  if (param) {
    return param.toUpperCase()
  }
  return null
}`
    },
    {
      type: 'image',
      url: '/sample-image.jpg',
      alt: '示例图片',
      caption: '这是一个示例图片'
    },
    {
      type: 'quote',
      data: '技术的价值不在于复杂，而在于解决问题的能力。',
      author: '未知'
    }
  ]
}
</script>

<style scoped lang="scss">
// 顶部光条动画
@keyframes cardShine {
  0% { left: -100%; }
  40%, 100% { left: 100%; }
}

@keyframes headerGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 0.8; }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.article-container {
  min-width: 800px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  transition: all 0.3s ease;

  @media screen and (min-width: 1200px) {
    margin-left: calc(50% - 450px);
    margin-right: auto;
  }
  @media screen and (max-width: 1199px) {
    min-width: auto;
    max-width: none;
    margin: 0 auto;
    padding: 20px;
  }
}

.article-card {
  border-radius: 16px;
  border: none;
  overflow: hidden;
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  box-shadow:
    0 4px 24px rgba(102, 126, 234, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  transition: box-shadow 0.4s;

  // 流光划过
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transform: skewX(-25deg);
    animation: cardShine 6s ease-in-out infinite;
    pointer-events: none;
    z-index: 2;
  }

  &:hover {
    box-shadow:
      0 12px 40px rgba(102, 126, 234, 0.15),
      0 2px 8px rgba(0, 0, 0, 0.06);
  }

  ::v-deep .el-card__header {
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid rgba(102, 126, 234, 0.1);

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: linear-gradient(90deg, #667eea, #f5576c, #667eea);
      background-size: 200% 100%;
      animation: headerGlow 3s ease-in-out infinite;
    }
  }
}

.article-header {
  .article-title {
    margin: 0 0 16px 0;
    font-size: 2rem;
    font-weight: 800;
    line-height: 1.3;
    background: linear-gradient(135deg, #2c3e50 0%, #667eea 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .article-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: #909399;
    font-size: 13px;

    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 20px;
      background: rgba(102, 126, 234, 0.06);
      transition: all 0.25s;

      &:hover {
        background: rgba(102, 126, 234, 0.12);
        transform: translateY(-1px);
      }
    }
  }
}

.article-content {
  line-height: 1.9;

  .content-block {
    margin-bottom: 24px;
    animation: slideUp 0.4s ease-out both;
    &:last-child { margin-bottom: 0; }
  }

  .block-paragraph p {
    margin: 0;
    font-size: 16px;
    color: #4a5568;
  }

  .block-heading {
    margin: 32px 0 18px 0;
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 4px;
      bottom: 4px;
      width: 4px;
      border-radius: 2px;
      background: linear-gradient(180deg, #667eea, #f5576c);
    }

    &.h2 {
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(102, 126, 234, 0.1);

      h2 {
        font-size: 1.5rem;
        font-weight: 700;
        background: linear-gradient(135deg, #667eea, #764ba2);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline;
      }
    }

    h3, h4, h5 {
      color: #444;
      font-weight: 600;
    }
  }

  .block-code {
    border-radius: 12px;
    overflow: hidden;
    margin: 20px 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
    background: #1e1e2e;
    border: 1px solid rgba(255, 255, 255, 0.05);

    .code-header {
      background: linear-gradient(135deg, #2d2d3f 0%, #252538 100%);
      color: #a6accd;
      padding: 10px 16px;
      font-size: 13px;
      font-weight: 500;
      border-bottom: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      align-items: center;
      gap: 42px;

      &::before {
        content: '';
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
        background: #f5576c;
        box-shadow: 14px 0 0 #f0c040, 28px 0 0 #43e97b;
      }
    }

    .code-editor { height: 300px; }
  }

  .block-image {
    text-align: center;

    img {
      max-width: 100%;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);

      &:hover {
        transform: scale(1.01);
        box-shadow: 0 8px 30px rgba(102, 126, 234, 0.18);
      }
    }

    .image-caption {
      margin-top: 10px;
      font-size: 13px;
      color: #909399;
      font-style: italic;
    }
  }

  .block-quote {
    blockquote {
      margin: 0;
      padding: 12px 20px;
      color: #5a6a7e;
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.06) 0%, transparent 100%);
      border-left: 4px solid #667eea;
      border-radius: 0 8px 8px 0;
      font-style: italic;

      p { margin: 0; }

      cite {
        display: block;
        margin-top: 10px;
        text-align: right;
        font-style: normal;
      }
    }
  }

  .block-list {
    ul, ol {
      padding-left: 20px;
      margin: 0;

      li {
        margin-bottom: 8px;
        color: #4a5568;
        line-height: 1.8;

        &::marker {
          color: #667eea;
        }
      }
    }
  }

  .block-divider {
    hr {
      border: none;
      height: 1px;
      background: linear-gradient(90deg, transparent, #667eea44, #f5576c44, transparent);
      margin: 30px 0;
    }
  }
}

.article-footer {
  margin-top: 20px;
  padding-top: 24px;
  border-top: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;

  .article-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .article-tag {
      cursor: pointer;
      border-radius: 20px;
      font-weight: 500;
      transition: all 0.25s;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.2);
      }
    }
  }
}

.preview-image {
  width: 100%;
  height: auto;
  border-radius: 6px;
}

// 暗黑模式
.dark-mode {
  .article-card {
    background: rgba(30, 30, 40, 0.85) !important;
    color: #e0e0e0 !important;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.25) !important;
    border: 1px solid rgba(255, 255, 255, 0.05) !important;

    &::after {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.06), transparent);
    }
  }

  .article-title {
    background: linear-gradient(135deg, #e2e8f0 0%, #64a5e5 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .article-meta .meta-item {
    background: rgba(255, 255, 255, 0.05);
    color: #a0aec0 !important;
    &:hover { background: rgba(255, 255, 255, 0.1); }
  }

  .block-paragraph p { color: #c0c0c0 !important; }
  .block-heading h3, .block-heading h4, .block-heading h5 { color: #ccc !important; }

  .block-code {
    background: #1a1a28;
    border-color: rgba(255, 255, 255, 0.03);

    .code-header {
      background: linear-gradient(135deg, #222235 0%, #1a1a28 100%);
      color: #999;
      border-bottom-color: rgba(255, 255, 255, 0.04);
    }
  }

  .block-quote blockquote {
    background: linear-gradient(90deg, rgba(102, 126, 234, 0.08) 0%, transparent 100%);
    border-left-color: #667eea;
    color: #bbb !important;
  }

  .block-divider hr { background: linear-gradient(90deg, transparent, #444, transparent); }
  .block-list li { color: #bbb !important; }
}
</style>
