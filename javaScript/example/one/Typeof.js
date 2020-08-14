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
 * 
 */
Example.Typeof = function () {
    console.log("string change number = " + Number("123"));
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}