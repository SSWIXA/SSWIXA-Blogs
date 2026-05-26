<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick, onUnmounted } from 'vue'
import Header from './views/Header.vue'
import Sakura from '@/components/Sakura/Sakura.vue'
import backTop from '@/components/backTop/backTop.vue'
import { loadOml2d } from 'oh-my-live2d'

import bgpic from '@/assets/bg.jpg'

let oml2dInstance: any = null
let darkObserver: MutationObserver | null = null

onMounted(() => {
  nextTick(async () => {
    window.addEventListener('resize', () => {
      let canvas: any = document.getElementById('canvas_sakura')
      if (canvas) {
        canvas.width = document.body.clientWidth
        canvas.height = window.innerHeight
      }
    })

    const isDark = document.body.classList.contains('dark-mode')
    const modelPath = isDark
      ? '/model/tororo/tororo.model.json' // 暗黑 → 白猫
      : '/model/hijiki/hijiki.model.json' // 白天 → 黑猫

    oml2dInstance = await loadOml2d({
      models: [
        {
          path: modelPath,
          position: [0, 0],
          scale: 0.1
        }
      ],
      statusBar: { disable: true },
      menus: { disable: true },
      tips: {
        style: {
          width: 220,
          height: 70,
          offset: [80, -1000]
        } as any
      },
      stageStyle: { width: 200, height: 250 },
      dockedPosition: 'left',
      mobileDisplay: true,
      transitionTime: 0
    } as any)

    // 监听暗黑模式切换
    darkObserver = new MutationObserver(() => {
      const isDark = document.body.classList.contains('dark-mode')
      const newPath = isDark ? '/model/tororo/tororo.model.json' : '/model/hijiki/hijiki.model.json'
      oml2dInstance?.loadModel(newPath)
    })
    darkObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] })
  })
})

onUnmounted(() => {
  darkObserver?.disconnect()
})
</script>

<template>
  <Header></Header>
  <RouterView />
  <Sakura></Sakura>
  <backTop></backTop>
</template>

<style scoped lang="scss"></style>
