<template>
  <div class="customRef-root">
    <button @click="$router.go(-1)">返回</button>
    <br />
    <input type="text" v-model="message" placeholder="请输入..." />
    <br />
    message: {{ message }}
  </div>
</template>

<script>
import { ref, customRef } from "vue";

export default {
  name: "customRef",
  setup() {
    function myRef(value, delay) {
      let timer = null;
      return customRef((track, trigger) => {
        return {
          set(newVal) {
            console.log(`customRef实现了数据的修改,修改值为${newVal}`);
            clearTimeout(timer);
            timer = setTimeout(() => {
              value = newVal;
              trigger();
            }, delay);
          },
          get() {
            console.log(`customRef实现了数据的获取,value值为${value}`);
            track();
            return value;
          },
        };
      });
    }

    const message = myRef("Hello", 1000);

    return {
      message,
    };
  },
};
</script>

<style>
</style>