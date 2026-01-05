var Example = Example || {};

/**
 * @desc JavaScript RegExp对象
 * RegExp: 正则表达式的简写
 * 
 * 一、什么是RegExp
 * 正则表达式描述了字符的模拟对象
 * 当你检索某个文本时,可以使用一种模式来描述要检索的内容，RegExp就是这种模式
 * 简单的模式可以是一个单独的字符
 * 更复杂的模式包括了更多的字符,可用于解析、格式检查、替换等等
 * 你可以规定字符串种的检索位置,以及要检索的字符类型等等
 *
 * 二、语法
 * var patt = new RegExp(pattren, modifiers);
 * 或者: var patt = /pattern/modifiers;
 * 1,模式描述了一个表达式模型
 * 2,修饰符(modifiers)描述了检索是否是全局,区分大小写
 * 注意: 当使用构造函数创造正则对象时,需要常规的字符转义规则
 * 
 * 三、RegExp修饰符
 * 修饰符用于执行不区分大小写和全文的搜索
 * i-修饰符是用来执行不区分大小写的匹配
 * g-修饰符是用于执行全文的搜索,而不是在找到第一个就停止查找,而是找到所有的匹配
 * 
 * 四、test()方法
 * test()方法搜索字符串指定的值,根据结果并返回真或假
 * 
 * 
 * 五、exec()方法
 * exec()方法检索字符串中的指定值,返回值是被找到的值,如果没有发现匹配,则返回null
 */
Example.RegExp = function() {
    console.log("------ Amumu RegExp -------");
}

if(typeof module !== "undefined"){
    module.export = Example[Object.keys(Example)[0]];
}