<template>
  <div class="favBLK">
    <RouterLink to="/" style="text-decoration: none; color: inherit; background-color: transparent;display: flex;align-items: center;">
      <el-avatar shape="square" :size="40" fit="cover" :src="url" class="fav_pic" />
      <el-text class="mx-1" ref="Blogstxt" size="large">SSWIXA's Blogs</el-text>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { reactive, toRefs, onMounted, ref, nextTick } from 'vue'

const state = reactive({
  fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
  url: 'src/assets/bg.jpg'
})

const { fits, url } = toRefs(state)
const Blogstxt = ref()

onMounted(() => {

  
})

</script>

<style scoped lang="scss">
.favBLK {
  .fav_pic {
    margin-right: 0.3rem;
  }
  .mx-1 {
    font-size: 1.3rem;
    font-weight: 600;
    color: var(--textColor);
  }
}
</style>
