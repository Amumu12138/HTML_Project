<template>
  <div>
    <button @click="onClickResp()">
      <slot> {{ defaultBtnName }}</slot>
    </button>
  </div>
</template>

<script>
export default {
  name: "my-component",
  data() {
    return {
      defaultBtnName: "my-button",
      msg: "hello Amumu",
    };
  },
  methods: {
    onClickResp() {
      alert(this.msg);
    },
  },
};
</script>

<style>
</style>