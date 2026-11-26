// 第一种声明形式
let arr: string[]
arr = ['1', '2']

// 第二种声明形式
let array: Array<string>
array = ['3', '4']

// 混合类型数组
let arr2: (number | string | boolean | object)[]
arr2 = [1, '2', Boolean(true), { name: "amumu" }]

let arr3: Array<number | string | boolean | object>
arr3 = [1, '2', Boolean(true), { name: "amumu" }]