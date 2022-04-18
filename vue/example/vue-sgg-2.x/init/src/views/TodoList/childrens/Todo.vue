<template>
  <div class="todo-root">
    <input
      type="checkbox"
      :checked="todoObj.done"
      @change="handleCheck(todoObj.id)"
    />
    <span v-if="!todoObj.isEdit">{{ todoObj.title }}</span>
    <input
      v-else
      ref="inputTodo"
      :value="todoObj.title"
      type="text"
      @blur="handleBlur(todoObj, $event)"
    />
    <div class="right-box">
      <button
        v-show="!todoObj.isEdit"
        class="edit-btn"
        @click="handleEdit(todoObj)"
      >
        编辑
      </button>
      <button class="delete-btn" @click="handleDelete(todoObj.id)">删除</button>
    </div>
  </div>
</template>

<script>
import pubsub from "pubsub-js";
import config from "@/utils/config";

export default {
  name: "todo",
  props: ["todoObj"],
  methods: {
    handleCheck(id) {
      pubsub.publish(config.SET_CHECK_TODO, id);
      //   this.checkTodo(id);
    },
    handleDelete(id) {
      pubsub.publish(config.DELETE_TODO, id);
      //   this.deleteTodo(id);
    },
    handleEdit(todo) {
      todo.isEdit = true;

      console.log(this.$refs);
      this.$nextTick(function () {
        this.$refs.inputTodo.focus();
      });
    },
    handleBlur(todo, e) {
      console.log("handleBlur", todo.id, e.target.value);
      todo.isEdit = false;
      if (!e.target.value.trim()) return alert("输入字符串不能为空");
      pubsub.publish(config.EDIT_TODO_TITLE, {
        id: todo.id,
        title: e.target.value,
      });
    },
  },
};
</script>

<style lang="less">
.todo-root {
  width: 500px;
  height: 50px;
  margin: 0 auto;
  text-align: left;
  line-height: 50px;
  .right-box {
    float: right;
    display: none;
    .delete-btn,
    .edit-btn {
      margin-right: 10px;
    }
  }

  &:hover {
    background: #ddd;
    .right-box {
      display: block;
    }
  }
}
</style>