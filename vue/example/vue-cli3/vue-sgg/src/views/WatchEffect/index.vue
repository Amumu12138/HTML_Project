<template>
  <div>
    <p>Watch-Effect</p>
    <button @click="$router.go(-1)">返回</button>
    <h1>name: {{ person.name }}</h1>
    <h1>age: {{ person.age }}</h1>
    <button @click="person.name += '!'">改变name</button>
    <button @click="person.age++">改变age</button>
  </div>
</template>

<script>
import { reactive, watchEffect } from "vue";
export default {
  name: "watch-effect",
  setup() {
    const person = reactive({
      name: "Amumu",
      age: 24,
    });

    watchEffect(() => {
      var a = person.age++;
      console.log("watchEffect 监听到数据发生改变");
    });

    return {
      person,
    };
  },
};
</script>

<style>
</style>