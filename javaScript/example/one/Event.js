var Example = Example || {};

/**
 * @desc JavaScript事件
 * HTML事件是发生在HTML元素上的事情
 * 当在HTML页面中使用JavaScript时,JavaScript可以触发这些事件
 * 一、HTML事件
 * HTML事件可以是浏览器行为,也可以是用户行为
 * 以下是HTML事件的实例:
 * a,HTML页面完成加载
 * b,HTML input字段改变时
 * c,HTML 按钮被点击
 * 在事件触发时,JavaScript可以执行一些代码
 * HTML元素中可以添加事件属性,使用JavaScript代码来添加HTML元素
 * 例如: <some-HTML-element some-event="JS代码">
 * 二、常见的HTML事件
 * 事件                 描述
 * onchange            HTML元素改变
 * onclick             用户点击HTML元素
 * onmouseover         用户在一个HTML元素上移动鼠标
 * onmouseout          用户从一个HTML元素上移开鼠标
 * onkeydown           用户按下键盘按键
 * onload              浏览器已完成页面加载
 * 三、事件处理
 * 事件可以用于处理表单验证、用户输入、用户行为及浏览器动作
 * a,页面加载时触发事件
 * b,页面关闭时触发事件
 * c,用户点击按钮执行动作
 * d,验证用户输入内容的合法性
 * e,等等。。。
 * 使用多种方法可以来执行javaScript事件代码
 * 1,HTML事件属性可以直接执行Js代码
 * 2,HTML事件属性可以调用js函数
 * 3,可以为HTML元素指定自己的事件处理程序
 * 4,可以阻止事件的发生
 * 5,等等。。。
 */
Example.Event = function () {
    //	您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。

    //添加标题
    document.write(`<h1 >这是一个测试项目</h1>`);
    //添加段落
    document.write(`<p id = demo>这是一个测试段落</p>`);

    //添加按钮改变id=demo组件属性
    document.write(`<button type="button" onclick="getElementById('demo').innerHTML=Date()">显示现在时间</button>`);

    //添加按钮改变自身属性显示
    document.write(`<button type="button" onclick="this.innerHTML=Date()">显示现在时间2</button>`);

    //改变HTML元素的样式
    document.write(`<p id=a>JavaScript能改变HTML元素的样式</p>`);
    document.write(`<script>
        function myFunction() {
            var x = document.getElementById("demo");
            x.style.color = "#ff0000";
        }
    </script>`);
    document.write(`<button type="button" onclick="myFunction()">改变颜色</button>`);
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}