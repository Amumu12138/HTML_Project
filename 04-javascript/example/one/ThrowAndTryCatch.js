var Example = Example || {};

/**
 * @desc JavaScript错误 throw、try和catch
 * try语句测试代码块的错误
 * catch语句处理错误
 * throw语句创建自定义错误
 * finally语句在tryh和catch语句之后,无论是否有触发异常,该语句都会执行
 * 
 * 一、JavaScript错误
 * 当JavaScript引擎执行javaScript代码时,会发生各种错误
 * 可能是语法错误,通常是程序员造成的编码错误或错别字
 * 可能是拼写错误或语言中缺少的功能(可能由于浏览器差异)
 * 可能是由于来自服务器或用户的错误输出而导致的错误
 * 当然,也可能是由于许多其他不可预知的因素
 * 二、JavaScript抛出错误
 * 当错误发生时,当事情出问题时,javaScript引擎通常会停止,并生成一个错误消息
 * 描述这种情况的技术术语是:JavaSript将抛出一个错误
 * 三、JavaScript try和catch
 * try语句允许我们定义在执行时进行错误测试的代码块
 * catch语句允许我们定义当try代码块发生错误时,所执行的代码块
 * JavaScript语句try和catch是成对出现的
 *  例如: try{
 *  } catch(e) { 
 *  } finally {
 *  }
 * 四、finally语句
 * finally语句不论之前的try和catch中是否产生异常都会执行该代码块
 * 五、throw语句
 * throw语句允许我们创建自定义错误
 * 正确的技术术语是: 创建或抛出异常(异常可以是JavaScript字符串、数字、逻辑值或对象)
 * 如果把throw与try和catch一起使用,那么你能够控制程序流,并生成自定义的错误消息
 * 
 * JavaScript 调试
 * 在编写javaScript时,如果没有调试工具将是一件很痛苦的事情
 * 没有调试工具是很难去编写JavaScript程序的
 * 你的代码可能包含语法错误、逻辑错误, 如果没有这些调试工具,这些错误比较难于发现
 * 通常,如果javaScript出现错误,是不会有提示信息,这样你就无法找到代码错误的位置
 * 
 * 六、调试工具
 * 在程序代码中寻找错误叫做代码调试
 * 调试很难,但幸运的是,很多浏览器都内置了调试工具
 * 内置的调试工具可以开始或关闭,严重的错误信息会发送给用户
 * 有了调试工具,我们就可以设置断点(代码停止执行的位置)，且可以在代码执行时检测变量
 * 浏览器启用调工具一般是按下F12键,并在调试菜单中选择“console”
 * 
 * 七、console.log()方法
 * 如果浏览器支持调试,你可以用console.log()方法在调试窗口上打印javaScript值
 * 
 * 八、设置断点
 * 在调试窗口中,你可以设置javaScript代码
 * 在每个断点上,都会停止执行javaScript代码,以便于我们检查javaScript变量的值
 * 在检查完毕后,可以重新执行代码
 * 
 * 九、debugger关键字
 * debugger关键字用于停止执行javaScript,并调用调试函数
 * 这个关键字与在调试工具中设置断点的效果是一样的
 * 
 * JavaScript 变量提升
 * 在JavaScript中, 函数及变量的声明都将被提升到函数的最顶部
 * JavaScript中,变量可以在使用后声明,也就是变量可以先使用再声明
 * 变量提升(hoisting): 函数声明和变量声明总是会被解释器悄悄地被"提升"到方法的最顶部
 * 
 * 十、初始化不会提升
 * javaScript只有声明的变量会提升,初始化的不会
 * 对于大多数程序员来说并不知道javaScript变量提升
 * 如果程序员不能很好的理解变量提升,他们写的程序就容易出现一些问题
 * 为了避免这些问题,通常我们在每个作用域开始之前声明这些变量,这也是正常的javaScript解析步骤,易于我们理解
 * 
 */
Example.ThrowAndTryCatch = function () {
    //验try catch和finally语句
    document.write(`
        <p> 不管输入是否正确,输入框都会在输入再清空</p>
        <p> 请输入5-10之间的数字:</p>
        <input id="demo" type="text">
        <button type="button" onclick="isNumber1()">测试1</button>
        <p id="p01"></p>
        `);
    document.write(`
        <script>
            function isNumber1() {
                var message, x;
                message = document.getElementById("p01");
                message.innerHTML = "";
                x = document.getElementById("demo").value;
                try{
                    if(x == "") throw "值是空的";
                    if(isNaN(x)) throw "值不是一个数字";
                    x = Number(x);
                    if(x > 10) throw "太大";
                    if(x < 5) throw "太小";
                }catch(e) {
                    message.innerHTML = "错误: " + e + ".";
                }finally{
                    document.getElementById("demo").value = "";
                }
             }
        </script>    
    `);

    //开启debugger,代码将在console.log()前停止执行
    var x = 15 * 5;
    //debugger;
    console.log("Amumu ThrowAndTryCatch x = ", x);

    //函数变量提升
    var getName = function () {
        console.log(2);
    }

    function getName() {
        console.log(1);
    }

    getName(); //2
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}