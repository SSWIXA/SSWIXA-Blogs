<template>
  <div class="blur_mask" :class="{ 'dark-mode': isDarkMode }">
    <div class="swiper-container">
      <swiper
        :style="{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
        }"
        :autoplay="{
          delay: 3000,
          disableOnInteraction: false
        }"
        :pagination="{
          clickable: true
        }"
        :speed="800"
        :mousewheel="true"
        :parallax="true"
        :navigation="true"
        :modules="[Parallax, Autoplay, Pagination]"
        class="mySwiper"
      >
        <div
          slot="container-start"
          class="parallax-bg"
          :style="{
            'background-image': `url(${curBackPic})`
          }"
          data-swiper-parallax="-23%"
        ></div>
        <swiper-slide v-for="item in optionSwiper" :key="item.title" class="swiper_slide">
          <div class="content">
            <div class="title" data-swiper-parallax="0">{{ item.title }}</div>
            <div v-if="item.Subtitle" class="subtitle" data-swiper-parallax="0">
              {{ item.Subtitle }}
            </div>
            <div class="text" data-swiper-parallax="0">
              <p>
                {{ item.txt }}
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="arrow-down" @click="gotoMain" :style="OpacityStr">
        <svg
          t="1710742076257"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="897"
          width="100"
          height="100"
        >
          <path
            d="M532.886439 534.015436l345.472988-270.394708c3.951488-3.38699 6.209482-7.902977 6.209481-13.547961V168.220507c0-7.338479-7.902977-11.289967-13.54796-6.77398L512 443.131202 152.979052 162.011025c-5.644983-4.515987-13.54796-0.564498-13.54796 6.773981v81.85226c0 5.080485 2.257993 10.16097 6.209481 13.54796L491.113561 534.015436c12.418964 9.596472 29.353914 9.596472 41.772878 0z m0 0"
            p-id="898"
          ></path>
          <path
            d="M532.886439 855.779493l345.472988-270.394708c3.951488-3.38699 6.209482-7.902977 6.209481-13.54796V489.984564c0-7.338479-7.902977-11.289967-13.54796-6.77398l-359.020948 281.120177-359.020948-280.555678c-5.644983-4.515987-13.54796-0.564498-13.54796 6.77398v81.85226c0 5.080485 2.257993 10.16097 6.209481 13.54796L491.113561 855.779493c12.418964 10.16097 29.353914 10.16097 41.772878 0z m0 0"
            p-id="899"
          ></path>
        </svg>
      </div>
    </div>
    <el-main style="overflow: hidden">
      <div class="home_page_content">
        <el-main class="main_left">
          <HomeLeft></HomeLeft>
        </el-main>
        <aside class="main_right">
          <HomeRight></HomeRight>
        </aside>
      </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, nextTick, watch, onBeforeMount } from 'vue'
import { Autoplay, Parallax, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import HomeLeft from '@/components/home_left_part.vue'
import HomeRight from '@/components/home_right_part.vue'
import th0 from '$/images/th0.jpg'
import th1 from '$/images/th1.jpg'
import th2 from '$/images/th2.jpg'
import th3 from '$/images/th3.jpg'


// 添加暗黑模式状态
const isDarkMode = ref(false)

interface Slide {
  url: string
  fit: string
  title: string
  Subtitle: string
  txt: string
}

const optionSwiper: Slide[] = reactive([
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '维克多·雨果',
    Subtitle: '《悲惨世界》',
    txt: '人类的真正区别是这样的：光明中人和黑暗中人。'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '列夫·托尔斯泰',
    Subtitle: '《三个问题》',
    txt: '记住吧：只有一个时间是重要的，那就是现在！它所以重要，就是因为它是我们唯一有所作为的时间。'
  },
  {
    url: '../../public/images/nature3.jpg',
    fit: 'cover',
    title: '马克·吐温',
    Subtitle: '',
    txt: "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do."
  },
  {
    url: '../../public/images/nature4.jpg',
    fit: 'cover',
    title: '阿尔伯特·施韦策',
    Subtitle: '',
    txt: 'Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.'
  },
  {
    url: '../../public/images/nature5.jpg',
    fit: 'cover',
    title: '乔布斯',
    Subtitle: '',
    txt: 'Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do.'
  },
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '阿尔伯特·爱因斯坦',
    Subtitle: '',
    txt: 'Try not to become a man of success, but rather try to become a man of value.'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '温斯顿·丘吉尔',
    Subtitle: '',
    txt: 'Success is not final, failure is not fatal: It is the courage to continue that counts.'
  },
  {
    url: '../../public/images/nature3.jpg',
    fit: 'cover',
    title: '纳尔逊·曼德拉',
    Subtitle: '',
    txt: 'There is no passion to be found playing small - in settling for a life that is less than the one you are capable of living.'
  },
  {
    url: '../../public/images/nature4.jpg',
    fit: 'cover',
    title: '玛雅·安吉洛',
    Subtitle: '',
    txt: 'Nothing will work unless you do.'
  },
  {
    url: '../../public/images/nature5.jpg',
    fit: 'cover',
    title: '孔子',
    Subtitle: '',
    txt: '学而时习之，不亦说乎？'
  },
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '老子',
    Subtitle: '',
    txt: '千里之行，始于足下。'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '苏轼',
    Subtitle: '',
    txt: '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。'
  }
])

