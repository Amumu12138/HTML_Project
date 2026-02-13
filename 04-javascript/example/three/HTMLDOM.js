var Example = Example || {};

/**
 * @desc JavaScript HTMLDOM
 * 通过HTNLDOM,可访问JavaScript HTML文档的所有对象
 * 
 * 一、HTML DOM介绍
 * 当网页被加载时,浏览器会创建页面的文档对象模型(Document Object Model)
 * HTML DOM模型被构造为对象的树: 
 *                              Document
 *                                  |
 *                          Root element:<html>
 *                                  |
 *          ————————————————————————————————————————————————————
 *         |                                                    |
 *      Element: <head>                                 Element:<body>
 *         |                                                    |
 *      Element: <title>                    ———————————————————————————————————————————                         
 *         |                               |                                           |                          
 *         |         Attribute:"href" —— Element:<a>                                Element:<h1>
 *      Text:"My Title"                    |                                           |
 *                                      Text:"My Link"                            Text: "My header"
 * 通过可编程的对象模型,JavaScript获得了足够的能力来创建动态的HTML
 * 1.JavaScript能够改变页面中所有的HTML元素
 * 2.JavaScript能够改变页面中所有的HTML属性
 * 3.JavaScript能够改变页面中所有的CSS样式
 * 4.JavaScript能够对页面中的所有事件做出反应
 * 
 * 二、查找HTML元素
 * 通常,通过JavaScript,你需要操作HTML元素
 * 为了做到这件事情,你必须首先找到该元素:
 * 1.通过id找到HTML元素
 * 如果找到该元素,则该方法将以对象的形式返回该元素
 * 如果未找到该元素,则x将包含null
 * 例如: var x = document.getElementById("intro");
 * 
 * 2.通过标签名找到HTML元素
 * 例如: var x = document.getElementById("main");
 *      var y = x.getElementsByTagName("p");
 * 3.通过类名找到HTML
 * 例如: var z = document.getElementsByClassName("intro");
 * 
 * 三、HTML DOM教程
 * 1.如何改变HTML元素的内容(innerHTML)
 * 2.如何改变HTML元素的样式(CSS)
 * 3.如何对HTML DOM事件做出反应
 * 4.如何添加或删除HTML元素
 * 
 * 四、改变HTML
 * HTML DOM允许JavaScript改变HTML元素的内容
 * 1,改变HTML输出流
 * JavaScript能够创建动态的HTML内容
 * 在JavaScript中,document.write()可用于直接向HTML输出流写内容
 * 注意:绝对不要在文档(DOM)加载完成之后使用document.write()。这会覆盖该文档
 * 
 * 2.改变HTML内容
 * 修改HTML内容的最简单的方法是使用innerHTML属性.
 * 如需改变HTML元素的内容,请使用这种语法:
 * document.getElementById(id).innerHTML = "xxx";
 * 
 * 3.改变HTML属性
 * 如需该百年HTML元素的属性,请使用这种语法:
 * document.getElementById(id).attribute = "xxx";
 * 例如:
 * //修改id为"image"的src属性(修改图片资源)
 * <img id="image" src="123.jpg">
 * document.getElementById("image").src = "456.png";
 * 
 * 五、改变HTML样式
 * HTML DOM允许JavaScript改变HTML元素的样式
 * 1,改变HTML样式
 * 如需改变HTML元素的样式,请使用这个语法:
 * document.getElementById(id).style.property = "xxxx";
 * 
 * 例如：
 * //修改id为p1的CSS样式
 * <p id="p1">HELLO WORLD </p>
 * document.getElementById("p1").style.color = "blue";  //改变颜色
 * document.getElementById("p1").style.fontFamily = "Arial";    //修改字体
 * document.getElementById("p1").style.width = "100px"; //修改宽度
 * 
 * 2.使用事件
 * HTNL DOM允许我们通过触发事件来执行代码
 * 比如以下事件:
 * a.元素被点击
 * b.页面加载完成
 * c.输入框被修改
 * 等等。。。。
 * 
*/
Example.HTMLDOM = function () {
 
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}