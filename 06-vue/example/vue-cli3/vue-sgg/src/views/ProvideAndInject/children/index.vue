<template>
  <div class="children-root">
    <p>这是children组件</p>
    <grade-children></grade-children>
  </div>
</template>

<script>
import { inject } from "vue";
import GradeChildren from "./children";

export default {
  name: "children",
  components: { GradeChildren },
  setup() {
    const childrenCar = inject("car");
    console.log("childrenCar -->", childrenCar);
  },
};
</script>

<style>
.children-root {
  background: green;
  height: 200px;
}
</style>