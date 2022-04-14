<template>
  <div class="todo-root">
    <input
      type="checkbox"
      :checked="todoObj.done"
      @change="handleCheck(todoObj.id)"
    />
    <span>{{ todoObj.title }}</span>
    <button class="delete-btn" @click="handleDelete(todoObj.id)">删除</button>
  </div>
</template>

<script>
export default {
  name: "todo",
  props: ["todoObj", "checkTodo", "deleteTodo"],
  methods: {
    handleCheck(id) {
      this.checkTodo(id);
    },
    handleDelete(id) {
      this.deleteTodo(id);
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
  .delete-btn {
    display: none;
    float: right;
    margin-right: 10px;
  }

  &:hover {
    background: #ddd;
    .delete-btn {
      display: block;
    }
  }
}
</style>