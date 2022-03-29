<template>
  <div class="data-watch-root">
    <top-com></top-com>
    <button @click="student.age++">年龄增加</button>
    <button @click="addSex">添加性别属性</button>
    <button @click="updateSex">修改性别属性</button>
    <button @click="addFriend">在列表首位添加一个朋友</button>
    <button @click="updateFirstFriendName">修改第一个朋友的名字</button>
    <button @click="addHobby">添加一个爱好</button>
    <button @click="updateFirstHobby">修改第一个爱好</button>

    <h3>姓名: {{ student.name }}</h3>
    <h3>年龄: {{ student.age }}</h3>
    <h3 v-if="student.sex">性别: {{ student.sex }}</h3>
    <h3>爱好</h3>
    <ul>
      <li v-for="(item, index) in student.hobby" :key="index">
        {{ item }}
      </li>
    </ul>
    <h3>朋友们</h3>
    <ul>
      <li v-for="(item, index) in student.friends" :key="index">
        {{ item.name }}-{{ item.age }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "data-watch",
  data() {
    return {
      student: {
        name: "Amumu12138",
        age: 24,
        hobby: ["抽烟", "喝酒", "烫头"],
        friends: [
          {
            name: "qwer",
            age: 20,
          },
          {
            name: "asdf",
            age: 21,
          },
        ],
      },
    };
  },
  methods: {
    addSex() {
      // vue2.x通过Object.defineProprty对属性的读取、修改进行拦截(数据劫持)
      //   this.$set(this.student, "sex", "男");
      // vue3.0通过Proxy拦截对象中任意属性的变化,包括属性的读写,添加和删除等
      this.student.sex = "男";
    },
    updateSex() {
      this.student.sex = "女";
    },
    addFriend() {
      this.student.friends.unshift({ name: "zxcv", age: 22 });
    },
    updateFirstFriendName() {
      this.student.friends[0].name = "张三";
    },
    addHobby() {
      this.student.hobby.push("大保健");
    },
    updateFirstHobby() {
      this.student.hobby[0] = "学习";
    },
  },
  created() {
    console.log(this);
  },
};
</script>

<style>
</style>