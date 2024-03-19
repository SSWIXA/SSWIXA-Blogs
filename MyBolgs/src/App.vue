<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onMounted, nextTick } from 'vue'
import Header from './views/Header.vue'
import Sakura from '@/components/Sakura.vue'

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

// console.log(Sakura)
</script>

<template>
  <el-scrollbar class="main-scrollbar">
    <Sakura></Sakura>
    <div class="common-layout">
      <Header></Header>
      <RouterView />
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
