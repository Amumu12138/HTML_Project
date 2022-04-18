<template>
  <div class="my-footer-root" v-show="todoTotal">
    <input type="checkbox" v-model="isAll" />
    <span>已完成{{ doneTotal }}/全部 {{ todoTotal }}</span>
    <button class="all-delete-btn" @click="handleDeleteDone">删除已完成</button>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import config from "@/utils/config";

export default {
  name: "MyFooter",
  props: ["todoList", "deleteAllDone", "allDoneTodo"],
  data() {
    return {};
  },
  computed: {
    isAll: {
      get() {
        return this.doneTotal === this.todoTotal && this.todoTotal > 0;
      },
      set(value) {
        console.log(value);
        pubsub.publish(config.SET_ALL_TODO, value);
        // this.allDoneTodo(value);
      },
    },
    doneTotal() {
      return this.todoList.reduce(
        (pre, current) => pre + (current.done ? 1 : 0),
        0
      );
    },
    todoTotal() {
      return this.todoList.length;
    },
  },
  methods: {
    handleDeleteDone() {
      pubsub.publish(config.DELETE_ALL_DONE);
      //   this.deleteAllDone();
    },
  },
};
</script>

<style lang="less">
.my-footer-root {
  width: 500px;
  height: 50px;
  margin: 0 auto;
  text-align: left;
  line-height: 50px;
  p {
    text-align: center;
  }
  .all-delete-btn {
    float: right;
    margin-right: 10px;
  }
}
</style>