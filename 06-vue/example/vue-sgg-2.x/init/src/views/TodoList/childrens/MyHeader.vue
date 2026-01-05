<template>
  <div class="my-header-root">
    <p>this is MyHeader</p>
    <input
      type="text"
      v-model="title"
      placeholder="请输入要做的事情"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import { nanoid } from "nanoid";

export default {
  name: "MyHeader",
  props: ["addTodo"],
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      // 输入不能为空字符串
      if (!this.title.trim()) return;
      const todoObj = {
        id: nanoid(),
        title: this.title,
        done: false,
      };
      console.log(todoObj);
      this.addTodo(todoObj);
      this.title = "";
    },
  },
};
</script>

<style lang="less">
.my-header-root {
  padding: 10px;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  input {
    width: 500px;
    padding: 5px;
  }
}
</style>