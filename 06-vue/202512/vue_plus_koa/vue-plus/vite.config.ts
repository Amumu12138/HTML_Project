import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'url'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
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
        // target: 'http://localhost:3000',
        target: 'https://mock.apipark.cn/m1/4068509-0-default/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
        // http://localhost:8082/api  http://localhost:3000
      }
    }
  },
})
