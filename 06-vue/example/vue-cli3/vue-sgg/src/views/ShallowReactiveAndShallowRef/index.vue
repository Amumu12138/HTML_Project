<template>
    <div class="shallow-root">
        <button @click="$router.go(-1)">返回</button>
        <p>a: {{a}}</p>
        <button @click="a++">修改a</button>
        <p>obj.x: {{obj.x}}</p>
        <p>obj.y1: {{obj.y.y1}}</p>
        <button @click="obj.x++">修改obj.x</button>
        <button @click="obj.y.y1++">修改obj.y.y1</button>
    </div>
</template>

<script>
import { ref, reactive, shallowReactive, shallowRef, toRefs, watch } from 'vue';

export default {
    name: 'shallow',
    setup () {
        const a = shallowRef(0)
        const obj = shallowReactive({
            x: 0,
            y: {
                y1: 1
            }
        })
        console.log('a -->', a);
        console.log('obj -->', obj);

        watch(obj, (newVal, oldVal) => {
            console.log('obj发生了变化', newVal, oldVal);
        })

        watch(() => obj.x, (newVal, oldVal) => {
            console.log('obj.x发生了变化', newVal, oldVal);
        })

        watch(() => obj.y, (newVal, oldVal) => {
            console.log('obj.y发生了变化', newVal, oldVal);
        }, { deep: true })

        watch(() => obj.y.y1, (newVal, oldVal) => {
            console.log('obj.y.y1发生了变化', newVal, oldVal);
        })

        return {
            a,
            obj
        }
    }
}
</script>

<style>
</style>