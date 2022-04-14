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
    <button @click="handleLinkRouter('form')">form</button>
    <button @click="handleLinkRouter('customDirectives')">
      customDirectives
    </button>
    <button @click="handleLinkRouter('lifeCycle')">lifeCycle</button>
    <button @click="handleLinkRouter('ref')">ref</button>
    <button @click="handleLinkRouter('mixin')">mixin</button>
    <button @click="handleLinkRouter('TodoList')">TodoList</button>
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