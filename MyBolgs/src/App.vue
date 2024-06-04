<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import Header from './views/Header.vue'
import Sakura from '@/components/Sakura/Sakura.vue'
import backTop from '@/components/backTop/backTop.vue'
import Live2d from '@/components/live_2d/live_2d.vue'

import bgpic from '@/assets/bg.jpg'

onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', () => {
      let canvas: any = document.getElementById('canvas_sakura')
      if (canvas) {
        canvas.width = document.body.clientWidth
        canvas.height = window.innerHeight
      }
    })
  })
})
</script>

<template>
  <Header></Header>
  <RouterView />
  <Sakura></Sakura>
  <Live2d></Live2d>
  <backTop></backTop>
</template>

<style scoped lang="scss">

</style>
