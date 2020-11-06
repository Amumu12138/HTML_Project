var Example = Example || {};

/**
 * @desc JavaScript 对象
 *  JavaScript中的所有事务都是对象: 字符串、数值、数组、函数
 * 此外,JavaScript允许自定义对象
 * 
 * 一、所有书屋都是对象
 * JavaScript提供多个内置对象,比如String,Date,Array等等,对象只是带有属性和方法的特殊数据类型
 * 1,布尔型可以是一个对象
 * 2,数字型可以是一个对象
 * 3,字符串也可以是一个对象
 * 4,日期是一个对象
 * 5,
 */
Example.JavaScriptObject = function () {
    console.log("Amumu JavaScriptObject");
};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}