let curBackPic: any = ref()
onBeforeMount(() => {
  let picUrl = [th1, th2, th3, th0]
  curBackPic.value = picUrl[Math.floor(Math.random() * picUrl.length)]
})

onMounted(() => {
  nextTick(() => {
    controlSizeSwiper()
    animateOpacity()
  })
  window.addEventListener('resize', () => {
    controlSizeSwiper()
  })
})

//动态调整轮播图大小
const controlSizeSwiper = () => {
  let mySwiper: any = ref<HTMLElement | any>(null)
  let innerHeight: any = ref<number>()
  innerHeight.value = window.innerHeight
  mySwiper = document.getElementsByClassName('mySwiper')[0]
  if (mySwiper) {
    mySwiper.style.height = innerHeight.value + 'px'
  }
}

//scrolltop到主要内容区域
const gotoMain = () => {
  const mySwiper: any = ref<HTMLElement | any>(document.getElementsByClassName('mySwiper')[0])
  window.scrollTo({
    top: mySwiper.value.offsetHeight - 60,
    behavior: 'smooth'
  })
}

//锚点tips
let OpacityStr: any = ref('opacity: 1;')
let opacity: any = ref(1)
let speed = 0.01
function animateOpacity() {
  if (opacity.value >= 0.7) {
    speed = -0.01
  } else if (opacity.value <= 0.2) {
    speed = 0.01
  }
  opacity.value += speed
  requestAnimationFrame(animateOpacity) // 继续下一帧动画
}

//监听锚点透明度变化
watch(opacity, (oldval: any, newval: any) => {
  OpacityStr.value = `opacity:${newval}`
})
</script>

<style scoped lang="scss">
.blur_mask {
  backdrop-filter: blur(150px);

  .home_page_content {
    max-width: 1100px;
    border-radius: 5px;
    margin: 0 auto;
    display: flex;
    .main_left {
      flex: 1;
      min-width: 600px;
    }
    .main_right {
      width: 350px;
      padding: 20px 10px 10px;
      @media screen and (max-width: 850px) {
        display: none;
      }
    }
  }

  .swiper-container {
    position: relative;
    .mySwiper {
      width: 100%;
      background: transparent;
      ::v-deep .swiper-pagination-bullet {
        float: right;
        background: rgba(135, 206, 250, 0.7);
      }
      
      ::v-deep .swiper-pagination-bullet-active {
        background: rgba(135, 206, 250, 1);
      }
      
      .parallax-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 130%;
        height: 100%;
        -webkit-background-size: cover;
        background-size: cover;
        background-position: center;
      }
      .swiper-slide {
        font-size: 18px;
        color: #efefef;
        font-family: cursive;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        .content {
          margin: 0 auto;
          .title {
            text-align: center;
            font-size: 50px;
            font-weight: 300;
          }
          .subtitle {
            text-align: center;
            font-size: 30px;
          }
          .text {
            text-align: center;
            font-size: 24px;
            max-width: 400px;
            line-height: 1.3;
          }
        }
      }
    }
    .arrow-down {
      position: absolute;
      bottom: 0;
      left: 50%;
      margin-left: -50px;
      opacity: 0.7;
      display: flex;
      justify-content: center;
      z-index: 10;
      cursor: pointer;
      
      svg {
        fill: rgba(135, 206, 250, 0.8);
        filter: drop-shadow(0px 0px 5px rgba(135, 206, 250, 0.5));
      }
    }
  }
}
</style>

<style scoped lang="scss">
// 暗黑模式样式
.dark-mode {
  .blur_mask {
    backdrop-filter: blur(150px);
    
    .swiper-slide {
      color: #e0e0e0 !important;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8) !important;
    }
    
    .home_page_content {
      .main_left {
        // 可以在这里添加暗黑模式下左侧内容的样式
      }
      
      .main_right {
        // 可以在这里添加暗黑模式下右侧内容的样式
      }
    }
  }
}
</style>
