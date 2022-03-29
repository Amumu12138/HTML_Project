<template>
  <div class="bind-style-root">
    <top-com></top-com>
    <!-- 绑定clas样式——字符串写法,适用于:样式的类不确定,需要动态绑定 -->
    <p class="basic" :class="mood" @click="changeMood">{{ name }} 字符串写法</p>
    <br />
    <br />
    <div class="basic" :class="classArr" @click="changeClassArr">
      {{ name }} 数组写法
    </div>
    <br />
    <br />
    <div class="basic" :class="classObj">{{ name }} 对象写法</div>
    <br />
    <br />
    <div class="basic" :style="styleObj">style绑定 对象写法</div>
    <br /><br />
    <div class="basic" :style="styleArr">style绑定 数组写法</div>
  </div>
</template>

<script>
export default {
  name: "bind-style",
  data() {
    return {
      name: "绑定样式",
      mood: "",
      classArr: ["test1", "test2", "test3"],
      classObj: {
        test1: true,
        test2: false,
      },
      styleObj: {
        fontSize: 40 + "px",
      },
      styleArr: [
        {
          fontSize: 30 + "px",
          background: "gray",
        },
        {
          border: "5px solid green",
        },
      ],
    };
  },
  methods: {
    changeMood() {
      const arr = ["normal", "happy", "sad"];
      this.mood = arr[Math.floor(Math.random() * 3)];
    },
    changeClassArr() {
      this.classArr.pop();
    },
  },
};
</script>

<style lang="less" scoped>
.bind-style-root {
  .basic {
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: red;
  }
  .normal {
    font-size: 14px;
    color: white;
    background: skyblue;
  }
  .happy {
    font-size: 20px;
    color: yellow;
    background: red;
  }
  .sad {
    font-size: 12px;
    color: green;
    background: gray;
  }

  .test1 {
    background: pink;
  }
  .test2 {
    border: 1px dotted black;
  }
  .test3 {
    border-radius: 12px;
  }
}
</style>