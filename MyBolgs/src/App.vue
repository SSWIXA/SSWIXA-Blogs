<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<template>
  <el-scrollbar class="main-scrollbar">
    <div class="common-layout">
      <Header></Header>
      <RouterView />
    </div>
  </el-scrollbar>
</template>

<style scoped lang="scss"></style>
