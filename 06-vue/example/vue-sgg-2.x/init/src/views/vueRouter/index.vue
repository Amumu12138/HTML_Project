<template>
  <div class="vue-router-root">
    <top-com></top-com>
    <h1>Vue Router</h1>
    <div class="nav">
      <router-link
        class="nav-item"
        active-class="nav-item-active"
        to="/vue-router/about"
        >About</router-link
      >
      <router-link
        class="nav-item"
        active-class="nav-item-active"
        to="/vue-router/home"
        >Home</router-link
      >
    </div>
    <div class="views">
      <router-view></router-view>
    </div>
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

<style lang="less" scoped>
.vue-router-root {
  .nav {
    display: flex;
    flex-direction: column;
    .nav-item {
      margin: 0 auto;
      width: 100px;
      height: 40px;
      line-height: 40px;
      padding: 4px;
      border: 1px solid #ccc;
    }
    .nav-item-active {
      background: skyblue;
    }
  }
}
</style>