// index.js

Page({
  data: {
    delBtnWidth: 120, //删除按钮宽度单位（rpx）
    items: [
      {
        left: '',
        active: false,
        pic: '',
        name: '111',
        skuName: '111',
        selected: false
      }
    ],
  },
  onLoad() {
    this.setData({
      delBtnWidth: this.getEleWidth(this.data.delBtnWidth)
    });
  },
  radioClick(e) {
    console.log(e, 'radioClick');

    let index = e.currentTarget.dataset.index;
    const copyItems = JSON.parse(JSON.stringify(this.data.items))
    copyItems[index].selected = !copyItems[index].selected
    this.setData({
      items: copyItems
    })
  },
  getEleWidth(w) {
    let real = 0;
    try {
      let res = wx.getSystemInfoSync().windowWidth
      console.log(res, 'res')
      // 窗口是给的px单位，需要换算成rpx
      let scale = (750 / 2) / (w / 2)
      // console.log(scale);
      real = Math.floor(res / scale);
      console.log(real, 'real');

      return real;
    } catch (e) {
      return false;
      // Do something when catch error
    }
  },
  // 触摸开始
  touchStart(e) {
    console.log(e, 'touchStart');
    if (e.touches.length == 1) {
      this.setData({
        startX: e.touches[0].clientX
      });
    }
  },
  // 触摸移动
  touchMove(e) {
    console.log(e, 'touchMove');
    const index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      let moveX = e.touches[0].clientX;
      let disX = this.data.startX - moveX;
      let delBtnWidth = this.data.delBtnWidth;
      let left = "";
      //如果移动距离小于等于0，container位置不变
      if (disX == 0 || disX < 0) {
        left = "margin-left:0px";
      } else if (disX > 0) {
        //移动距离大于0，container left值等于手指移动距离
        left = "margin-left:-" + disX + "px";
        if (disX >= delBtnWidth) {
          left = "margin-left:-" + delBtnWidth + "px";
        }
      }
      const copyItems = JSON.parse(JSON.stringify(this.data.items))
      copyItems[index].left = left
      this.setData({
        items: copyItems
      })
    }
  },
  // 触摸结束
  touchEnd(e) {
    console.log(e, 'touchEnd');
    let index = e.currentTarget.dataset.index;
    if (e.changedTouches.length == 1) {
      let endX = e.changedTouches[0].clientX;
      let disX = this.data.startX - endX;
      let delBtnWidth = this.data.delBtnWidth;
      //如果距离小于删除按钮的1/2，不显示删除按钮
      let left = disX > delBtnWidth / 2 ? "margin-left:-" + delBtnWidth + "px" : "margin-left:0px";

      const copyItems = JSON.parse(JSON.stringify(this.data.items))
      copyItems[index].left = left
      this.setData({
        items: copyItems
      })
    }
  }
})
