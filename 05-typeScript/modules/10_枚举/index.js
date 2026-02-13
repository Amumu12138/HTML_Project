// 语法: enum 枚举名称 {
//  成员1,
//  成员2
//}
// 数字枚举
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["green"] = 1] = "green";
    Color[Color["yellow"] = 2] = "yellow";
})(Color || (Color = {}));
console.log(Color.red);
// 字符串枚举
var Gener;
(function (Gener) {
    Gener["MALE"] = "male";
    Gener["FEMALE"] = "female";
})(Gener || (Gener = {}));
console.log(Gener.MALE, 'MALE');
