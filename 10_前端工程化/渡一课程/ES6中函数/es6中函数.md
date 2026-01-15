### 参数默认值
```
// 只有传值为undefined时才会使用默认值
function foo(a, b, c = 3) {}
```

### 默认值表达式
function getValue() {
    return 1;
}

function foo(a, b, c = getValue())

### 剩余参数
剩余参数智能有一个,且必须为最后一个形参
function printSum(...args) {
    console.log(args)
}

printSum(1)
printSum(1, 2, 4)
printSum(1, 2, 4, 8)

### 展开运算符
1、针对可迭代对象展开: ...可迭代对象
const nums = [1, 2, 3]
// 利用Math.max求最大值
Math.max(...nums)
// 浅层克隆nums数组
const newNums = [...nums]
2、针对普通对象展开
const obj = {
    a: 1,
    b: 2
}

const newObj = {...obj}

### 箭头函数
纯粹的函数,为了消除函数二义性 
const double = n => n * 2; 
特点:
1、没有this、super、arguments,因为没有this,所以无法通过任何手段绑定this
2、不能使用new调用
3、没有原型
