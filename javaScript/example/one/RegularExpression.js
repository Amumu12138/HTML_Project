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

};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}