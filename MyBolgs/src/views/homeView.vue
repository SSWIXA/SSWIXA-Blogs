<template>
  <div class="swiper-container">
    <swiper
      :slides-per-view="1"
      :space-between="5"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in optionSwiper" :key="item.value">
        <div class="show_item">
          <el-image style="width: 1000px; height: 300px" :src="item.url" :fit="item.fit"></el-image>
        </div>
      </swiper-slide>
    </swiper>
  </div>
  <el-main>
    <div class="home_page_content"></div>
  </el-main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'


const optionSwiper: any = reactive([
  {
    name: '选项1',
    value: '选项1',
    url: '../../public/images/nature1.jpg',
    fit: 'cover'
  },
  {
    name: '选项2',
    value: '选项2',
    url: '../../public/images/nature2.jpg',
    fit: 'cover'
  },
  {
    name: '选项3',
    value: '选项3',
    url: '../../public/images/nature3.jpg',
    fit: 'cover'
  },
  {
    name: '选项4',
    value: '选项4',
    url: '../../public/images/nature4.jpg',
    fit: 'cover'
  },
  {
    name: '选项5',
    value: '选项5',
    url: '../../public/images/nature5.jpg',
    fit: 'cover'
  }
])
const onSwiper = (swiper: any) => {
  console.log(swiper)
}

const onSlideChange = () => {
  console.log('slide change')
}


</script>

<style scoped lang="scss">
.swiper-container {
  padding-top: 65px;
  border-radius: 20px;
  .show_item {
    border-radius: 50px;
    display: flex;
    padding: 10px;
  }
}
.el-main {
  overflow: hidden;
  .home_page_content {
    min-width: 600px;
    height: 800px;
    background-color: white;
    border-radius: 5px;
  }
}
</style>
