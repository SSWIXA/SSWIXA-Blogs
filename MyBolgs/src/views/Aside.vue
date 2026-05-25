<template>
  <el-aside style="z-index: 100; padding-top: 60px">
    <div class="aside_main">
      <div class="aside_header">
        <div class="header-glow"></div>
        <h3 class="header-title">
          <span class="title-dot"></span>
          文章目录
        </h3>
      </div>
      <div class="aside_title">
        <el-input
          v-model="filterText"
          placeholder="搜索文章..."
          class="filter_input"
          :prefix-icon="Search"
        />
      </div>
      <div class="aside_tree">
        <el-scrollbar height="100%" id="aside_tree_scrollbar">
          <el-tree
            ref="treeRef"
            :data="TreeData"
            :props="defaultProps"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
          />
        </el-scrollbar>
      </div>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick, watch } from 'vue'
import { ElTree } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'
import { getAllArticles } from '@/api/articleService'

interface Tree {
  label: string
  children?: Tree[]
  route?: string
  isCategory?: boolean
}

const defaultProps = { children: 'children', label: 'label' }

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const TreeData: Tree[] = reactive([])

const buildTreeData = async () => {
  try {
    const articles: any = await getAllArticles()
    const categoryMap = new Map<string, Tree[]>()
    articles.forEach((a: any) => {
      const cat = a.category || '未分类'
      if (!categoryMap.has(cat)) categoryMap.set(cat, [])
      categoryMap.get(cat)!.push({ label: a.title, route: `/article/${a._id}` })
    })
    TreeData.length = 0
    categoryMap.forEach((children, category) => {
      TreeData.push({
        label: `${category} (${children.length})`,
        children,
        isCategory: true,
        route: `/category/${encodeURIComponent(category)}`
      })
    })
  } catch (err) {
    console.error('构建侧边栏分类树失败:', err)
  }
}

const handleNodeClick = (data: any) => { if (data.route) router.push(data.route) }

const filterNode = (value: string, data: any) => {
  if (!value) return true
  if (data.label.includes(value)) return true
  if (data.children && data.children.length) {
    return data.children.some((child: Tree) => child.label.includes(value))
  }
  return false
}

watch(filterText, (val) => { treeRef.value!.filter(val) })

let controlSize = (classname: string) => {
  let el: any = document.getElementsByClassName(classname)[0]
  if (el) el.style.height = parseInt(el.offsetHeight) - 100 + 'px'
}

onMounted(() => {
  buildTreeData()
  nextTick(() => {
    controlSize('aside_tree')
    window.addEventListener('resize', () => {
      const bar: any = document.getElementsByClassName('aside_tree')[0]
      if (bar) { bar.style.height = '100%'; controlSize('aside_tree') }
    })
  })
})
</script>

