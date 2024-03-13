<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Header from './views/Header.vue'
</script>

<template>
  <div class="common-layout">
    <Header></Header>
    <RouterView/>
  </div>
</template>

<style scoped lang="scss">

</style>
