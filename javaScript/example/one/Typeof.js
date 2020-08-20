var Example = Example || {};

/**
 * @desc JavaScript typeof, null和undefined
 * 一、typeof操作符
 * 使用typeof操作符来检测变量的数据类型
 * 在javaScript中,数组是一种特殊的对象类型.因此typeof([1,2,3,4])返回object
 * 注意:
 * a,NaN的数据类型是number
 * b,数字Array的数据类型是object
 * c,日期Dated的数据类型是object
 * e,null的数据类型object
 * f,未定义的数据类型是undefined
 * 二、null 
 * 在JavaScript中null表示什么也没有
 * null是一个只有一个值的特殊类型,表示一个空对象引用
 * 三、undefined
 * 在JavaScript中,undefined是一个没有设置值的变量
 * type一个没有值的变量会返回undefined
 * 注意:null和undeifned的值相等,但类型不等(null === undfined; //false)
 * 
 * JavaScript类型转换
 * Number()转换为数字,String()转换为字符串,Boolean()转化为布尔值
 * 四、数据类型
 * a,string 字符串
 * b,number 数字
 * c,boolean 布尔值
 * d,object 对象
 * e,function 函数
 * f,symbol
 * 3种对象类型:
 * a,Object 一般类型对象
 * b,Date 日期
 * c,Array  数字
 * 2个不包含任何值的数据类型
 * a,null
 * b,undefined
 * 五、constructor属性
 * construct属性返回所有JavaScript变量的构造函数
 * 1,你可以使用constructor属性来查看对象是否为数组
 * myArray.constructor.toString().indexOf("Array") > -1;
 * 2,使用constructor属性来查看对象是否为日期
 * myDate.constructor.toString().indexOf("Date") > -1;
 * 
 * 六、javaScript类型转换
 * JavaScript变量可以转换为新变量或其它数据类型
 * a,通过使用javaScript函数
 * b,通过javaScript自身自动转换
 * 1,将数字转换为字符串
 * 全局方法String()可以将数字转换为字符串
 * 该方法可用于任何类型的数字、字母、变量、表达式
 * 2,Number()方法可将其它类型转换为数字
 * 方法                 描述
 * toExponential()      把对象的值转换为指数计数法
 * toFixed()            把数字转换为字符串,结果的小数点后有指定位数的数字
 * toPrecision()        把数字格式化为指定的长度
 * 
 */
Example.Typeof = function () {
    console.log("string change number = " + Number("123"));

    //根据constructor属性判断是否是数组
    var myArray = [1, 2, 3, 4];
    var hasArr = myArray.constructor.toString().indexOf("Array") > -1;

    //indeOf()可返回某个指定的字符串值在字符串中首次出现的位置
    console.log("Amumu myArray => ", myArray.constructor.toString()); //Amumu myArray =>  function Array() { [native code] }
    console.log("Amumu myArr => " + myArray.constructor.toString().indexOf("Array")); //9 取"function Array()"中第十个字符位置
    console.log("Amumu indexOf f => " + myArray.constructor.toString().indexOf("f")); //Amumu indexOf f => 0
    console.log(`Amumu Typeof hasArr  = ` + hasArr); //true

    //根据constructor属性判断是否是日期
    var myDate = new Date();
    var hasDate = myDate.constructor.toString().indexOf("Date") > -1;
    console.log("Amumu myDate => ", myDate.constructor.toString()); //Amumu myDate =>  function Date() { [native code] }
    console.log("Amumu myDate => ", myDate.constructor.toString().indexOf("Date")); //Amumu myDate => 9
    console.log(`Amumu Typeof hasDate  = ` + hasDate); //true

    //将数字转换为指数计数法
    var a = 123456789;
    b = a.toExponential();
    console.log("toExponential b = " + b); //toExponential b = 1.23456789e+8

    // 把数字转换为字符串,保留小数点后两位
    var c = 3.1415926;
    d = c.toFixed(2);
    console.log("toFixed d = " + d); //toFixed d = 3.14

    //把数字格式化为指定的长度
    var e = 123.456789;
    f = e.toPrecision(3);
    console.log("toPrecision f = " + f); //toPrecision f = 123
};

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}