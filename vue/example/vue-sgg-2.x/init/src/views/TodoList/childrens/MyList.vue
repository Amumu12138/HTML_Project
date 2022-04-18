<template>
  <div class="my-list-root">
    <Todo v-for="item in todoList" :key="item.id" :todoObj="item"></Todo>
  </div>
</template>

<script>
import Todo from "./Todo.vue";

export default {
  name: "MyList",
  props: ["todoList"],
  components: { Todo },
};
</script>

<style lang="less">
.my-list-root {
  border-bottom: 1px solid #ccc;
}
</style>