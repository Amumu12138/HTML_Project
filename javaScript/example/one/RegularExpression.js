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
    var txt = str.replace(/microsoft/i,"Runoob"); //Visit Runoob!
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