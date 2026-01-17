// index.js

Page({
  data: {
    motto: 'Hello World',
    list: [],
    triggered: true
  },
  onLoad() {
    const data = []
    for (let i = 0; i < 50; i++) {
      data.push({
        id: i,
        name: '商品' + i,
        price: parseInt(Math.random() * 10)
      })
    }
    this.setData({
      list: data
    })
  },
  handleFresh() {
    setTimeout(() => {
      this.setData({
        triggered: false
      })
    }, 1000)
    console.log('触发')
  },
  toObserver() {
    wx.navigateTo({
      url: '../observer/observer'
    })
  },
  toMovableView() {
    wx.navigateTo({
      url: '../movable-area/movable-area'
    })
  }
})
