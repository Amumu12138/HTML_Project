/** 数据逻辑 */
// UI商品类
class UIGoods {
    constructor(g) {
        this.data = g
        this.choose = 0
    }
    // 获取总价
    getTotalPrice() {
        return this.data.price * this.choose
    }

    // 是否选中了此件商品
    isChoose() {
        return this.choose > 0
    }

    // 选择数量增加
    increase() {
        this.choose++
    }

    // 选择数量减少
    decrease() {
        if (this.isChoose()) {
            this.choose--
        }
    }
}

// UI数据类
class UIData {
    constructor() {
        this.uiGoods = goods.map(item => new UIGoods(item));
        this.deliveryThreshold = 30;
        this.deliveryPrice = 5;
    }

    // 获取全部商品总价
    getTotalPrice() {
        return this.uiGoods.reduce(((prev, next) => prev + next.getTotalPrice()), 0)
    }

    // 根据index增加某件商品的选中数量
    increase(index) {
        this.uiGoods[index].increase()
    }

    // 根据index减少某件商品的选中数量
    decrease(index) {
        this.uiGoods[index].decrease()
    }

    // 获取总共选择中商品数量
    getTotalChooseNumber() {
        return this.uiGoods.reduce((prev, next) => prev + next.choose, 0)
    }

    // 购物车中是否有商品
    hasGoodsInCar() {
        return this.getTotalChooseNumber() > 0
    }

    // 是否跨越了配送门槛
    hasCrossDeliveryThreshold() {
        return this.getTotalPrice() >= this.deliveryThreshold;
    }

    // 获取配送费用+商品总价
    getTotalMoney() {
        return this.deliveryPrice + this.getTotalPrice();
    }

    // 根据下标index判断是否选中了此件商品
    isChoose(index) {
        return this.uiGoods[index].isChoose()
    }
}

/** 页面逻辑 */
class UI {
    constructor() {
        this.uiData = new UIData()
        this.doms = {
            goodsContainer: document.querySelector('.goods-list'),
            deliveryPrice: document.querySelector('.footer-car-tip'),
            footerPay: document.querySelector('.footer-pay'),
            footerPayInnerLink: document.querySelector('.footer-pay a'),
            footerPayInnerDiv: document.querySelector('.footer-pay div'),
            footerCarPrice: document.querySelector('.footer-car-price'),
            footerCar: document.querySelector('.footer-car')
        }

        const reactTarget = this.doms.footerCar.getBoundingClientRect()
        console.log(reactTarget, 'reactTarget');

        this.jumpTarget = {
            x: reactTarget.left + reactTarget.width / 2,
            y: reactTarget.top + reactTarget.height / 5
        }
        console.log(this.jumpTarget, 'jumpTarget');

        this.createHTML()
        // this.updateFooter()
        this.listenEvent()
    }

