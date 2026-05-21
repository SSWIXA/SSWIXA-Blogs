<template>
  <div class="live_2d_container">
    <div class="live_2d_container_cvs">
      <canvas ref="cvsNode" class="live2d" id="live2d" width="300" height="600"></canvas>
    </div>
    <!-- 添加模型切换按钮 -->
<!--     <div class="model-switcher">
      <button @click="switchModel('previous')">←</button>
      <button @click="switchModel('next')">→</button>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import LAppDefine from '@/js/LAppDefine.js'
import loadlive2d from '@/js/live2d.js'

import { onMounted, ref, onUnmounted } from 'vue'

let cvsNode = ref<HTMLElement | null>(null)
let live2DInstance: any = null
let currentModelIndex = 0

// 定义可用的模型列表
let availableModels: any[] = []

// 监听暗黑模式变化的函数
const handleDarkModeChange = (mutationsList: MutationRecord[]) => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
      const body = document.body;
      const isDarkMode = body.classList.contains('dark-mode');
      
      // 根据暗黑模式状态选择模型
      let modelPath = isDarkMode 
        ? 'model/tororo/tororo.model.json' 
        : 'model/hijiki/hijiki.model.json';
      
      // 加载对应模型
      if (live2DInstance) {
        live2DInstance.loadFuc(live2DInstance.CANVAS_ID, modelPath);
      }
    }
  }
};

let observer: MutationObserver | null = null;

onMounted(() => {
  live2DInstance = new LAppDefine(cvsNode, false, loadlive2d)
  // 将MODELS数组扁平化，获取所有模型的第一个皮肤
  availableModels = live2DInstance.MODELS.map(
    (modelGroup: any) => modelGroup[modelGroup.length - 1]
  )
  
  // 初始化时根据当前模式加载对应模型
  const isDarkMode = document.body.classList.contains('dark-mode');
  let initialModel = isDarkMode 
    ? 'model/tororo/tororo.model.json' 
    : 'model/hijiki/hijiki.model.json';
  
  live2DInstance.loadFuc(live2DInstance.CANVAS_ID, initialModel);
  
  // 创建一个观察器实例并传入回调函数
  observer = new MutationObserver(handleDarkModeChange);
  // 开始观察body元素的属性变化
  observer.observe(document.body, { attributes: true });
})

onUnmounted(() => {
  // 组件销毁时断开观察器
  if (observer) {
    observer.disconnect();
  }
})

// 切换模型函数
const switchModel = (direction: string) => {
  if (!live2DInstance) return
  if (direction === 'next') {
    currentModelIndex = (currentModelIndex + 1) % availableModels.length
  } else if (direction === 'previous') {
    currentModelIndex = (currentModelIndex - 1 + availableModels.length) % availableModels.length
  }
  // 重新加载模型
  live2DInstance.loadFuc(live2DInstance.CANVAS_ID, availableModels[currentModelIndex])
}
</script>

<style scoped lang="scss">
.live_2d_container {
  z-index: 9999;
  position: fixed;
  left: 20px;
  bottom: 0;
  transform: scale(0.4, 0.4);
  transform-origin: left bottom;
  
  // 响应式调整，在小屏幕上缩小模型
  @media screen and (max-width: 1200px) {
    transform: scale(0.35, 0.35);
  }
  
  @media screen and (max-width: 992px) {
    transform: scale(0.3, 0.3);
  }
  
  @media screen and (max-width: 768px) {
    left: 10px;
    transform: scale(0.25, 0.25);
  }

  // 在有侧边栏的页面增加左边距，避免重叠
  :global(.home_page_content) + & {
    left: max(20px, calc(50vw - 550px + 20px)); // 居中宽度的一半加上左侧间距
    
    @media screen and (max-width: 1100px) {
      left: 20px;
    }
    
    @media screen and (max-width: 850px) {
      left: 10px;
    }
  }

  // 在文章详情页也适配位置
  :global(.article-detail-page) + & {
    left: max(20px, calc(50vw - 550px + 20px));
    
    @media screen and (max-width: 1100px) {
      left: 20px;
    }
    
    @media screen and (max-width: 850px) {
      left: 10px;
    }
  }

  .model-switcher {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    button {
      margin: 0 5px;
      padding: 5px 10px;
      background: rgba(0, 0, 0, 0.5);
      color: white;
      border: 1px solid #fff;
      border-radius: 4px;
      cursor: pointer;
      width: 100px;
      height: 50px;
      &:hover {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
