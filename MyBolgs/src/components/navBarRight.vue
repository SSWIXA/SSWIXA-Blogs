<template>
  <div class="link">
    <div class="iconBar">
      <spanIcon v-for="item in iconMsg" :msg="item"></spanIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/axios/axios'
import spanIcon from './spanIcon.vue'
import { reactive, onMounted, ref, onBeforeMount, computed } from 'vue'
//导航栏icon以及对应跳转路由
let iconArr = [
  { icon: '🏠', href: '/' },
  { icon: '🏹', href: '/' },
  { icon: '💻', href: '/WebNote' },
  { icon: '📦', href: '/ServerNote' },
  { icon: '🔅', href: '/' },
  { icon: '', href: '/' }
]

//导航栏二级菜单数据
const secondMenu = [
  {
    txt: '前端开发',
    child: [
      {
        txt: 'web技术',
        before: '📚',
        child: []
      },
      {
        txt: 'npm教程',
        before: '📚',
        child: []
      },
      {
        txt: 'git教程',
        before: '📚',
        child: []
      },
      {
        txt: 'MarkDown笔记',
        before: '📚',
        child: []
      },
      {
        txt: '其他文档',
        before: '📜',
        child: []
      }
    ]
  },
  {
    txt: '后端开发',
    child: [
      {
        txt: 'nodeJS',
        before: '📚',
        child: []
      },
      {
        txt: 'PHP',
        before: '📚',
        child: []
      },
      {
        txt: 'Python',
        before: '📚',
        child: []
      },
      {
        txt: 'MySQL',
        before: '🐬',
        child: []
      }
    ]
  }
]

const iconMsg = reactive<navbardata[]>([])

interface navbardata {
  txt: string
  before: string
  router: string
  child: object
}

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/317821/navBarRight')
    iconMsg.splice(0) // 清空数组，准备填充新数据
    iconMsg.push(
      ...response.data.data.map((item: navbardata, index: number) => ({
        txt: item.txt,
        before: iconArr[index].icon,
        child: item.child,
        router: iconArr[index].href
      }))
    )
    //写入二级菜单数据
    for (const iterator of secondMenu) {
      iconMsg.forEach((e, i) => {
        if(e.txt == iterator.txt){
          e.child = iterator.child
        }
      })
    }
  } catch (error) {}
}

onBeforeMount(fetchData) // 在组件挂载前发起请求
</script>

<style scoped lang="scss">
.link {
  flex: 1;
  min-width: 550px;
  margin-left: 10px;
  .iconBar {
    height: 100%;
    float: right;
    display: flex;
  }
}
</style>
