import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$': fileURLToPath(new URL('./public', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // 说明：原先这里用 manualChunks 把 monaco-editor 提成独立 chunk，
        // 但数组写法会让它被当成入口依赖，导致 index.html 里注入 modulepreload，
        // 首屏无条件下载约 2.7MB 的编辑器。现在 Monaco 已改为按需 dynamic import，
        // 交给 Rollup 自动分包即可，无需手动指定。
        manualChunks: undefined
      }
    }
  },
  worker: {
    format: 'es',
    plugins: () => [vue()]
  },
  optimizeDeps: {
    include: [
      'monaco-editor/esm/vs/editor/editor.api',
      'monaco-editor/esm/vs/editor/editor.worker',
      'monaco-editor/esm/vs/language/typescript/ts.worker',
      'monaco-editor/esm/vs/language/json/json.worker',
      'monaco-editor/esm/vs/language/css/css.worker',
      'monaco-editor/esm/vs/language/html/html.worker'
    ]
  }
})