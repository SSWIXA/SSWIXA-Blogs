import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base:'./',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },test: {  
    // 启用或禁用测试覆盖率报告  
    coverage: {  
      enabled: true,  
    },  
    // 其他的测试配置...  
  }, 
})
