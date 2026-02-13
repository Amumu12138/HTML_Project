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
 * 
 * JavaScript字符串
 * 四、定义
 * 字符串用于存储和处理文本
 * 字符串可以存储一系列字符,如"Amumu"
 * 字符串可以是插入到引号中的任何字符,你可以使用单引号或者双引号
 * 你可以使用索引位置来访问字符串中的每个字符
 * 字符串的索引从0开始,这意味着第一个字符串索引值为[0],第二个为[1]，以此类推
 * 例如: var arr = "Amumu"; var a = arr[3];//m
 * 你可以在字符串中使用引号,字符串中的引号不要与字符串的引号相同
 * 也可以在字符串添加转义字符来使用引号
 * 五、字符串长度
 * 可以使用内置属性length来计算字符串的长度
 * 例如: var str = "ABCDEFGH"; var len = str.length;//8
 * 六、特殊字符
 * 在JavaScript中,字符串写在单引号或双引号中无法解析,字符串会被截断
 * 例如:    "a"1123"b"
 * 解决方法:可以使用反斜杠(\)来转义"1123"字符串的双引号
 * 例如: "a\"1123\"b"
 * 转义字符可以用于转义撇号、换行、引号等其它特殊字符
 * 代码                     输出
 * \'                      单引号
 * \"                      双引号
 * \\                      反斜杠
 * \n                      换行
 * \r                      回车
 * \t                      tab(制表符)
 * \b                      退格符
 * \f                      换页符
 * 七、字符串可以是对象
 * 通常,JavaScript字符串是原始值,可以用字符创建(var a = "Jhon";)
 * 但我们也可以使用new 关键字将字符串定义为一个对象(var a = new String("Jhon");)
 * 但不要轻易创建String对象,它会拖慢执行速度,并可能产生其他副作用
 * === 为绝对相等,即数据类型和值都必须相等
 * 八、字符串方法和属性
 * 原始值字符串,没有属性和方法,但原始值可以使用JavaScript的属性和方法,因为JavaScript在执行方法和属性时可以把原始值当作对象
 * 字符串属性
 * 属性                   描述
 * constructor           返回创建字符串属性的函数
 * length                返回字符串的长度
 * prototype             允许向对象添加属性和方法
 * 字符串方法
 * 方法                     描述
 * charAt()                返回指定索引位置的字符
 * charCodeAt()            返回指定索引位置字符的Unicode值
 * concat()                连接两个或多个字符串,返回连接后的字符串
 * fromCharCode()          将Unicode转换为字符串
 * indexOf()               返回字符串中检索指定字符第一次出现的位置
 * lastIndexOf()           返回字符串中检索指定字符最后一次出现的位置
 * localCompare()          用本地特定的顺序来比较两个字符串
 * match()                 找到一个或多个正则表达式的匹配
 * replace()               替换与正则表达式匹配的子串
 * search()                检索与正则表达式相匹配的值
 * slice()                 提取字符串的片段,并在新的字符串中返回被提取的部分             
 * split()                 把字符串分割为子字符串数组
 * substr()                从起始索引号提取字符串中指定数目的字符
 * substring()             提取字符串中两个指定的索引号之间的字符
 * toLocalLowerCase()      根据主机的语言环境把字符串转换为小写,
 * toLocalUpperCase()      根据主机的语言环境把字符串转换为大写
 * toLowerCase()           把字符串转换为小写
 * toString()              返回字符串对象值
 * toUpperCase()           把字符串转换为大写
 * trim()                  移除字符串首尾空白
 * valueOf()               返回某个字符串对象的原始值
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

    console.log("a\"1123\"b");
    var x = "Jhon";
    var y = new String("Jhon");
    console.log("x == y", x == y); //true
    console.log("x === y", x === y); //false
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}