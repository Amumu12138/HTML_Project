<template>
  <div class="home-root">
    <h1>Home</h1>
    <button @click="handleLinkRouter('computed')">computed</button>
    <button @click="handleLinkRouter('watch')">watch</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "home",
  setup() {
    const router = useRouter();

    function handleLinkRouter(routeName) {
      router.push({ name: routeName });
    }

    return {
      handleLinkRouter,
    };
  },
};
</script>

<style>
</style>