<template>
  <div class="intro_blogers">
    <div class="intro_blogers">
      <div class="favator">
        <el-avatar
          shape="square"
          src="https://foruda.gitee.com/avatar/1677141291625503445/8548544_sswixa_1614848167.png!avatar500"
        />
      </div>
      <div class="blogers_name">
        <el-text style="color: #2c3e50;font-weight: 700;font-size: 22px;">SSWIXA</el-text>
      </div>
    </div>
    <el-calendar v-model="value" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const value = ref(new Date())
</script>
<style scoped lang="scss">
.intro_blogers {
  .intro_blogers {
    border-radius: 10px;
    opacity: 0.8;
    background-color: white;
    height: 330px;
    margin-bottom: 10px;
    .favator {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 150px;
      .el-avatar {
        width: 100px;
        height: 100px;
      }
    }
    .blogers_name{
      display: flex;
      justify-content: center;
    }
  }
  .el-calendar {
    opacity: 0.8;
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
