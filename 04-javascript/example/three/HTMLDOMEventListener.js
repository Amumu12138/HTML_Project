var Example = Example || {};

/**
 * @desc JavaScript HTML DOM事件
 * 一、HTML DOM使JavaScript有能力对HTML事件做出反应
 * 
 * 1.对事件做出反应
 * 我们可以在事件发生时执行JavaScript,比如当用户在HTML元素上点击时.
 * 如需在用户点击某个元素时执行代码,请向一个HTML事件属性添加JavaScript代码:
 * 例如； document.getElementById(id).onclick = function() { //执行代码; }
 * 
 * HTML事件例子:
 * a.当用户点击鼠标时
 * b.当网页已加载时
 * c.当图像已加载时
 * d.当鼠标移动到元素上时
 * e.当输入字段被改变时
 * f.当提交HTML表单时
 * g.当用户触发按键时
 * 
 * 二、HTML事件属性
 * 如需向HTML元素分配事件,可以使用事件属性
 * 例如: <button onclick="displayDate()">点这里</button>
 * 
 * 三、使用HTML DOM来分配事件
 * HTML DOM允许使用JavaScript来向HTML元素分配事件
 * 例如：
 * document.getElement(id).onclick = function() { //执行代码; }
 * 
 * 四、onload和onunload事件
 * onload和onunload事件会在用户进入或离开页面时触发
 * onload事件可用于检测访问者的浏览器类型和浏览器版本,并基于这些信息来加载网页的正确版本
 * onload和onunload事件可用于处理cookie
 * 示例: <body onload="xxxxxx()">
 * 
 * 五、onchange事件
 * onchange事件常结合对输入字段的验证来使用
 * 示例； <input type="text" id="fname" onchange="xxx()">
 * 
 * 六、onmouseover和onmouseout事件
 * onmouseover和onmouseout事件可用于在用户的鼠标移至HTML元素上方或移出元素时触发函数
 * 示例: <div onmouseover="xxx(this)" onmouseout="xxx(this)"></div>
 * 
 * 七、onmousedown、onmouseup以及onclick事件
 * onmousedown、onmouseup以及onclick构成了鼠标点击事件的所有部分.首先当点击鼠标按钮时,
 * 会触发onmousedown事件,当释放鼠标时,会触发onmouseup事件,最后当完成鼠标点击时,会触发
 * onclick事件
 */
Example.HTMLDOMEventListener = function () {
    document.write(`<p onclick="this.innerHTML='123'">点击文本</p>`);

    // console.log("", document.getElementsByTagName("body"));
    document.write(`
        <script>
            document.getElementsByTagName("body")[0].onload = function() {
                console.log("Amumu body");
            }
        </script>
    `);

    //onchange响应函数,当你离开输入框后,函数将被触发,将小写字母转为大写字母
    document.write(`
        输入你的名字: <input type="text" id="fname" onchange="toUpperCase()">
        <p>当你离开输入框后,函数将被触发,将小写字母转为大写字母</p>
    `);

    document.write(`
        <script>
        function toUpperCase() {
            var x = document.getElementById("fname");
            x.value = x.value.toUpperCase();
        }
        </script>
    `);

    //onmouseover和onmouseout事件
    document.write(`
        <div onmouseover="mOver(this)" onmouseout="mOut(this)" style="background-color: #D94A38; width: 120px; height: 20px; padding: 40px;">Mouse Over Me</div>
        <p>onmouseover和onmouseout事件示例</p>
    `);

    document.write(`
        <script>
            function mOver(obj) {
                obj.innerHTML = "Thank You";
            } 
            function mOut(obj) {
                obj.innerHTML = "Mouse Over Me";
            }
        </script>
    `);

    //onmousedown和onmouseup响应事件
    document.write(`
        <img id="light-bulb" onmousedown="lighton()" onmouseup="lightoff()"
         src="images/bulboff.gif" width="100" hright="100">
        <p>onmousedown和onmouseup响应事件： 点击不释放鼠标灯一直亮着</p>
    `);

    document.write(`
        <script>
            function lighton() {
                document.getElementById("light-bulb").src="images/bulbon.gif";
            }

            function lightoff() {
                document.getElementById("light-bulb").src="images/bulboff.gif";
            }
        </script>
    `);
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}