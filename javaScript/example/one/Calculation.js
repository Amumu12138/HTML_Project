var Example = Example || {};

/**
 * @desc JavaScript运算符
 * 一、算术运算符
 * 运算符               描述
 * +                   加法
 * -                   减法
 * *                   乘法
 * /                   除法
 * %                   取模(余数)
 * ++                  自增
 * --                  自减
 * 二、赋值运算符
 * =                    赋值
 * +=                   a+=b; =>  a = a + b;
 * -=                   a-=b; => a = a - b;
 * *=                   a*=b;  => a = a * b;
 * /=                   a/=b; => a = a / b;
 * %=                   a%=b; => a = a % b;
 * 三、用于字符串的+运算符
 * 加号运算符(+)用于把文本值或字符串变量加起来(连接起来)
 * 注意:如果把数字和字符串相加,结果将成为字符串("5" + 5 => 55(string类型))
 * 
 * JavaScript 比较和逻辑运算符
 * 比较和逻辑运算符用于测试true和false
 * 比较运算符
 * 运算符                   描述
 * ==                      等于
 * ===                     绝对等于(值和类型均相等)
 * !=                      不等于
 * !==                     不绝对等于(值和类型有一个不等于,或两个都不相等)
 * >                       大于
 * <                       小于
 * >=                       大于或等于
 * <=                       小于或等于
 * 逻辑运算符
 * &&                       与
 * ||                       或
 * |                        非
 * 条件运算符
 * a? b: c                  三目运算符
 */
Example.Calculation = function () {
    console.log("\'5\' + 5 = ", "5" + 5, "type = " + typeof ("5" + 5)); //55  string
    console.log("null + \'a\' = ", null + 'a'); //nulla
    console.log("undefined + \'a\' = ", undefined + 'a'); //undefineda
    console.log("undefined + 5 = ", undefined + 5); //NaN
    console.log("true + 5= ", true + 5); //6
    console.log("false +5 = ", false + 5); //5

    console.log("false + \'5\'= ", false + '5'); //false5

};


if (typeof module !== 'undefined') {
    module.export = Example[Object.keys(Example)[0]];
}