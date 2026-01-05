<template>
  <div class="dialog-root">
    <teleport to="body">
      <div class="mask" v-if="show">
        <div class="content">
          <p>弹窗</p>
          <button @click="handleClose">关闭弹窗</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import { onBeforeMount, watch } from "vue";

export default {
  name: "dialog",
  props: {
    show: Boolean,
  },
  emits: {
    "handle-close-dialog": true,
  },
  setup(props, ctx) {
    watch(
      () => props.show,
      (newVal, oldVal) => {
        console.log("props.show 发生了改变", newVal, oldVal);
      }
    );

    function handleClose() {
      ctx.emit("handle-close-dialog");
    }

    onBeforeMount(() => {
      console.log("dialog show -->", props.show);
    });

    return {
      handleClose,
    };
  },
};
</script>

<style>
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  background: #ccc;
  height: 400px;
  width: 400px;
}
</style>