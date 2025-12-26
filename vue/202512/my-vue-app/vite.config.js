import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // ESLint插件，支持保存自动格式化
    eslint({
      lintOnStart: false,
      fix: false
    }),
    // 自动导入elementPlus组件库
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //这个resolve是添加的别名
  resolve: {
    alias: [
      {
        find: "@",
        replacement: "/src"
      }
    ]
  },
  server: {
    host: 'localhost',
    port: 8080,
  }
});
