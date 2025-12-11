<template>
  <div class="Sakura">
    <canvas id="canvas_sakura" ref="canvas_sakura" style="zindex: 10"></canvas>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import MONKEY from '@/components/Sakura/monkey.js'

const sakuraImages1 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_01/thing_01_*.png`, { eager: true })
).map(([, module]) => module.default)
const sakuraImages2 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_02/thing_02_*.png`, { eager: true })
).map(([, module]) => module.default)
const sakuraImages3 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_03/thing_03_*.png`, { eager: true })
).map(([, module]) => module.default)
const sakuraImages4 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_04/thing_04_*.png`, { eager: true })
).map(([, module]) => module.default)
const sakuraImages5 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_05/thing_05_*.png`, { eager: true })
).map(([, module]) => module.default)
const sakuraImages6 = Object.entries(
  import.meta.glob(`@/assets/program13/thing_06/thing_06_*.png`, { eager: true })
).map(([, module]) => module.default)

let canvas_sakura = ref(null)
class Sakura {
  constructor(cvs, nums = 50, w = 1024, h = 768) {
    this.flowerfps = 1
    this.options = { num: nums }
    this.lastTimer = Date.now()
    this.render = new MONKEY.Renderer({ canvas: cvs, ftp: 40 })
    this.gamelayer = new MONKEY.Scene({ name: 'gameScene' })
    this.render.begin()
    //
    this.init()
  }

  init() {
    this.render.add(this.gamelayer)
    this.effect_layer = new MONKEY.Animal({ name: 'effect_layer' })
    this.effect_layer.scale.set(0.5, 0.5)
    this.gamelayer.add(this.effect_layer)
    this.initSakura(100)
    //
    this.effect_layer.addMotionFunc('fly', () => {
      if (Date.now() - this.lastTimer > this.flowerfps) {
        this.lastTimer = Date.now()
        this.effect_layer.children.forEach((e) => {
          this.updateFlower(e)
        })
      }
    })
  }

  initSakura(num) {
    for (let i = 0; i < num; i++) {
      let flowerP = new MONKEY.Animal({ name: 'flowerMc_' + i })
      let flowerPool = [
        { start: 1, end: 9, name: 1, arr: sakuraImages1, cycle: 250 },
        { start: 1, end: 9, name: 2, arr: sakuraImages2, cycle: 250 },
        { start: 1, end: 8, name: 3, arr: sakuraImages3, cycle: 250 },
        { start: 1, end: 14, name: 4, arr: sakuraImages4, cycle: 100 },
        { start: 1, end: 14, name: 5, arr: sakuraImages5, cycle: 100 },
        { start: 1, end: 20, name: 6, arr: sakuraImages6, cycle: 100 }
      ]
      let flowerData = flowerPool[MONKEY.Math.randInt(0, flowerPool.length - 1)]
      flowerP.flower = new MONKEY.IntervalAnimation({
        name: flowerData.name,
        frameArray: this.loadAniImg(flowerData)
      })
      flowerP.flower.intervalStatus = true
      flowerP.flower.cycle = MONKEY.Math.randInt(flowerData.cycle, flowerData.cycle + 30)
      flowerP.flower.gotoAndPlay(MONKEY.Math.randInt(0, flowerData.end - 1))
      this.effect_layer.add(flowerP)
      flowerP.add(flowerP.flower)
      //花瓣的下一幀狀態
      flowerP.fn = {
        x: this.getRandom('fnx'),
        y: this.getRandom('fny'),
        r: this.getRandom('fnr')
      }
      //花瓣的初始狀態
      flowerP.position.set(this.getRandom('x'), this.getRandom('y'))
      flowerP.flower.rotate = this.getRandom('r')
      flowerP.scale.x = flowerP.scale.y = this.getRandom('s')
      flowerP.alpha = this.getRandom('a')
    }
  }

  loadAniImg(data) {
    let arr = []
    for (var i = 0; i < data.arr.length; i++) {
      var img = new Image()
      img.src = data.arr[i]
      arr.push(img)
    }
    return arr
  }

  updateFlower(mc) {
    //更新轉態
    mc.flower.rotate = mc.fn.r(mc.flower.rotate)
    mc.position.x = mc.fn.x(mc.position.x, mc.position.y)
    mc.position.y = mc.fn.y(mc.position.y, mc.position.y)
    //越界處理
    if (
      mc.position.x > window.innerWidth * 2 + 130 ||
      mc.position.x < -130 ||
      mc.position.y > window.innerHeight * 2 ||
      mc.position.y < -130
    ) {
      mc.flower.rotate = this.getRandom('fnr')
      if (Math.random() > 0.4) {
        mc.position.x = this.getRandom('x')
        mc.position.y = -130
        mc.scale.x = mc.scale.y = this.getRandom('s')
        mc.flower.rotate = this.getRandom('r')
      } else {
        mc.position.x = window.innerWidth * 2
        mc.position.y = this.getRandom('y')
        mc.scale.x = mc.scale.y = this.getRandom('s')
        mc.flower.rotate = this.getRandom('r')
      }
    }
  }

  getRandom(config) {
    var ret, random
    //
    switch (config) {
      //初始化的一些状态 x，y，s，r
      case 'x':
        ret = MONKEY.Math.randInt(2, 12) * 0.1 * window.innerWidth * 2
        break
      case 'a':
        ret = MONKEY.Math.randInt(8, 9) * 0.1
        break
      case 'y':
        ret = Math.random() * window.innerHeight * 2
        break
      case 's':
        ret = Math.random() * 0.4
        break
      case 'r':
        ret = Math.random() * 6
        break
      case 'fnx':
        random = -0.5 + Math.random() * this.flowerfps
        ret = function (x, y) {
          return x + 0.5 * random - 1.7
        }
        break
      case 'fny':
        random = 1.5 + Math.random() * 0.7
        ret = function (x, y) {
          return y + random
        }
        break
      case 'fnr':
        random = Math.random() * 2
        ret = function (r) {
          return r + random
        }
        break
    }
    return ret
  }
}

onMounted(() => {
  canvas_sakura.value.width = window.innerWidth
  canvas_sakura.value.height = window.innerHeight
  canvas_sakura.value.style.width = window.innerWidth + 'px'
  canvas_sakura.value.style.height = window.innerHeight + 'px'
  new Sakura(canvas_sakura.value, 50, 1024, 768)
})
</script>

<style scoped>
#canvas_sakura {
  pointer-events: none;
  position: fixed;
  top: 0;
  left: 0;
}

.Sakura {
  box-sizing: border-box;
}
</style>
