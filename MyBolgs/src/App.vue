<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick, onUnmounted } from 'vue'
import Header from './views/Header.vue'
import Sakura from '@/components/Sakura/Sakura.vue'
import backTop from '@/components/backTop/backTop.vue'
import { createWidget } from 'l2d-widget'

let widgetInstance: any = null
let darkObserver: MutationObserver | null = null

// 看板娘趣味语录
const quotes = [
  '欢迎来到我的博客~ ✨',
  '今天也在写代码吗？加油！ 💻',
  '累了就休息一下嘛，喝杯咖啡吧 ☕',
  '博客里藏了好多宝藏文章哦 📚',
  '你点的每一页，我都看着呢～ 👀',
  '偷偷告诉你，这个博客超有料的 🤫',
  '鼠标的粒子拖尾好看吗？ 🎨',
  '长夜漫漫，代码为伴 🌙',
  '今天更新博客了没？ 📝',
  'Bug 不可怕，重启大法好！ 🔄',
  '樱花飘落的样子，看入迷了吗？ 🌸',
  'Hi～新朋友还是老朋友？ 🤗',
  '程序员都是夜行动物吗？ 🦉',
  '404 找不到？不存在的！ ✅',
  'Ctrl+S 记得常按哦～ 💾',
  '你看，每一个像素都在努力展示 ✨',
  '这个博客是用 Vue 写的，好看吧？ ⚡',
  '键盘敲得越响，Bug 越多？ 🤔',
  '给我一颗 CPU，我能编译整个世界 🖥️',
  '晚上写的代码，早上就看不懂了 🌚',
  '代码和人，有一个能跑就行 🏃',
  '你猜我在干什么？我在变强 💪',
  '左滑右滑，不如点个 Star ⭐',
  '听说喜欢这个博客的人运气不会差 🍀',
  '如果代码能说话，它一定在喊救命 😂',
  '今天天气真好，适合写 Bug 🌤️',
  '你的鼠标轨迹，我都记着呢～ 🐾',
  '别一直盯着屏幕，眼睛会累的 👁️',
  'Git push 之前记得 Git pull 🚀',
  '给我加个鸡腿，明天更新更多功能 🍗'
]

// 获得随机语录（排除最近几条避免重复）
let lastQuotes: string[] = []

function randomQuote(): string {
  const available = quotes.filter((q) => !lastQuotes.includes(q))
  const pick = available.length > 0 ? available : quotes
  const result = pick[Math.floor(Math.random() * pick.length)]
  lastQuotes.push(result)
  if (lastQuotes.length > 5) lastQuotes.shift()
  return result
}

function initWidget() {
  const isDark = document.body.classList.contains('dark-mode')
  const modelPath = isDark ? '/model/tororo/tororo.model.json' : '/model/hijiki/hijiki.model.json'

  widgetInstance = createWidget({
    model: {
      path: modelPath,
      tips: {
        welcomeMessage: [randomQuote()],
        messages: quotes,
        duration: 5000,
        interval: 10000,
        typing: { speed: 80 }
      }
    },
    menus: { items: [] },
    position: 'bottom-left',
    size: 280,
  })
}

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', () => {
      const canvas: any = document.getElementById('canvas_sakura')
      if (canvas) {
        canvas.width = document.body.clientWidth
        canvas.height = window.innerHeight
      }
    })

    initWidget()

    // 监听暗黑模式切换，重建 widget
    darkObserver = new MutationObserver(() => {
      if (widgetInstance) {
        widgetInstance.destroy?.()
      }
      initWidget()
    })
    darkObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  })
})

onUnmounted(() => {
  darkObserver?.disconnect()
  widgetInstance?.destroy?.()
})
</script>

<template>
  <Header></Header>
  <RouterView />
  <Sakura></Sakura>
  <backTop></backTop>
</template>

<style scoped lang="scss"></style>
