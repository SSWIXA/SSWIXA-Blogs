<template>
  <div class="dark-mode-toggle" @click="toggleDarkMode">
    <el-icon v-if="isDarkMode" class="dark-icon">
      <Sunny />
    </el-icon>
    <el-icon v-else class="light-icon">
      <Moon />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'

const isDarkMode = ref(false)

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.body.classList.add('dark-mode')
    localStorage.setItem('darkMode', 'true')
  } else {
    document.body.classList.remove('dark-mode')
    localStorage.setItem('darkMode', 'false')
  }
}

onMounted(() => {
  const savedMode = localStorage.getItem('darkMode')
  if (savedMode === 'true') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }
})
</script>

<style scoped lang="scss">
.dark-mode-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.05);
  margin: 0 5px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    transform: scale(1.1);
  }
  
  .dark-icon, .light-icon {
    font-size: 20px;
    color: #333;
  }
}

.dark-mode {
  .dark-mode-toggle {
    background-color: rgba(255, 255, 255, 0.1);
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    
    .dark-icon, .light-icon {
      color: #fff;
    }
  }
}
</style>