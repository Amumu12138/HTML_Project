// ES6写法
class Product {
    static count = 0;
    constructor(name, unitPrice, number) {
        this.name = name;
        this.unitPrice = unitPrice;
        this.number = number;
        Product.count++
    }

    get totalPrice() {
        return this.number * this.unitPrice;
    }

    increase() {
        this.number++
    }
}

const p = new Product('name', 100, 1);
console.log(p, 'es6 p');

// console.log(OldProduct); // undefined

// 转换为es5写法
var OldProduct = (function () {
    function OldProduct(name, unitPrice, number) {
        if (Object.getPrototypeOf(this) !== OldProduct.prototype) {
            throw new TypeError('必须使用new关键字调用')
        }
        this.name = name;
        this.unitPrice = unitPrice;
        this.number = number;
        OldProduct.count++;
    }
    OldProduct.count = 0;

    // 定义increase方法
    Object.defineProperty(OldProduct.prototype, 'increase', {
        value: function () {
            if (Object.getPrototypeOf(this) === OldProduct.prototype.increase.prototype) {
                throw new TypeError('increase is not constructor')
            }
            this.number++
        },
        enumerable: false
    })

    Object.defineProperty(this, 'totalPrice', {
        get() {
            return this.number * this.unitPrice
        },
        enumerable: false
    })

    // 添加totalPrice属性读取
    Object.defineProperty(OldProduct.prototype, 'totalPrice', {
        get() {
            return this.number * this.unitPrice
        },
        enumerable: false
    })

    return OldProduct
})();

// OldProduct() // TypeError: 必须使用new关键字调用

const oldProduct = new OldProduct('name', 100, 1)
console.log(oldProduct, 'es5 oldProduct');
oldProduct.increase()
console.log(oldProduct.number, 'increase called');
console.log(OldProduct.count, 'count');
console.log(oldProduct.totalPrice, 'totalPrice');
console.log(Object.keys(oldProduct));

// const testp = OldProduct.bind(oldProduct)
// console.log(testp, 'testp'); // [Function: bound OldProduct]
// const test = new oldProduct.increase() // increase is not constructor

