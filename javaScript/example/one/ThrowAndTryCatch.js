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
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}