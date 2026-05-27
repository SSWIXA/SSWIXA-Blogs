<template>
  <div class="blur_mask" :class="{ 'dark-mode': isDarkMode }">
    <!-- 添加到Admin页面的链接 -->
    <div class="admin-link" @click="$router.push('/admin')">
      <el-button type="primary" size="small" round>博客管理</el-button>
    </div>

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
// 自动导入 src/images/ 下所有 th 前缀的背景图，只需往里扔图片即可
const bgModules = import.meta.glob('$/images/th*.{jpg,jpeg,png,webp}', { eager: true })
const bgPics: string[] = Object.values(bgModules).map((m: any) => m.default)

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
    title: '鲁迅',
    Subtitle: '《热风》',
    txt: '愿中国青年都摆脱冷气，只是向上走，不必听自暴自弃者流的话。能做事的做事，能发声的发声。有一分热，发一分光。'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '尼采',
    Subtitle: '《查拉图斯特拉如是说》',
    txt: '谁将声震人间，必长久深自缄默；谁将点燃闪电，必长久如云漂泊。'
  },
  {
    url: '../../public/images/nature3.jpg',
    fit: 'cover',
    title: '王阳明',
    Subtitle: '《传习录》',
    txt: '破山中贼易，破心中贼难。'
  },
  {
    url: '../../public/images/nature4.jpg',
    fit: 'cover',
    title: '维克多·雨果',
    Subtitle: '《悲惨世界》',
    txt: '世界上最宽阔的是海洋，比海洋更宽阔的是天空，比天空更宽阔的是人的胸怀。'
  },
  {
    url: '../../public/images/nature5.jpg',
    fit: 'cover',
    title: '庄子',
    Subtitle: '《逍遥游》',
    txt: '井蛙不可以语于海者，拘于虚也；夏虫不可以语于冰者，笃于时也。'
  },
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '列夫·托尔斯泰',
    Subtitle: '《战争与和平》',
    txt: '每个人都会有缺陷，就像被上帝咬过的苹果。有的人缺陷比较大，正是因为上帝特别喜欢他的芬芳。'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '泰戈尔',
    Subtitle: '《飞鸟集》',
    txt: '世界以痛吻我，要我报之以歌。'
  },
  {
    url: '../../public/images/nature3.jpg',
    fit: 'cover',
    title: '罗曼·罗兰',
    Subtitle: '《约翰·克利斯朵夫》',
    txt: '世界上只有一种真正的英雄主义，那就是在认清生活的真相后，依然热爱生活。'
  },
  {
    url: '../../public/images/nature4.jpg',
    fit: 'cover',
    title: '村上春树',
    Subtitle: '《挪威的森林》',
    txt: '不必太纠结于当下，也不必太忧虑未来，当你经历过一些事情的时候，眼前的风景已经和从前不一样了。'
  },
  {
    url: '../../public/images/nature5.jpg',
    fit: 'cover',
    title: '苏轼',
    Subtitle: '《晁错论》',
    txt: '古之立大事者，不惟有超世之才，亦必有坚忍不拔之志。'
  },
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '阿尔贝·加缪',
    Subtitle: '《西西弗神话》',
    txt: '重要的不是治愈，而是带着病痛活下去。'
  },
  {
    url: '../../public/images/nature2.jpg',
    fit: 'cover',
    title: '老子',
    Subtitle: '《道德经》',
    txt: '上善若水，水善利万物而不争，处众人之所恶，故几于道。'
  },
  {
    url: '../../public/images/nature3.jpg',
    fit: 'cover',
    title: '爱因斯坦',
    Subtitle: '',
    txt: '一个人的价值，应当看他贡献什么，而不应当看他取得什么。'
  },
  {
    url: '../../public/images/nature4.jpg',
    fit: 'cover',
    title: '孔子',
    Subtitle: '《论语》',
    txt: '知者不惑，仁者不忧，勇者不惧。'
  },
  {
    url: '../../public/images/nature5.jpg',
    fit: 'cover',
    title: '赫尔曼·黑塞',
    Subtitle: '《德米安》',
    txt: '每个人的生命都是通向自我的征途，是对一条道路的尝试，是对一条小径的悄然召唤。'
  },
  {
    url: '../../public/images/nature1.jpg',
    fit: 'cover',
    title: '曾国藩',
    Subtitle: '',
    txt: '天下古今之庸人，皆以一惰字致败；天下古今之才人，皆以一傲字致败。'
  }
])

let curBackPic: any = ref()
onBeforeMount(() => {
  curBackPic.value = bgPics[Math.floor(Math.random() * bgPics.length)]
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
@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 0 8px rgba(102, 126, 234, 0.3);
  }
  50% {
    box-shadow: 0 0 20px rgba(245, 87, 108, 0.3);
  }
}

@keyframes arrowBounce {
  0%,
  100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

@keyframes titleShine {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

// 管理按钮
.admin-link {
  position: fixed;
  top: 70px;
  right: 20px;
  z-index: 9999;

  .el-button {
    background: linear-gradient(135deg, #667eea, #f5576c);
    border: none;
    animation: glowPulse 3s ease-in-out infinite;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
    }
  }
}

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
        background: rgba(255, 255, 255, 0.5);
        width: 10px;
        height: 10px;
        transition: all 0.3s;
        &:hover {
          background: rgba(255, 255, 255, 0.8);
        }
      }
      ::v-deep .swiper-pagination-bullet-active {
        background: linear-gradient(135deg, #667eea, #f5576c);
        width: 12px;
        height: 12px;
        box-shadow: 0 0 8px rgba(102, 126, 234, 0.5);
      }

      .parallax-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 130%;
        height: 100%;
        background-size: cover;
        background-position: center;
        transition: background-image 0.8s ease;
      }

      .swiper-slide {
        font-size: 18px;
        color: #fff;
        font-family: 'Zhi Mang Xing', 'Ma Shan Zheng', cursive, serif;
        box-sizing: border-box;
        user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        position: relative;

        &::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.2) 0%,
            transparent 40%,
            transparent 60%,
            rgba(0, 0, 0, 0.3) 100%
          );
          pointer-events: none;
        }

        .content {
          position: relative;
          z-index: 1;
          margin: 0 auto;

          .title {
            text-align: center;
            font-size: 50px;
            font-weight: 300;
            background: linear-gradient(90deg, #fff, #e0e7ff, #fff, #fce7f3);
            background-size: 200% auto;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: titleShine 4s linear infinite;
          }
          .subtitle {
            text-align: center;
            font-size: 30px;
            color: rgba(255, 255, 255, 0.85);
          }
          .text {
            text-align: center;
            font-size: 22px;
            max-width: 400px;
            line-height: 1.5;
            color: rgba(255, 255, 255, 0.8);
            padding-top: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.2);
          }
        }
      }
    }
    .arrow-down {
      position: absolute;
      bottom: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
      cursor: pointer;
      animation: arrowBounce 2s ease-in-out infinite;

      svg {
        fill: rgba(255, 255, 255, 0.8);
        filter: drop-shadow(0 0 8px rgba(102, 126, 234, 0.5));
        transition: filter 0.3s;
      }
      &:hover svg {
        fill: #fff;
        filter: drop-shadow(0 0 16px rgba(245, 87, 108, 0.7));
      }
    }
  }
}
</style>

<style scoped lang="scss">
// 暗黑模式
.dark-mode .blur_mask {
  .swiper-slide {
    color: #e0e0e0 !important;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.8) !important;

    &::after {
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.5) 0%,
        transparent 40%,
        transparent 60%,
        rgba(0, 0, 0, 0.5) 100%
      );
    }
  }
}
</style>
