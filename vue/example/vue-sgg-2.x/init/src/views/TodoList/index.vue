<template>
  <div class="todo-list-root">
    <top-com></top-com>
    <MyHeader :addTodo="addTodo"></MyHeader>
    <MyList :todoList="todoList"></MyList>
    <MyFooter :todoList="todoList"></MyFooter>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import pubsub from "pubsub-js";
import config from "@/utils/config";

import MyHeader from "./childrens/MyHeader.vue";
import MyList from "./childrens/MyList.vue";
import MyFooter from "./childrens/MyFooter.vue";

export default {
  components: { MyHeader, MyList, MyFooter },
  name: "TodoList",
  data() {
    return {
      todoList: JSON.parse(localStorage.getItem("TODO_LIST")) || [],
    };
  },
  watch: {
    todoList: {
      deep: true,
      handler(newVal) {
        localStorage.setItem("TODO_LIST", JSON.stringify(newVal));
      },
    },
  },
  methods: {
    // 添加待办事件
    addTodo(todo) {
      this.todoList.unshift(todo);
    },
    // 勾选/取消勾选待办事件
    checkTodo(_, id) {
      this.todoList.forEach((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    // 删除待办事件
    deleteTodo(_, id) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
    // 删除已完成事件
    deleteAllDone() {
      this.todoList = this.todoList.filter((item) => !item.done);
    },
    // 全部待办事件变为已完成
    allDoneTodo(_, value) {
      this.todoList.forEach((item) => {
        item.done = value;
      });
    },
    // 修改待办事件的名称
    updateTodoTitle(_, arg) {
      console.log("updateTodoTitle", arg.id);
      this.todoList.forEach((item) => {
        if (item.id === arg.id) {
          item.title = arg.title;
        }
      });
    },
  },
  mounted() {
    // 监听所有订阅消息
    this.setAllTodoPubId = pubsub.subscribe(
      config.SET_ALL_TODO,
      this.allDoneTodo
    );

    this.deleteDonePubId = pubsub.subscribe(
      config.DELETE_ALL_DONE,
      this.deleteAllDone
    );

    this.setCheckTodoPubId = pubsub.subscribe(
      config.SET_CHECK_TODO,
      this.checkTodo
    );

    this.deleteTodoPubId = pubsub.subscribe(
      config.DELETE_TODO,
      this.deleteTodo
    );

    this.editTodoTitlePubId = pubsub.subscribe(
      config.EDIT_TODO_TITLE,
      this.updateTodoTitle
    );
  },
  beforeDestroy() {
    // 取消所有订阅消息
    pubsub.unsubscribe(this.setAllTodoPubId);
    pubsub.unsubscribe(this.deleteDonePubId);
    pubsub.unsubscribe(this.setCheckTodoPubId);
    pubsub.unsubscribe(this.deleteTodoPubId);
    pubsub.unsubscribe(this.editTodoTitlePubId);
  },
};
</script>

<style lang="less">
.todo-list-root {
  cursor: pointer;
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #ccc;
  button {
    cursor: pointer;
  }
}
</style>