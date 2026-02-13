
// 字面量形式
let ha = "qwsasasa";
console.log(/q/.test(ha)); // true

// 对象形式
let a = "a";
let reg = new RegExp(a, "g");
console.log(reg.test("abcdefg")); // true

// 选择符的使用
let b = "qwerrttyt";
console.log(/q|@/.test(b)); // true

// 原子表[]与原子组()
console.log(/[12345]/.test("12")); // true
console.log(/(12|34)/.test("1324")); // false

// i与g模式修正符 - i不分大小写 g-全局匹配
let hd = "hoududunUiUa";
console.log(hd.match(/u/ig)); //[ 'u', 'u', 'u', 'U', 'U' ]
console.log(hd.replace(/u/ig, "@")); // ho@d@d@n@i@a

//数值匹配
console.log(/\d/.test("12asa34asa")); // true
console.log(/\d/.test("abc")); // false
// 多数值匹配
console.log(/\d+/.test(1234)); // true
console.log(/\d+/.test(1234.45)); // true
// 空白字符匹配
console.log(/\s/.test("asa")); // false
console.log(/\s/.test(" asa")); // true
console.log(/\s/.test("\nasa")); // true
// 非数值匹配
console.log(/\D/.test(1234)); // false
console.log(/\D/.test("abc1234")); // true
// 非空字符匹配
console.log(/\S/.test("asa")); // true
console.log(" asa".match(/\S/g)); // [ 'a', 's', 'a' ]

// \w-数值+字母+下划线
//['d', 'o', 'u', 'd', 'u','n', 'r', 'e', '1', '2','2', '1', '2', '1', '1','w', 's', 'a', '_']
console.log("doudunre1`22121@1wsa_*&*^".match(/\w/g));
console.log("doudunre1`22121@1wsa_*&*^".match(/\W+/g)); // [ '`', '@', '*&*^' ]

// 匹配所有字符
console.log("s121&!&@".match(/[^]/g)); // ['s', '1', '2','1', '&', '!','&', '@']
console.log("123asd".match(/[\d\D]/g)); // [ '1', '2', '3', 'a', 's', 'd' ]
console.log("123asd ".match(/[\s\S]/g)); // [ '1', '2', '3', 'a', 's', 'd', '']

// 多行匹配修正符
let str = `
    #1 js,200 #
    #2 php,200 #
    #3 houdunren.com # aw1w12
    #4 node.js,200 #
`;
let lesson = str.match(/^\s*#\d+\s+.+\s+#$/gm).map(v => {
    v = v.replace(/\s*#\d+\s*/, "").replace(/#/, "");
    [name, price] = [...v.split(",")]
    return { name, price };
});
console.log(JSON.stringify(lesson)); // [{"name":"js","price":"200 "},{"name":"php","price":"200 "},{"name":"node.js","price":"200 "}]


let sc = "匹配中文in1231@132.com";
// 匹配中文
console.log(sc.match(/\p{sc=Han}/gu)); //[ '匹', '配', '中', '文' ]
//匹配所有字符
console.log(sc.match(/\p{L}/gu)); //['匹', '配', '中','文', 'i',  'n','c',  'o',  'm']
// 匹配特殊字符
console.log(sc.match(/\p{P}/gu)); //[ '@', '.' ]

// 有效率的y模式
let qqStr = "ajs:123434343,12123232,0897231876281种你说哈看就阿克苏看";
reg = /(\d+),?/y;
reg.lastIndex = 4; // 从第4位开始匹配
let qq = [];
while ((res = reg.exec(qqStr))) {
    qq.push(res[1]);
}
console.log(qq); // [ '123434343', '12123232', '0897231876281' ]

// 原子表的基本使用
let date = "2022-09-03";
reg = /^\d{4}([-\/])\d{2}\1\d{2}$/;
console.log(date.match(reg)[0]); //2022-09-03
console.log("2022-12/08".match(reg)); //null
console.log("2022/12/08".match(reg)); // [ '2022/12/08', '/', index: 0, input: '2022/12/08', groups: undefined ]

// 区间匹配
console.log("asasjkl".match(/[a-z]/g)); // ['a', 's', 'a', 's', 'j', 'k', 'l']
console.log("123465".match(/[0-9]/g)); //['1', '2', '3', '4', '6', '5']
console.log("1234789".match(/[7-9]/g)); //['7', '8', '9']

// 排除匹配
console.log("abcdef".match(/[^ab]/gi)); // [ 'c', 'd', 'e', 'f' ]
console.log("ASCBefsgf12".match(/[^ab]/gi)); // ['S', 'C', 'e', 'f', 's', 'g', 'f', '1', '2']
