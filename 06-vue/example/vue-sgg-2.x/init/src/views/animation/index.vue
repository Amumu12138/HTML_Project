<template>
  <div class="animation-root">
    <top-com></top-com>
    <button @click="isShow = !isShow">{{ isShow ? "隐藏" : "显示" }}</button>
    <transition name="test" appear>
      <h1 v-show="isShow">this is animation</h1>
    </transition>
  </div>
</template>

<script>
export default {
  name: "animation",
  data() {
    return {
      isShow: true,
    };
  },
};
</script>

<style lang="less" scoped>
.animation-root {
  h1 {
    background: skyblue;
  }

  .test-enter-active {
    animation: move 0.5s linear;
  }

  .test-leave-active {
    animation: move 0.5s linear reverse;
  }

  @keyframes move {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>