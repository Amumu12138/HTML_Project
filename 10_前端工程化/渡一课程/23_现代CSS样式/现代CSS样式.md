### clip-path 裁剪
inset: 矩形
circle: 圆形
ellipse: 椭圆
polygon: 多边形

### CSS变量
```
语法: --变量名
示例: 
:root {
    --size: 30px;
}

.item {
    <!-- 使用变量 -->
    width: var(--size);
    <!-- 计算: 运算符之间要保留空格 -->
    padding: calc(var(--size) * 1.1)
}

```

### box-decoration-break 属性用来定义当元素跨多行、多列或多页时，元素的片段应如何呈现
```
<!-- 形式语法  -->
box-decoration-break = slice | clone  
```

### 粘性定位: sticky position
影响因素: 包含块+最近可滚动元素
```
.div {
    position: sticky;
    top: 0;
}
```

### filter 滤镜
```
filter: blur(10px) - 高斯模糊
filter: hue-rotate(45deg) - 色相环的旋转度数
filter: contrast(0.5) - 对比度
filter: grayscale(1) - 灰度
```

### 动画的时间函数 -贝塞尔曲线
```
linear: 匀速
ease-in: 缓入
ease-out: 缓出
```

### 渐变背景
houdini api
```
@property --direc {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false
}

@keyframes spin {
    to {
        --direc: 360deg;
    }
}

.card {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    background-image: linear-gradient(var(--direc),
            #5ddcff,
            #3c67e3 43%,
            #4e00c2);
    animation: spin 3s linear infinite;
}
```

### CSS选择器
```
<!--  CSS 中的一个伪类选择器，用于在元素本身或其后代元素获得焦点时触发样式变化 -->
<!-- 常见的 :focus 伪类不同，后者仅作用于直接获得焦点的元素本身，而 :focus-within 具有“冒泡”特性，能够感知子元素的焦点状态 -->
.form-block:focus-within {
    background: #409eff30;
}
<!-- CSS 函数式伪类 :has() 表示一个元素，如果作为参数传递的任何相对选择器在锚定到该元素时，至少匹配一个元素 -->
.label span:has(+input[required])::after {
    content: "*";
    color: red;
}
<!-- CSS 伪元素将样式应用于区块容器第一行的第一个字母，但仅当其前面没有其他内容（例如图像或行内表格）时才有效 -->
.content::first-letter {
    color: red;
    font-size: 10em;
    font-weight: bold;
}

<!-- CSS 伪元素应用于文档中被用户高亮的部分（比如使用鼠标或其他选择设备选中的部分） -->
.content::selection {
    background: skyblue;
    text-decoration: underline;
}
```

### flex + margin布局
```
<!-- 均分盒子布局 -->
 .grid {
    display: flex;
    flex-wrap: wrap;
    width: 200px;
    height: 200px;
    background-color: #ccc;
}

.grid .item {
    --num: 5;
    --size: 20px;
    --gap: calc((100% - 20px * var(--num)) / var(--num) / 2);
    margin: 10px var(--gap);
    box-sizing: border-box;
    background: #f00;
    width: var(--size);
    height: var(--size);
    border: 1px solid #222;
}
```