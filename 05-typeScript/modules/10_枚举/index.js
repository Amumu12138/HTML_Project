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
console.log(Color.red, 'red'); // 0
console.log(Color.green, 'green'); // 1
console.log(Color.yellow, 'yellow'); // 2
// 字符串枚举
var Gener;
(function (Gener) {
    Gener["MALE"] = "male";
    Gener["FEMALE"] = "female";
})(Gener || (Gener = {}));
console.log(Gener.MALE, 'MALE'); // male
console.log(Gener.FEMALE, 'FEMALE'); // female
// 异构枚举
var Gener2;
(function (Gener2) {
    Gener2[Gener2["MALE"] = 6] = "MALE";
    Gener2["FEMALE"] = "female";
})(Gener2 || (Gener2 = {}));
console.log(Gener2.MALE, 'MALE'); // 6
console.log(Gener2.FEMALE, 'FEMALE'); // female
var Gener3 = {
    MALE: 'male',
    FEMALE: 'female'
};
console.log(Gener3.MALE, 'MALE'); // male
console.log(Gener3.FEMALE, 'FEMALE'); // female
console.log("male" /* Gener4.MALE */, 'MALE'); // male
console.log("female" /* Gener4.FEMALE */, 'FEMALE'); // female
