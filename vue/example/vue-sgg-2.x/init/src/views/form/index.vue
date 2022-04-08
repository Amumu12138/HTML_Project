<template>
  <div class="form-root">
    <top-com></top-com>
    <form id="form" @submit.prevent="demo">
      账号: <input type="text" v-model.trim="userInfo.account" /><br /><br />
      密码: <input type="password" v-model.trim="userInfo.password" />
      <br /><br />
      年龄: <input type="number" v-model.number="userInfo.age" /> <br /><br />
      <template v-if="true">
        性别: 男
        <input type="radio" name="sex" v-model="userInfo.sex" value="male" /> 女
        <input type="radio" name="sex" v-model="userInfo.sex" value="female" />
      </template>
      <br /><br />
      <template v-if="true">
        爱好: 学习
        <input type="checkbox" v-model="userInfo.hobby" value="study" /> 打游戏
        <input type="checkbox" v-model="userInfo.hobby" value="game" /> 吃饭
        <input type="checkbox" v-model="userInfo.hobby" value="eat" />
      </template>
      <br /><br />
      <template v-if="true">
        所属校区
        <select name="select" id="select" v-model="userInfo.city">
          <option value="">请选择校区</option>
          <option value="bj">北京</option>
          <option value="sh">上海</option>
          <option value="sz">深圳</option>
          <option value="wh">武汉</option>
        </select>
      </template>
      <br /><br />
      其他信息:
      <textarea
        name=""
        id=""
        cols="30"
        rows="10"
        v-model.lazy="userInfo.other"
      ></textarea>
      <br /><br />
      <template v-if="true">
        <input type="checkbox" v-model="userInfo.agree" />阅读并接受
        <a href="#">《用户协议》</a>
      </template>
      <br /><br />
      <button @click="handleSumbit">提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "form",
  data() {
    return {
      userInfo: {
        account: "",
        password: "",
        age: 0,
        sex: "male",
        hobby: [],
        city: "",
        other: "",
        agree: false,
      },
    };
  },
  methods: {
    handleSumbit() {
      console.log(JSON.stringify(this.userInfo));
    },
    demo() {},
  },
};
</script>

<style lang="less" scoped>
</style>