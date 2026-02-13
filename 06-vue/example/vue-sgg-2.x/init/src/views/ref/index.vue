<template>
  <div class="ref-root">
    <top-com></top-com>
    <h1 ref="h1">this is h1</h1>
    <button ref="btn" @click="showDom">输出h1DOM</button>
    <School ref="school"></School>
  </div>
</template>

<script>
import School from "./children/School.vue";

export default {
  name: "ref",
  components: { School },
  data() {
    return {};
  },
  methods: {
    showDom() {
      console.log(this.$refs);
      console.log(this.$refs.h1);
      console.log(this.$refs.btn);
      console.log(this.$refs.school);
    },
  },
};
</script>

<style>
</style>