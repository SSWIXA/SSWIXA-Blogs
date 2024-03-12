<script setup lang="ts">
import { reactive, toRefs } from 'vue'
import favatar from '@/components/favatar.vue'
import navBarSearch from '@/components/navBarSearch.vue'
import navBarRight from '@/components/navBarRight.vue'

</script>

<template>
  <div class="nav_all">
    <favatar class="fav"></favatar>
    <navBarSearch></navBarSearch>
    <navBarRight></navBarRight>
  </div>
</template>

<style scoped lang="scss">
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
</style>
