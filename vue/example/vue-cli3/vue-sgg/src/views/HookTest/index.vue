<template>
  <div class="hook-test-root">
    <button @click="$router.go(-1)">返回</button>
    <p>当前坐标x:{{ x }}</p>
    <p>当前坐标y:{{ y }}</p>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import usePoint from "@/hooks/usePoint";

export default {
  name: "hook-test",
  setup() {
    const point = usePoint();

    return {
      ...toRefs(point),
    };
  },
};
</script>

<style>
</style>