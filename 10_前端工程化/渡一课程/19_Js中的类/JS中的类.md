### 编程思维介绍
1. 面向对象 (Object Oriented) OOP
2. 面向函数 (Functional Oriented) FO
3. 面向过程 (Procedure Oriented) PO

### 访问器成员
```
class Product {
    // 读取器
    get total() {
        return this.num
    }
    // 设置器
    set total(val) {
        this.num = val
    }

    constructor(num) {
        this.num = num;
    }
}
```