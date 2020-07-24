var Example = Example || {};

/**
 * @desc JavaScript教程测试项目
 */
Example.Test = function () {
    //	您只能在 HTML 输出中使用 document.write。如果您在文档加载后使用该方法，会覆盖整个文档。

    //添加标题
    document.write(`<h1>这是一个测试项目</h1>`);
    //添加段落
    document.write(`<p>这是一个测试段落</p>`);

    //添加按钮
    document.write(`<button type="button " onclick="alert('欢迎!')">点我!</button>`);

    //改变HTML元素的样式
    document.write(`<p id="demo">JavaScript能改变HTML元素的样式</p>`);
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