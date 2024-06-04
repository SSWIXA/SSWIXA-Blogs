<template>
  <div class="page_container">
    <div class="show_list_title">
      <h1>{{ title }}</h1>
    </div>
    <div class="show_list_msg"></div>
    <el-divider style="margin: 0 10px; width: auto; border-top: 1px blue solid; opacity: 0.2" />
    <div class="item_information"></div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, onBeforeMount } from 'vue'
let props = defineProps(['msg'])
let title = ref<string>('')

onMounted(() => {
  title.value = props.msg.title
})

</script>
<style scoped lang="scss">
.page_container {
  margin: 0 0 10px 0;
  width: 100%;
  min-height: 100px;
  background-color: rgba($color: #ffffff, $alpha: 1);
  box-shadow:
    rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
    rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
  border-radius: 10px;
  .show_list_title {
    padding: 0 10px;
  }
  .show_list_msg {
    height: 70px;
  }
  .item_information {
    height: 40px;
  }
}
</style>
