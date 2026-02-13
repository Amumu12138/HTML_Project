Page({
  data: {
    x: 0,
    y: 0,
    scale: 2,
  },

  tap() {
    this.setData({
      x: 30,
      y: 30
    })
  },

  tap2() {
    this.setData({
      scale: 3
    })
  },

  tapMin() {
    this.setData({
      scale: 0.5
    })
  },


  onChange(e) {
    console.log(e.detail,'onChange')
  },

  onScale(e) {
    console.log(e.detail,'onScale')
  }
})