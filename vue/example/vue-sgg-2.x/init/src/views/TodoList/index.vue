<template>
  <div class="todo-list-root">
    <top-com></top-com>
    <MyHeader :addTodo="addTodo"></MyHeader>
    <MyList
      :todoList="todoList"
      :checkTodo="checkTodo"
      :deleteTodo="deleteTodo"
    ></MyList>
    <MyFooter
      :todoList="todoList"
      :deleteAllDone="deleteAllDone"
      :allDoneTodo="allDoneTodo"
    ></MyFooter>
  </div>
</template>

<script>
import MyHeader from "./childrens/MyHeader.vue";
import MyList from "./childrens/MyList.vue";
import MyFooter from "./childrens/MyFooter.vue";

import { nanoid } from "nanoid";
export default {
  components: { MyHeader, MyList, MyFooter },
  name: "TodoList",
  data() {
    return {
      todoList: [
        { id: nanoid(), title: "吃饭", done: true },
        { id: nanoid(), title: "睡觉", done: true },
        { id: nanoid(), title: "打豆豆", done: false },
      ],
    };
  },
  methods: {
    // 添加待办事件
    addTodo(todo) {
      this.todoList.unshift(todo);
    },
    // 勾选/取消勾选待办事件
    checkTodo(id) {
      this.todoList.forEach((item) => {
        if (item.id === id) {
          item.done = !item.done;
        }
      });
    },
    // 删除待办事件
    deleteTodo(id) {
      this.todoList = this.todoList.filter((item) => item.id !== id);
    },
    // 删除已完成事件
    deleteAllDone() {
      this.todoList = this.todoList.filter((item) => !item.done);
    },
    // 全部待办事件变为已完成
    allDoneTodo(value) {
      this.todoList.forEach((item) => {
        item.done = value;
      });
    },
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