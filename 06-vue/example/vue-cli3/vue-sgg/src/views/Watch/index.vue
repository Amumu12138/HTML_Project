<template>
  <div class="watch-root">
    <p>WATCH</p>
    <button @click="$router.go(-1)">返回</button>
    <h5>name: {{ name }}</h5>
    <h5>age: {{ age }}</h5>
    <button @click="name += '2'">改变name</button>
    <button @click="age++">改变age</button>
    <br />
    <p>person信息</p>
    <h4>name: {{ person.name }}</h4>
    <h4>age: {{ person.age }}</h4>
    <h4>salary: {{ person.job.j1.salary }}w</h4>
    <button @click="person.name += '2'">改变person的name</button>
    <button @click="person.age++">改变person的age</button>
    <button @click="person.job.j1.salary++">改变person的salary</button>
    <br />
    <p>testObj信息</p>
    <h3>test1:{{ testObj.test1 }}</h3>
    <h3>test2:{{ testObj.test2 }}</h3>
    <h3>c:{{ testObj.a.b.c }}</h3>
    <button @click="testObj.test1 += 'a'">改变testObj的test1</button>
    <button @click="testObj.test2 += '2'">改变testObj的test2</button>
    <button @click="testObj.a.b.c++">改变testObj的c</button>
  </div>
</template>

<script>
import { ref, reactive, watch } from "vue";

export default {
  name: "watch",
  setup() {
    const name = ref("Amumu");
    const age = ref(24);

    const person = reactive({
      name: "Amumu12138",
      age: 0,
      job: {
        j1: {
          salary: 20,
        },
      },
    });

    const testObj = ref({
      test1: "aaa",
      test2: "2222",
      a: {
        b: {
          c: 0,
        },
      },
    });

    // 情况一: 监听基本类型数据/监听ref所定义的一个响应式数据
    watch(name, (newVal, oldVal) => {
      console.log("name发生了改变", newVal, oldVal);
    });

    //情况二: 监听多个基本类型数据/监听ref所定义的多个响应式数据
    watch([name, age], (newVal, oldVal) => {
      console.log("name或者age发生了改变", newVal, oldVal);
    });

    //情况三: 监视reactive所定义的一个响应式数据(该对象的全部数据),注意: 此处无法正确的获取oldValue
    watch(
      person,
      (newVal, oldVal) => {
        console.log("person发生了改变", newVal, oldVal);
      },
      { deep: true } //此处的deep配置无效
    );

    // 情况四: 监视reactive所定义的一个响应式数据中的某个属性
    watch(
      () => person.name,
      (newVal, oldVal) => {
        console.log("person中的name发生了改变", newVal, oldVal);
      }
    );

    // 情况五: 监听reactive所定义的一个响应式数据中的某些属性
    watch([() => person.name, () => person.age], (newVal, oldVal) => {
      console.log("person中的name或age发生了改变", newVal, oldVal);
    });

    // 特殊情况: 监听reactive所定义的一个响应式数据中的对象数据(需要开启深度监听->deep: true)
    watch(
      () => person.job,
      (newVal, oldVal) => {
        console.log("person中的job发生了改变", newVal, oldVal);
      },
      {
        deep: true,
      }
    );

    // 监听ref所定义的一个响应式数据对象, 需要添加.value或者添加deep: true
    watch(
      testObj, // testObj.value
      (newVal, oldVal) => {
        console.log("testObj发生了改变", newVal, oldVal);
      },
      { deep: true }
    );

    return {
      name,
      age,
      person,
      testObj,
    };
  },
};
</script>

<style>
</style>