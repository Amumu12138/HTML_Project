import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.join(__dirname, 'src')
    }
  },
  server: {
    host: 'localhost',
    port: 8080,
    proxy: {
      "/api": {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
        // http://localhost:8082/api  http://localhost:3000
      }
    }
  },
})
