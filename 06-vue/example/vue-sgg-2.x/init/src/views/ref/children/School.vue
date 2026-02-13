<template>
  <div class="school-root">
    <p>学校名称: {{ name }}</p>
    <p>学校地址: {{ address }}</p>
  </div>
</template>

<script>
export default {
  name: "school",
  data() {
    return {
      name: "尚硅谷",
      address: "深圳",
    };
  },
};
</script>

<style lang="less">
.school-root {
  padding: 4px;
  background: gray;
}
</style>