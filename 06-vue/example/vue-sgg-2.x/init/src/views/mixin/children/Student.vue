<template>
  <div class="student-root">
    <h1>{{ title }}</h1>
    <p>学生姓名: {{ name }}</p>
    <p>学生年龄: {{ age }}</p>
    <p>学生性别: {{ sex }}</p>
    <button @click="showName">显示姓名</button>
    <button @click="showData">显示混入数据</button>
  </div>
</template>

<script>
import { mixin } from "../js/mixin";

export default {
  name: "student",
  mixins: [mixin],
  props: ["name", "age", "sex"],
  data() {
    return {
      title: "学生信息",
    };
  },
  mounted() {
    console.log("Student mounted called");
  },
};
</script>

<style>
</style>