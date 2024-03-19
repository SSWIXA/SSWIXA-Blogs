<template>
  <div class="intro_blogers">
    <el-calendar v-model="value" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date());
</script>
<style scoped lang="scss">
.intro_blogers {
  .el-calendar {
    opacity: .8;
    border-radius: 5px;
    ::v-deep .el-calendar__body {
      padding: 12px 20px 20px;
      .el-calendar-day {
        height: 40px;
      }
    }
  }
}

</style>
