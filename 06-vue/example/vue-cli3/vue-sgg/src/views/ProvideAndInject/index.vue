<template>
  <div class="provide-and-inject-root">
    <button @click="$router.go(-1)">返回</button>
    <p>这是祖组件</p>
    <p>car: name-{{ name }} --- price-{{ price }}</p>
    <Children></Children>
  </div>
</template>

<script>
import { reactive, toRefs, provide } from "vue";
import Children from "./children";
export default {
  name: "provide-and-inject",
  components: { Children },
  setup() {
    const car = reactive({
      name: "BMW",
      price: 100,
    });

    provide("car", car);
    console.log("car -->", car);

    return {
      ...toRefs(car),
    };
  },
};
</script>

<style>
.provide-and-inject-root {
  background: yellow;
  height: 500px;
  padding: 10px;
}
</style>