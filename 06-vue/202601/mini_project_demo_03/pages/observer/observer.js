Component({
  data: {
    products: [],
    totalPrice: 0
  },
  lifetimes: {
    ready() {
      setTimeout(() => {
        this.setData({
          products: [
            {
              name: '华为 Mate 50E4G',
              num: 1,
              price: 3999
            },
            {
              name: '苹果 12 手机5G',
              num: 1,
              price: 7400
            }
          ]
        })
      }, 1000)
    }
  },
  methods: {
    handleChange(e) {
      console.log(e)
      const { index, type } = e.currentTarget.dataset
      const data = JSON.parse(JSON.stringify(this.data.products))
      if(data[index].num <= 0 && type === 'del') {
        return;
      }
      
      if (type === 'add') {
        data[index].num += 1
      } else {
        data[index].num -= 1
      }
      this.setData({
        products: data
      })
    }
  },
  // 监听属性: 类似于vue中watch
  observers: {
    products: function () {
      const totalPrice = this.data.products.reduce((sum, item) => {
        return sum + (item.price * item.num)
      }, 0)
      this.setData({
        totalPrice
      })
    }
  }
})