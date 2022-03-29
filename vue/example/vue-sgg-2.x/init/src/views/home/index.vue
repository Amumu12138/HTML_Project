<template>
  <div class="home-root">
    <h1>Home</h1>
    <button @click="handleLinkRouter('event')">event</button>
    <button @click="handleLinkRouter('computed')">computed</button>
    <button @click="handleLinkRouter('bindStyle')">watch</button>
    <button @click="handleLinkRouter('bindStyle')">bindStyle</button>
    <button @click="handleLinkRouter('vShowAndvIf')">vShowAndvIf</button>
    <button @click="handleLinkRouter('vFor')">vFor</button>
    <button @click="handleLinkRouter('dataWatch')">dataWatch</button>
  </div>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    handleLinkRouter(routeName) {
      this.$router.push({ name: routeName });
    },
  },
  //   setup() {
  //     const router = useRouter();

  //     function handleLinkRouter(routeName) {
  //       router.push({ name: routeName });
  //     }

  //     return {
  //       handleLinkRouter,
  //     };
  //   },
};
</script>

<style>
</style>