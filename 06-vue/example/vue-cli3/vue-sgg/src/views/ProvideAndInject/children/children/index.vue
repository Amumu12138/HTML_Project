<template>
  <div class="grade-children-root">
    <p>这是gradeChildren组件</p>
    <p>gradeChildrenCar: {{ name }}---{{ price }}</p>
  </div>
</template>

<script>
import { inject, toRefs } from "vue";

export default {
  name: "grade-children",
  setup() {
    const gradeChildrenCar = inject("car");
    console.log("gradeChildrenCar -->", gradeChildrenCar);
    return {
      ...toRefs(gradeChildrenCar),
    };
  },
};
</script>

<style>
.grade-children-root {
  background: red;
  height: 100px;
}
</style>