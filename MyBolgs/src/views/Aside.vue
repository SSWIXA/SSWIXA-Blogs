<template>
  <el-aside style="z-index: 100;padding-top: 60px;">
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
            allow-drag="false"
          />
        </el-scrollbar>
      </div>
    </div>
  </el-aside>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeMount, watch, nextTick, onUpdated } from 'vue'
import { ElTree } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import axiosInstance from '@/axios/axios'
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

const handleNodeClick = (data: Tree) => {
  if (data.route) console.log(data.route)
  else {
  }
}

const currentRoutePath: any = ref(router.currentRoute.value.path)

const filterText = ref('') //过滤框
const treeRef = ref<InstanceType<typeof ElTree>>() //响应式过滤文本
let TreeData: Tree[] = reactive([]) //树状数据

onBeforeMount(async () => {
  currentRoutePath.value = router.currentRoute.value.path
  hashChange()
})

const hashChange = async () => {
  let curAPI = currentRoutePath.value == '/WebNote' ? '/asideDirWeb' : '/asideDirServer' //判断前端后端
  const res = (await axiosInstance.get(`/317821${curAPI}`))?.data?.data
  TreeData.splice(0) // 清空数组，准备填充新数据
  TreeData.push(
    ...res.map((item: any, index: number) => ({
      label: item.label,
      children: item.children
    }))
  )
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
$placeholderColor: purple;
$opcity: 0.5;

.el-aside {
  position: $position;
  transition: transform .4s ease-in-out;
  @media screen and (max-width: 1200px) {
    transform: translateX(-300px);
  }
  .aside_main {
    min-width: 18rem;
    width: 18rem;
    height: 100vh;
    background-color: #ffffff;
    padding: 5px 5px 0px 5px;
    opacity: 0.9;
    .aside_title {
      display: flex;
      justify-content: center;
      .filter_input {
        width: 250px;
        margin-bottom: 5px;
        ::v-deep .el-input__wrapper {
          border-radius: 20px;
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
          box-shadow: 0 0 0 1px purple inset;
        }
      }
    }

    .aside_tree {
      height: 100%;
      box-sizing: border-box;
    }
    .el-tree {
      color: #000000;
      font-size: 1.1em;
      font-family:
        Inter,
        Helvetica Neue,
        Helvetica,
        PingFang SC,
        Hiragino Sans GB,
        Microsoft YaHei,
        \5fae\8f6f\96c5\9ed1,
        Arial,
        sans-serif;
      &:hover {
        cursor: pointer;
      }
      ::v-deep .el-tree-node {
        padding: 4px;
        .el-tree-node__label {
          -webkit-user-select: none; /* 针对Webkit内核（如Chrome、Safari） */
          -moz-user-select: none; /* 针对Firefox浏览器 */
          -ms-user-select: none; /* 针对Internet Explorer浏览器 */
          user-select: none;
          &:hover {
            color: purple;
          }
        }
      }
    }
  }
}
</style>
