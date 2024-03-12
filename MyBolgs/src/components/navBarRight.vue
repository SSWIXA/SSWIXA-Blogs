<template>
  <div class="link">
    <div class="iconBar">
        <spanIcon v-for="item in iconMsg" :msg="item"></spanIcon>
    </div>
  </div>
</template>

<script setup lang="ts">
import 'element-plus/theme-chalk/display.css'
import spanIcon from './spanIcon.vue'
import { reactive } from 'vue'

let iconMsg = reactive([{'txt':'主页','before':'🏠','child':[]}, {'txt':'导航','before':'🏹','child':[]}, {'txt':'前端开发','before':'💻','child':[]}, {'txt':'后端开发','before':'📦','child':[]},{'txt':'关于','before':'🔅','child':[]}]) //图标信息

</script>

<style scoped lang="scss">
.link {
  flex: 1;
  min-width: 490px;
  margin-left: 10px;
  .iconBar {
    height: 100%;
    float: right;
    display: flex;
  }
}
</style>
