<template>
  <div class="teleport-root">
    <button @click="$router.go(-1)">返回</button>
    <p>teleport使用</p>
    <button @click="show = true">点击打开弹窗</button>
    <Dialog :show="show" @handle-close-dialog="handleCloseDialog"></Dialog>
  </div>
</template>

<script>
import { ref, toRef, watch } from "vue";
import Dialog from "./children";

export default {
  name: "teleport",
  components: { Dialog },
  setup() {
    const show = ref(false);
    watch(show, (newVal, oldVal) => {
      console.log("show 发生了变化", newVal, oldVal);
    });

    function handleCloseDialog() {
      show.value = false;
    }

    return {
      show,
      handleCloseDialog,
    };
  },
};
</script>

<style>
</style>