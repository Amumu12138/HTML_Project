<template>
  <div class="exception">
    <img src="../assets/images/404.png" />
    <el-button class="btn-home" @click="goHome">回首页</el-button>
  </div>
</template>

<script setup lang="ts">
import ROUTER from '@/router/router-constants'

const router = useRouter();
const goHome = () => {
  router.push(ROUTER.WELCOME)
}
</script>

<style lang="scss">
.exception {
  position: relative;

  img {
    width: 100%;
    height: 100vh;
  }

  .btn-home {
    position: absolute;
    left: 50%;
    bottom: 100px;
    margin-left: -34px;
  }
}
</style>