<template>
  <div class="watch-root">
    <top-com></top-com>
    <div>今天天气好{{ isHot ? "炎热" : "凉爽" }}</div>
    <button @click="isHot = !isHot">改变天气状态</button>
    <p>a: {{ number.a }}</p>
    <p>b: {{ number.b }}</p>
    <button @click="number.a++">增加a</button>
    <button @click="number.b++">增加b</button>
  </div>
</template>

<script>
export default {
  name: "watch",
  data() {
    return {
      isHot: true,
      number: {
        a: 1,
        b: 2,
        c: {
          d: 3,
        },
      },
    };
  },
  watch: {
    isHot: {
      handler(newVal, oldVal) {
        console.log("newVal -->", newVal, " oldVal -->", oldVal);
      },
    },
    "number.a": {
      handler(newVal) {
        console.log("number.a newVal -->", newVal);
      },
    },
    number: {
      immediate: true, // 初始化时让handle调用一下
      deep: true, // 深度监视
      handler(newVal, oldVal) {
        // 开启深度监视,Vue3.0只显示newVal的值,不显示oldVal
        console.log("number newVal -->", newVal, " oldVal -->", oldVal);
      },
    },
  },
  methods: {},
};
</script>

<style>
</style>