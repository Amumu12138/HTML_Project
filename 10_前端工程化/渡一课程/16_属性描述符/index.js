var goods = {
    pic: '',
    title: '',
    desc: '',
    sellNumber: 1,
    favorRate: 2,
    price: 300
}

class UIGoods {
    constructor(goods) {
        // this.data = goods;
        // 设置data属性不可修改
        Object.defineProperty(this, 'data', {
            // value: goods,
            // writable: false,
            configurable: false,
            // 读取器
            get() {
                console.log('get called');
                return goods
            },
            // 设置器
            set(val) {
                console.log(val, 'set called');
                throw new Error('data 属性不能修改')
            }
        })

        // 设置choose属性
        let intervalChooseValue = 0;
        Object.defineProperty(this, 'choose', {
            get() {
                return intervalChooseValue;
            },
            set(val) {
                console.log(val, 'choose set called');

                if (typeof val !== 'number') {
                    throw new Error('choose 必须设置为数字类型')
                }
                let temp = parseInt(val)
                if (val < 0 || temp !== val) {
                    throw new Error('choose 必须设置为整数且不小于0')
                }

                intervalChooseValue = val;
            }
        })

        // 求商品总额
        Object.defineProperty(this, 'totalPrice', {
            get() {
                return this.data.price * this.choose;
            }
        })
    }
}

let uiGoods = new UIGoods(goods);
// uiGoods.data = 'update' //  data 属性不能修改
// data属性没有被修改 { pic: '', title: '', desc: '', sellNumber: 1, favorRate: 2, price: 3 }
console.log(uiGoods.data, 'uiGoods.data');

// uiGoods.choose = -1; // choose 必须设置为整数且不小于0
// uiGoods.choose = '123' // choose 必须设置为数字类型
console.log(uiGoods.choose, 'choose');
uiGoods.choose = 3
console.log(uiGoods.totalPrice, 'totalPrice');



// 属性描述符
// { value: '', writable: true, enumerable: true, configurable: true }
console.log(Object.getOwnPropertyDescriptor(goods, 'pic'));

// 设置goods对象的pic属性不可遍历
Object.defineProperty(goods, 'pic', {
    enumerable: false
})

// 打印也看不到pic属性 { title: '', desc: '', sellNumber: 1, favorRate: 2, price: 3 }
console.log(goods);
// [ 'title', 'desc', 'sellNumber', 'favorRate', 'price' ]
console.log(Object.keys(goods));
