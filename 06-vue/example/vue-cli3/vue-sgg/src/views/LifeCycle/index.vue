<template>
    <div class="life-cycle-root">
        <button @click="$router.go(-1)">返回</button>
        <p>name: {{name}}</p>
        <p>age: {{age}}</p>
        <button @click="name +='!'">改变name</button>
        <button @click="age +='!'">改变age</button>
    </div>
</template>

<script>
import { onBeforeMount, onBeforeUnmount, onBeforeUpdate, onUpdated, onMounted, onUnmounted, reactive, toRefs } from 'vue';

export default {
    name: 'life-cycle',
    beforeCreate () {
        console.log('-----beforeCreate-----');
    },
    created () {
        console.log('-----created-----');
    },
    beforeMount () {
        console.log('-----beforeMount-----');
    },
    mounted () {
        console.log('-----mounted-----');
    },
    beforedDestroy () {
        console.log('-----beforedDestroy-----');
    },
    destroyed () {
        console.log('-----destroyed-----');
    },
    setup () {
        const state = reactive({
            name: 'Amumu',
            age: 24
        });

        console.log('---setup---');

        onBeforeMount(() => {
            console.log('---onBeforeMount----');
        })

        onMounted(() => {
            console.log('---onMounted----');
        })

        onBeforeUpdate(() => {
            console.log('---onBeforeUpdate----');
        })

        onUpdated(() => {
            console.log('---onUpdated----');
        })

        onBeforeUnmount(() => {
            console.log('---onBeforeUnmount----');
        })

        onUnmounted(() => {
            console.log('---onUnmounted----');
        })

        return {
            ...toRefs(state)
        }
    }
};
</script>

<style>
</style>