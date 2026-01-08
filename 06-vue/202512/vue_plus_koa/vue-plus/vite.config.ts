import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from 'vite-plugin-top-level-await'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    topLevelAwait({
      promiseExportName: '',
      promiseImportName: i => `${i}`
    })
  ],
  build: {
    // target: ['edge90', 'chrome90', 'firefox90', 'safari15']
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          // 将第三方依赖包分包加载到vender文件
          if (id.includes('node_modules') && (id.endsWith('.js') || id.endsWith('ts')))
            return 'vender'
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        // target: 'https://mock.apipark.cn/m1/4068509-0-default/api/',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
        // http://localhost:8082/api ->  http://localhost:3000/api
      }
    }
  },
})
