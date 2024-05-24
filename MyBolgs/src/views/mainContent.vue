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
  backdrop-filter: blur(150px);
}
</style>
