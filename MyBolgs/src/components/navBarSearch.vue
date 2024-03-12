<template>
  <div class="nav_div">
    <el-input
      v-model="input1"
      style="width: 200px"
      size="large"
      placeholder="搜索"
      :prefix-icon="Search"
      class="searchBar"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
const input1 = ref('');

let warpper = ref<HTMLCollection | null>(null)
onMounted(() => {
  nextTick(() => {
    warpper.value = document.getElementsByClassName('el-input__wrapper')
    const firstElement = warpper.value[0] as HTMLElement;
    firstElement.style.borderRadius = '20px';
  })
})
</script>

<style scoped lang="scss">
.nav_div {
  padding: 0px 10px;
  border-right: solid 1px gray;
}


</style>
