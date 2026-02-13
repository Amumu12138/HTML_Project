// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    motto: 'Hello World',
    userType: 0,
    inputValue: ""
  },
  methods: {
    handleClick() {
      console.log('handleClick called');
      this.setData({
        userType: Number(!this.data.userType),
      })
    },
    bindViewLog() {
      wx.navigateTo({
        url: '../logs/logs'
      })
    }
  }
})
