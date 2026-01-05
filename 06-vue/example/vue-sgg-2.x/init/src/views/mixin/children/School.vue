<template>
  <div>
    <h1>{{ title }}</h1>
    <p>学校名称: {{ name }}</p>
    <p>学校地址: {{ adress }}</p>
    <button @click="showName">显示名称</button>
  </div>
</template>

<script>
import { mixin } from "../js/mixin";

export default {
  name: "school",
  mixins: [mixin],
  data() {
    return {
      title: "学校信息",
      name: "尚硅谷",
      adress: "深圳",
    };
  },
  mounted() {
    console.log("School mounted called");
  },
};
</script>

<style>
</style>