<template>
  <div class="children-root">
    <p>这是Children组件</p>
    <p>sum: {{ sum }}</p>
  </div>
</template>

<script>
import { readonly, ref } from "vue";

export default {
  name: "children",
  async setup() {
    let sum = ref(0);

    let obj = new Promise((resolve, inject) => {
      setTimeout(() => {
        resolve({ sum });
      }, 3000);
    });
    return await obj;
  },
};
</script>

<style>
.children-root {
  height: 200px;
  background: green;
}
</style>