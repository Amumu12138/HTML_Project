<template>
  <div class="home-root">
    <p>HOME</p>
    <button @click="handleRouter('computed')">computed</button>
    <button @click="handleRouter('watch')">watch</button>
    <button @click="handleRouter('watch-effect')">watch-effect</button>
    <button @click="handleRouter('life-cycle')">life-cycle</button>
    <button @click="handleRouter('hook-test')">hook-test</button>
    <button @click="handleRouter('to-ref')">to-ref</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";

export default {
  name: "home",
  setup() {
    const router = useRouter();

    function handleRouter(routeName) {
      router.push({
        name: routeName,
      });
    }
    return {
      handleRouter,
    };
  },
};
</script>

<style scope>
button {
  margin: 10px;
}
</style>