<template>
  <div class="admin-container">
    <el-card class="admin-card">
      <template #header>
        <div class="card-header">
          <span>{{ isEditMode ? '编辑文章' : '创建新文章' }}</span>
        </div>
      </template>

      <el-form :model="articleForm" label-width="80px" ref="articleFormRef">
        <el-form-item
          label="标题"
          prop="title"
          :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]"
        >
          <el-input v-model="articleForm.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="摘要" prop="summary">
          <el-input
            v-model="articleForm.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入文章摘要"
          />
        </el-form-item>

        <el-form-item label="作者" prop="author">
          <el-input v-model="articleForm.author" placeholder="请输入作者姓名" />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="articleForm.category" placeholder="请选择分类">
            <el-option label="前端开发" value="前端开发" />
            <el-option label="后端开发" value="后端开发" />
            <el-option label="人工智能" value="人工智能" />
            <el-option label="嵌入式开发" value="嵌入式开发" />
            <el-option label="其他" value="其他" />
          </el-select>
        </el-form-item>

        <el-form-item label="标签" prop="tags">
          <el-select
            v-model="articleForm.tags"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入标签"
          >
            <el-option v-for="tag in commonTags" :key="tag" :label="tag" :value="tag" />
          </el-select>
        </el-form-item>

        <el-form-item label="内容" prop="contentBlocks">
          <div class="content-editor">
            <div class="editor-toolbar">
              <el-button-group>
                <el-button @click="addContentBlock('paragraph')" size="small">段落</el-button>
                <el-button @click="addContentBlock('heading')" size="small">标题</el-button>
                <el-button @click="addContentBlock('code')" size="small">代码</el-button>
                <el-button @click="addContentBlock('image')" size="small">图片</el-button>
                <el-button @click="addContentBlock('quote')" size="small">引用</el-button>
                <el-button @click="addContentBlock('list')" size="small">列表</el-button>
                <el-button @click="addContentBlock('divider')" size="small">分割线</el-button>
              </el-button-group>
            </div>

            <div class="content-blocks">
              <div
                v-for="(block, index) in articleForm.contentBlocks"
                :key="index"
                class="content-block-item"
              >
                <div class="block-header">
                  <span class="block-type">{{ getContentBlockTypeName(block.type) }}</span>
                  <div class="block-actions">
                    <el-button
                      @click="moveBlockUp(index)"
                      :disabled="index === 0"
                      size="small"
                      circle
                    >
                      ↑
                    </el-button>
                    <el-button
                      @click="moveBlockDown(index)"
                      :disabled="index === articleForm.contentBlocks.length - 1"
                      size="small"
                      circle
                    >
                      ↓
                    </el-button>
                    <el-button @click="removeContentBlock(index)" type="danger" size="small" circle>
                      ×
                    </el-button>
                  </div>
                </div>

                <div class="block-content">
                  <!-- 段落 -->
                  <div v-if="block.type === 'paragraph'">
                    <el-input
                      v-model="block.data"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入段落内容（支持Markdown语法）"
                    />
                  </div>

                  <!-- 标题 -->
                  <div v-else-if="block.type === 'heading'">
                    <el-select
                      v-model="block.level"
                      placeholder="请选择标题级别"
                      style="width: 120px"
                    >
                      <el-option label="H2" :value="2" />
                      <el-option label="H3" :value="3" />
                      <el-option label="H4" :value="4" />
                      <el-option label="H5" :value="5" />
                    </el-select>
                    <el-input
                      v-model="block.data"
                      placeholder="请输入标题内容"
                      style="margin-top: 10px"
                    />
                  </div>

                  <!-- 代码块 -->
                  <div v-else-if="block.type === 'code'">
                    <el-select
                      v-model="block.language"
                      placeholder="请选择编程语言"
                      style="width: 150px"
                    >
                      <el-option label="JavaScript" value="javascript" />
                      <el-option label="TypeScript" value="typescript" />
                      <el-option label="HTML" value="html" />
                      <el-option label="CSS" value="css" />
                      <el-option label="Python" value="python" />
                      <el-option label="Java" value="java" />
                      <el-option label="C++" value="cpp" />
                      <el-option label="Plain Text" value="text" />
                    </el-select>
                    <el-input
                      v-model="block.data"
                      type="textarea"
                      :rows="6"
                      placeholder="请输入代码内容"
                      style="margin-top: 10px"
                      class="code-input"
                    />
                  </div>

                  <!-- 图片 -->
                  <div v-else-if="block.type === 'image'">
                    <el-input v-model="block.url" placeholder="请输入图片URL" />
                    <el-input
                      v-model="block.alt"
                      placeholder="请输入图片ALT描述"
                      style="margin-top: 10px"
                    />
                    <el-input
                      v-model="block.caption"
                      placeholder="请输入图片说明文字"
                      style="margin-top: 10px"
                    />
                  </div>

                  <!-- 引用 -->
                  <div v-else-if="block.type === 'quote'">
                    <el-input
                      v-model="block.data"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入引用内容"
                    />
                    <el-input
                      v-model="block.author"
                      placeholder="请输入引用作者（可选）"
                      style="margin-top: 10px"
                    />
                  </div>

                  <!-- 列表 -->
                  <div v-else-if="block.type === 'list'">
                    <el-select
                      v-model="block.style"
                      placeholder="请选择列表类型"
                      style="width: 120px"
                    >
                      <el-option label="无序列表" value="unordered" />
                      <el-option label="有序列表" value="ordered" />
                    </el-select>
                    <div class="list-items" style="margin-top: 10px">
                      <div
                        v-for="(item, itemIndex) in block.items"
                        :key="itemIndex"
                        class="list-item"
                      >
                        <el-input v-model="block.items[itemIndex]" placeholder="列表项内容" />
                        <el-button
                          @click="removeListItem(index, itemIndex)"
                          type="danger"
                          size="small"
                          circle
                        >
                          -
                        </el-button>
                      </div>
                      <el-button
                        @click="addListItem(index)"
                        type="primary"
                        size="small"
                        style="margin-top: 10px"
                      >
                        添加列表项
                      </el-button>
                    </div>
                  </div>

                  <!-- 分割线不需要额外内容 -->
                </div>
              </div>

              <div v-if="articleForm.contentBlocks.length === 0" class="empty-blocks">
                <p>点击上方按钮添加内容块</p>
              </div>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitArticle" :loading="submitLoading">
            {{ isEditMode ? '更新文章' : '发布文章' }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import axios from '@/axios/axios.ts'
import { useRouter, useRoute } from 'vue-router'

// 表单引用
const articleFormRef = ref()

// 是否为编辑模式
const isEditMode = ref(false)

// 路由相关
const router = useRouter()
const route = useRoute()

// 提交按钮加载状态
const submitLoading = ref(false)

// 常用标签
const commonTags = ref([
  'Vue',
  'React',
  'Angular',
  'JavaScript',
  'TypeScript',
  'Node.js',
  'Python',
  'Java',
  'C++',
  'HTML',
  'CSS',
  '前端开发',
  '后端开发',
  '数据库',
  'Git',
  'Linux'
])

// 文章表单数据
const articleForm = reactive({
  id: undefined,
  title: '',
  summary: '',
  author: 'sswixa',
  category: '前端开发',
  tags: [],
  contentBlocks: []
})

// 添加内容块
const addContentBlock = (type) => {
  const newBlock = {
    type
  }

  switch (type) {
    case 'paragraph':
      newBlock.data = ''
      break
    case 'heading':
      newBlock.level = 2
      newBlock.data = ''
      break
    case 'code':
      newBlock.language = 'javascript'
      newBlock.data = ''
      break
    case 'image':
      newBlock.url = ''
      newBlock.alt = ''
      newBlock.caption = ''
      break
    case 'quote':
      newBlock.data = ''
      newBlock.author = ''
      break
    case 'list':
      newBlock.style = 'unordered'
      newBlock.items = ['']
      break
    case 'divider':
      // 分割线不需要额外属性
      break
  }

  articleForm.contentBlocks.push(newBlock)
}

// 移除内容块
const removeContentBlock = (index) => {
  articleForm.contentBlocks.splice(index, 1)
}

// 上移内容块
const moveBlockUp = (index) => {
  if (index > 0) {
    const temp = articleForm.contentBlocks[index]
    articleForm.contentBlocks[index] = articleForm.contentBlocks[index - 1]
    articleForm.contentBlocks[index - 1] = temp
  }
}

// 下移内容块
const moveBlockDown = (index) => {
  if (index < articleForm.contentBlocks.length - 1) {
    const temp = articleForm.contentBlocks[index]
    articleForm.contentBlocks[index] = articleForm.contentBlocks[index + 1]
    articleForm.contentBlocks[index + 1] = temp
  }
}

// 添加列表项
const addListItem = (blockIndex) => {
  articleForm.contentBlocks[blockIndex].items.push('')
}

// 移除列表项
const removeListItem = (blockIndex, itemIndex) => {
  articleForm.contentBlocks[blockIndex].items.splice(itemIndex, 1)
}

// 获取内容块类型名称
const getContentBlockTypeName = (type) => {
  const typeMap = {
    paragraph: '段落',
    heading: '标题',
    code: '代码块',
    image: '图片',
    quote: '引用',
    list: '列表',
    divider: '分割线'
  }
  return typeMap[type] || type
}

// 提交文章
const submitArticle = async () => {
  if (!articleFormRef.value) return

  await articleFormRef.value.validate(async (valid) => {
    if (!valid) return

    submitLoading.value = true

    try {
      let response
      if (isEditMode.value) {
        // 更新文章
        response = await axios.put(`/articles/${articleForm.id}`, articleForm)
        ElMessage.success('文章更新成功!')
      } else {
        // 创建新文章
        response = await axios.post('/articles', articleForm)
        ElMessage.success('文章发布成功!')
      }

      // 重置表单
      resetForm()

      // 可以在这里添加跳转到文章详情页的逻辑
      // 例如: router.push(`/article/${response.data._id}`)
    } catch (error) {
      ElMessage.error(isEditMode.value ? '文章更新失败!' : '文章发布失败!')
      console.error('提交文章失败:', error)
    } finally {
      submitLoading.value = false
    }
  })
}

// 重置表单
const resetForm = () => {
  articleForm.id = undefined
  articleForm.title = ''
  articleForm.summary = ''
  articleForm.author = 'sswixa'
  articleForm.category = '前端开发'
  articleForm.tags = []
  articleForm.contentBlocks = []
  isEditMode.value = false
}

// 加载文章数据（编辑模式）
const loadArticleData = async (id) => {
  try {
    const response = await axios.get(`/articles/${id}`)
    const article = response.data

    articleForm.id = article._id
    articleForm.title = article.title
    articleForm.summary = article.summary
    articleForm.author = article.author
    articleForm.category = article.category
    articleForm.tags = article.tags || []
    articleForm.contentBlocks = article.contentBlocks || []

    isEditMode.value = true
  } catch (error) {
    ElMessage.error('加载文章失败!')
    console.error('加载文章失败:', error)
  }
}

// 页面加载时检查是否为编辑模式
onMounted(() => {
  const articleId = route.query.id
  if (articleId) {
    loadArticleData(articleId)
  }
})
</script>

<style scoped lang="scss">
.admin-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  // 解决被顶部header遮挡的问题
  padding-top: 80px;
}

