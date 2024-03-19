<template>
  <el-main>
    <div class="aside_maincontainer">
      <div class="page-container"></div>
    </div>
  </el-main>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.el-main {
  padding-left: 300px;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  justify-content: center;
  transition: padding-left .4s ease-in-out;
  @media screen and (max-width: 1200px) {
    padding-left: 12px;
  }
  .aside_maincontainer {
    background-color: #fff;
    border-radius: 5px;
    min-width: 900px;
    max-width: 1000px;
    padding: 10px 10px 10px 15px;
    .page-container {
      height: 200px;
      background-color: aqua;
    }
  }
}
</style>
