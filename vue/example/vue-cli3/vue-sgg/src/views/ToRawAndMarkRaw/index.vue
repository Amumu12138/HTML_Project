<template>
    <div class="raw-root">
        <button @click="$router.go(-1)">返回</button>
        <p>name: {{person.name}}</p>
        <p>age: {{person.age}}</p>
        <p>salary: {{person.job.salary}}</p>
        <p v-show="person.car">car: {{person.car}}</p>
        <button @click="person.name = '李四'">修改person.name</button>
        <button @click="person.age++">修改person.age</button>
        <button @click="person.job.salary = 100">修改person.job.salary</button>
        <button @click="addCar">添加汽车</button>
        <button v-show="person.car" @click="person.car.money++">修改person.car.money</button>
        <p>rawName: {{rawPerson.name}}</p>
        <p>rawAge: {{rawPerson.age}}</p>
        <p>rawSalary: {{rawPerson.job.salary}}</p>
        <p v-show="rawPerson.car">rawCar: {{rawPerson.car}}</p>
        <button @click="rawPerson.age++">修改rawPerson.age</button>
        <button @click="rawPerson.job.salary = 100">修改rawPerson.job.salary</button>
        <button v-show="rawPerson.car" @click="rawPerson.car.money++">修改rawPerson.car.money</button>
    </div>
</template>

<script>
import { toRaw, markRaw, reactive, watch } from 'vue';

export default {
    name: 'raw',
    setup () {
        const test = {
            name: '张三',
            age: 18,
            job: {
                salary: 23

            }
        }
        const person = reactive(test)

        const rawPerson = toRaw(test)
        console.log('person -->', person, 'rawPerson -->', rawPerson);

        watch(() => person.age, (newVal, oldVal) => {
            console.log('person.age发生修改', newVal, oldVal);
            console.log('111 person -->', person, 'rawPerson -->', rawPerson);
        })

        watch(() => rawPerson.age, (newVal, oldVal) => {
            console.log('rawPerson.age发生修改', newVal, oldVal);
            console.log('222 person -->', person, 'rawPerson -->', rawPerson);
        })

        function addCar () {
            // markRaw 标记一个对象,使其永远不会再成为响应式对象
            person.car = markRaw({ money: 100, name: 'BMW' })
            // person.car = { money: 100, name: 'BMW' }
        }

        return {
            person,
            rawPerson,
            addCar
        }
    }
}
</script>

<style>
</style>