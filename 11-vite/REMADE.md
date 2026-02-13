# Vite5 基础进阶与原理深度剖析,bundless构建细节

### 详细说说Vite 5工程化配置细节,常见配置和优化手段
1、vite bundless - 少打包、浏览器esm支持
2、模块化规范: commonJs、amd、cmd、esm、umd
3、浏览器ESM规范
4、本地生产构建提速,本地 esbuild、生产rollup,可能会有生产与本地构建产物差异的问题 (VoidZero -> rolldown(oxc))
5、产物构建优化,rollup优化

### Vite5 基础使用
脚手架
```
<!-- 创建vite项目命令 -->
pnpm create vite
```

