<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute();
const breadList = computed(() => route.matched)
</script>

<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
            <router-link to="/welcome" v-if="index == 0">{{
                item.meta.title
            }}</router-link>

            <span v-else>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<style scoped>
:deep(.el-breadcrumb__item) {
    cursor: pointer;
}
</style>