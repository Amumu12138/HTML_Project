var Example = Example || {};

/**
 * @desc JavaScript Number对象
 * JavaScript只有一种数字类型,可以使用也可以不使用小数点来书写数字
 * 
 * 一、数字
 * 示例:
 * var PI = 3.14;   //使用小数点
 * var x = 314; //不使用小数点
 * 极大或极小的数字可以通过科学计数法来书写
 * 示例:
 * var y = 123e5;   //12300000
 * var z = 123e-5;  //0.00123
 * 
 * 二、所有JavaScript数字均为64位
 * JavaScript不是类型语言。与许多其他编程语言不同,JavaScript不定义不同类型的数字,比如整型,短,长,浮点等等
 * 在JavaScript中,数字不分为整数类型和浮点类型,所有的数字都是浮点类型,JavaScript采用IEEE754标准定义的64位
 * 浮点格式表示数字,他能表示最大值为±1.7976931348623157e+308，最小值为 ±5e-324。
 * 值                   指数                    sign
 * 52bits(0-51)         11bits(50-62)           1bit(63)
 * 
 * 三、精度
 * 整数(不使用小数点或指数计数法书写的)最多为15位
 * 示例:
 * var x = 999999999999999;//999999999999999
 * var y = 9999999999999999; //10000000000000000
 * 小数的最大位数是17,但是浮点运算并不总是100%准确
 * 示例: var x = 0.1 + 0.2; //0.30000000000000004
 * 
 * 四、八进制和十六进制
 * 如果前缀为0,则JavaScript会把数值常量解释为八进制数;如果前缀为0x,则解释为十六进制数
 * 注意: 绝对不要在数字前面写0,除非你需要进行八进制转换
 * 默认情况下,JavaScript数字为十进制显示
 * 但是你可以使用toString()方法输出十六进制,八进制,二进制
 * 示例: Number.toString(16),Number.toString(8),Number.toString(2)
 * 
 * 五、无穷大
 * 当数字运算结果超过了JavaScript所能表示的数字上限(溢出),结果为一个特殊的无穷大值,在JavaScript
 * 中以Infinity表示.同样的,当负数的值超过了JavaScript所能表示的负数范围,结果为负无穷大,在JavaScript
 * 中以-Infinity表示.无无穷大值得行为特性哦和我们所期望得是一致的: 基于它们的加、减、乘、除的运算结果
 * 还是无穷大(但是还保留它们的正负号)
 * 注意: 任何数字除以0也产生了无限
 * 
 * 六、NaN-非数字值
 * NaN属性是代表非数字值得特殊值,该属性用于指示某个值不是数字,可以把Number对象设置为该值,来指示其不是数字值,
 * 你可以使用isNaN()全局函数来判断一个值是否是NaN值
 * 
 * 七、数字可以是数字或者对象
 * 数字可以私有数据进行初始化,例如x=123
 * JavaScript数字对象初始化数据,例如y = new Number(123)
 * 
 * 八、Number属性
 * 属性                         描述
 * Number.MAX_VALUE            最大值
 * Number.MIN_VALUE            最小值
 * Number.NaN                  非数字
 * Number.NEGATIVE_INFINITY    负无穷,在溢出时返回
 * Number.POSITIVE_INFINITY    正无穷,在溢出时返回
 * Number.EPSILON              表示1和比最接近1且大于1得最小Number之间得差别
 * Number.MIN_SAFE_INTEGER     最小安全整数
 * Number.MAX_SAFE_INTEGER     最大安全整数
 * 
 * 九、数字方法
 * 方法                         描述
 * Number.parseFloat()         将字符串转化成浮点数
 * Number.parseInt()           将字符串转化为整型数字
 * Number.isFinite()           判断传递的参数是否为有限数字
 * Number.isInteger()          判断传递的参数是否为整数 
 * Number.isNaN()              判断传递的参数是否为isNaN()
 * Number.isSafeInterger()     判断传递的参数是否为安全整数
 * 数字类型原型上的一些方法
 * toExponential()              返回一个数字的指数形式的字符串,例如1.23e+2
 * toFixed()                    返回指定小数位数的表示形式
 * toPrecision()                返回一个指定精度的数字
 * 
 */
Example.Number = function() {
    var y = 123e5;   //12300000
    var z = 123e-5;  //0.00123
    console.log("Amumu Number y = " + y + " z = " + z); 

    var longA = 999999999999999;//
    var longB = 9999999999999999; // 
    console.log("Amumu Number longA = " + longA + " longB = " + longB); //Amumu Number longA = 999999999999999 longB = 10000000000000000

    var myNumber = 2;
    while(myNumber != Infinity) {
        myNumber = myNumber * myNumber;
    }
    console.log("Amumu myNumber = ", myNumber); //Amumu myNumber = Infinity

    var num = 2;
    console.log("Amumu Number num / 0 = ", num / 0); //Number.js:63 Amumu Number num / 0 =  Infinity
}

if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}