<template>
  <div id="app">
      <router-link to="/login"> 登录页 </router-link>
      <router-link to="/main"> 首页 </router-link>
      <router-link to="/helloworld"> HelloWorld </router-link>
      <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
