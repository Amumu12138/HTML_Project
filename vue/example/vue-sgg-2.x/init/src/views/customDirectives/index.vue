<template>
  <div class="custom-directives-root">
    <top-com></top-com>
    <h2>{{ name }}</h2>
    <h2>当前的n值是: <span v-text="n"></span></h2>
    <h2>放大10倍后n值是: <span v-big="n"></span></h2>
    <button @click="n++">n++</button>
    <button @click="name += '!'">修改name</button>
    <hr />
    <input type="text" v-abind:value="n" />
  </div>
</template>

<script>
export default {
  name: "cutsom-directives",
  data() {
    return {
      name: "Amumu",
      n: 1,
    };
  },
  //   自定义指令
  directives: {
    //  big函数何时会被调用: 1、指令与元素成功绑定 2、指令所在的模板被重新解析
    big(element, binding) {
      console.log("big called", " this -->", this); //this --> undefined
      element.innerText = binding.value * 10;
    },
    abind(element, binding) {
      console.log("fbind called", this); //this --> undefined
      element.value = binding.value;
      // 鼠标聚焦
      element.focus();
    },
    // 对象形式 (vue3.0 被废弃)
    // abind: {
    //   // 指令与元素成功绑定时(一上来)
    //   bind(element, binding) {
    //     console.log("fbind bind called");
    //     element.value = binding.value;
    //   },
    //   // 指令所在元素被插入页面时
    //   inserted(element, binding) {
    //     console.log("fbind  inserted");
    //     element.focus();
    //   },
    //   // 指令所在的模板被重新解析时
    //   update(element, binding) {
    //     console.log("fbind  update");
    //     element.value = binding.value;
    //   },
    // },
  },
};
</script>

<style>
</style>