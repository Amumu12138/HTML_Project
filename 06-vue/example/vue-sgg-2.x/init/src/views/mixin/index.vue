<template>
  <div class="minix-root">
    <top-com></top-com>
    <School></School>
    <hr />
    <Student :name="zs.name" :age="zs.age" :sex="zs.sex"></Student>
    <hr />
    <Student :name="ls.name" :age="ls.age" :sex="ls.sex"></Student>
  </div>
</template>

<script>
import School from "./children/School.vue";
import Student from "./children/Student.vue";

export default {
  name: "mixin",
  components: { School, Student },
  data() {
    return {
      zs: {
        name: "张三",
        sex: "男",
        age: 20,
      },
      ls: {
        name: "李四",
        sex: "男",
        age: 24,
      },
    };
  },
};
</script>

<style>
.minix-root {
  background: skyblue;
}
</style>