<template>
  <div class="vue-router-root">
    <top-com></top-com>
  </div>
</template>

<script>
export default {
  name: "vue-router",
  data() {
    return {};
  },
  mounted() {
    console.log("vue router -->", this.$router, this.$route);
  },
  // 进入守卫: 通过路由规则,进入该组件时被调用
  beforeRouteLeave(to, form, next) {
    console.log("vue router beforeRouteLeave");
    next();
  },
  // 离开守卫: 通过路由规则,离开该组件时被调用
  beforeRouteLeave(to, form, next) {
    console.log("vue router beforeRouteLeave");
    next();
  },
};
</script>

<style>
</style>