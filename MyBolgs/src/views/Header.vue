<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Favatar from '@/components/favatar.vue'
import navBarSearch from '@/components/navBarSearch.vue'
import navBarRight from '@/components/navBarRight.vue'

const route = useRoute()
const headerHidden = ref(false)

let scrollHandler: () => void
let mouseHandler: (e: MouseEvent) => void

function isHomePage() {
  return route.path === '/'
}

function updateHeader() {
  if (!isHomePage()) {
    headerHidden.value = false
    return
  }
  headerHidden.value = window.scrollY <= 0
}

onMounted(() => {
  scrollHandler = () => updateHeader()
  mouseHandler = (e: MouseEvent) => {
    if (!isHomePage()) return
    if (window.scrollY <= 0) {
      headerHidden.value = e.clientY > 60
    }
  }
  window.addEventListener('scroll', scrollHandler, { passive: true })
  document.addEventListener('mousemove', mouseHandler, { passive: true })
  updateHeader()
})

// 路由切换时重置
watch(
  () => route.path,
  () => {
    if (!isHomePage()) {
      headerHidden.value = false
    }
  }
)

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandler)
  document.removeEventListener('mousemove', mouseHandler)
})
</script>

<template>
  <el-container>
    <el-header class="el_hd" :class="{ 'header-hidden': headerHidden }">
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
  top: 0;
  background-color: rgb(247, 247, 247, 0.9);
  width: 100%;
  padding: 0.5rem;
  height: 0;
  min-height: 60px;
  border-bottom: solid rgba(135, 206, 250, 0.3) 1px;
  box-shadow: 0px 2px 2px rgba(135, 206, 250, 0.3);
  overflow: hidden;
  z-index: 999;
  transform: translateY(0);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);

  &.header-hidden {
    transform: translateY(-100%);
  }

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
