<template>
  <div class="link">
    <div class="iconBar">
      <spanIcon v-for="item in iconMsg" :msg="item"></spanIcon>
      <DarkModeToggle />
    </div>
  </div>
</template>

<script setup lang="ts">
import spanIcon from './spanIcon.vue'
import DarkModeToggle from './DarkModeToggle.vue'
import { reactive } from 'vue'
//导航栏icon以及对应跳转路由
let navData = [
  { icon: '🏠', href: '/', txt: '首页', child: [] },
  { icon: '🏹', href: '/Navigation', txt: '导航', child: [] },
  {
    icon: '💻',
    href: '/WebNote',
    txt: '前端开发',
    child: [
      {
        txt: 'web技术',
        icon: '📚',
        child: []
      },
      {
        txt: 'npm教程',
        icon: '📚',
        child: []
      },
      {
        txt: 'git教程',
        icon: '📚',
        child: []
      },
      {
        txt: 'MarkDown笔记',
        icon: '📚',
        child: []
      },
      {
        txt: '其他文档',
        icon: '📜',
        child: []
      }
    ]
  },
  {
    icon: '📦',
    href: '/ServerNote',
    txt: '后端开发',
    child: [
      {
        txt: 'nodeJS',
        icon: '📚',
        child: []
      },
      {
        txt: 'PHP',
        icon: '📚',
        child: []
      },
      {
        txt: 'Python',
        icon: '📚',
        child: []
      },
      {
        txt: 'MySQL',
        icon: '🐬',
        child: []
      }
    ]
  },
  {
    icon: '🤖',
    href: '/AINote',
    txt: '人工智能',
    child: [
      {
        txt: '机器学习',
        icon: '🧠',
        child: []
      },
      {
        txt: '深度学习',
        icon: '🔍',
        child: []
      },
      {
        txt: '神经网络',
        icon: '🌐',
        child: []
      },
      {
        txt: 'NLP',
        icon: '💬',
        child: []
      },
      {
        txt: '计算机视觉',
        icon: '👁️',
        child: []
      }
    ]
  },
  { icon: '🔅', href: '/', txt: '关于', child: [] },
  { icon: '', href: 'https://gitee.com/sswixa', txt: 'Gitee', child: [] }
]

const iconMsg = reactive<navbardata[]>(navData)

interface navbardata {
  txt: string
  icon: string
  child: Array<secondMenu>
  href: string
}

interface secondMenu {
  txt: string
  icon: string
  child: any
}
</script>

<style scoped lang="scss">
.dark-mode {
  .link {
    color: #fefefe !important;

    ::v-deep .el-dropdown-link {
      color: #fefefe !important;
    }

    ::v-deep .item_txt_before {
      color: #fefefe !important;
    }
  }
}

.link {
  flex: 1;
  min-width: 820px;
  margin-left: 10px;
  .iconBar {
    height: 100%;
    overflow: hidden;
    float: right;
    display: flex;
    gap: 5px; // 添加元素间的间隙
  }
}
</style>
