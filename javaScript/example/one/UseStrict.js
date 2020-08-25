var Example = Example || {};

/**
 * @desc JavaScript 严格模式
 * JavaScript严格模式即在严格的条件下运行
 * 
 * 一、使用“use strict”指令
 * “use strict”指令在JavaScript1.8.5(ES5)中新增
 * 他不是一条语句,但是是一个字面量表达式,在JavaScipt旧版本中会被忽略
 * "use strict"的目的是指定代码在严格条件下执行
 * 严格模式下你不能使用未声明的变量
 * 注意:支持严格模式的浏览器: IE10+, Firefox4+, Chrome13+, Opera12+
 * 
 * 
 */
Example.UseStrict = function () {

};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}