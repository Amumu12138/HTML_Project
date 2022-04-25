<template>
  <div class="vuex-root">
    <top-com></top-com>
    <Count></Count>
    <hr />
    <Person></Person>
  </div>
</template>

<script>
import Count from "./childrens/Count";
import Person from "./childrens/Person";

export default {
  name: "vuex",
  components: { Count, Person },
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