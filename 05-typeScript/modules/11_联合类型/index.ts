// 类型别名 
// 语法: type 定义: 类型1 | 类型2 | ...
type Numb = 1 | 2 | 3;
let num: Numb;
let numb: Numb;

type StrOrNum = string | number;
let a: StrOrNum = 1;
let b: StrOrNum = '123'

// 联合类型声明
let abc: string | number | boolean;
abc = 1;
abc = '123'
abc = false
// abc = undefined //不能将类型“undefined”分配给类型“string | number | boolean