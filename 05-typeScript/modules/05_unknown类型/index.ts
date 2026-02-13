// unkonwn: 安全的any类型
let demoUn: unknown
demoUn = '1'
demoUn = 1
demoUn = true

function getNameUn(name: unknown): string {
    return name // 提示不能将类型“unknown”分配给类型“string”
}

function getNameAny(name: any): string {
    return name // 没有提示,可以给name参数分配string类型
}

// 类型断言
let st: string;
st = demoUn; // 提示不能将类型“unknown”分配给类型“string”
st = demoUn as string // 通过类型断言可以将“unknown”分配给st