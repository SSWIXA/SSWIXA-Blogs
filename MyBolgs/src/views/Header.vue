<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import Favatar from '@/components/favatar.vue'
import navBarSearch from '@/components/navBarSearch.vue'
import navBarRight from '@/components/navBarRight.vue'
</script>

<template>
  <el-container>
    <el-header class="el_hd">
      <div class="nav_all">
        <Favatar class="fav"></Favatar>
        <navBarSearch></navBarSearch>
        <navBarRight></navBarRight>
      </div>
    </el-header>
  </el-container>
</template>

<style scoped lang="scss">
.el_hd {
  position: fixed;
  background-color: rgb(247, 247, 247, 0.9);
  width: 100%;
  padding: 0.5rem;
  height: 0;
  min-height: 60px;
  border-bottom: solid rgba(135, 206, 250, 0.3) 1px;
  box-shadow: 0px 2px 2px rgba(135, 206, 250, 0.3);
  overflow: hidden;
  z-index: 999;
  .nav_all {
    display: flex;
    .fav {
      width: 200px;
      min-width: 200px;
      border-right: solid rgba(135, 206, 250, 0.3) 1px;
      display: flex;
      align-items: center;
      border-radius: 2px;
    }
  }
}

// 暗黑模式下的样式
.dark-mode .el_hd {
  background-color: rgba(40, 40, 40, 0.9) !important;
  border-bottom: solid rgba(70, 70, 70, 0.3) 1px !important;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3) !important;
}
</style>