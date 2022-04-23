<template>
  <div class="vuex-root">
    <top-com></top-com>
  </div>
</template>

<script>
export default {
  name: "vuex",
  data() {
    return {};
  },
  mounted() {
    console.log("vuex-->", this.$store);
  },
};
</script>

<style>
</style>