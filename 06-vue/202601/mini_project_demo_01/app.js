// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
   /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
   onShow: function () {
    console.log('onShow --- app')
  },
  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    console.log('onHide --- app')
  },
  globalData: {
    userInfo: null
  }
})
