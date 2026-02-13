<template>
  <div class="top-com-root">
    <div>
      {{ this.$route.name }}
      <button @click="$router.go(-1)">返回</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "top-com",
};
</script>

<style lang="less" scoped>
</style>