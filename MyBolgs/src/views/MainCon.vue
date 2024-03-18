<template>
  <el-main>
    <div class="aside_maincontainer">
      <div class="page-container">
        
      </div>
    </div>
  </el-main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.el-main {
  padding-left: 300px;
  box-sizing: border-box;
  overflow: hidden;
  .aside_maincontainer {
    background-color: #fff;
    border-radius: 5px;
    min-width: 750px;
    padding: 10px 10px 10px 15px;
    .page-container{
        height: 200px;
        background-color: aqua;
    }
  }
}
</style>
