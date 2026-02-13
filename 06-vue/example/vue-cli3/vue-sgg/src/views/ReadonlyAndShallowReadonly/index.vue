<template>
    <div class="readonly-root">
        <button @click="$router.go(-1)">返回</button>
        <p>age: {{age}}</p>
        <button @click="age++">修改age</button>
        <p>name: {{person.name}}</p>
        <p>age: {{person.age}}</p>
        <p>salary: {{person.job.a.salary}}</p>
        <button @click="person.name +='!'">修改person.name</button>
        <button @click="person.age = 22">修改person.age</button>
        <button @click="person.job.a.salary = 20">修改person.job.a.salary</button>
    </div>
</template>

<script>
import { ref, reactive, readonly, shallowReadonly, watch } from 'vue'

export default {
    name: 'readonly',
    setup () {
        const age = readonly(0);
        const person = shallowReadonly({
            age: 18,
            name: 'Amumu',
            job: {
                a: {
                    salary: 10
                }
            }
        })

        watch(() => person.name, (newVal, oldVal) => {
            console.log('porson.name发生改变', newVal, oldVal);
        })

        watch(() => person.age, (newVal, oldVal) => {
            console.log('porson.age发生改变', newVal, oldVal);
        })

        watch(() => person.job.a.salary, (newVal, oldVal) => {
            console.log('porson.job.a.salary发生改变', newVal, oldVal);
        })
        return {
            age,
            person
        }
    }
}
</script>

<style>
</style>