// components/custom.js
Component({
    // 生命周期
   lifetimes: {
      created() {
        console.log('created called');
      },
      // 在组件实例进入页面节点树时执行
      attached: function () {
        console.log('attached --- component')
      },
      // 在组件在视图层布局完成后执行
      ready: function () {
          console.log('ready --- component')
      },
      // 在组件实例被移动到节点树另一个位置时执行
      moved: function () {
          console.log('moved --- component')
      },
      // 在组件实例被从页面节点树移除时执行
      detached: function () {
          console.log('detached --- component')
      }
   },
  // 组件所在页面的生命周期
  pageLifetimes: {
    // 组件所在的页面被展示时执行
    show: function () {
        console.log('show --- component')
    },
    // 组件所在的页面被隐藏时执行
    hide: function () {
        console.log('hide --- component')
    },
    // 组件所在的页面尺寸变化时执行
    resize: function () {
        console.log('resize --- component')
    }
  }
})