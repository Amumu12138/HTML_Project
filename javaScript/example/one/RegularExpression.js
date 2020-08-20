var Example = Example || {};

/**
 * @desc JavaScript正则表达式
 * 正则表达式使用单个字符串来描述、匹配一系列符合某个句法规则的字符串搜索模式
 * 摸索模式可用于文本搜素和文本替换
 * 一、定义
 * 正则表达式是由一个字符串序列形成的搜索模式
 * 当你在文本中搜索数据时,你可以用搜索模式来描述你要查询的内容
 * 正则表达式可以是一个简单的字符,或一个更复杂的模式
 * 正则表达式可用于所有文本搜索和文本替换的操作
 * 二、语法
 * /正则表达式主题/修饰符
 * 其中修饰符是可选的、
 * 例如:var patt = /runoob/i
 * 三、使用字符串方法
 * 在JavaScript中,正则表达式通常用于两个字符串方法:search()和replace()
 * search()方法用于检索字符串中指定的子字符串,或检索与正则表达式相匹配的子字符串,并返回子串的起始位置
 * 例如
 *  var str = "Visit Runoob!";
 *  var n = str.search(/Runoob/i);  //6
 * replace()方法用于在字符串中使用一些字符替代另一些字符,或替换一个与正则表达式匹配的子串
 * var str = document.getElementById("demo").innerHTML; 
 * var txt = str.replace(/microsoft/i,"Runoob"); //Visit Runoob!
 * 正则表达式参数可用在以上方法中(替代字符串参数)
 * 正则表达式使得搜索功能更加强大(如实例中不区分大小写)
 * 
 * 正则表达式修饰符
 * 修饰符               描述
 * i                执行对大小写不敏感的匹配
 * g                执行全局匹配(查找所有匹配而非在找到第一个匹配后停止)
 * m                执行多行匹配
 * 
 * 正则表达式模式 (方括号用于查找某个范围内的字符)
 * 表达式               描述
 * [abc]            查找方括号之间的任何字符
 * [0-9]            查找任何从0-9的数字
 * (x|y)            查找任何以|分割的选项
 * 元字符               描述
 * \d               查找数字
 * \s               查找空白字符
 * \b               匹配单词边界
 * \uxxxx           查找以十六进制数xxxx规定的Unicode字符
 * 量词                 描述
 * n+               匹配任何包含至少一个n的字符串
 * n*               匹配任何包含零个或多个n的字符串
 * n?               匹配任何包含零个或一个n的字符串
 * 
 * 四、使用RegExp()对象
 * 在JavaScript中,RegExp对象是一个预定义了属性和方法的正则表达式对象
 * 1,使用test()
 * test()方法是一个正则表达式方法.
 * test()方法用于检测一个字符串是否匹配某个模式,如果字符串中含有匹配的文本,则返回true,否则返回false
 * 例如: /e/.test("The best things in life are free!"); //true
 * 2,使用exec()
 * exec()方法用于检索字符串中的正则表达式的匹配
 * 该函数返回一个数组,其中存放匹配的结果,如果未找到匹配,则返回值为null
 * /e/.exec("The best things in life are free!"); //e
 */
