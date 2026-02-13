// components/my-component/my-component.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    // 自定义组件双向绑定实现
    inputText: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    updateInputText() {
      this.setData({
        inputText: 'this is inputText'
      })
    }
  }
})