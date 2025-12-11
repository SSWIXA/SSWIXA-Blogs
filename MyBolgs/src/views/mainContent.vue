<template>
  <Asider></Asider>
  <div class="blur_mask">
    <el-container style="padding-top: 60px">
      <MainContents></MainContents>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import Asider from '@/views/Aside.vue'
import MainContents from '@/views/MainCon.vue'
</script>

<style scoped lang="scss">
.blur_mask {
  backdrop-filter: blur(50px);
}

// 暗黑模式样式
.dark-mode .blur_mask {
  background-color: rgba(26, 26, 26, 0.8) !important;
  backdrop-filter: blur(50px);
}
</style>