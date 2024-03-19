<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import Header from './views/Header.vue'
import Sakura from '@/components/Sakura.vue'
import backTop from '@/components/backTop.vue'


onMounted(() => {
  nextTick(() => {
    window.addEventListener('resize', () => {
      let canvas: any = document.getElementById('canvas_sakura')
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    })
  })
})

</script>

<template>
  <el-scrollbar class="main-scrollbar">
    <backTop></backTop>
    <Sakura></Sakura>
    <div class="common-layout">
      <Header></Header>
      <RouterView />
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
