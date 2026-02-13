<template>
    <div class="to-ref-root">
        <p>TOREF</p>
        <button @click="$router.go(-1)">返回</button>
        <p>姓名: {{person.name}}</p>
        <p>年龄: {{person.age}}</p>
        <p>工资: {{person.job.j1.salary}}</p>
        <input type="button" value="修改姓名" @click="person.name +='!'" />
        <input type="button" value="修改年龄" @click="person.age ++" />
        <input type="button" value="修改工资" @click="person.job.j1.salary++" />

        <p>name: {{name}}</p>
    </div>
</template>

<script>
import { ref, reactive, toRef, toRefs } from "vue";

export default {
    name: "to-ref",
    setup () {
        const name = ref(0);
        const person = reactive({
            name: '张三',
            age: 18,
            job: {
                j1: {
                    salary: 20
                }
            }
        })

        console.log('person -->', person, ' typeof -->', typeof (person));

        const name1 = person.name;
        console.log('name1 -->', name1, ' typeof -->', typeof (name1));

        const name2 = toRef(person, 'name');
        console.log('name2 -->', name2, ' typeof -->', typeof (name2));

        return {
            name,
            person,
            ...toRefs(person)
        };
    },
};
</script>

<style>
</style>