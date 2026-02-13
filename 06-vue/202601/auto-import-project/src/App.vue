<script setup lang="ts">

const message = ref('HELLO WORLD')
const router = useRouter()
</script>

<template>
  <div>
    {{ message }}
  </div>
</template>

<style scoped></style>
