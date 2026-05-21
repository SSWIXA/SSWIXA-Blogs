<template>
  <div class="nav_div">
    <el-input
      v-model="input1"
      style="width: 200px"
      size="large"
      placeholder="搜索"
      :prefix-icon="Search"
      class="searchBar"
      @keyup.enter="handleSearch"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const input1 = ref('')
const router = useRouter()

const handleSearch = () => {
  const keyword = input1.value.trim()
  if (keyword) {
    router.push({ path: '/search', query: { keyword } })
  }
}
</script>

<style scoped lang="scss">
$placeholderColor: rgb(2, 102, 252, 0.5);
$opcity: 0.5;
.nav_div {
  padding: 0px 10px;
  border-right: solid 1px gray;
  ::v-deep .el-input__wrapper {
    border-radius: 20px;
    background-color: white !important;
    .el-input__inner {
      background-color: white !important;
      color: #333 !important;
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
    box-shadow: 0 0 0 1px rgb(2, 102, 252, 0.5) inset;
  }
}

// 在暗黑模式下保持搜索栏的原始样式
.dark-mode .nav_div {
  ::v-deep .el-input__wrapper {
    background-color: white !important;
    .el-input__inner {
      background-color: white !important;
      color: #333 !important;
    }
  }
}
</style>
