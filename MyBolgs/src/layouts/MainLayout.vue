<template>
  <div class="main-layout">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
// 主布局组件
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>