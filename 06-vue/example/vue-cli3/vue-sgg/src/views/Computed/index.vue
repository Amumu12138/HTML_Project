<template>
  <div class="computed-root">
    <p>计算属性</p>
    <button @click="$router.go(-1)">返回</button>
    <div>姓: <input type="text" v-model="person.firstName" /></div>
    <p>名:<input type="text" v-model="person.secondName" /></p>
    <br />
    <span>姓名:{{ person.fullName }}</span>
    <br />
    <div>请输入新的姓名: <input type="text" v-model="person.fullName" /></div>
  </div>
</template>

<script>
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "computed",
  setup() {
    const person = reactive({
      firstName: "Amumu",
      secondName: "12138",
    });

    person.fullName = computed({
      get() {
        return person.firstName + "-" + person.secondName;
      },
      set(newVal) {
        let names = newVal.split("-");
        person.firstName = names[0];
        person.secondName = names[1];
      },
    });
    return {
      person,
    };
  },
};
</script>

<style>
</style>