<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header class="el_hd"><Header></Header></el-header>
    </el-container>
    <el-container style="padding-top: 5rem;">
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
    </el-container>
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped lang="scss">
.el_hd {
  position: fixed;
  background-color: #fefefe;
  width: 100%;
  padding: 0.5rem;
  height: 0;
  min-height: 60px;
  border-bottom: solid gray 1px;
  box-shadow: 0px 2px 2px grey;
}
</style>
