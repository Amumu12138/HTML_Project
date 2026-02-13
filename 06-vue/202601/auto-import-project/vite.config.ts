import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteUnpluginAutoImport from "unplugin-auto-import/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 模块自动导入
    ViteUnpluginAutoImport({
      imports: ['vue', 'vue-router'],
      dts: './src/auto-import.d.ts'
    })],
})
