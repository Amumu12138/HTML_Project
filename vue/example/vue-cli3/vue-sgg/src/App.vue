<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  name: "App",
  components: {},
  // vue3配置
  setup() {
    let name = "Amumu";
    let age = 24;

    let name02 = ref("Amumu12138");
    const info = reactive({
      name: "Amumu",
      age: 24,
      typeName: "前端工程师",
      salary: "100k",
    });

    function sayHi() {
      alert(`我的名字是${name}, 年龄是${age++}, 你好`);
    }

    function changeName02() {
      name02.value = "amumu12139";
      console.log("changeName02 -->", name02);
    }

    function changeInfo() {
      info.typeName = "打杂的";
      info.salary = "1k";
      console.log("Amumu info -->", info);
    }

    return {
      name,
      age,
      name02,
      info,
      sayHi,
      changeName02,
      changeInfo,
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
