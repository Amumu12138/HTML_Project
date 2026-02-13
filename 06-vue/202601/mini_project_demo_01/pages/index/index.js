// index.js
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
  },
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    console.log('onLoad --- page', app)
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log('onReady --- page')
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('onShow --- page')
  },
   /**
   * 生命周期函数--监听页面隐藏
   */
   onHide: function () {
    console.log('onHide --- page')
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log('onUnload --- page')
  },
  bindViewTap(e) {
    console.log(e, 'bindViewTap called');
    // url路径不能在app.json注册为tabBar
    // wx.navigateTo({
    //   url: '../navigate/navigate'
    // })
    // 路由替换,类似于replace, 右上角图标会变为“回到首页”
     wx.redirectTo({
      url: '../navigate/navigate'
    })
  }
})
