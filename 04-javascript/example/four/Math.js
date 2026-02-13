var Example = Example || {};

/**
 * @desc JavaScript Math 算数对象
 * Math 算术对象的作用: 执行常见的算术任务
 * 
 * 一、Math对象
 * Math对象提供多种算数值类型和函数.无需在使用这个对象之前对它进行定义
 * 注意: Math对象无需在使用这个对象之前对它进行定义
 * 
 * 二、算数值
 * JavaScript提供8种可被Math对象访问的算数值
 * 例如: 
 * Math.E, Math.PI, Math.SQRT2,Math.SQRT1_2, Math.LN2, Math.LN10, Math.LOG2E, Math.LOG10E 
 * 
 * 三、算数方法
 * 除了可被Math对象访问的算数值以外,还有函数方法可使用
 * 例如: Math.radom() //获取0-1之间的随机数
 * Math.floor(); //向下取整
 * Math.ceil(); //向上取整
 */
Example.Math = function() {
    console.log("------ Amumu Math -------");

    console.log("Amumu Math.E = ", Math.E); //表示自然对数的底数 2.718281828459045
    console.log("Amumu Math.PI = ", Math.PI);   //圆周率 3.141592653589793 
    console.log("Amumu Math.SQRT2 = ", Math.SQRT2); //表示 2 的平方根  1.4142135623730951 => √2(根号2) 
    console.log("Amumu Math.SQRT1_2 = ", Math.SQRT1_2); //表示 1/2 的平方根 0.7071067811865476 => √2 / 2 (二分之根号二)
    console.log("Amumu Math.LN2 = ", Math.LN2); // 表示 2 的自然对数  0.6931471805599453
    console.log("Amumu Math.LN10 = ", Math.LN10); // 表示 10 的自然对数  2.302585092994046
    console.log("Amumu Math.LOG2E = ", Math.LOG2E); //表示以 2 为底数，e 的对数 1.4426950408889634
    console.log("Amumu Math.LOG10E = ", Math.LOG10E);//表示以 10 为底数，e 的对数 0.4342944819032518
}

if(typeof module !== "undefined"){
    module.export = Example[Object.keys(Example)[0]];
}