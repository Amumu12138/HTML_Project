<script setup lang="ts">
import ROUTER from "@/router/router-constants"
import { useRouter } from 'vue-router'

const router = useRouter()
const toHome = () => {
    router.push({ name: ROUTER.HOME })
}

</script>

<template>
    <div>
        <div>This is Login</div>
        <el-button type="primary" @click="toHome">回首页</el-button>
    </div>
</template>

<style></style>