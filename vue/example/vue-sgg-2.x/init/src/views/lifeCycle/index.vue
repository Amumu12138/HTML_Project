<template>
  <div class="life-cycle-root">
    <top-com></top-com>
    <h1>n的值: {{ n }}</h1>
    <button @click="add">增加n</button>
    <button @click="destroy">销毁实例</button>
  </div>
</template>

<script>
export default {
  name: "life-cycle",
  data() {
    return {
      n: 1,
    };
  },
  methods: {
    add() {
      this.n++;
    },
    destroy() {
      console.log("destroy");
    },
  },
  //   创建之前的回调函数
  beforeCreate() {
    console.log("beforeCreate this -->", this);
    // debugger;
  },
  //   创建完毕的回调函数
  created() {
    console.log("created this -->", this);
  },
  // 挂载之前的回调函数
  beforeMount() {
    // debugger;
    console.log("beforeMount");
  },
  // 挂载之前的回调函数
  mounted() {
    console.log("mounted");
  },
  // 更新数据之前的回调函数
  beforeUpdate() {
    console.log("beforeUpdate");
  },
  // 更新数据完毕的回调函数
  updated() {
    console.log("updated");
  },
  //  销毁实例之前的回调函数
  beforeDestroy() {
    console.log("beforeDestroy");
  },
  // 销毁实例完毕的回调函数
  destroyed() {
    console.log("destroy");
  },
};
</script>

<style>
</style>