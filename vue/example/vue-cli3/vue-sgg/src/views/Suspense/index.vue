<template>
  <div class="suspense-root">
    <button @click="$router.go(-1)">返回</button>
    <p>这是Suspense组件</p>
    <Suspense>
      <template v-slot:default>
        <children></children>
      </template>
      <template v-slot:fallback>
        <p>加载中,请稍后...</p>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

// import children from "./children";
const children = defineAsyncComponent(() => import("./children"));

export default {
  name: "suspense",
  components: { children },
  setup() {},
};
</script>

<style>
.suspense-root {
  height: 500px;
  background: red;
}
</style>