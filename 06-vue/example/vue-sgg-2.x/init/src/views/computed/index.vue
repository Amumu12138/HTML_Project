<template>
    <div class="computed-root">
        <top-com></top-com>
        <input type="text" v-model="firstName" />
        <br />
        <br />
        <input type="text" v-model="lastName" />
        <br />
        <br />全名:
        <span>{{ firstName }}-{{ lastName }}</span>
        <br />
        <br />methods拼接全名:
        <span>{{ fullName() }}</span>
        <br />
        <br />computed实现全名:
        <span>{{ computedFullName }}</span>
    </div>
</template>

<script>
export default {
    name: 'computed',
    data() {
        return {
            firstName: '张',
            lastName: '三',
        };
    },
    computed: {
        computedFullName() {
            console.log('computedFullName called');
            return this.firstName + '--' + this.lastName;
        },
    },
    methods: {
        fullName() {
            console.log('fullName called');
            return this.firstName + '-' + this.lastName;
        },
    },
};
</script>

<style></style>
