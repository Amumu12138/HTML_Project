<template>
  <div class="to-ref-root">
    <p>TOREF</p>
    <button @click="$router.go(-1)">返回</button>
  </div>
</template>

<script>
import { toRef, toRefs } from "vue";

export default {
  name: "to-ref",
  setup() {
    return {};
  },
};
</script>

<style>
</style>