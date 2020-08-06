var Example = Example || {};

/**
 * @desc JavaScript 循环
 * 循环可以将代码块执行指定的次数
 * 
 * javaScript支持不同类型的循环
 * a,for 循环代码块一定的次数
 * b,for/in 循环遍历对象的属性
 * c,while 当指定的条件为true时循环指定的代码块
 * d,do/while 同样当指定的条件为true时循环指定代码块
 * 
 * JavaScript break和continue语句
 * break语句用于跳出循环
 * continuey用于跳出循环中的一个迭代
 * a,break语句可用于跳出循环,在跳出循环后,会继续执行该循环之后的代码
 * b,continue语句中断循环中的迭代,如果出现了指定的条件,然后继续循环中的下一个迭代.
 */
Example.LoopFunction = function () {

    //JavaScript标签
    cars = ["BMW", "Volvo", "Saab", "Ford"];
    list: {
        document.write(cars[0] + "<br>");
        document.write(cars[1] + "<br>");
        document.write(cars[2] + "<br>");
        break list;
        document.write(cars[3] + "<br>");
        document.write(cars[4] + "<br>");
        document.write(cars[5] + "<br>");
    }
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}