// 添加blur_mask样式以实现朦胧模糊效果
.admin-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(150px);
  z-index: -1;
}

.card-header {
  font-size: 18px;
  font-weight: 600;
}

.content-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;

  .editor-toolbar {
    padding: 10px;
    border-bottom: 1px solid #dcdfe6;
    background-color: #f5f7fa;
  }

  .content-blocks {
    min-height: 200px;
    padding: 10px;

    .empty-blocks {
      text-align: center;
      color: #999;
      padding: 40px 0;
    }

    .content-block-item {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      margin-bottom: 15px;

      .block-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        background-color: #f5f7fa;
        border-bottom: 1px solid #dcdfe6;

        .block-type {
          font-weight: 500;
        }

        .block-actions {
          display: flex;
          gap: 5px;
        }
      }

      .block-content {
        padding: 15px;
      }
    }
  }
}

.list-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
  align-items: center;
}

.code-input {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
}

// 暗黑模式适配
.dark-mode {
  .content-editor {
    border-color: #444 !important;

    .editor-toolbar {
      background-color: #2d2d2d !important;
      border-color: #444 !important;
    }

    .content-blocks {
      .empty-blocks {
        color: #999 !important;
      }

      .content-block-item {
        border-color: #444 !important;

        .block-header {
          background-color: #2d2d2d !important;
          border-color: #444 !important;
        }
      }
    }
  }

  .admin-card {
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    ::v-deep .el-textarea__inner {
      background-color: #3a3a3a !important;
    }

    ::v-deep .el-input__wrapper {
      background-color: #3a3a3a !important;
    }

    ::v-deep .el-select__wrapper {
      background-color: #3a3a3a !important;
    }
  }
}
</style>
