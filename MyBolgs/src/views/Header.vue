<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import favatar from '@/components/favatar.vue'
import navBarSearch from '@/components/navBarSearch.vue'
import navBarRight from '@/components/navBarRight.vue'

</script>

<template>
  <el-container>
    <el-header class="el_hd">
      <div class="nav_all">
        <favatar class="fav"></favatar>
        <navBarSearch></navBarSearch>
        <navBarRight></navBarRight>
      </div>
    </el-header>
  </el-container>
</template>

<style scoped lang="scss">
.el_hd {
  position: fixed;
  background-color: rgba($color: #ffffff, $alpha: .9);
  width: 100%;
  padding: 0.5rem;
  height: 0;
  min-height: 60px;
  border-bottom: solid gray 1px;
  box-shadow: 0px 2px 2px grey;
  overflow: hidden;
  z-index: 999;
  .nav_all {
    display: flex;
    .fav {
      width: 200px;
      min-width: 200px;
      border-right: solid gray 1px;
      // box-shadow: 0px 0px 4px gray;
      display: flex;
      align-items: center;
      border-radius: 2px;
    }
  }
}
</style>