Example.RegularExpression = function () {
    //search()方法
    var str = "Visit Runoob!";
    var n = str.search(/Runoob/i);
    console.log("Amumu RegularExpression n = " + n); //Amumu RegularExpression n = 6

    //replace()方法
    document.write(`<p>替换"Microsoft"为"Runoob"</p>
        <button onclick="myFunction()">替换</button>
        <p id="demo">Visit Microsoft </p>`);

    document.write(`
        <script> 
            function myFunction() {
                var str = document.getElementById("demo").innerHTML;
                var txt = str.replace(/Microsoft/i, "Runoob");
                document.getElementById("demo").innerHTML = txt;
            }
        </script>`);

    var hasTest = /e/.test("The best things in life are free!");
    console.log("RegularExpression hasTest = ", hasTest); //RegularExpression hasTest =  true

    var hasExec = /e/.exec("The best things in life are free!");
    console.log("RegularExpression hasExec = ", hasExec); //RegularExpression hasExec =  ["e", index: 2, input: "The best things in life are free!", groups: undefined]

    //是否带有小数
    function isDecimal(strValue) {
        var objRegExp = /^\d+\.\d+$/;
        return objRegExp.test(strValue);
    }

    console.log("RegularExpression isDecimal 3.14 =", isDecimal(3.14)); //true
    console.log("RegularExpression isDecimal 3 =", isDecimal(3)); //false

    //检验是否带有中文名称组成(只能验证指定数量的中文)
    function isChina(str) {
        var reg = /^[\u4E00-\u9FA5]{2, 4}$/; /*定义验证表达式*/
        return reg.test(str); /*进行验证*/
    }

    console.log("RegularExpression isChina 中文 =", isChina("这段时间", 4)); //true
    console.log("RegularExpression isChina 212 =", isChina(212)); //false
    console.log("RegularExpression isChina 中文212 =", isChina("中文212")); //false

    //检验是否全由8位数字组成
    function isStudentNo(str) {
        var reg = /^[0-9]{8}$/; /*定义验证表达式*/
        return reg.test(str); /*进行验证*/
    }

    console.log("RegularExpression isStudentNo 12345678 =", isStudentNo(12345678)); //true
    console.log("RegularExpression isStudentNo 212 =", isStudentNo(212)); //false
    console.log("RegularExpression isStudentNo abcdefgh =", isStudentNo("abcdefgh")); //false

    //检验电话号码格式
    function isTelCode(str) {
        var reg = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
        return reg.test(str);
    }

    console.log("RegularExpression isTelCode 15116184973 =", isTelCode(15116184973)); //true
    console.log("RegularExpression isTelCode 123654 =", isTelCode(123654)); //false
    console.log("RegularExpression isTelCode abcdefgh =", isTelCode("abcdefgh")); //false

    //检验邮件地址是否合法
    function isEmail(str) {
        var reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
        return reg.test(str);
    }

    console.log("RegularExpression isEmail 15116184973@163.com =", isEmail("15116184973@163.com")); //true
    console.log("RegularExpression isEmail 15116184973 =", isEmail(15116184973)); //false
    console.log("RegularExpression isEmail abcdefgh =", isEmail("abcdefgh")); //false

    /**
     * [reg 百度网盘链接匹配]
     * 说明：匹配支持百度分享的两种链接格式
     * 格式一：链接: https://pan.baidu.com/s/15gzY8h3SEzVCfGV1xfkJsQ 提取码: vsuw 复制这段内容后打开百度网盘手机App，操作更方便哦
     * 格式二：http://pan.baidu.com/share/link?shareid=179436&uk=3272055266 提取码: vsuw 复制这段内容后打开百度网盘手机App，操作更方便哦
     * 匹配出下载地址和提取码，并且还支持如果没有提取码，也能匹配出下载链接。
     * @type {正则表达式}
     * @return array 返回匹配成功的链接和地址
     */
    function baiduDownLinkArr(string) {
        var reg = /([http|https]*?:\/\/pan\.baidu\.com\/[(?:s\/){0,1}|(share)]*(?:[0-9a-zA-Z?=&])+)(?:.+:(?:\s)*)?([a-zA-Z]{4})?/;
        return reg.exec(string);
    }

    //["https://pan.baidu.com/s/15gzY8h3SEzVCfGV1xfkJsQ", "https://pan.baidu.com/s/15gzY8h3SEzVCfGV1xfkJsQ", undefined, index: 4, input: "链接: https://pan.baidu.com/s/15gzY8h3SEzVCfGV1xfkJs…            
    //提取码: vsuw 复制这段内容后打开百度网盘手机App， 操作更方便哦 ", groups: undefined]
    console.log("RegularExpression baiduDownLinkArr =", baiduDownLinkArr(`链接: https://pan.baidu.com/s/15gzY8h3SEzVCfGV1xfkJsQ 
                    提取码: vsuw 复制这段内容后打开百度网盘手机App， 操作更方便哦 `));

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}