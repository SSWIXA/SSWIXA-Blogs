<template>
  <Asider v-if="showAside"></Asider>
  <div class="blur_mask">
    <el-container style="padding-top: 60px">
      <MainContents></MainContents>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import Asider from '@/views/Aside.vue'
import MainContents from '@/views/MainCon.vue'

const route = useRoute()

// 计算是否应该显示侧边栏
const showAside = computed(() => {
  // 检查路由路径是否包含 'Note' 或者是文章详情页
  return route.path.includes('Note') || route.path.includes('/article/')
})
</script>

<style scoped lang="scss">
.blur_mask {
  backdrop-filter: blur(50px);
  transition: margin-left 0.4s ease-in-out;
  margin-left: 0;
}

// 暗黑模式样式
.dark-mode .blur_mask {
  background-color: rgba(26, 26, 26, 0.8) !important;
  backdrop-filter: blur(50px);
}
</style>
