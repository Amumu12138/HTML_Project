import { defineConfig } from 'vite'

export default defineConfig({
    plugins: [],
    server: {
        host: 'localhost',
        port: 8080,
        proxy: {
            // 本地开发都会存在跨域问题,导致使用代理
            '/api': {
                target: 'https://cnodejs.org/api',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    build: {
        // 打包后输出文件目录
        outDir: 'dist',
        // 超过大小的警告
        chunkSizeWarningLimit: 1024,
        // 一般情况下都不能直接将sourcemap部署到生产环境,因为会暴露源码
        // 如果需要定位线上报错问题,需要怎么做?
        // 实战: 企业级性能与一场监控平台,会托管sourcemap文件,通过sourcemap文件定位到源码
        sourcemap: true
    }
})
