var Example = Example || {};

/**
 * @desc JavaScript Array 数组对象
 * 数组对象的作用: 使用单独的变量名来存储一系列的值
 *  
 * 一、什么是数组
 * 数组对象是使用单独的变量名来存储一系列的值
 * 数组可以用一个变量名存储所有的值,并且可以用变量名访问任何一个值
 * 数组中的每个元素都有自己的ID,一遍它可以很容易地被访问到
 * 
 * 二、创建一个数组
 * 创建一个数组,有三种方法
 * 1,常规方法
 * var myArray = new Array();
 * myArray[0] = "a";
 * myArray[1] = "b";
 * 2,简洁方式 
 * var myArray = new Array("a", "b", "c");
 * 3,字面
 * var myArra = ["a", "b", "c"];
 * 
 * 三、访问数组
 * 通过指定数组名以及索引号码,你可以访问某个特定的元素
 * 注意: [0]是数组的第一个元素,[1]是数组的第二个元素,依次类推
 * 
 * 三、在一个数组中可以存在不同的对象
 * 所有的JavaScript变量都是对象,数组元素是对象,函数是对象
 * 因此,你可以在数组中有不同的变量类型
 * 你可以在一个数组中包含对象元素,函数,数组
 * 
 * 四、数组方法和属性
 * 使用数组对象预定义属性和方法
 * 
 * 五、创建新方法
 * 原型是JavaScript全局构造函数,它可以构建新的JavaScript对象的属性和方法
 * 示例:
 * Array.prototype.myUcase = function() {
 *      for(i = 0; i < this.length; i++) {
 *          this[i] = this[i].toUpperCase();
 *      }
 * }
 */
Example.Array = function() {
    //给数组添加新属性myUcase
    Array.prototype.myUcase = function() {
        for(i = 0; i < this.length; i++) {
            //将数组中的小写字符转为大写字符
            this[i] = this[i].toUpperCase();
        }
    }

    var myArray = ["a", "B", "c"];
    console.log("Amumu before myArray = ", myArray); //Amumu before myArray =  (3) ["a", "B", "c"]
    myArray.myUcase();
    console.log("Amumu after myArray = ", myArray); //Amumu after myArray =  (3) ["A", "B", "C"]
}

if(typeof module !== "undefined") {
    module.export = Example[Object.keys(Example)[0]];
}