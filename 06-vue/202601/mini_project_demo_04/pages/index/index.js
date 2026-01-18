// index.js

Page({
  data: {
    motto: 'Hello World',
  },
  toShopList() {
    console.log('toShopList called');
    //navigateTo
    wx.navigateTo({
      url: '../shop-list/shop-list'
    })
  },
  toCanvas() {
    wx.navigateTo({
      url: '../canvas/canvas'
    })
  }
})
