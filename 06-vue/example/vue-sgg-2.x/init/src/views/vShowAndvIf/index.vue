<template>
  <div class="v-show-and-v-if-root">
    <top-com></top-com>
    <!-- 使用v-show做条件渲染 -->
    <h2 v-show="true">这是v-show语句</h2>
    <h1 v-if="true">这是v-if语句</h1>
    <p>v-if与template搭配使用</p>
    <template v-if="true">
      <h1>1</h1>
      <h1>2</h1>
      <h1>3</h1>
    </template>
  </div>
</template>

<script>
export default {
  name: "v-show-and-v-if",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.v-show-and-v-if-root {
  text-align: center;
}
</style>