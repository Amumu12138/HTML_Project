# HTMLProject

前端学习、代码练习与项目实践仓库，覆盖 HTML、CSS、JavaScript、TypeScript、Vue、React、WebGL、Three.js、Vite 和 Node.js 等内容。

仓库中的代码主要用于：

- 记录学习过程和实验结果
- 保存可独立查看的基础示例
- 演示前端工程化与服务端开发
- 整理面试题、复习资料和项目实践

## 目录导航

| 目录 | 内容 |
| --- | --- |
| [01-WebStudy-master](./01-WebStudy-master/) | 综合课程归档，包含基础布局、JavaScript、Vue、React、Node.js 等案例 |
| [02-html](./02-html/) | HTML 语义化、页面结构和基础标签 |
| [03-css](./03-css/) | CSS 选择器、布局、动画和页面样式 |
| [04-javascript](./04-javascript/) | JavaScript、ES6、DOM、算法和设计模式 |
| [05-typeScript](./05-typeScript/) | TypeScript 语法、类型和模块示例 |
| [06-vue](./06-vue/) | Vue 学习示例和项目实践 |
| [07-react](./07-react/) | React 学习示例和项目实践 |
| [08-webgl](./08-webgl/) | WebGL、着色器和图形渲染示例 |
| [09-threeJs](./09-threeJs/) | Three.js 场景、模型和 3D 交互示例 |
| [10_前端工程化](./10_前端工程化/) | 前端工程化、构建和开发流程相关内容 |
| [11-vite](./11-vite/) | Vite 项目和现代前端构建工具实践 |
| [12-nodejs](./12-nodejs/) | Node.js、HTTP、文件操作、Express 和中间件示例 |
| [99-泡椒思志项目](./99-泡椒思志项目/) | SDK、H5 引擎和业务项目实践 |
| [100_前端面试](./100_前端面试/) | 面试题、复习资料和简历相关内容 |

## 项目结构

```text
HTMLProject/
├── 01-WebStudy-master/      # 综合课程归档
├── 02-html/                 # HTML
├── 03-css/                  # CSS
├── 04-javascript/           # JavaScript
├── 05-typeScript/           # TypeScript
├── 06-vue/                  # Vue
├── 07-react/                # React
├── 08-webgl/                # WebGL
├── 09-threeJs/              # Three.js
├── 10_前端工程化/           # 前端工程化
├── 11-vite/                 # Vite
├── 12-nodejs/               # Node.js
├── 99-泡椒思志项目/         # 项目实践
├── 100_前端面试/            # 面试资料
├── .vscode/                 # VS Code 配置
├── .gitignore
└── README.md
```

## 快速开始

本仓库不是单一应用，根目录没有统一的安装和启动命令。请进入具体项目目录后，再根据该目录中的 `package.json` 安装依赖。

### Vite 项目

```bash
cd 11-vite/vite-project-20260131
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

### Node.js / Express 示例

```bash
cd 12-nodejs/202611
npm install
node index.js
```

部分示例也可以直接运行，例如：

```bash
node router.js
npm run recordMiddleware
```

启动后请根据终端输出访问对应的本地地址。不同示例可能使用不同端口，运行前请查看源文件中的 `listen` 配置。

### 静态 HTML 示例

不依赖构建工具的 HTML、CSS 和 JavaScript 示例可以直接用浏览器打开。涉及模块加载、Fetch、ES Module 或跨域请求的示例，建议使用本地静态服务器运行。

例如使用 VS Code 的 Live Server，或在示例目录执行：

```bash
python3 -m http.server 8080
```

## 推荐学习路线

1. **HTML + CSS**：先掌握页面结构、语义化、布局和响应式基础。
2. **JavaScript**：学习语法、DOM、异步编程、模块化和常见设计模式。
3. **TypeScript**：在 JavaScript 基础上学习类型系统和工程化开发。
4. **Vue / React**：选择一个框架深入组件、状态管理和路由，再对比另一个框架。
5. **工程化**：学习 Vite、依赖管理、构建、调试和发布流程。
6. **Node.js**：了解 HTTP、文件系统、Express、中间件和接口开发。
7. **WebGL / Three.js**：在具备 JavaScript 基础后学习图形渲染和 3D 交互。
8. **面试与项目**：结合 [100_前端面试](./100_前端面试/) 和 [99-泡椒思志项目](./99-泡椒思志项目/) 进行复习和实践。

## 使用约定

- 每个子目录可能是独立示例或独立项目，优先阅读该目录内的说明文件和入口文件。
- 依赖安装应在包含 `package.json` 的目录执行，不要在仓库根目录盲目安装。
- `node_modules`、构建产物和临时文件不应提交到 Git。
- 示例代码以学习和演示为主，运行前请根据本地 Node.js、浏览器和依赖版本适当调整。
- 新增模块时，建议同步补充目录说明、运行命令和入口文件。

## 环境建议

- Node.js：建议使用当前维护中的 LTS 版本
- npm：与 Node.js 一起安装，或使用项目已有的锁文件对应的包管理器
- 浏览器：建议使用最新版 Chrome、Edge 或 Firefox
- 编辑器：推荐使用 VS Code

## 说明

这是一个持续更新的学习型仓库。目录中的部分内容可能存在不同阶段的写法或实验性代码，请以对应示例的实际实现为准。
