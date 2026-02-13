<template>
  <div class="categroy-root">
    <h3>{{ title }}</h3>
    <!-- 放置默认插槽 -->
    <slot> 这里本来要显示默认插槽</slot>
    <br />
    <!-- 放置具名插槽 -->
    <slot name="test">这里本来要显示具名插槽</slot>
    <br />
    <!-- 放置作用域插槽 -->
    <slot name="test2" :footData="footData"> 这里本来要显示作用域插槽 </slot>
  </div>
</template>

<script>
export default {
  name: "categroy",
  props: ["title"],
  data() {
    return {
      footData: ["包子", "馒头", "面包"],
    };
  },
};
</script>

<style>
</style>