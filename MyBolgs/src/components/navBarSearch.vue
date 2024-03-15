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
const input1 = ref('')

let warpper = ref<HTMLCollection | null>(null)
onMounted(() => {})
</script>

<style scoped lang="scss">
$placeholderColor: purple;
$opcity: 0.5;
.nav_div {
  padding: 0px 10px;
  border-right: solid 1px gray;
  ::v-deep .el-input__wrapper {
    border-radius: 20px;
    .el-input__inner {
      &::placeholder {
        color: $placeholderColor;
        opacity: $opcity;
      }
      &::-ms-input-placeholder {
        color: $placeholderColor;
        opacity: $opcity;
      }
      &::-moz-placeholder {
        color: $placeholderColor;
        opacity: $opcity;
      }
      &::-webkit-input-placeholder {
        color: $placeholderColor;
        opacity: $opcity;
      }
    }
  }
  ::v-deep .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px purple inset;
  }
}
</style>
