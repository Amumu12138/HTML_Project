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
    <button @click="handleLinkRouter('animation')">animation</button>
    <button @click="handleLinkRouter('slot')">slot</button>
    <button @click="handleLinkRouter('vuex')">vuex</button>
    <button @click="handleLinkRouter('vueRouter')">vueRouter</button>
  </div>
</template>

<script>
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
};
</script>

<style>
</style>