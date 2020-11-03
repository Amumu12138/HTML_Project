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

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}