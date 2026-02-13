<template>
  <div class="count-root">
    <h1>当前求和: {{ sum }}</h1>
    <h2>当前人数总和: {{ personLen }}</h2>
    <hr />
    <button @click="handleAdd">增加当前求和</button>
    <button @click="handleReduce">减少当前求和</button>
    <button @click="handleOdd">当前求和为奇数再加</button>
    <button @click="handleAwait">等一等再加</button>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
  name: "count",
  data() {
    return {};
  },
  computed: {
    ...mapState("num", ["sum"]),
    ...mapGetters("person", ["personLen"]),
  },
  methods: {
    // 以对象形式 借助mapMutations生成
    ...mapMutations("num", { increment: "INCREMENT", decrement: "DECREMENT" }),
    // 以数组形式 借助mapActions生成
    ...mapActions("num", ["incrementOdd", "incrementAwait"]),
    handleAdd() {
      this.increment(2);
    },
    handleReduce() {
      this.decrement(1);
    },
    handleOdd() {
      this.incrementOdd(1);
    },
    handleAwait() {
      this.incrementAwait(1);
    },
  },
};
</script>

<style>
</style>