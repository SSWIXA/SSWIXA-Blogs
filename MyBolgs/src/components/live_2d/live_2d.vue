<template>
  <div class="live_2d_container">
    <div class="live_2d_container_cvs"></div>
    <div class="selectAnimation btn-group" role="group" aria-label="Animation">
      <el-scrollbar style="height: 100px; width: 100px">
        <el-button
          class="ani_btn"
          v-for="(items, k) in modelBtn"
          type="primary"
          :key="k"
          plain
          @click="playEffectAni(String(k))"
          >{{ k }}</el-button
        >
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import charData from '@/js/charData.js'
import { onMounted, ref, watch } from 'vue'

interface Viewer {
  init(modelData: object, path: string): void
  model: any
  app: object
  canvas: any
  isClick: boolean
  l2d: object
}

let modelData = ref<Viewer | any>()
let modelBtn = ref<object | any>({})
let modelPool = ref<object[] | any>([])
let charDataRef = ref<object[] | any>(charData)

onMounted(() => {
  let viewer: Viewer = new Viewer('public/model', '.live_2d_container_cvs')
  for (const key in charDataRef.value) {
    if (Object.prototype.hasOwnProperty.call(charDataRef.value, key)) {
      let el = charDataRef.value[key]
      modelPool.value.push([key, el])
    }
  }
  viewer.init(modelData, modelPool.value[randInt(0, modelPool.value.length - 1)][1])
})
function modelBtnAni(val: Viewer) {
  // 动画按钮
  val.model?.motions.forEach((e: any, k: string) => {
    modelBtn.value[k] = e
  })
}
//播放对应动画
function playEffectAni(effect: string) {
  modelData.value?.startAnimation(effect, 'base')
}
function randInt(min: number, max: number) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

watch(
  () => modelData.value,
  (newVal, oldVal) => {
    if (newVal) {
      console.log(newVal)
      // modelBtnAni(newVal)
    }
  }
)

</script>

<style scoped lang="scss">
.live_2d_container {
  z-index: 10;
  position: fixed;
  left: 0;
  bottom: 0;
  pointer-events: none;
  .live_2d_container_cvs {
    opacity: 0.15;
  }
  .selectAnimation {
    display: flex;
    flex-wrap: nowrap;
    position: absolute;
    top: 0;
    left: 0;
    .ani_btn {
      margin: 0;
      font-size: 10px;
    }
  }
}
</style>
