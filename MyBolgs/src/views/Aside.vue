<template>
  <el-aside style="z-index: 100; padding-top: 60px">
    <div class="aside_main">
      <div class="aside_title">
        <el-input
          v-model="filterText"
          placeholder="搜索"
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
import { ref, reactive, onMounted, onBeforeMount, watch, nextTick } from 'vue'
import { ElTree } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import router from '@/router'

interface Tree {
  label: string
  children?: Tree[]
  route?: string
}

const defaultProps = {
  children: 'children',
  label: 'label'
}

const asideServerTree = [
  {
    label: 'Python',
    children: [
      {
        label: 'Flask',
        children: []
      },
      {
        label: 'Django',
        children: []
      }
    ]
  },
  {
    label: 'PHP',
    children: [
      {
        label: 'Larval',
        children: []
      },
      {
        label: 'PHPExcel',
        children: []
      }
    ]
  },
  {
    label: 'NodeJS',
    children: [
      {
        label: 'Node入门',
        children: []
      }
    ]
  },
  {
    label: 'Lua',
    children: [
      {
        label: 'lua入门',
        children: []
      }
    ]
  },
  {
    label: 'MySQL',
    children: [
      {
        label: 'sql命令',
        children: []
      }
    ]
  },
  {
    label: 'MongoDB',
    children: [
      {
        label: 'mongoDB入门',
        children: []
      }
    ]
  }
]

const asideWebTree = [
  {
    label: 'web技术',
    children: [
      {
        label: 'javaScript',
        children: []
      },
      {
        label: 'typeScript',
        children: []
      },
      {
        label: 'HTML',
        children: []
      },
      {
        label: 'CSS',
        children: []
      },
      {
        label: 'H5Canvas',
        children: []
      },
      {
        label: 'Vue',
        children: []
      },
      {
        label: 'React',
        children: []
      },
      {
        label: 'Taro',
        children: []
      },
      {
        label: 'Uniapp',
        children: []
      }
    ]
  },
  {
    label: 'npm教程',
    children: [
      {
        label: 'npm安装',
        children: []
      },
      {
        label: 'cnpm',
        children: []
      },
      {
        label: 'npm命令',
        children: []
      }
    ]
  },
  {
    label: 'git教程',
    children: [
      {
        label: 'git安装',
        children: []
      },
      {
        label: 'git仓库',
        children: []
      },
      {
        label: 'git命令',
        children: []
      }
    ]
  },
  {
    label: 'markdown笔记',
    children: [
      {
        label: 'markdown安装',
        children: []
      },
      {
        label: 'markown使用',
        children: []
      }
    ]
  },
  {
    label: '技术分享',
    children: [
      {
        label: 'ElementPlus',
        children: []
      },
      {
        label: 'Antd Design',
        children: []
      },
      {
        label: 'Swiper',
        children: []
      },
      {
        label: 'E-charts',
        children: []
      },
      {
        label: 'monaco editor',
        children: []
      }
    ]
  }
]

const handleNodeClick = (data: Tree) => {
  if (data.route) console.log(data.route)
  else {
  }
}

const currentRoutePath: any = ref(router.currentRoute.value.path)
const filterText = ref('') //过滤框
const treeRef = ref<InstanceType<typeof ElTree>>() //响应式过滤文本
let TreeData: Tree[] = reactive(
  currentRoutePath.value == '/WebNote' ? asideWebTree : asideServerTree
) //树状数据

onBeforeMount(async () => {
  currentRoutePath.value = router.currentRoute.value.path
  hashChange()
})

const hashChange = async () => {
  console.log(TreeData)
  //给二级目录添加路由
  setRoute(TreeData)
}

//监听过滤框文本
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

watch(router.currentRoute, function (to, from) {
  currentRoutePath.value = router.currentRoute.value.path
  hashChange()
})

//自适应填充左侧树状栏
let controlSize = (classname: string) => {
  let el: HTMLCollection | any = document.getElementsByClassName(classname)
  if (el[0]) {
    // console.log(el[0], el[0].offsetHeight)
    let curHeight = parseInt(el[0].offsetHeight)
    el[0].style.height = curHeight - 100 + 'px'
  }
}

onMounted(() => {
  //挂载时候的节点
  nextTick(() => {
    controlSize('aside_tree')
    window.addEventListener('resize', () => {
      const aside_tree_scrollbar: any = document.getElementsByClassName('aside_tree')
      if (aside_tree_scrollbar[0]) {
        aside_tree_scrollbar[0].style.height = '100%'
        controlSize('aside_tree')
      }
    })
  })
})

//设置层级路由
const setRoute = (data: Array<Tree>) => {
  data.forEach((e: any) => {
    if (e.children.length == 0) e.route = '/' + e.label
    for (const key in e) {
      if (Object.prototype.hasOwnProperty.call(e, key)) {
        if (key === 'children' && e.children.length > 0) {
          setRoute(e.children)
        }
      }
    }
  })
}

//过滤目录结构
const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}
</script>