    // 根据商品数据创建商品列表元素
    // 1、生成html字符串(执行效率低,开发效率高)
    // 2、一个一个创建元素(执行效率高,开发效率低)
    createHTML() {
        let html = '';
        for (let index = 0; index < this.uiData.uiGoods.length; index++) {
            let g = this.uiData.uiGoods[index];
            console.log(g, 'g');

            html += `
                <div class="goods-item">
                    <img src="${g.data.pic}" class="goods-pic" />
                    <div class="goods-info">
                        <div class="goods-title">${g.data.title}</div>
                        <p class="goods-desc">${g.data.desc}</p>
                        <p class="goods-sell">
                            <span> 月售 ${g.data.sellNumber}</span>
                            <sapn> 好评率 ${g.data.favorRate}%</span>
                        </p>
                        <di class="goods-confirm">
                            <p class="goods-price">
                                <span class="goods-price-unit">¥</span>
                                <span>${g.data.price}</span>
                            </p>
                            <div class="goods-btns">
                                <button index=${index} class="btn decrease"> - </button>
                                <span>${g.choose}</span>
                                <button index=${index} id="add" class="btn"> + </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }
        this.doms.goodsContainer.innerHTML = html;
        // console.log(html, 'html');
    }

    // 根据index增加某件商品的选中数量,并更新页面逻辑
    increase(index) {
        this.uiData.increase(index)
        this.updateGoodsItem(index)
        this.updateFooter()
        this.jump(index);
    }

    // 根据index减少某件商品的选中数量,并更新页面逻辑
    decrease(index) {
        this.uiData.decrease(index)
        this.updateGoodsItem(index)
        this.updateFooter()
    }

    // 更新商品信息
    updateGoodsItem(index) {
        const goodsDom = this.doms.goodsContainer.children[index]
        if (this.uiData.isChoose(index)) {
            goodsDom.querySelector('.decrease').classList.add('active')
        } else {
            goodsDom.querySelector('.decrease').classList.remove('active')
        }
        goodsDom.querySelector('.goods-btns span').textContent = this.uiData.uiGoods[index].choose;
    }

    // 更新页脚详细信息
    updateFooter() {
        // 设置配送费
        this.doms.deliveryPrice.textContent = `配送费¥${this.uiData.deliveryPrice}`
        // 设置起送配置状态
        if (this.uiData.hasCrossDeliveryThreshold()) {
            this.doms.footerPay.classList.add('footer-pay-active')
            this.doms.footerPayInnerDiv.classList.add('money-hidden')
            this.doms.footerPayInnerLink.classList.add('footer-pay-a-show')
        } else {
            this.doms.footerPay.classList.remove('footer-pay-active')
            this.doms.footerPayInnerLink.classList.remove('footer-pay-a-show')
            this.doms.footerPayInnerDiv.classList.remove('money-hidden')
        }
        // 设置总价
        const total = this.uiData.getTotalMoney()
        console.log(total, 'total');

        this.doms.footerCarPrice.textContent = `¥${total.toFixed(2)}`
        // 设置购物车中的数量
        const count = this.uiData.getTotalChooseNumber();
        this.doms.footerCar.textContent = `购物车 (${count})`

        // 设置购物车状态
        if (this.uiData.hasGoodsInCar()) {
            this.doms.footerCar.classList.add('footer-car-active')
        } else {
            this.doms.footerCar.classList.remove('footer-car-active')
        }
    }

    // 注册监听事件
    listenEvent() {
        this.doms.footerCar.addEventListener('animationend', function () {
            console.log('over');
            this.classList.remove('footer-car-animate')
        })
    }


    // 购物车缩放动画
    carAnimate() {
        this.doms.footerCar.classList.add('footer-car-animate')
    }

    // 抛物线跳跃元素
    jump(index) {
        const btnAdd = this.doms.goodsContainer.children[index].querySelector('#add')
        const btnAddReact = btnAdd.getBoundingClientRect()
        console.log(btnAddReact, 'btnAddReact');
        const start = {
            x: btnAddReact.left,
            y: btnAddReact.top
        }
        // 添加跳跃元素
        const addToCar = document.createElement('div')
        addToCar.className = 'add-to-car';
        const span = document.createElement('span')

        // 设置初始位置
        addToCar.style.transform = `translateX(${start.x}px)`
        span.style.transform = `translateY(${start.y}px)`
        addToCar.append(span);
        document.body.append(addToCar)
        // 强行渲染
        addToCar.clientWidth
        // requestAnimationFrame(() => {
        //  })
        // 设置结束位置
        addToCar.style.transform = `translateX(${this.jumpTarget.x}px)`
        span.style.transform = `translateY(${this.jumpTarget.y}px)`

        addToCar.addEventListener('transitionend', () => {
            console.log('addToCar transitionend called');
            // 删除跳跃元素
            addToCar.remove()
            this.carAnimate()
        }, {
            once: true
        })
    }
}

const ui = new UI()
ui.doms.goodsContainer.addEventListener('click', function (e) {

    const index = +e.target.getAttribute('index')
    console.log(e, index, 'e');
    if (e.target.id === 'add') {
        console.log('add called');

        ui.increase(index)
    } else if (e.target.classList.contains('decrease')) {
        console.log('btn decrease');
        ui.decrease(index)
    }
})