<style scoped lang="scss">
.el-aside {
  position: fixed;
  transition: transform 0.4s ease-in-out;

  @media screen and (max-width: 1200px) {
    transform: translateX(-300px);
  }

  .aside_main {
    min-width: 18rem;
    width: 18rem;
    height: 100vh;
    background: rgba(255, 255, 255, 0.75);
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    padding: 0;
    overflow: hidden;
    position: relative;
    border-right: 1px solid rgba(255, 255, 255, 0.3);
  }

  // 顶部渐变光条
  .aside_header {
    position: relative;
    padding: 20px 18px 12px;
    overflow: hidden;

    .header-glow {
      position: absolute;
      top: -40px;
      left: -20px;
      right: -20px;
      height: 120px;
      background: radial-gradient(ellipse at 30% 50%, rgba(102, 126, 234, 0.25) 0%, transparent 70%),
                  radial-gradient(ellipse at 70% 50%, rgba(245, 87, 108, 0.15) 0%, transparent 70%);
      animation: glowShift 4s ease-in-out infinite alternate;
    }

    .header-title {
      position: relative;
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      font-size: 1.15rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #f5576c 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      .title-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea, #f5576c);
        animation: dotPulse 2s ease-in-out infinite;
      }
    }
  }

  // 搜索框
  .aside_title {
    padding: 0 16px 12px;
    position: relative;
    z-index: 1;

    .filter_input {
      ::v-deep .el-input__wrapper {
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(102, 126, 234, 0.25);
        box-shadow: 0 2px 12px rgba(102, 126, 234, 0.08);
        transition: all 0.35s ease;

        .el-input__inner::placeholder {
          color: #a0aec0;
          opacity: 0.8;
        }
      }

      ::v-deep .el-input__wrapper.is-focus {
        border-color: rgba(102, 126, 234, 0.5);
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1), 0 4px 16px rgba(102, 126, 234, 0.15);
        background: rgba(255, 255, 255, 0.85);
      }
    }
  }

  // 树
  .aside_tree {
    margin: 0 12px 12px;
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    padding: 8px;
    height: calc(100% - 130px);
    box-shadow: inset 0 0 20px rgba(102, 126, 234, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }

  ::v-deep .el-tree {
    color: #2d3436;
    font-size: 0.95em;
    font-family: 'Noto Sans SC', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    background: transparent;

    .el-tree-node__content {
      border-radius: 9px;
      margin: 2px 0;
      padding: 6px 8px;
      position: relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%) scaleY(0);
        width: 3px;
        height: 60%;
        border-radius: 0 3px 3px 0;
        background: linear-gradient(180deg, #667eea, #f5576c);
        transition: transform 0.3s;
      }

      &:hover {
        background: linear-gradient(90deg, rgba(102, 126, 234, 0.1) 0%, rgba(245, 87, 108, 0.05) 100%);
        transform: translateX(4px);

        &::before { transform: translateY(-50%) scaleY(1); }

        .el-tree-node__label {
          background: linear-gradient(135deg, #667eea 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      }

      .el-tree-node__expand-icon {
        color: #667eea;
        transition: transform 0.3s, color 0.3s;
        &:hover { color: #f5576c; }
      }
    }

    // 当前选中
    .el-tree-node.is-current > .el-tree-node__content {
      background: linear-gradient(90deg, rgba(102, 126, 234, 0.15) 0%, rgba(245, 87, 108, 0.08) 100%);

      &::before { transform: translateY(-50%) scaleY(1); }

      .el-tree-node__label {
        font-weight: 700;
        background: linear-gradient(135deg, #667eea 0%, #f5576c 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
    }

    // 展开的分类节点
    .el-tree-node.is-expanded > .el-tree-node__content .el-tree-node__label {
      color: #667eea;
      font-weight: 600;
    }
  }
}

// 暗黑模式
.dark-mode .el-aside .aside_main {
  background: rgba(30, 30, 40, 0.8) !important;
  border-right: 1px solid rgba(255, 255, 255, 0.05) !important;

  .aside_header .header-glow {
    background: radial-gradient(ellipse at 30% 50%, rgba(102, 126, 234, 0.18) 0%, transparent 70%),
                radial-gradient(ellipse at 70% 50%, rgba(245, 87, 108, 0.1) 0%, transparent 70%);
  }

  .aside_title .filter_input ::v-deep .el-input__wrapper {
    background: rgba(255, 255, 255, 0.08) !important;
    border-color: rgba(255, 255, 255, 0.1) !important;
    .el-input__inner { color: #e0e0e0 !important; &::placeholder { color: #888 !important; } }
  }
  .aside_title .filter_input ::v-deep .el-input__wrapper.is-focus {
    border-color: rgba(102, 126, 234, 0.4) !important;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.12) !important;
    background: rgba(255, 255, 255, 0.12) !important;
  }

  .aside_tree {
    background: rgba(255, 255, 255, 0.03) !important;
    border-color: rgba(255, 255, 255, 0.06) !important;
  }

  ::v-deep .el-tree {
    color: #c0c0c0 !important;
  }
}

// 动画
@keyframes glowShift {
  0% { opacity: 0.7; }
  100% { opacity: 1; transform: scale(1.05); }
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.4); }
}
</style>