<style scoped lang="scss">
$position: fixed;
$placeholderColor: #87cefa;
$opcity: 0.7;

.el-aside {
  position: $position;
  transition: transform 0.4s ease-in-out;
  box-shadow: 2px 0 10px rgba(135, 206, 250, 0.2);

  @media screen and (max-width: 1200px) {
    transform: translateX(-300px);
  }

  .aside_main {
    min-width: 18rem;
    width: 18rem;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    padding: 15px;
    border-radius: 15px;
    box-shadow:
      0 4px 20px rgba(135, 206, 250, 0.15),
      inset 2px 2px 4px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(0, 0, 0, 0.05);

    .aside_title {
      display: flex;
      justify-content: center;
      margin-bottom: 15px;

      .filter_input {
        width: 100%;
        margin-bottom: 5px;

        ::v-deep .el-input__wrapper {
          border-radius: 25px;
          background: rgba(255, 255, 255, 0.8);
          box-shadow:
            0 2px 6px rgba(135, 206, 250, 0.1),
            inset 2px 2px 4px rgba(255, 255, 255, 0.9),
            inset -2px -2px 4px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(135, 206, 250, 0.3);
          transition: all 0.3s ease;

          .el-input__inner {
            &::placeholder {
              color: $placeholderColor;
              opacity: $opcity;
            }
            &::-ms-input-placeholder {
              color: $placeholderColor;
              opacity: $opcity;
            }
            &::-moz-placeholder {
              color: $placeholderColor;
              opacity: $opcity;
            }
            &::-webkit-input-placeholder {
              color: $placeholderColor;
              opacity: $opcity;
            }
          }
        }

        ::v-deep .el-input__wrapper.is-focus {
          box-shadow:
            0 2px 12px rgba(135, 206, 250, 0.3),
            inset 2px 2px 4px rgba(255, 255, 255, 0.9),
            inset -2px -2px 4px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(135, 206, 250, 0.5);
        }
      }
    }

    .aside_tree {
      height: calc(100% - 70px);
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 12px;
      padding: 10px;
      box-shadow:
        inset 2px 2px 5px rgba(135, 206, 250, 0.1),
        inset -2px -2px 5px rgba(255, 255, 255, 0.6);
    }

    ::v-deep .el-tree {
      color: #2d3436;
      font-size: 1em;
      font-family: 'Noto Sans SC', 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
        'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
      background: transparent;

      &:hover {
        cursor: pointer;
      }

      .el-tree-node__content {
        border-radius: 8px;
        margin: 2px 0;
        transition: all 0.2s ease;
        padding: 5px 8px;

        &:hover {
          background: rgba(135, 206, 250, 0.2);
          transform: translateX(3px);
        }

        .el-tree-node__expand-icon {
          color: #87cefa;
        }
      }

      .el-tree-node__label {
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        font-weight: 500;
        transition: color 0.2s ease;

        &:hover {
          color: #87cefa;
        }
      }

      .el-tree-node.is-current > .el-tree-node__content {
        background: linear-gradient(
          90deg,
          rgba(135, 206, 250, 0.3) 0%,
          rgba(135, 206, 250, 0.1) 100%
        );
        color: #87cefa;
        font-weight: 600;
      }

      .el-tree-node.is-expanded > .el-tree-node__content {
        .el-tree-node__label {
          color: #87cefa;
        }
      }
    }
  }
}

// 在暗黑模式下保持搜索栏的原始样式
.dark-mode {
  .el-aside {
    .aside_main {
      background-color: rgba(40, 40, 40, 0.9) !important;
      box-shadow:
        0 4px 20px rgba(0, 0, 0, 0.3),
        inset 2px 2px 4px rgba(255, 255, 255, 0.05),
        inset -2px -2px 4px rgba(0, 0, 0, 0.1) !important;

      .aside_tree {
        background: rgba(45, 45, 45, 0.6) !important;
        box-shadow:
          inset 2px 2px 5px rgba(0, 0, 0, 0.2),
          inset -2px -2px 5px rgba(45, 45, 45, 0.4) !important;
      }

      ::v-deep .el-tree {
        color: #e0e0e0 !important;
      }
      .aside_title {
        .filter_input {
          ::v-deep .el-input__wrapper {
            background: rgba(255, 255, 255, 0.8) !important;
            box-shadow:
              0 2px 6px rgba(135, 206, 250, 0.1),
              inset 2px 2px 4px rgba(255, 255, 255, 0.9),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05) !important;
            border: 1px solid rgba(135, 206, 250, 0.3) !important;

            .el-input__inner {
              color: #333 !important;
              background: rgba(255, 255, 255, 0.8) !important;
            }
          }

          ::v-deep .el-input__wrapper.is-focus {
            box-shadow:
              0 2px 12px rgba(135, 206, 250, 0.3),
              inset 2px 2px 4px rgba(255, 255, 255, 0.9),
              inset -2px -2px 4px rgba(0, 0, 0, 0.05) !important;
            border: 1px solid rgba(135, 206, 250, 0.5) !important;
          }
        }
      }
    }
  }
}
</style>
